import type { WidgetInstanceId } from '@theme/builder/core/primitives';
import type { WidgetInstance } from '@theme/builder/layout-engine/types';
import type { PropertyRecord, PropertyValidationResult } from '@theme/builder/property-system/types';
import type { WidgetDefinition } from '@theme/builder/widget-registry/types';
import type {
	SerializedWidgetProps,
	WidgetRegistration,
	WidgetModule,
} from '@theme/builder/widget-sdk/types';

import {
	defaultPropertyResolver,
	defaultPropertyValidator,
} from '../validation/property-validator';

export class WidgetModuleImpl implements WidgetModule {
	constructor(public readonly registration: WidgetRegistration) {}

	toDefinition(): WidgetDefinition {
		const { metadata, defaults, schema, renderer } = this.registration;

		return {
			type: metadata.type,
			name: metadata.name,
			description: metadata.description,
			icon: metadata.icon,
			kind: metadata.kind,
			category: metadata.category,
			paletteGroup: metadata.paletteGroup,
			keywords: metadata.keywords,
			componentSlug: metadata.componentSlug,
			schema,
			defaults,
			deprecated: metadata.deprecated,
			replacedBy: metadata.replacedBy,
			preview: {
				mode: renderer.mode,
				render: async (request) => {
					const output = await renderer.render({
						props: request.props,
						context: {
							instanceId: request.context.instanceId,
							type: request.type,
							breakpoint: request.context.breakpoint,
							isEditor: request.context.isEditor,
							layout: request.context.layout,
						},
					});

					return {
						html: output.html,
					};
				},
			},
		};
	}

	createInstance(instanceId: WidgetInstanceId, overrides: PropertyRecord = {}): WidgetInstance {
		const stored = {
			...this.registration.defaults,
			...overrides,
		};

		const validation = this.validate(stored);

		return {
			id: instanceId,
			type: this.registration.metadata.type,
			componentSlug: this.registration.metadata.componentSlug,
			props: validation.value as PropertyRecord,
		};
	}

	resolveProps(stored: PropertyRecord, breakpoint: import('@theme/builder/core/primitives').BreakpointSlug): PropertyRecord {
		return defaultPropertyResolver.resolve(
			this.registration.schema,
			this.registration.defaults,
			stored,
			breakpoint,
			this.registration.responsive.fields,
		);
	}

	validate(props: PropertyRecord, breakpoint?: import('@theme/builder/core/primitives').BreakpointSlug): PropertyValidationResult {
		const resolved = breakpoint
			? this.resolveProps(props, breakpoint)
			: props;

		const result = defaultPropertyValidator.validateRecord(
			this.registration.schema,
			resolved,
			breakpoint ? { breakpoint } : undefined,
		);

		const hookResult = this.registration.hooks?.onValidate?.({
			instanceId: '' as WidgetInstanceId,
			type: this.registration.metadata.type,
			props: resolved,
		});

		if (hookResult && !hookResult.valid) {
			return {
				valid: false,
				value: result.value,
				errors: [...result.errors, ...hookResult.errors],
			};
		}

		return result;
	}

	serialize(instance: WidgetInstance): SerializedWidgetProps {
		const saveProps =
			this.registration.hooks?.onBeforeSave?.({
				instanceId: instance.id,
				type: instance.type,
				props: instance.props,
			}) ?? instance.props;

		return {
			type: instance.type,
			props: saveProps as PropertyRecord,
			responsiveOverrides: instance.responsiveOverrides as SerializedWidgetProps['responsiveOverrides'],
		};
	}

	deserialize(payload: SerializedWidgetProps, instanceId: WidgetInstanceId): WidgetInstance {
		const validation = this.validate(payload.props);
		const module = this.registration.metadata;

		return {
			id: instanceId,
			type: payload.type,
			componentSlug: module.componentSlug,
			props: validation.value as PropertyRecord,
			responsiveOverrides: payload.responsiveOverrides as WidgetInstance['responsiveOverrides'],
		};
	}
}

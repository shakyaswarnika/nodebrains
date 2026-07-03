import type { WidgetInstanceId, WidgetTypeId } from '@theme/builder/core/primitives';
import type { WidgetInstance } from '@theme/builder/layout-engine/types';
import type { PropertyRecord, PropertyValidationResult } from '@theme/builder/property-system/types';
import type {
	SerializedWidgetProps,
	WidgetModule,
	WidgetValidationInput,
	WidgetValidator,
} from '@theme/builder/widget-sdk/types';

export interface WidgetValidatorDependencies {
	readonly getModule: (type: WidgetTypeId) => WidgetModule | undefined;
}

export class WidgetValidatorImpl implements WidgetValidator {
	constructor(private readonly dependencies: WidgetValidatorDependencies) {}

	validate(input: WidgetValidationInput): PropertyValidationResult {
		const module = this.dependencies.getModule(input.type);

		if (!module) {
			return {
				valid: false,
				value: input.props,
				errors: [
					{
						path: '',
						code: 'unknown_widget',
						message: `Unknown widget type: ${String(input.type)}`,
					},
				],
			};
		}

		return module.validate(input.props, input.breakpoint);
	}
}

export class WidgetSerializerImpl {
	constructor(private readonly getModule: (type: WidgetTypeId) => WidgetModule | undefined) {}

	serialize(instance: WidgetInstance): SerializedWidgetProps {
		const module = this.getModule(instance.type);

		if (!module) {
			return {
				type: instance.type,
				props: instance.props,
				responsiveOverrides: instance.responsiveOverrides as SerializedWidgetProps['responsiveOverrides'],
			};
		}

		return module.serialize(instance);
	}

	deserialize(payload: SerializedWidgetProps, instanceId: WidgetInstanceId): WidgetInstance {
		const module = this.getModule(payload.type);

		if (!module) {
			return {
				id: instanceId,
				type: payload.type,
				props: payload.props,
				responsiveOverrides: payload.responsiveOverrides as WidgetInstance['responsiveOverrides'],
			};
		}

		return module.deserialize(payload, instanceId);
	}

	createInstance(
		type: WidgetTypeId,
		instanceId: WidgetInstanceId,
		overrides?: PropertyRecord,
	): WidgetInstance {
		const module = this.getModule(type);

		if (!module) {
			return {
				id: instanceId,
				type,
				props: overrides ?? {},
			};
		}

		return module.createInstance(instanceId, overrides);
	}
}

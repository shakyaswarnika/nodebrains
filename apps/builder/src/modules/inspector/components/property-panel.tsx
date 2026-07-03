'use client';

import type { ReactElement } from 'react';

import { getWidgetSDK } from '@builder/lib/widget-sdk';
import { getEditorBreakpoint } from '@builder/lib/responsive-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { WidgetInstanceId } from '@theme/builder/core/primitives';
import type { PropertyFieldMap, PropertyRecord } from '@theme/builder/property-system/types';
import type { WidgetModule } from '@theme/builder/widget-sdk/types';

import { PropertyControl } from './property-control';
import { ResponsiveContextBar } from '../../responsive/components/responsive-context-bar';
import {
	clearBreakpointOverride,
	filterVisibleFieldGroups,
	getFieldInheritance,
	groupPropertyFields,
	isResponsiveField,
	resolveFieldValue,
	writeResponsiveFieldValue,
} from '../lib/property-panel-utils';

export interface PropertyPanelProps {
	readonly instanceId: WidgetInstanceId;
	readonly widgetType: import('@theme/builder/core/primitives').WidgetTypeId;
	readonly props: PropertyRecord;
	readonly schema: PropertyFieldMap;
	readonly responsiveFields?: readonly string[];
	readonly module?: WidgetModule;
	readonly onChange: (nextProps: PropertyRecord) => void;
}

export function PropertyPanel({
	instanceId,
	widgetType,
	props,
	schema,
	responsiveFields = [],
	module,
	onChange,
}: PropertyPanelProps): ReactElement {
	const activeBreakpoint = useBuilderStore((state) => state.activeBreakpoint);
	const editorDevice = useBuilderStore((state) => state.editorDevice);
	const deviceLabel = getEditorBreakpoint(editorDevice).label;
	const widgetModule = module ?? getWidgetSDK().getModule(widgetType);
	const resolvedProps = widgetModule?.resolveProps(props, activeBreakpoint) ?? props;
	const validation = widgetModule?.validate(props, activeBreakpoint);
	const groups = filterVisibleFieldGroups(
		groupPropertyFields(schema),
		resolvedProps as Record<string, unknown>,
	);

	const handleFieldChange = (fieldKey: string, fieldSchema: PropertyFieldMap[string], nextValue: unknown) => {
		const responsive = isResponsiveField(fieldKey, fieldSchema, responsiveFields);
		const storedValue = props[fieldKey];
		const nextStoredValue = writeResponsiveFieldValue(
			storedValue,
			activeBreakpoint,
			nextValue,
			responsive,
		);

		onChange({
			...props,
			[fieldKey]: nextStoredValue as PropertyRecord[string],
		});
	};

	const handleResetOverride = (fieldKey: string) => {
		onChange({
			...props,
			[fieldKey]: clearBreakpointOverride(props[fieldKey], activeBreakpoint) as PropertyRecord[string],
		});
	};

	return (
		<div className="space-y-5">
			<div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Property Panel</p>
				<p className="mt-2 text-sm font-semibold text-slate-100">
					{widgetModule?.registration.metadata.name ?? String(widgetType)}
				</p>
				<p className="mt-1 break-all text-xs text-slate-400">{String(instanceId)}</p>
			</div>

			{validation && !validation.valid ? (
				<div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
					<p className="font-semibold">Validation issues</p>
					<ul className="mt-2 space-y-1">
						{validation.errors.map((error) => (
							<li key={`${error.path}-${error.code}`}>{error.message}</li>
						))}
					</ul>
				</div>
			) : null}

			{responsiveFields.length > 0 ? (
				<ResponsiveContextBar props={props} responsiveFieldCount={responsiveFields.length} />
			) : null}

			{groups.map((group) => (
				<section key={group.id} className="space-y-3">
					<h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
						{group.label}
					</h3>
					<div className="space-y-3">
						{group.fields.map(({ key, schema: fieldSchema }) => {
							const responsive = isResponsiveField(key, fieldSchema, responsiveFields);
							const storedValue = props[key];
							const displayValue = resolveFieldValue(storedValue, activeBreakpoint);
							const inheritance = getFieldInheritance(storedValue, activeBreakpoint);

							return (
								<PropertyControl
									key={key}
									fieldKey={key}
									schema={fieldSchema}
									value={displayValue ?? resolvedProps[key]}
									responsive={responsive}
									deviceLabel={responsive ? deviceLabel : undefined}
									inherited={responsive ? inheritance.inherited : undefined}
									sourceLabel={responsive ? inheritance.sourceLabel : undefined}
									hasOverride={responsive ? inheritance.hasOverride : undefined}
									onResetOverride={
										responsive && inheritance.hasOverride
											? () => handleResetOverride(key)
											: undefined
									}
									onChange={(nextValue) => handleFieldChange(key, fieldSchema, nextValue)}
								/>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
}

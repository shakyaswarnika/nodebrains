'use client';

import type { ReactElement } from 'react';

import { getWidgetSDK } from '@builder/lib/widget-sdk';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { WidgetTypeId } from '@theme/builder/core/primitives';
import type { PropertyRecord } from '@theme/builder/property-system/types';
import type { WidgetLayoutNode } from '@theme/builder/layout-engine/types';

import { PropertyPanel } from './property-panel';

interface WidgetInspectorProps {
	readonly node: WidgetLayoutNode;
}

export function WidgetInspector({ node }: WidgetInspectorProps): ReactElement {
	const graph = useBuilderStore((state) => state.graph);
	const updateWidgetProps = useBuilderStore((state) => state.updateWidgetProps);
	const widget = graph.widgets[node.widgetInstanceId];

	if (!widget) {
		return (
			<div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
				Widget instance data is missing.
			</div>
		);
	}

	const module = getWidgetSDK().getModule(widget.type);

	if (!module) {
		return (
			<div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
				No SDK module registered for {String(widget.type)}.
			</div>
		);
	}

	return (
		<PropertyPanel
			instanceId={node.widgetInstanceId}
			widgetType={widget.type}
			props={widget.props}
			schema={module.registration.schema}
			responsiveFields={module.registration.responsive.fields}
			module={module}
			onChange={(nextProps) => updateWidgetProps(node.widgetInstanceId, nextProps)}
		/>
	);
}

export function getWidgetTypeLabel(type: WidgetTypeId): string {
	return getWidgetSDK().getModule(type)?.registration.metadata.name ?? String(type);
}

export function getWidgetInstanceLabel(type: WidgetTypeId, props: PropertyRecord): string {
	const title = props.title ?? props.label ?? props.heading;

	if (typeof title === 'string' && title.length > 0) {
		return title;
	}

	return getWidgetTypeLabel(type);
}

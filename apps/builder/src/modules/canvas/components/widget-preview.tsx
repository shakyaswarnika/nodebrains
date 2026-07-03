'use client';

import type { ReactElement } from 'react';

import { getWidgetSDK } from '@builder/lib/widget-sdk';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { WidgetInstanceId, WidgetTypeId } from '@theme/builder/core/primitives';
import type { PropertyRecord } from '@theme/builder/property-system/types';

interface WidgetPreviewProps {
	readonly instanceId: WidgetInstanceId;
	readonly type: WidgetTypeId;
	readonly props: PropertyRecord;
	readonly isEditor?: boolean;
}

export function WidgetPreview({
	instanceId,
	type,
	props,
	isEditor = true,
}: WidgetPreviewProps): ReactElement {
	const activeBreakpoint = useBuilderStore((state) => state.activeBreakpoint);
	const sdk = getWidgetSDK();
	const module = sdk.getModule(type);
	const resolvedProps = module?.resolveProps(props, activeBreakpoint) ?? props;
	const output = sdk.rendererRegistry.render(type, {
		props: resolvedProps,
		context: {
			instanceId,
			type,
			breakpoint: activeBreakpoint,
			isEditor,
		},
	});

	return (
		<div
			className={`rounded-xl border border-slate-800 bg-slate-950/80 p-4 ${output.className ?? ''}`}
			dangerouslySetInnerHTML={{ __html: output.html }}
		/>
	);
}

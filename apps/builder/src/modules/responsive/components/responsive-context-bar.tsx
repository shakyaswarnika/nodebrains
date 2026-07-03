'use client';

import type { ReactElement } from 'react';

import {
	countResponsiveOverrides,
	getEditorBreakpoint,
} from '@builder/lib/responsive-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { PropertyRecord } from '@theme/builder/property-system/types';

import { BreakpointSwitcher } from './breakpoint-switcher';

interface ResponsiveContextBarProps {
	readonly props: PropertyRecord;
	readonly responsiveFieldCount?: number;
}

export function ResponsiveContextBar({
	props,
	responsiveFieldCount = 0,
}: ResponsiveContextBarProps): ReactElement {
	const editorDevice = useBuilderStore((state) => state.editorDevice);
	const responsivePreview = useBuilderStore((state) => state.responsivePreview);
	const toggleResponsivePreview = useBuilderStore((state) => state.toggleResponsivePreview);
	const breakpoint = getEditorBreakpoint(editorDevice);
	const overrideCount = countResponsiveOverrides(props as Record<string, unknown>);

	return (
		<div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Responsive editing</p>
					<p className="mt-1 text-sm font-medium text-slate-100">{breakpoint.label}</p>
					<p className="mt-1 text-[11px] text-slate-400">{breakpoint.description}</p>
				</div>
				<button
					type="button"
					onClick={toggleResponsivePreview}
					className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium ${
						responsivePreview
							? 'border-accent bg-accent/15 text-accent'
							: 'border-slate-700 text-slate-300 hover:border-slate-600'
					}`}
				>
					{responsivePreview ? 'Preview on' : 'Preview off'}
				</button>
			</div>

			<BreakpointSwitcher compact />

			<div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
				<div className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2">
					<p className="text-slate-500">Responsive fields</p>
					<p className="mt-1 font-medium text-slate-200">{responsiveFieldCount}</p>
				</div>
				<div className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2">
					<p className="text-slate-500">Active overrides</p>
					<p className="mt-1 font-medium text-slate-200">{overrideCount}</p>
				</div>
			</div>

			<p className="text-[11px] leading-relaxed text-slate-500">
				Values inherit from smaller breakpoints unless you set an override. Inherited fields are
				dimmed; overridden fields are highlighted and can be reset.
			</p>
		</div>
	);
}

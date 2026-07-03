'use client';

import type { ReactElement } from 'react';

import {
	EDITOR_BREAKPOINTS,
	type EditorDeviceSlug,
} from '@builder/lib/responsive-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';

interface BreakpointSwitcherProps {
	readonly compact?: boolean;
}

export function BreakpointSwitcher({ compact = false }: BreakpointSwitcherProps): ReactElement {
	const editorDevice = useBuilderStore((state) => state.editorDevice);
	const setEditorDevice = useBuilderStore((state) => state.setEditorDevice);

	return (
		<div
			className={`flex rounded-xl border border-slate-800 bg-slate-900 p-1 ${
				compact ? '' : 'shadow-inner shadow-slate-950/40'
			}`}
			role="tablist"
			aria-label="Responsive breakpoint"
		>
			{EDITOR_BREAKPOINTS.map((breakpoint) => (
				<button
					key={breakpoint.id}
					type="button"
					role="tab"
					aria-selected={editorDevice === breakpoint.id}
					onClick={() => setEditorDevice(breakpoint.id)}
					className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
						editorDevice === breakpoint.id
							? 'bg-accent text-white shadow-sm'
							: 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
					}`}
				>
					{breakpoint.label}
				</button>
			))}
		</div>
	);
}

export function BreakpointSwitcherLabels(): Record<EditorDeviceSlug, string> {
	return Object.fromEntries(
		EDITOR_BREAKPOINTS.map((entry) => [entry.id, entry.label]),
	) as Record<EditorDeviceSlug, string>;
}

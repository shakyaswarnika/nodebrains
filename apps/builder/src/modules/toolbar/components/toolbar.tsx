'use client';

import type { ReactElement } from 'react';

import { useBuilderStore } from '@builder/store/use-builder-store';
import { BreakpointSwitcher } from '@builder/modules/responsive/components/breakpoint-switcher';

function NormalizeRowButton(): ReactElement {
	const normalizeSelectedRow = useBuilderStore((state) => state.normalizeSelectedRow);

	return (
		<button
			type="button"
			onClick={normalizeSelectedRow}
			className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900"
		>
			Equalize Columns
		</button>
	);
}

export function Toolbar(): ReactElement {
	const canvasMode = useBuilderStore((state) => state.canvasMode);
	const document = useBuilderStore((state) => state.document);
	const responsivePreview = useBuilderStore((state) => state.responsivePreview);
	const setCanvasMode = useBuilderStore((state) => state.setCanvasMode);
	const toggleResponsivePreview = useBuilderStore((state) => state.toggleResponsivePreview);
	const toggleSidebarCollapsed = useBuilderStore((state) => state.toggleSidebarCollapsed);
	const toggleInspectorCollapsed = useBuilderStore((state) => state.toggleInspectorCollapsed);

	return (
		<header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-5">
			<div className="flex items-center gap-3">
				<div className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
					NodeBrains Builder
				</div>
				<div>
					<p className="text-sm font-medium text-slate-100">{document.meta.title}</p>
					<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
						{document.meta.status}
					</p>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1">
					{(['edit', 'preview'] as const).map((mode) => (
						<button
							key={mode}
							type="button"
							onClick={() => setCanvasMode(mode)}
							className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
								canvasMode === mode
									? 'bg-accent text-white'
									: 'text-slate-400 hover:text-slate-200'
							}`}
						>
							{mode}
						</button>
					))}
				</div>

				<BreakpointSwitcher />
				<button
					type="button"
					onClick={toggleResponsivePreview}
					className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
						responsivePreview
							? 'border-accent bg-accent/15 text-accent'
							: 'border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
					}`}
				>
					{responsivePreview ? 'Device preview' : 'Full width'}
				</button>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={toggleSidebarCollapsed}
						className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900"
					>
						Toggle Sidebar
					</button>
					<button
						type="button"
						onClick={toggleInspectorCollapsed}
						className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900"
					>
						Toggle Inspector
					</button>
					<NormalizeRowButton />
				</div>
			</div>
		</header>
	);
}

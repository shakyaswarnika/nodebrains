'use client';

import type { ReactElement, ReactNode } from 'react';

import { getEditorBreakpoint, getPreviewWidth } from '@builder/lib/responsive-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';

interface ResponsivePreviewFrameProps {
	readonly children: ReactNode;
}

export function ResponsivePreviewFrame({ children }: ResponsivePreviewFrameProps): ReactElement {
	const editorDevice = useBuilderStore((state) => state.editorDevice);
	const responsivePreview = useBuilderStore((state) => state.responsivePreview);
	const breakpoint = getEditorBreakpoint(editorDevice);
	const width = responsivePreview ? getPreviewWidth(editorDevice) : null;

	return (
		<div className="flex h-full flex-col items-center overflow-auto">
			{responsivePreview ? (
				<div className="sticky top-0 z-10 mb-4 flex w-full items-center justify-center gap-3 px-2">
					<div className="rounded-full border border-slate-800 bg-slate-900/95 px-4 py-1.5 text-[11px] text-slate-300 backdrop-blur">
						<span className="font-medium text-slate-100">{breakpoint.label}</span>
						<span className="mx-2 text-slate-600">·</span>
						<span>{width}px preview</span>
					</div>
				</div>
			) : null}

			<div
				className="w-full transition-[max-width] duration-300 ease-out"
				style={{
					maxWidth: width ? `${width}px` : undefined,
				}}
			>
				{responsivePreview ? (
					<div className="overflow-hidden rounded-[22px] border border-slate-700/80 shadow-2xl shadow-slate-950/60 ring-1 ring-slate-800">
						<div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
							<div className="flex items-center gap-1.5">
								<span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
								<span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
								<span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
							</div>
							<p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
								{breakpoint.label} · {width}px
							</p>
						</div>
						<div className="bg-slate-950">{children}</div>
					</div>
				) : (
					children
				)}
			</div>
		</div>
	);
}

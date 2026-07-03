'use client';

import type { ReactElement } from 'react';

import { Panel } from '@builder/components/ui/panel';
import { getEditorBreakpoint } from '@builder/lib/responsive-engine';
import { CanvasNode } from '@builder/modules/canvas/components/canvas-node';
import { ResponsivePreviewFrame } from '@builder/modules/responsive/components/responsive-preview-frame';
import { useBuilderStore } from '@builder/store/use-builder-store';

export function Canvas(): ReactElement {
	const graph = useBuilderStore((state) => state.graph);
	const editorDevice = useBuilderStore((state) => state.editorDevice);
	const canvasMode = useBuilderStore((state) => state.canvasMode);
	const dragSource = useBuilderStore((state) => state.dragSource);
	const device = getEditorBreakpoint(editorDevice);

	return (
		<Panel
			title="Canvas"
			subtitle="Drag widgets from the library or rearrange nodes on the canvas"
			className="h-full"
			actions={
				<div className="flex items-center gap-2 text-xs text-slate-400">
					<span className="rounded-md bg-slate-900 px-2 py-1 uppercase tracking-[0.2em]">
						{canvasMode}
					</span>
					<span className="rounded-md bg-slate-900 px-2 py-1 uppercase tracking-[0.2em]">
						{device.label}
					</span>
					<span className="hidden rounded-md bg-slate-900/70 px-2 py-1 text-[10px] text-slate-500 lg:inline">
						Ctrl+Shift+1/2/3 · preview P
					</span>
					{dragSource ? (
						<span className="rounded-md bg-accent/20 px-2 py-1 text-accent">Dragging</span>
					) : null}
				</div>
			}
		>
			<div className="h-full overflow-auto bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_45%)] p-6">
				<ResponsivePreviewFrame>
					<div className="mx-auto max-w-5xl rounded-[28px] border border-slate-800 bg-slate-950 p-5 shadow-2xl shadow-slate-950/50">
						<div className="rounded-[22px] border border-dashed border-slate-700 bg-slate-900/50 p-5">
							<div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
								<div>
									<p className="text-sm font-semibold text-slate-100">Layout Canvas</p>
									<p className="mt-1 text-xs text-slate-400">
										{canvasMode === 'edit'
											? 'Drop into columns and containers. Delete, Ctrl+D duplicate, Ctrl+C/V copy/paste.'
											: 'Preview mode — editing and drag handles are disabled.'}
									</p>
								</div>
								<div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-400">
									{Object.keys(graph.nodes).length} nodes
								</div>
							</div>
							<div className="space-y-3">
								<CanvasNode nodeId={graph.rootId} />
							</div>
						</div>
					</div>
				</ResponsivePreviewFrame>
			</div>
		</Panel>
	);
}

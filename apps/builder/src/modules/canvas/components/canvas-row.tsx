'use client';

import type { ReactElement } from 'react';

import { CanvasDraggable } from '@builder/components/dnd/draggable';
import { DropZone, InsideDropZone } from '@builder/components/dnd/drop-zone';
import {
	getColumnResizeSibling,
	nodeAcceptsChildren,
	resolveColumnSpan,
	resolveInsideDropTarget,
	resolveSiblingDropTarget,
} from '@builder/lib/layout-engine';
import { getNodeLabel } from '@builder/lib/mock-builder-data';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { ColumnLayoutNode, RowLayoutNode } from '@theme/builder/layout-engine/types';

import { CanvasNode } from './canvas-node';
import { ColumnResizeHandle } from './column-resize-handle';

interface CanvasRowProps {
	readonly node: RowLayoutNode;
	readonly depth: number;
}

function getGapClass(gap: RowLayoutNode['settings']['gap']): string {
	switch (gap) {
		case 'sm':
			return 'gap-2';
		case 'lg':
			return 'gap-6';
		default:
			return 'gap-4';
	}
}

export function CanvasRow({ node, depth }: CanvasRowProps): ReactElement {
	const graph = useBuilderStore((state) => state.graph);
	const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
	const hoveredNodeId = useBuilderStore((state) => state.hoveredNodeId);
	const dragSource = useBuilderStore((state) => state.dragSource);
	const canvasMode = useBuilderStore((state) => state.canvasMode);
	const activeBreakpoint = useBuilderStore((state) => state.activeBreakpoint);
	const selectNode = useBuilderStore((state) => state.selectNode);
	const setHoveredNode = useBuilderStore((state) => state.setHoveredNode);

	const isSelected = selectedNodeId === node.id;
	const isHovered = hoveredNodeId === node.id;
	const isEditMode = canvasMode === 'edit';
	const acceptsChildren = nodeAcceptsChildren(graph, node.id);
	const insideTarget = resolveInsideDropTarget(graph, node.id);
	const showInsideDrop = isEditMode && dragSource !== null && acceptsChildren && insideTarget !== null;

	const rowBody = (
		<button
			type="button"
			onClick={() => selectNode(node.id)}
			onMouseEnter={() => setHoveredNode(node.id)}
			onMouseLeave={() => {
				if (hoveredNodeId === node.id) {
					setHoveredNode(null);
				}
			}}
			className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
				isSelected
					? 'border-accent bg-accent/10'
					: isHovered
						? 'border-slate-500 bg-slate-900/90'
						: 'border-slate-700 bg-slate-900/80 hover:border-slate-600'
			}`}
		>
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-semibold text-slate-100">{getNodeLabel(node, graph)}</p>
					<p className="mt-1 text-xs text-slate-400">
						{node.children.length} column(s) · {node.settings.gap ?? 'md'} gap
					</p>
				</div>
				<span className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
					row
				</span>
			</div>
		</button>
	);

	const renderedRow = isEditMode ? (
		<CanvasDraggable nodeId={node.id}>{rowBody}</CanvasDraggable>
	) : (
		rowBody
	);

	const wrappedRow =
		showInsideDrop && insideTarget ? (
			<InsideDropZone target={insideTarget} active className="rounded-2xl">
				{renderedRow}
			</InsideDropZone>
		) : (
			renderedRow
		);

	return (
		<div className="space-y-2" style={{ marginLeft: depth > 0 ? 12 : 0 }}>
			{wrappedRow}

			<div className={`ml-5 grid grid-cols-12 ${getGapClass(node.settings.gap)}`}>
				{node.children.map((childId, index) => {
					const column = graph.nodes[childId] as ColumnLayoutNode | undefined;

					if (!column || column.type !== 'column') {
						return (
							<div key={childId} className="col-span-12">
								<CanvasNode nodeId={childId} depth={depth + 1} />
							</div>
						);
					}

					const span = resolveColumnSpan(column.settings.span, activeBreakpoint);
					const rightSiblingId = getColumnResizeSibling(graph, column.id, 'right');
					const beforeTarget = resolveSiblingDropTarget(graph, childId, 'before');

					return (
						<div
							key={childId}
							className="relative min-h-[4rem]"
							style={{ gridColumn: `span ${span} / span ${span}` }}
						>
							{isEditMode && beforeTarget ? <DropZone target={beforeTarget} /> : null}
							<CanvasNode nodeId={childId} depth={depth + 1} hideRowGrid />
							{isEditMode && rightSiblingId ? (
								<ColumnResizeHandle
									leftColumnId={column.id}
									rightColumnId={rightSiblingId}
								/>
							) : null}
							{isEditMode && index === node.children.length - 1 ? (
								<DropZone
									target={
										resolveSiblingDropTarget(graph, childId, 'after') ?? {
											parentId: node.id,
											index: node.children.length,
											position: 'after',
										}
									}
								/>
							) : null}
						</div>
					);
				})}
			</div>

			{isEditMode && node.children.length === 0 && insideTarget ? (
				<DropZone target={insideTarget} className="my-2 ml-5" />
			) : null}
		</div>
	);
}

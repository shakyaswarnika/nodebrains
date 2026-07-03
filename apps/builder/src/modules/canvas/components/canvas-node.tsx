'use client';

import type { ReactElement } from 'react';

import { CanvasDraggable } from '@builder/components/dnd/draggable';
import { DropZone, InsideDropZone } from '@builder/components/dnd/drop-zone';
import {
	nodeAcceptsChildren,
	resolveColumnSpan,
	resolveInsideDropTarget,
	resolveSiblingDropTarget,
} from '@builder/lib/layout-engine';
import { getNodeLabel } from '@builder/lib/mock-builder-data';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { LayoutNode, WidgetLayoutNode } from '@theme/builder/layout-engine/types';
import type { LayoutNodeId } from '@theme/builder/core/primitives';

import { CanvasRow } from './canvas-row';
import { WidgetPreview } from './widget-preview';

interface CanvasNodeProps {
	nodeId: LayoutNodeId;
	depth?: number;
	hideRowGrid?: boolean;
}

export function CanvasNode({
	nodeId,
	depth = 0,
	hideRowGrid = false,
}: CanvasNodeProps): ReactElement | null {
	const graph = useBuilderStore((state) => state.graph);
	const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
	const hoveredNodeId = useBuilderStore((state) => state.hoveredNodeId);
	const dragSource = useBuilderStore((state) => state.dragSource);
	const canvasMode = useBuilderStore((state) => state.canvasMode);
	const activeBreakpoint = useBuilderStore((state) => state.activeBreakpoint);
	const selectNode = useBuilderStore((state) => state.selectNode);
	const setHoveredNode = useBuilderStore((state) => state.setHoveredNode);

	const node = graph.nodes[nodeId];

	if (!node) {
		return null;
	}

	if (node.type === 'row' && !hideRowGrid) {
		return <CanvasRow node={node} depth={depth} />;
	}

	const isRoot = nodeId === graph.rootId;
	const isSelected = selectedNodeId === nodeId;
	const isHovered = hoveredNodeId === nodeId;
	const isEditMode = canvasMode === 'edit';
	const acceptsChildren = nodeAcceptsChildren(graph, nodeId);
	const insideTarget = resolveInsideDropTarget(graph, nodeId);
	const showInsideDrop = isEditMode && dragSource !== null && acceptsChildren && insideTarget !== null;

	const spanLabel =
		node.type === 'column'
			? ` · span ${resolveColumnSpanLabel(node, activeBreakpoint)}`
			: '';

	const childCountLabel =
		node.type === 'widget'
			? 'Content widget'
			: node.children.length > 0
				? `${node.children.length} child node(s)${spanLabel}`
				: `Drop widgets or layout blocks here${spanLabel}`;

	const widgetInstance =
		node.type === 'widget' ? graph.widgets[(node as WidgetLayoutNode).widgetInstanceId] : null;

	const nodeBody = (
		<div className="space-y-3">
			<button
				type="button"
				onClick={() => selectNode(nodeId)}
				onMouseEnter={() => setHoveredNode(nodeId)}
				onMouseLeave={() => {
					if (hoveredNodeId === nodeId) {
						setHoveredNode(null);
					}
				}}
				className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
					isSelected
						? 'border-accent bg-accent/10'
						: isHovered
							? 'border-slate-500 bg-slate-900/90'
							: 'border-slate-700 bg-slate-900/80 hover:border-slate-600'
				}`}
			>
				<div className="flex items-center justify-between gap-4">
					<div>
						<p className="text-sm font-semibold text-slate-100">
							{getNodeLabel(node as LayoutNode, graph)}
						</p>
						<p className="mt-1 text-xs text-slate-400">{childCountLabel}</p>
					</div>
					<span className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
						{node.type}
					</span>
				</div>
			</button>

			{widgetInstance ? (
				<WidgetPreview
					instanceId={widgetInstance.id}
					type={widgetInstance.type}
					props={widgetInstance.props}
					isEditor={isEditMode}
				/>
			) : null}
		</div>
	);

	const renderedNode = isRoot || !isEditMode ? (
		nodeBody
	) : (
		<CanvasDraggable nodeId={nodeId}>{nodeBody}</CanvasDraggable>
	);

	const wrappedNode =
		showInsideDrop && insideTarget ? (
			<InsideDropZone target={insideTarget} active className="rounded-2xl">
				{renderedNode}
			</InsideDropZone>
		) : (
			renderedNode
		);

	return (
		<div className="space-y-2" style={{ marginLeft: depth > 0 ? 12 : 0 }}>
			{wrappedNode}

			{node.children.length > 0 || acceptsChildren ? (
				<div className="ml-5 space-y-2 border-l border-slate-800 pl-4">
					{node.children.map((childId, index) => {
						const beforeTarget = resolveSiblingDropTarget(graph, childId, 'before');

						return (
							<div key={childId} className="space-y-2">
								{isEditMode && beforeTarget ? (
									<DropZone target={beforeTarget} />
								) : null}
								<CanvasNode nodeId={childId} depth={depth + 1} />
								{isEditMode && index === node.children.length - 1 ? (
									<DropZone
										target={
											resolveSiblingDropTarget(graph, childId, 'after') ?? {
												parentId: nodeId,
												index: node.children.length,
												position: 'after',
											}
										}
									/>
								) : null}
							</div>
						);
					})}

					{isEditMode && node.children.length === 0 && insideTarget ? (
						<DropZone
							target={insideTarget}
							className="my-2"
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
}

function resolveColumnSpanLabel(
	node: Extract<LayoutNode, { type: 'column' }>,
	breakpoint: ReturnType<typeof useBuilderStore.getState>['activeBreakpoint'],
): string {
	const span = resolveColumnSpan(node.settings.span, breakpoint);

	return `${span}/12 @ ${breakpoint}`;
}

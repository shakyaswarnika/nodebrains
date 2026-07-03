'use client';

import type { ReactElement } from 'react';

import { getNodeLabel } from '@builder/lib/mock-builder-data';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { LayoutNode } from '@theme/builder/layout-engine/types';
import type { LayoutNodeId } from '@theme/builder/core/primitives';

function TreeNode({
	nodeId,
	depth = 0,
}: {
	nodeId: LayoutNodeId;
	depth?: number;
}): ReactElement | null {
	const graph = useBuilderStore((state) => state.graph);
	const expanded = useBuilderStore((state) => state.navigatorExpanded[nodeId] ?? false);
	const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
	const hoveredNodeId = useBuilderStore((state) => state.hoveredNodeId);
	const toggleNavigatorNode = useBuilderStore((state) => state.toggleNavigatorNode);
	const selectNode = useBuilderStore((state) => state.selectNode);
	const setHoveredNode = useBuilderStore((state) => state.setHoveredNode);
	const node = graph.nodes[nodeId];

	if (!node) {
		return null;
	}

	return (
		<li className="space-y-1">
			<div
				className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
					selectedNodeId === nodeId
						? 'bg-accent/15 text-accent'
						: hoveredNodeId === nodeId
							? 'bg-slate-800 text-slate-100'
							: 'text-slate-300 hover:bg-slate-900'
				}`}
				style={{ paddingLeft: `${depth * 14 + 8}px` }}
				onMouseEnter={() => setHoveredNode(nodeId)}
				onMouseLeave={() => {
					if (hoveredNodeId === nodeId) {
						setHoveredNode(null);
					}
				}}
			>
				{node.children.length > 0 ? (
					<button
						type="button"
						onClick={() => toggleNavigatorNode(nodeId)}
						className="inline-flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-slate-800 hover:text-slate-200"
						aria-label={expanded ? 'Collapse node' : 'Expand node'}
					>
						{expanded ? '−' : '+'}
					</button>
				) : (
					<span className="inline-flex h-5 w-5 items-center justify-center text-slate-700">•</span>
				)}
				<button
					type="button"
					onClick={() => selectNode(nodeId)}
					className="flex flex-1 items-center justify-between gap-3 text-left"
				>
					<span>{getNodeLabel(node as LayoutNode, graph)}</span>
					<span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
						{node.type}
					</span>
				</button>
			</div>

			{expanded && node.children.length > 0 ? (
				<ul className="space-y-1">
					{node.children.map((childId) => (
						<TreeNode key={childId} nodeId={childId} depth={depth + 1} />
					))}
				</ul>
			) : null}
		</li>
	);
}

export function Navigator(): ReactElement {
	const rootId = useBuilderStore((state) => state.graph.rootId);

	return (
		<div className="px-3 py-3">
			<ul className="space-y-1">
				<TreeNode nodeId={rootId} />
			</ul>
		</div>
	);
}

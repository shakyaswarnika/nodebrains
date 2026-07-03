import type { LayoutNodeId, WidgetTypeId } from '@theme/builder/core/primitives';
import type { LayoutGraph, LayoutNodeType } from '@theme/builder/layout-engine/types';

import { canAcceptChild, canMoveNode } from './constraints';
import type { DragSource, DropTarget } from './types';

export function getPaletteRootNodeType(widgetType: WidgetTypeId): LayoutNodeType {
	const type = String(widgetType);

	switch (type) {
		case 'layout.section':
			return 'section';
		case 'layout.container':
			return 'container';
		case 'layout.columns':
			return 'row';
		default:
			return 'widget';
	}
}

export function resolveSiblingDropTarget(
	graph: LayoutGraph,
	nodeId: LayoutNodeId,
	position: 'before' | 'after',
): DropTarget | null {
	const node = graph.nodes[nodeId];

	if (!node?.parentId) {
		return null;
	}

	const parent = graph.nodes[node.parentId];

	if (!parent) {
		return null;
	}

	const index = parent.children.indexOf(nodeId);

	if (index === -1) {
		return null;
	}

	return {
		parentId: node.parentId,
		index: position === 'before' ? index : index + 1,
		position,
	};
}

export function resolveInsideDropTarget(
	graph: LayoutGraph,
	nodeId: LayoutNodeId,
): DropTarget | null {
	const node = graph.nodes[nodeId];

	if (!node) {
		return null;
	}

	return {
		parentId: nodeId,
		index: node.children.length,
		position: 'inside',
	};
}

export function canDropAt(
	graph: LayoutGraph,
	dragSource: DragSource | null,
	target: DropTarget,
): boolean {
	if (!dragSource) {
		return false;
	}

	const parent = graph.nodes[target.parentId];

	if (!parent) {
		return false;
	}

	if (dragSource.kind === 'palette') {
		const childType = getPaletteRootNodeType(dragSource.widgetType);
		return canAcceptChild(parent, childType);
	}

	return canMoveNode(graph, dragSource.nodeId, target.parentId);
}

export function isSameDropTarget(
	a: DropTarget | null,
	b: DropTarget,
): boolean {
	if (!a) {
		return false;
	}

	return a.parentId === b.parentId && a.index === b.index && a.position === b.position;
}

export function nodeAcceptsChildren(graph: LayoutGraph, nodeId: LayoutNodeId): boolean {
	const node = graph.nodes[nodeId];

	if (!node || node.locked) {
		return false;
	}

	return node.type === 'root' ||
		node.type === 'section' ||
		node.type === 'container' ||
		node.type === 'row' ||
		node.type === 'column';
}

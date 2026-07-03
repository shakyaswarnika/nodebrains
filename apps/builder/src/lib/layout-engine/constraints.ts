import type { LayoutNodeId } from '@theme/builder/core/primitives';
import type { LayoutGraph, LayoutNode, LayoutNodeType } from '@theme/builder/layout-engine/types';

const ACCEPTED_CHILDREN: Record<LayoutNodeType, readonly LayoutNodeType[]> = {
	root: ['section', 'container'],
	section: ['container', 'row'],
	container: ['row', 'section'],
	row: ['column'],
	column: ['widget', 'row', 'container'],
	widget: [],
	'template-ref': [],
};

export function getAcceptedChildTypes(parentType: LayoutNodeType): readonly LayoutNodeType[] {
	return ACCEPTED_CHILDREN[parentType] ?? [];
}

export function canAcceptChild(parent: LayoutNode, childType: LayoutNodeType): boolean {
	if (parent.locked) {
		return false;
	}

	return getAcceptedChildTypes(parent.type).includes(childType);
}

export function getDescendantIds(graph: LayoutGraph, nodeId: LayoutNodeId): LayoutNodeId[] {
	const ids: LayoutNodeId[] = [];
	const node = graph.nodes[nodeId];

	if (!node) {
		return ids;
	}

	for (const childId of node.children) {
		ids.push(childId);
		ids.push(...getDescendantIds(graph, childId));
	}

	return ids;
}

export function isDescendantOf(
	graph: LayoutGraph,
	ancestorId: LayoutNodeId,
	nodeId: LayoutNodeId,
): boolean {
	return getDescendantIds(graph, ancestorId).includes(nodeId);
}

export function canMoveNode(
	graph: LayoutGraph,
	nodeId: LayoutNodeId,
	targetParentId: LayoutNodeId,
): boolean {
	if (nodeId === graph.rootId) {
		return false;
	}

	if (nodeId === targetParentId) {
		return false;
	}

	if (isDescendantOf(graph, nodeId, targetParentId)) {
		return false;
	}

	const node = graph.nodes[nodeId];
	const parent = graph.nodes[targetParentId];

	if (!node || !parent) {
		return false;
	}

	return canAcceptChild(parent, node.type);
}

export function canInsertChildType(
	graph: LayoutGraph,
	parentId: LayoutNodeId,
	childType: LayoutNodeType,
): boolean {
	const parent = graph.nodes[parentId];

	if (!parent) {
		return false;
	}

	return canAcceptChild(parent, childType);
}

export function canDeleteNode(graph: LayoutGraph, nodeId: LayoutNodeId): boolean {
	return nodeId !== graph.rootId && Boolean(graph.nodes[nodeId]);
}

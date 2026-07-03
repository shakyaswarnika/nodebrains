import type { LayoutNodeId, WidgetInstanceId } from '@theme/builder/core/primitives';
import type {
	LayoutGraph,
	LayoutNode,
	WidgetInstance,
} from '@theme/builder/layout-engine/types';

import { canMoveNode, getDescendantIds } from './constraints';
import type { CreatedSubtree } from './factory';
import { createId, createSubtreeFromWidgetType, asLayoutNodeId } from './factory';
import type { ClipboardPayload, LayoutNodeSnapshot, WidgetWidgetSnapshot } from './types';

interface MutableLayoutGraph {
	rootId: LayoutNodeId;
	nodes: Record<LayoutNodeId, LayoutNode>;
	widgets: Record<WidgetInstanceId, WidgetInstance>;
}

function cloneGraph(graph: LayoutGraph): MutableLayoutGraph {
	return {
		rootId: graph.rootId,
		nodes: { ...graph.nodes },
		widgets: { ...graph.widgets },
	};
}

function finalizeGraph(graph: MutableLayoutGraph): LayoutGraph {
	return graph;
}

function updateParentChildren(
	graph: LayoutGraph,
	parentId: LayoutNodeId,
	updater: (children: readonly LayoutNodeId[]) => LayoutNodeId[],
): LayoutGraph {
	const parent = graph.nodes[parentId];

	if (!parent) {
		return graph;
	}

	const next = cloneGraph(graph);
	const nextParent = {
		...parent,
		children: updater(parent.children),
	};

	next.nodes[parentId] = nextParent as LayoutNode;

	return finalizeGraph(next);
}

function attachSubtree(
	graph: LayoutGraph,
	subtree: CreatedSubtree,
	parentId: LayoutNodeId,
	index: number,
): LayoutGraph {
	let next = cloneGraph(graph);

	for (const node of subtree.nodes) {
		const isRoot = node.id === subtree.rootId;
		next.nodes[node.id] = {
			...node,
			parentId: isRoot ? parentId : node.parentId,
			children: isRoot ? node.children : node.children,
		} as LayoutNode;
	}

	for (const widget of subtree.widgets) {
		next.widgets[widget.id] = widget;
	}

	const parent = next.nodes[parentId];

	if (!parent) {
		return graph;
	}

	const children = [...parent.children];
	children.splice(index, 0, subtree.rootId);

	next.nodes[parentId] = {
		...parent,
		children,
	} as LayoutNode;

	for (const node of subtree.nodes) {
		if (node.id !== subtree.rootId) {
			const stored = next.nodes[node.id];
			if (stored && stored.parentId === null && node.parentId) {
				next.nodes[node.id] = {
					...stored,
					parentId: node.parentId,
				} as LayoutNode;
			}
		}
	}

	return finalizeGraph(next);
}

export function insertWidgetType(
	graph: LayoutGraph,
	parentId: LayoutNodeId,
	index: number,
	widgetType: Parameters<typeof createSubtreeFromWidgetType>[0],
): { graph: LayoutGraph; newNodeId: LayoutNodeId } {
	const subtree = createSubtreeFromWidgetType(widgetType);
	const nextGraph = attachSubtree(graph, subtree, parentId, index);

	return { graph: nextGraph, newNodeId: subtree.rootId };
}

export function insertSubtree(
	graph: LayoutGraph,
	parentId: LayoutNodeId,
	index: number,
	subtree: CreatedSubtree,
): LayoutGraph {
	return attachSubtree(graph, subtree, parentId, index);
}

export function removeNode(graph: LayoutGraph, nodeId: LayoutNodeId): LayoutGraph {
	if (nodeId === graph.rootId) {
		return graph;
	}

	const node = graph.nodes[nodeId];

	if (!node || !node.parentId) {
		return graph;
	}

	const descendantIds = getDescendantIds(graph, nodeId);
	const idsToRemove = new Set<LayoutNodeId>([nodeId, ...descendantIds]);

	let next = cloneGraph(
		updateParentChildren(graph, node.parentId, (children) =>
			children.filter((id) => id !== nodeId),
		),
	);

	for (const id of idsToRemove) {
		const removed = next.nodes[id];

		if (removed?.type === 'widget') {
			delete next.widgets[removed.widgetInstanceId];
		}

		delete next.nodes[id];
	}

	return finalizeGraph(next);
}

export function moveNode(
	graph: LayoutGraph,
	nodeId: LayoutNodeId,
	targetParentId: LayoutNodeId,
	index: number,
): LayoutGraph {
	if (!canMoveNode(graph, nodeId, targetParentId)) {
		return graph;
	}

	const node = graph.nodes[nodeId];

	if (!node?.parentId) {
		return graph;
	}

	let next = cloneGraph(
		updateParentChildren(graph, node.parentId, (children) =>
			children.filter((id) => id !== nodeId),
		),
	);

	const targetParent = next.nodes[targetParentId];

	if (!targetParent) {
		return graph;
	}

	let insertIndex = index;

	if (node.parentId === targetParentId) {
		const oldIndex = targetParent.children.indexOf(nodeId);

		if (oldIndex !== -1 && oldIndex < index) {
			insertIndex = Math.max(0, index - 1);
		}
	}

	const children = [...targetParent.children];
	children.splice(insertIndex, 0, nodeId);

	next.nodes[targetParentId] = {
		...targetParent,
		children,
	} as LayoutNode;

	next.nodes[nodeId] = {
		...node,
		parentId: targetParentId,
	} as LayoutNode;

	return finalizeGraph(next);
}

export function duplicateNode(graph: LayoutGraph, nodeId: LayoutNodeId): {
	graph: LayoutGraph;
	newNodeId: LayoutNodeId | null;
} {
	const node = graph.nodes[nodeId];

	if (!node?.parentId) {
		return { graph, newNodeId: null };
	}

	const subtree = extractSubtree(graph, nodeId);
	const cloned = cloneSubtreeWithNewIds(subtree);
	const parent = graph.nodes[node.parentId];
	const index = parent.children.indexOf(nodeId);
	const nextGraph = insertSubtree(graph, node.parentId, index + 1, cloned);

	return { graph: nextGraph, newNodeId: cloned.rootId };
}

export function extractSubtree(graph: LayoutGraph, rootId: LayoutNodeId): ClipboardPayload {
	const nodes: Record<string, LayoutNodeSnapshot> = {};
	const widgets: Record<string, WidgetWidgetSnapshot> = {};

	function walk(id: LayoutNodeId): void {
		const node = graph.nodes[id];

		if (!node) {
			return;
		}

		const base = {
			id: String(node.id),
			type: node.type,
			parentId: node.parentId ? String(node.parentId) : null,
			children: node.children.map(String),
			locked: node.locked,
			hidden: node.hidden,
			className: node.className,
			anchorId: node.anchorId,
		};

		let snapshot: LayoutNodeSnapshot;

		if (node.type === 'section') {
			snapshot = { ...base, settings: { ...node.settings } };
		} else if (node.type === 'container') {
			snapshot = { ...base, settings: { ...node.settings } };
		} else if (node.type === 'row') {
			snapshot = { ...base, settings: { ...node.settings } };
		} else if (node.type === 'column') {
			snapshot = { ...base, settings: { ...node.settings } };
		} else if (node.type === 'widget') {
			snapshot = {
				...base,
				widgetInstanceId: String(node.widgetInstanceId),
			};
			const widget = graph.widgets[node.widgetInstanceId];

			if (widget) {
				widgets[String(widget.id)] = {
					id: String(widget.id),
					type: String(widget.type),
					componentSlug: widget.componentSlug ? String(widget.componentSlug) : undefined,
					props: { ...widget.props },
				};
			}
		} else if (node.type === 'template-ref') {
			snapshot = { ...base, templateId: node.templateId };
		} else {
			snapshot = base;
		}

		nodes[String(id)] = snapshot;

		for (const childId of node.children) {
			walk(childId);
		}
	}

	walk(rootId);

	return {
		rootNodeId: rootId,
		nodes,
		widgets,
	};
}

function cloneSubtreeWithNewIds(payload: ClipboardPayload): CreatedSubtree {
	const idMap = new Map<string, string>();

	for (const oldId of Object.keys(payload.nodes)) {
		const node = payload.nodes[oldId];
		const prefix = node.type === 'widget' ? 'node-widget' : node.type;
		idMap.set(oldId, createId(prefix));
	}

	const widgetIdMap = new Map<string, string>();

	for (const oldId of Object.keys(payload.widgets)) {
		widgetIdMap.set(oldId, createId('widget'));
	}

	const nodes: LayoutNode[] = [];
	const widgets: WidgetInstance[] = [];

	for (const [oldId, snapshot] of Object.entries(payload.nodes)) {
		const newId = asLayoutNodeId(idMap.get(oldId)!);
		const newParentId = snapshot.parentId ? asLayoutNodeId(idMap.get(snapshot.parentId)!) : null;
		const newChildren = snapshot.children.map((childId) => asLayoutNodeId(idMap.get(childId)!));

		if (snapshot.type === 'widget' && snapshot.widgetInstanceId) {
			const oldWidgetId = snapshot.widgetInstanceId;
			const newWidgetId = asWidgetInstanceId(widgetIdMap.get(oldWidgetId)!);
			const widgetSnapshot = payload.widgets[oldWidgetId];

			nodes.push({
				id: newId,
				type: 'widget',
				parentId: newParentId,
				children: newChildren,
				widgetInstanceId: newWidgetId,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});

			if (widgetSnapshot) {
				widgets.push({
					id: newWidgetId,
					type: widgetSnapshot.type as WidgetInstance['type'],
					componentSlug: widgetSnapshot.componentSlug as WidgetInstance['componentSlug'],
					props: { ...widgetSnapshot.props } as WidgetInstance['props'],
				});
			}
		} else if (snapshot.type === 'section') {
			nodes.push({
				id: newId,
				type: 'section',
				parentId: newParentId,
				children: newChildren,
				settings: (snapshot.settings ?? {}) as never,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});
		} else if (snapshot.type === 'container') {
			nodes.push({
				id: newId,
				type: 'container',
				parentId: newParentId,
				children: newChildren,
				settings: (snapshot.settings ?? {}) as never,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});
		} else if (snapshot.type === 'row') {
			nodes.push({
				id: newId,
				type: 'row',
				parentId: newParentId,
				children: newChildren,
				settings: (snapshot.settings ?? {}) as never,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});
		} else if (snapshot.type === 'column') {
			nodes.push({
				id: newId,
				type: 'column',
				parentId: newParentId,
				children: newChildren,
				settings: (snapshot.settings ?? {}) as never,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});
		} else if (snapshot.type === 'template-ref' && snapshot.templateId) {
			nodes.push({
				id: newId,
				type: 'template-ref',
				parentId: newParentId,
				children: newChildren,
				templateId: snapshot.templateId,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});
		} else if (snapshot.type === 'root') {
			nodes.push({
				id: newId,
				type: 'root',
				parentId: newParentId,
				children: newChildren,
				locked: snapshot.locked,
				hidden: snapshot.hidden,
				className: snapshot.className,
				anchorId: snapshot.anchorId,
			});
		}
	}

	const newRootId = asLayoutNodeId(idMap.get(String(payload.rootNodeId))!);

	return {
		nodes,
		widgets,
		rootId: newRootId,
	};
}

function asWidgetInstanceId(value: string): import('@theme/builder/core/primitives').WidgetInstanceId {
	return value as import('@theme/builder/core/primitives').WidgetInstanceId;
}

export function pasteSubtree(
	graph: LayoutGraph,
	parentId: LayoutNodeId,
	index: number,
	payload: ClipboardPayload,
): { graph: LayoutGraph; newNodeId: LayoutNodeId } {
	const cloned = cloneSubtreeWithNewIds(payload);
	const nextGraph = insertSubtree(graph, parentId, index, cloned);

	return { graph: nextGraph, newNodeId: cloned.rootId };
}

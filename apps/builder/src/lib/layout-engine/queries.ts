import type { LayoutNodeId, WidgetInstanceId } from '@theme/builder/core/primitives';
import type {
	ColumnSettings,
	ContainerSettings,
	LayoutGraph,
	LayoutNode,
	RowSettings,
	SectionSettings,
	WidgetInstance,
} from '@theme/builder/layout-engine/types';
import type { PropertyRecord } from '@theme/builder/property-system/types';

import { getDescendantIds } from './constraints';

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

type NodeSettingsPatch =
	| { readonly settings: Partial<SectionSettings> }
	| { readonly settings: Partial<ContainerSettings> }
	| { readonly settings: Partial<RowSettings> }
	| { readonly settings: Partial<ColumnSettings> };

export function updateNodeSettings(
	graph: LayoutGraph,
	nodeId: LayoutNodeId,
	patch: NodeSettingsPatch & {
		readonly locked?: boolean;
		readonly hidden?: boolean;
		readonly className?: string;
		readonly anchorId?: string;
	},
): LayoutGraph {
	const node = graph.nodes[nodeId];

	if (!node || node.type === 'widget' || node.type === 'template-ref' || node.type === 'root') {
		return graph;
	}

	const next = cloneGraph(graph);
	const currentSettings = 'settings' in node ? node.settings : {};

	next.nodes[nodeId] = {
		...node,
		...(patch.locked !== undefined ? { locked: patch.locked } : {}),
		...(patch.hidden !== undefined ? { hidden: patch.hidden } : {}),
		...(patch.className !== undefined ? { className: patch.className } : {}),
		...(patch.anchorId !== undefined ? { anchorId: patch.anchorId } : {}),
		settings: {
			...currentSettings,
			...patch.settings,
		},
	} as LayoutNode;

	return finalizeGraph(next);
}

export function lockNode(graph: LayoutGraph, nodeId: LayoutNodeId, locked: boolean): LayoutGraph {
	const node = graph.nodes[nodeId];

	if (!node) {
		return graph;
	}

	const next = cloneGraph(graph);
	next.nodes[nodeId] = {
		...node,
		locked,
	} as LayoutNode;

	return finalizeGraph(next);
}

export function updateWidgetProps(
	graph: LayoutGraph,
	instanceId: WidgetInstanceId,
	patch: PropertyRecord,
): LayoutGraph {
	const widget = graph.widgets[instanceId];

	if (!widget) {
		return graph;
	}

	const next = cloneGraph(graph);
	next.widgets[instanceId] = {
		...widget,
		props: {
			...widget.props,
			...patch,
		},
	};

	return finalizeGraph(next);
}

export function getAncestors(graph: LayoutGraph, nodeId: LayoutNodeId): LayoutNode[] {
	const ancestors: LayoutNode[] = [];
	let current = graph.nodes[nodeId];

	while (current?.parentId) {
		const parent = graph.nodes[current.parentId];

		if (!parent) {
			break;
		}

		ancestors.unshift(parent);
		current = parent;
	}

	return ancestors;
}

export function getDescendants(graph: LayoutGraph, nodeId: LayoutNodeId): LayoutNode[] {
	const ids = getDescendantIds(graph, nodeId);

	return ids
		.map((id) => graph.nodes[id])
		.filter((node): node is LayoutNode => Boolean(node));
}

export function findParentRow(
	graph: LayoutGraph,
	nodeId: LayoutNodeId,
): Extract<LayoutNode, { type: 'row' }> | null {
	for (const ancestor of getAncestors(graph, nodeId)) {
		if (ancestor.type === 'row') {
			return ancestor;
		}
	}

	return null;
}

export function isNestedLayoutNode(graph: LayoutGraph, nodeId: LayoutNodeId): boolean {
	const ancestors = getAncestors(graph, nodeId);

	return ancestors.some((ancestor) => ancestor.type === 'column' || ancestor.type === 'row');
}

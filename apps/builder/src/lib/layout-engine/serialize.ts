import type { PageDocument } from '@theme/builder/core/document';
import type { BuilderDocumentPayload } from '@theme/builder/core/payload';
import type { LayoutNodeId, WidgetInstanceId } from '@theme/builder/core/primitives';
import type {
	LayoutGraph,
	LayoutNode,
	WidgetInstance,
} from '@theme/builder/layout-engine/types';

import { asLayoutNodeId, asWidgetInstanceId } from './factory';
import type { ClipboardPayload, LayoutNodeSnapshot, WidgetWidgetSnapshot } from './types';

export type { BuilderDocumentPayload } from '@theme/builder/core/payload';

export interface SerializedLayoutGraph {
	readonly rootId: string;
	readonly nodes: Record<string, LayoutNodeSnapshot>;
	readonly widgets: Record<string, WidgetWidgetSnapshot>;
}

function serializeNode(node: LayoutNode, _graph: LayoutGraph): LayoutNodeSnapshot {
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

	if (node.type === 'section') {
		return { ...base, settings: structuredClone(node.settings) as Record<string, unknown> };
	}

	if (node.type === 'container') {
		return { ...base, settings: structuredClone(node.settings) as Record<string, unknown> };
	}

	if (node.type === 'row') {
		return { ...base, settings: structuredClone(node.settings) as Record<string, unknown> };
	}

	if (node.type === 'column') {
		return { ...base, settings: structuredClone(node.settings) as Record<string, unknown> };
	}

	if (node.type === 'widget') {
		return {
			...base,
			widgetInstanceId: String(node.widgetInstanceId),
		};
	}

	if (node.type === 'template-ref') {
		return {
			...base,
			templateId: node.templateId,
		};
	}

	return base;
}

function serializeWidget(widget: WidgetInstance): WidgetWidgetSnapshot {
	return {
		id: String(widget.id),
		type: String(widget.type),
		componentSlug: widget.componentSlug ? String(widget.componentSlug) : undefined,
		props: structuredClone(widget.props) as Record<string, unknown>,
	};
}

export function serializeLayoutGraph(graph: LayoutGraph): SerializedLayoutGraph {
	const nodes: Record<string, LayoutNodeSnapshot> = {};
	const widgets: Record<string, WidgetWidgetSnapshot> = {};

	for (const node of Object.values(graph.nodes)) {
		nodes[String(node.id)] = serializeNode(node, graph);
	}

	for (const widget of Object.values(graph.widgets)) {
		widgets[String(widget.id)] = serializeWidget(widget);
	}

	return {
		rootId: String(graph.rootId),
		nodes,
		widgets,
	};
}

export function serializeBuilderDocument(
	document: PageDocument,
	graph: LayoutGraph,
): BuilderDocumentPayload {
	return {
		version: document.version,
		meta: document.meta,
		root: {
			id: graph.rootId,
			type: 'root',
			children: graph.nodes[graph.rootId]?.children ?? document.root.children,
		},
		settings: document.settings,
		graph: serializeLayoutGraph(graph),
	};
}

export function serializeBuilderDocumentJson(
	document: PageDocument,
	graph: LayoutGraph,
	space = 2,
): string {
	return JSON.stringify(serializeBuilderDocument(document, graph), null, space);
}

function deserializeNode(snapshot: LayoutNodeSnapshot): LayoutNode {
	const base = {
		id: asLayoutNodeId(snapshot.id),
		parentId: snapshot.parentId ? asLayoutNodeId(snapshot.parentId) : null,
		children: snapshot.children.map((childId) => asLayoutNodeId(childId)),
		locked: snapshot.locked,
		hidden: snapshot.hidden,
		className: snapshot.className,
		anchorId: snapshot.anchorId,
	};

	if (snapshot.type === 'section') {
		return {
			...base,
			type: 'section',
			settings: (snapshot.settings ?? {}) as never,
		};
	}

	if (snapshot.type === 'container') {
		return {
			...base,
			type: 'container',
			settings: (snapshot.settings ?? {}) as never,
		};
	}

	if (snapshot.type === 'row') {
		return {
			...base,
			type: 'row',
			settings: (snapshot.settings ?? {}) as never,
		};
	}

	if (snapshot.type === 'column') {
		return {
			...base,
			type: 'column',
			settings: (snapshot.settings ?? {}) as never,
		};
	}

	if (snapshot.type === 'widget' && snapshot.widgetInstanceId) {
		return {
			...base,
			type: 'widget',
			widgetInstanceId: asWidgetInstanceId(snapshot.widgetInstanceId),
		};
	}

	if (snapshot.type === 'template-ref' && snapshot.templateId) {
		return {
			...base,
			type: 'template-ref',
			templateId: snapshot.templateId,
		};
	}

	return {
		...base,
		type: 'root',
	};
}

function deserializeWidget(snapshot: WidgetWidgetSnapshot): WidgetInstance {
	return {
		id: asWidgetInstanceId(snapshot.id),
		type: snapshot.type as WidgetInstance['type'],
		componentSlug: snapshot.componentSlug as WidgetInstance['componentSlug'],
		props: snapshot.props as WidgetInstance['props'],
	};
}

export function deserializeLayoutGraph(payload: SerializedLayoutGraph): LayoutGraph {
	const nodes = {} as Record<LayoutNodeId, LayoutNode>;
	const widgets = {} as Record<WidgetInstanceId, WidgetInstance>;

	for (const snapshot of Object.values(payload.nodes)) {
		const node = deserializeNode(snapshot);
		nodes[node.id] = node;
	}

	for (const snapshot of Object.values(payload.widgets)) {
		const widget = deserializeWidget(snapshot);
		widgets[widget.id] = widget;
	}

	return {
		rootId: asLayoutNodeId(payload.rootId),
		nodes,
		widgets,
	};
}

export function deserializeBuilderDocument(payload: BuilderDocumentPayload): {
	document: PageDocument;
	graph: LayoutGraph;
} {
	const graph = deserializeLayoutGraph(payload.graph as SerializedLayoutGraph);

	return {
		document: {
			version: payload.version,
			meta: payload.meta,
			root: payload.root,
			settings: payload.settings,
		},
		graph,
	};
}

export function layoutGraphToClipboard(graph: LayoutGraph): ClipboardPayload {
	return serializeLayoutGraph(graph) as unknown as ClipboardPayload;
}

export function builderPayloadFromUnknown(payload: unknown): BuilderDocumentPayload | null {
	if (!payload || typeof payload !== 'object') {
		return null;
	}

	const candidate = payload as Partial<BuilderDocumentPayload>;

	if (
		typeof candidate.version !== 'string' ||
		!candidate.meta ||
		!candidate.root ||
		!candidate.graph
	) {
		return null;
	}

	return candidate as BuilderDocumentPayload;
}

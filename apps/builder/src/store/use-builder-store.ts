'use client';

import { create } from 'zustand';

import {
	canDeleteNode,
	canInsertChildType,
	createLayoutEngine,
	duplicateNode,
	extractSubtree,
	insertWidgetType,
	moveNode,
	normalizeRowSpansAtBreakpoint,
	pasteSubtree,
	removeNode,
	resizeColumnPair,
	serializeBuilderDocumentJson,
	updateNodeSettings,
	updateWidgetProps as updateWidgetPropsInGraph,
} from '@builder/lib/layout-engine';
import type { ClipboardPayload, DragSource, DropTarget } from '@builder/lib/layout-engine';
import type { LayoutEngineImpl } from '@builder/lib/layout-engine/engine';
import { mockComponentRegistry, mockDocument, mockLayoutGraph, mockPaletteGroups, mockWidgetRegistry, widgetSdk } from '@builder/lib/mock-builder-data';
import type { PageDocument } from '@theme/builder/core/document';
import type { BreakpointSlug, LayoutNodeId, WidgetInstanceId } from '@theme/builder/core/primitives';
import type { ComponentRegistryEntry } from '@theme/builder/component-registry/types';
import type { LayoutGraph } from '@theme/builder/layout-engine/types';
import type { PropertyRecord } from '@theme/builder/property-system/types';
import type { WidgetDefinition, WidgetPaletteGroup } from '@theme/builder/widget-registry/types';
import type { WidgetSDKImpl } from '@builder/lib/widget-sdk';
import {
	getEditorBreakpointBySlug,
	getTechnicalBreakpoint,
	type EditorDeviceSlug,
} from '@builder/lib/responsive-engine';

export type SidebarTab = 'navigator' | 'library' | 'components';
export type InspectorTab = 'properties' | 'structure' | 'meta';
export type CanvasMode = 'edit' | 'preview';

function getSelectionAfterDelete(
	graph: LayoutGraph,
	deletedId: LayoutNodeId,
	parentId: LayoutNodeId,
): LayoutNodeId {
	const parent = graph.nodes[parentId];

	if (!parent) {
		return graph.rootId;
	}

	const deletedIndex = parent.children.indexOf(deletedId);
	const siblings = parent.children.filter((id) => id !== deletedId);

	if (siblings.length === 0) {
		return parentId;
	}

	const nextIndex = Math.min(Math.max(deletedIndex, 0), siblings.length - 1);

	return siblings[nextIndex] ?? parentId;
}

function resolvePasteTarget(
	graph: LayoutGraph,
	selectedNodeId: LayoutNodeId | null,
	clipboard: ClipboardPayload,
): { parentId: LayoutNodeId; index: number } | null {
	if (!selectedNodeId) {
		return null;
	}

	const selected = graph.nodes[selectedNodeId];
	const rootSnapshot = clipboard.nodes[String(clipboard.rootNodeId)];

	if (!selected || !rootSnapshot) {
		return null;
	}

	const childType = rootSnapshot.type;

	if (canInsertChildType(graph, selectedNodeId, childType)) {
		return {
			parentId: selectedNodeId,
			index: selected.children.length,
		};
	}

	if (!selected.parentId) {
		return null;
	}

	const parent = graph.nodes[selected.parentId];

	if (!parent || !canInsertChildType(graph, selected.parentId, childType)) {
		return null;
	}

	const index = parent.children.indexOf(selectedNodeId);

	if (index === -1) {
		return null;
	}

	return {
		parentId: selected.parentId,
		index: index + 1,
	};
}

interface BuilderState {
	document: PageDocument;
	graph: LayoutGraph;
	layoutEngine: LayoutEngineImpl;
	widgetSdk: WidgetSDKImpl;
	components: readonly ComponentRegistryEntry[];
	widgets: readonly WidgetDefinition[];
	paletteGroups: readonly WidgetPaletteGroup[];
	activeBreakpoint: BreakpointSlug;
	editorDevice: EditorDeviceSlug;
	responsivePreview: boolean;
	sidebarTab: SidebarTab;
	inspectorTab: InspectorTab;
	canvasMode: CanvasMode;
	selectedNodeId: LayoutNodeId | null;
	hoveredNodeId: LayoutNodeId | null;
	dragSource: DragSource | null;
	dropTarget: DropTarget | null;
	clipboard: ClipboardPayload | null;
	navigatorExpanded: Record<string, boolean>;
	sidebarCollapsed: boolean;
	inspectorCollapsed: boolean;
	setActiveBreakpoint: (breakpoint: BreakpointSlug) => void;
	setEditorDevice: (device: EditorDeviceSlug) => void;
	toggleResponsivePreview: () => void;
	setSidebarTab: (tab: SidebarTab) => void;
	setInspectorTab: (tab: InspectorTab) => void;
	setCanvasMode: (mode: CanvasMode) => void;
	selectNode: (nodeId: LayoutNodeId | null) => void;
	setHoveredNode: (nodeId: LayoutNodeId | null) => void;
	setDragSource: (source: DragSource | null) => void;
	setDropTarget: (target: DropTarget | null) => void;
	clearDragState: () => void;
	handleDrop: (target: DropTarget) => void;
	deleteSelectedNode: () => void;
	duplicateSelectedNode: () => void;
	copySelectedNode: () => void;
	pasteClipboard: () => void;
	toggleNavigatorNode: (nodeId: LayoutNodeId) => void;
	toggleSidebarCollapsed: () => void;
	toggleInspectorCollapsed: () => void;
	hydrateLayout: (payload: { graph?: LayoutGraph; document?: PageDocument }) => void;
	resizeColumn: (leftColumnId: LayoutNodeId, rightColumnId: LayoutNodeId, delta: number) => void;
	normalizeSelectedRow: () => void;
	exportLayoutJson: () => string;
	patchNodeSettings: (nodeId: LayoutNodeId, settings: Record<string, unknown>) => void;
	updateWidgetProps: (instanceId: WidgetInstanceId, props: PropertyRecord) => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => {
	const layoutEngine = createLayoutEngine(mockLayoutGraph, (graph) => {
		set({ graph });
	});

	layoutEngine.setResizeContext({ breakpoint: 'lg' });

	const syncGraph = (graph: LayoutGraph, extra: Partial<BuilderState> = {}) => {
		layoutEngine.hydrate(graph);
		set({ graph, ...extra });
	};

	return {
	document: mockDocument,
	graph: mockLayoutGraph,
	layoutEngine,
	widgetSdk,
	components: mockComponentRegistry,
	widgets: mockWidgetRegistry,
	paletteGroups: mockPaletteGroups,
	activeBreakpoint: 'lg',
	editorDevice: 'desktop',
	responsivePreview: true,
	sidebarTab: 'navigator',
	inspectorTab: 'properties',
	canvasMode: 'edit',
	selectedNodeId: mockLayoutGraph.rootId,
	hoveredNodeId: null,
	dragSource: null,
	dropTarget: null,
	clipboard: null,
	navigatorExpanded: {
		root: true,
		'section-hero': true,
		'container-hero': true,
		'row-hero': true,
		'column-hero-copy': true,
		'section-content': true,
		'container-content': true,
		'row-grid': true,
	},
	sidebarCollapsed: false,
	inspectorCollapsed: false,
	setActiveBreakpoint: (activeBreakpoint) => {
		get().layoutEngine.setResizeContext({ breakpoint: activeBreakpoint });
		set({
			activeBreakpoint,
			editorDevice: getEditorBreakpointBySlug(activeBreakpoint).id,
		});
	},
	setEditorDevice: (editorDevice) => {
		const activeBreakpoint = getTechnicalBreakpoint(editorDevice);
		get().layoutEngine.setResizeContext({ breakpoint: activeBreakpoint });
		set({ editorDevice, activeBreakpoint });
	},
	toggleResponsivePreview: () =>
		set((state) => ({
			responsivePreview: !state.responsivePreview,
		})),
	setSidebarTab: (sidebarTab) => set({ sidebarTab }),
	setInspectorTab: (inspectorTab) => set({ inspectorTab }),
	setCanvasMode: (canvasMode) => set({ canvasMode }),
	selectNode: (selectedNodeId) => set({ selectedNodeId }),
	setHoveredNode: (hoveredNodeId) => set({ hoveredNodeId }),
	setDragSource: (dragSource) => set({ dragSource }),
	setDropTarget: (dropTarget) => set({ dropTarget }),
	clearDragState: () => set({ dragSource: null, dropTarget: null }),
	handleDrop: (target) => {
		const { dragSource, graph } = get();

		if (!dragSource) {
			return;
		}

		if (dragSource.kind === 'palette') {
			const { graph: nextGraph, newNodeId } = insertWidgetType(
				graph,
				target.parentId,
				target.index,
				dragSource.widgetType,
			);

			syncGraph(nextGraph, {
				selectedNodeId: newNodeId,
				dragSource: null,
				dropTarget: null,
			});

			return;
		}

		const nextGraph = moveNode(graph, dragSource.nodeId, target.parentId, target.index);

		syncGraph(nextGraph, {
			selectedNodeId: dragSource.nodeId,
			dragSource: null,
			dropTarget: null,
		});
	},
	deleteSelectedNode: () => {
		const { selectedNodeId, graph } = get();

		if (!selectedNodeId || !canDeleteNode(graph, selectedNodeId)) {
			return;
		}

		const node = graph.nodes[selectedNodeId];
		const parentId = node?.parentId;

		if (!parentId) {
			return;
		}

		const nextSelection = getSelectionAfterDelete(graph, selectedNodeId, parentId);
		const nextGraph = removeNode(graph, selectedNodeId);

		syncGraph(nextGraph, { selectedNodeId: nextSelection });
	},
	duplicateSelectedNode: () => {
		const { selectedNodeId, graph } = get();

		if (!selectedNodeId) {
			return;
		}

		const { graph: nextGraph, newNodeId } = duplicateNode(graph, selectedNodeId);

		if (!newNodeId) {
			return;
		}

		syncGraph(nextGraph, { selectedNodeId: newNodeId });
	},
	copySelectedNode: () => {
		const { selectedNodeId, graph } = get();

		if (!selectedNodeId || selectedNodeId === graph.rootId) {
			return;
		}

		set({
			clipboard: extractSubtree(graph, selectedNodeId),
		});
	},
	pasteClipboard: () => {
		const { clipboard, selectedNodeId, graph } = get();

		if (!clipboard) {
			return;
		}

		const target = resolvePasteTarget(graph, selectedNodeId, clipboard);

		if (!target) {
			return;
		}

		const { graph: nextGraph, newNodeId } = pasteSubtree(
			graph,
			target.parentId,
			target.index,
			clipboard,
		);

		syncGraph(nextGraph, { selectedNodeId: newNodeId });
	},
	toggleNavigatorNode: (nodeId) =>
		set((state) => ({
			navigatorExpanded: {
				...state.navigatorExpanded,
				[nodeId]: !state.navigatorExpanded[nodeId],
			},
		})),
	toggleSidebarCollapsed: () =>
		set((state) => ({
			sidebarCollapsed: !state.sidebarCollapsed,
		})),
	toggleInspectorCollapsed: () =>
		set((state) => ({
			inspectorCollapsed: !state.inspectorCollapsed,
		})),
	hydrateLayout: (payload) => {
		const graph = payload.graph ?? get().graph;
		const document = payload.document ?? get().document;

		get().layoutEngine.hydrate(graph);
		get().layoutEngine.setResizeContext({ breakpoint: get().activeBreakpoint });

		set({
			graph,
			document,
			selectedNodeId: payload.graph?.rootId ?? get().selectedNodeId,
		});
	},
	resizeColumn: (leftColumnId, rightColumnId, delta) => {
		const { graph, activeBreakpoint } = get();
		syncGraph(resizeColumnPair(graph, leftColumnId, rightColumnId, delta, activeBreakpoint));
	},
	normalizeSelectedRow: () => {
		const { selectedNodeId, graph, activeBreakpoint } = get();

		if (!selectedNodeId) {
			return;
		}

		const selected = graph.nodes[selectedNodeId];
		const rowId =
			selected?.type === 'row'
				? selected.id
				: selected?.type === 'column' && selected.parentId
					? graph.nodes[selected.parentId]?.type === 'row'
						? selected.parentId
						: null
					: null;

		if (!rowId) {
			return;
		}

		syncGraph(normalizeRowSpansAtBreakpoint(graph, rowId, activeBreakpoint));
	},
	exportLayoutJson: () => serializeBuilderDocumentJson(get().document, get().graph),
	patchNodeSettings: (nodeId, settings) => {
		syncGraph(updateNodeSettings(get().graph, nodeId, { settings }));
	},
	updateWidgetProps: (instanceId, props) => {
		const { graph, activeBreakpoint } = get();
		const widget = graph.widgets[instanceId];

		if (!widget) {
			return;
		}

		const module = widgetSdk.getModule(widget.type);
		const validated = module?.validate(props, activeBreakpoint);
		const nextProps = (validated?.value ?? props) as PropertyRecord;
		const nextGraph = updateWidgetPropsInGraph(graph, instanceId, nextProps);

		syncGraph(nextGraph);
	},
};
});

export function useIsDragging(): boolean {
	return useBuilderStore((state) => state.dragSource !== null);
}

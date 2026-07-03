import type { LayoutNodeId, WidgetInstanceId } from '@theme/builder/core/primitives';
import type {
	LayoutCommand,
	LayoutCommandResult,
	LayoutEngine,
	LayoutGraph,
	LayoutNode,
	WidgetInstance,
} from '@theme/builder/layout-engine/types';
import type { PropertyRecord } from '@theme/builder/property-system/types';

import { canMoveNode } from './constraints';
import {
	duplicateNode,
	insertWidgetType,
	moveNode,
	removeNode,
} from './operations';
import { getAncestors, getDescendants, lockNode, updateNodeSettings, updateWidgetProps } from './queries';
import { resizeColumnPair } from './resize-column';
import { serializeLayoutGraph } from './serialize';
import type { ResizeColumnCommandContext } from './types';

export interface LayoutEngineOptions {
	readonly graph: LayoutGraph;
	readonly onGraphChange?: (graph: LayoutGraph) => void;
}

export class LayoutEngineImpl implements LayoutEngine {
	private _graph: LayoutGraph;
	private readonly onGraphChange?: (graph: LayoutGraph) => void;
	private _resizeContext: ResizeColumnCommandContext | null = null;

	constructor(options: LayoutEngineOptions) {
		this._graph = options.graph;
		this.onGraphChange = options.onGraphChange;
	}

	get graph(): LayoutGraph {
		return this._graph;
	}

	setResizeContext(context: ResizeColumnCommandContext | null): void {
		this._resizeContext = context;
	}

	dispatch(command: LayoutCommand): LayoutCommandResult {
		const previousGraph = this._graph;
		let nextGraph = this._graph;
		const errors: NonNullable<LayoutCommandResult['errors']>[number][] = [];

		switch (command.type) {
			case 'INSERT_NODE': {
				const parent = this._graph.nodes[command.parentId];

				if (!parent) {
					errors.push({
						code: 'PARENT_NOT_FOUND',
						message: 'Parent node does not exist.',
						nodeId: command.parentId,
					});
					break;
				}

				const mutableNodes = { ...this._graph.nodes } as Record<LayoutNodeId, LayoutNode>;
				mutableNodes[command.node.id] = {
					...command.node,
					parentId: command.parentId,
				} as LayoutNode;

				const parentChildren = [...parent.children];
				parentChildren.splice(command.index ?? parentChildren.length, 0, command.node.id);
				mutableNodes[command.parentId] = {
					...parent,
					children: parentChildren,
				} as LayoutNode;

				nextGraph = {
					...this._graph,
					nodes: mutableNodes,
				};

				break;
			}

			case 'REMOVE_NODE':
				nextGraph = removeNode(this._graph, command.nodeId);
				break;

			case 'MOVE_NODE':
				if (!canMoveNode(this._graph, command.nodeId, command.newParentId)) {
					errors.push({
						code: 'MOVE_NOT_ALLOWED',
						message: 'Move violates layout constraints.',
						nodeId: command.nodeId,
					});
					break;
				}

				nextGraph = moveNode(
					this._graph,
					command.nodeId,
					command.newParentId,
					command.index,
				);
				break;

			case 'UPDATE_NODE_SETTINGS': {
				const node = this._graph.nodes[command.nodeId];

				if (!node) {
					errors.push({
						code: 'NODE_NOT_FOUND',
						message: 'Node does not exist.',
						nodeId: command.nodeId,
					});
					break;
				}

				if ('settings' in command.patch && command.patch.settings) {
					nextGraph = updateNodeSettings(this._graph, command.nodeId, {
						settings: command.patch.settings as never,
						...(command.patch.locked !== undefined ? { locked: command.patch.locked } : {}),
						...(command.patch.hidden !== undefined ? { hidden: command.patch.hidden } : {}),
						...(command.patch.className !== undefined
							? { className: command.patch.className }
							: undefined),
						...(command.patch.anchorId !== undefined
							? { anchorId: command.patch.anchorId }
							: undefined),
					});
				} else {
					nextGraph = updateNodeSettings(this._graph, command.nodeId, {
						settings: {},
						...(command.patch.locked !== undefined ? { locked: command.patch.locked } : {}),
						...(command.patch.hidden !== undefined ? { hidden: command.patch.hidden } : {}),
						...(command.patch.className !== undefined
							? { className: command.patch.className }
							: undefined),
						...(command.patch.anchorId !== undefined
							? { anchorId: command.patch.anchorId }
							: undefined),
					});
				}

				break;
			}

			case 'UPDATE_WIDGET_PROPS':
				nextGraph = updateWidgetProps(this._graph, command.instanceId, command.patch);
				break;

			case 'DUPLICATE_NODE': {
				const result = duplicateNode(this._graph, command.nodeId);

				if (!result.newNodeId) {
					errors.push({
						code: 'DUPLICATE_FAILED',
						message: 'Node could not be duplicated.',
						nodeId: command.nodeId,
					});
					break;
				}

				nextGraph = result.graph;
				break;
			}

			case 'LOCK_NODE':
				nextGraph = lockNode(this._graph, command.nodeId, command.locked);
				break;

			default:
				break;
		}

		if (nextGraph !== previousGraph) {
			this._graph = nextGraph;
			this.onGraphChange?.(nextGraph);
		}

		return {
			success: errors.length === 0,
			graph: this._graph,
			errors: errors.length > 0 ? errors : undefined,
		};
	}

	resizeColumn(
		leftColumnId: LayoutNodeId,
		rightColumnId: LayoutNodeId,
		delta: number,
	): LayoutGraph {
		if (!this._resizeContext) {
			return this._graph;
		}

		const nextGraph = resizeColumnPair(
			this._graph,
			leftColumnId,
			rightColumnId,
			delta,
			this._resizeContext.breakpoint,
		);

		if (nextGraph !== this._graph) {
			this._graph = nextGraph;
			this.onGraphChange?.(nextGraph);
		}

		return this._graph;
	}

	getNode(id: LayoutNodeId): LayoutNode | undefined {
		return this._graph.nodes[id];
	}

	getWidget(id: WidgetInstanceId): WidgetInstance | undefined {
		return this._graph.widgets[id];
	}

	getAncestors(id: LayoutNodeId): readonly LayoutNode[] {
		return getAncestors(this._graph, id);
	}

	getDescendants(id: LayoutNodeId): readonly LayoutNode[] {
		return getDescendants(this._graph, id);
	}

	serialize(): LayoutGraph {
		return this._graph;
	}

	toJSON(): ReturnType<typeof serializeLayoutGraph> {
		return serializeLayoutGraph(this._graph);
	}

	hydrate(graph: LayoutGraph): void {
		this._graph = graph;
		this.onGraphChange?.(graph);
	}

	insertWidget(
		parentId: LayoutNodeId,
		index: number,
		widgetType: Parameters<typeof insertWidgetType>[3],
	): LayoutNodeId {
		const { graph, newNodeId } = insertWidgetType(this._graph, parentId, index, widgetType);
		this._graph = graph;
		this.onGraphChange?.(graph);

		return newNodeId;
	}

	updateSettings(
		nodeId: LayoutNodeId,
		settings: Record<string, unknown>,
	): LayoutGraph {
		return this.dispatch({
			type: 'UPDATE_NODE_SETTINGS',
			nodeId,
			patch: { settings } as Partial<LayoutNode>,
		}).graph;
	}

	updateWidget(instanceId: WidgetInstanceId, patch: PropertyRecord): LayoutGraph {
		return this.dispatch({
			type: 'UPDATE_WIDGET_PROPS',
			instanceId,
			patch,
		}).graph;
	}
}

export function createLayoutEngine(graph: LayoutGraph, onGraphChange?: (graph: LayoutGraph) => void) {
	return new LayoutEngineImpl({ graph, onGraphChange });
}

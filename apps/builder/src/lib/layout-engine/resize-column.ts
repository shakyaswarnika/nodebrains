import type { BreakpointSlug } from '@theme/builder/core/primitives';
import type { LayoutGraph } from '@theme/builder/layout-engine/types';

import {
	canResizeColumnPair,
	getResolvedRowSpans,
	getRowColumnNodes,
	resolveColumnSpan,
	setColumnSpanAtBreakpoint,
} from './grid';

export function resizeColumnPair(
	graph: LayoutGraph,
	leftColumnId: LayoutGraph['rootId'],
	rightColumnId: LayoutGraph['rootId'],
	delta: number,
	breakpoint: BreakpointSlug,
): LayoutGraph {
	const leftColumn = graph.nodes[leftColumnId];
	const rightColumn = graph.nodes[rightColumnId];

	if (leftColumn?.type !== 'column' || rightColumn?.type !== 'column') {
		return graph;
	}

	if (leftColumn.parentId !== rightColumn.parentId || !leftColumn.parentId) {
		return graph;
	}

	const row = graph.nodes[leftColumn.parentId];

	if (!row || row.type !== 'row') {
		return graph;
	}

	const columns = getRowColumnNodes(graph, row.id);
	const leftIndex = columns.findIndex((column) => column.id === leftColumnId);
	const rightIndex = columns.findIndex((column) => column.id === rightColumnId);

	if (rightIndex !== leftIndex + 1) {
		return graph;
	}

	const leftSpan = resolveColumnSpan(leftColumn.settings.span, breakpoint);
	const rightSpan = resolveColumnSpan(rightColumn.settings.span, breakpoint);

	if (!canResizeColumnPair(leftSpan, rightSpan, delta)) {
		return graph;
	}

	const nextNodes = { ...graph.nodes };

	nextNodes[leftColumnId] = setColumnSpanAtBreakpoint(
		leftColumn,
		breakpoint,
		leftSpan + delta,
	);
	nextNodes[rightColumnId] = setColumnSpanAtBreakpoint(
		rightColumn,
		breakpoint,
		rightSpan - delta,
	);

	return {
		...graph,
		nodes: nextNodes,
	};
}

export function getColumnResizeSibling(
	graph: LayoutGraph,
	columnId: LayoutGraph['rootId'],
	direction: 'left' | 'right',
): LayoutGraph['rootId'] | null {
	const column = graph.nodes[columnId];

	if (column?.type !== 'column' || !column.parentId) {
		return null;
	}

	const row = graph.nodes[column.parentId];

	if (!row || row.type !== 'row') {
		return null;
	}

	const columns = getRowColumnNodes(graph, row.id);
	const index = columns.findIndex((entry) => entry.id === columnId);

	if (index === -1) {
		return null;
	}

	if (direction === 'right' && index < columns.length - 1) {
		return columns[index + 1]?.id ?? null;
	}

	if (direction === 'left' && index > 0) {
		return columns[index - 1]?.id ?? null;
	}

	return null;
}

export function getRowSpanSummary(
	graph: LayoutGraph,
	rowId: LayoutGraph['rootId'],
	breakpoint: BreakpointSlug,
): { total: number; spans: ReadonlyMap<LayoutGraph['rootId'], number> } {
	const spans = getResolvedRowSpans(graph, rowId, breakpoint);

	return {
		total: [...spans.values()].reduce((sum, span) => sum + span, 0),
		spans,
	};
}

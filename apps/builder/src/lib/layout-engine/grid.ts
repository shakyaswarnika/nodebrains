import type { BreakpointSlug } from '@theme/builder/core/primitives';
import type {
	ColumnLayoutNode,
	LayoutGraph,
	ResponsiveSpan,
	RowLayoutNode,
} from '@theme/builder/layout-engine/types';

import { resolveResponsiveValue, setResponsiveValueAtBreakpoint } from '../responsive-engine';

export const GRID_COLUMNS = 12;
export const MIN_COLUMN_SPAN = 1;
export const MAX_COLUMN_SPAN = GRID_COLUMNS;

export function resolveColumnSpan(
	span: ResponsiveSpan | undefined,
	breakpoint: BreakpointSlug,
): number {
	return resolveResponsiveValue(span ?? { base: GRID_COLUMNS }, breakpoint) ?? GRID_COLUMNS;
}

export function getRowColumnNodes(graph: LayoutGraph, rowId: RowLayoutNode['id']): ColumnLayoutNode[] {
	const row = graph.nodes[rowId];

	if (!row || row.type !== 'row') {
		return [];
	}

	return row.children
		.map((childId) => graph.nodes[childId])
		.filter((node): node is ColumnLayoutNode => node?.type === 'column');
}

export function getResolvedRowSpans(
	graph: LayoutGraph,
	rowId: RowLayoutNode['id'],
	breakpoint: BreakpointSlug,
): Map<ColumnLayoutNode['id'], number> {
	const spans = new Map<ColumnLayoutNode['id'], number>();

	for (const column of getRowColumnNodes(graph, rowId)) {
		spans.set(column.id, resolveColumnSpan(column.settings.span, breakpoint));
	}

	return spans;
}

export function getRowSpanTotal(spans: ReadonlyMap<ColumnLayoutNode['id'], number>): number {
	let total = 0;

	for (const span of spans.values()) {
		total += span;
	}

	return total;
}

export function clampColumnSpan(span: number): number {
	return Math.min(MAX_COLUMN_SPAN, Math.max(MIN_COLUMN_SPAN, Math.round(span)));
}

export function setColumnSpanAtBreakpoint(
	column: ColumnLayoutNode,
	breakpoint: BreakpointSlug,
	span: number,
): ColumnLayoutNode {
	const nextSpan = setResponsiveValueAtBreakpoint(
		column.settings.span ?? { base: GRID_COLUMNS },
		breakpoint,
		clampColumnSpan(span),
	);

	return {
		...column,
		settings: {
			...column.settings,
			span: nextSpan as ResponsiveSpan,
		},
	};
}

export function canResizeColumnPair(
	leftSpan: number,
	rightSpan: number,
	delta: number,
): boolean {
	const nextLeft = leftSpan + delta;
	const nextRight = rightSpan - delta;

	return (
		nextLeft >= MIN_COLUMN_SPAN &&
		nextLeft <= MAX_COLUMN_SPAN &&
		nextRight >= MIN_COLUMN_SPAN &&
		nextRight <= MAX_COLUMN_SPAN
	);
}

export function distributeEqualSpans(columnCount: number): number[] {
	if (columnCount <= 0) {
		return [];
	}

	const baseSpan = Math.floor(GRID_COLUMNS / columnCount);
	const remainder = GRID_COLUMNS % columnCount;
	const spans: number[] = [];

	for (let index = 0; index < columnCount; index += 1) {
		spans.push(baseSpan + (index < remainder ? 1 : 0));
	}

	return spans;
}

export function normalizeRowSpansAtBreakpoint(
	graph: LayoutGraph,
	rowId: RowLayoutNode['id'],
	breakpoint: BreakpointSlug,
): LayoutGraph {
	const columns = getRowColumnNodes(graph, rowId);

	if (columns.length === 0) {
		return graph;
	}

	const equalSpans = distributeEqualSpans(columns.length);
	const nextNodes = { ...graph.nodes };

	columns.forEach((column, index) => {
		nextNodes[column.id] = setColumnSpanAtBreakpoint(
			column,
			breakpoint,
			equalSpans[index] ?? MIN_COLUMN_SPAN,
		);
	});

	return {
		...graph,
		nodes: nextNodes,
	};
}

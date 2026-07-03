/**
 * Layout Engine integration tests (run via tsx).
 */

import {
	createColumnsSubtree,
	createLayoutEngine,
	createNestedRowSubtree,
	deserializeBuilderDocument,
	getRowSpanSummary,
	normalizeRowSpansAtBreakpoint,
	resizeColumnPair,
	serializeBuilderDocument,
} from '../apps/builder/src/lib/layout-engine/index.ts';
import { mockDocument, mockLayoutGraph } from '../apps/builder/src/lib/mock-builder-data.ts';
import type { LayoutGraph } from '../builder/layout-engine/types.ts';

function assert(condition: unknown, message: string): void {
	if (!condition) {
		throw new Error(message);
	}
}

function testResponsiveColumnResize(): void {
	const subtree = createColumnsSubtree(2);
	const graph: LayoutGraph = {
		rootId: mockLayoutGraph.rootId,
		nodes: {
			...mockLayoutGraph.nodes,
			[subtree.rootId]: {
				...subtree.nodes[0]!,
				parentId: mockLayoutGraph.rootId,
			},
			...Object.fromEntries(
				subtree.nodes.slice(1).map((node) => [node.id, { ...node, parentId: subtree.rootId }]),
			),
		},
		widgets: mockLayoutGraph.widgets,
	};

	const columns = subtree.nodes.filter((node) => node.type === 'column');
	const left = columns[0]!;
	const right = columns[1]!;

	const resized = resizeColumnPair(graph, left.id, right.id, 2, 'lg');
	const summary = getRowSpanSummary(resized, subtree.rootId, 'lg');
	const leftSpan = summary.spans.get(left.id);
	const rightSpan = summary.spans.get(right.id);

	assert(leftSpan === 8, `Expected left span 8, got ${leftSpan}`);
	assert(rightSpan === 4, `Expected right span 4, got ${rightSpan}`);
	assert(summary.total === 12, `Expected total span 12, got ${summary.total}`);
}

function testNestedLayoutConstraints(): void {
	const nested = createNestedRowSubtree();
	const row = nested.nodes.find((node) => node.type === 'row' && node.parentId === null);

	assert(row, 'Nested subtree should include a root row');

	const nestedRow = nested.nodes.find((node) => node.type === 'row' && node.parentId !== null);
	assert(nestedRow, 'Nested subtree should include an inner row');
}

function testJsonRoundTrip(): void {
	const engine = createLayoutEngine(mockLayoutGraph);
	const payload = serializeBuilderDocument(mockDocument, engine.serialize());
	const restored = deserializeBuilderDocument(payload);

	assert(restored.graph.rootId === mockLayoutGraph.rootId, 'Root id should round-trip');
	assert(
		Object.keys(restored.graph.nodes).length === Object.keys(mockLayoutGraph.nodes).length,
		'Node count should round-trip',
	);
	assert(restored.document.meta.title === mockDocument.meta.title, 'Document meta should round-trip');
}

function testNormalizeRowSpans(): void {
	const subtree = createColumnsSubtree(3);
	const graph: LayoutGraph = {
		rootId: subtree.rootId,
		nodes: Object.fromEntries(subtree.nodes.map((node) => [node.id, node])) as LayoutGraph['nodes'],
		widgets: {},
	};

	const normalized = normalizeRowSpansAtBreakpoint(graph, subtree.rootId, 'lg');
	const summary = getRowSpanSummary(normalized, subtree.rootId, 'lg');

	assert(summary.total === 12, `Expected normalized total 12, got ${summary.total}`);
	assert(
		[...summary.spans.values()].every((span) => span === 4),
		'Three columns should each span 4 at lg',
	);
}

function testLayoutEngineDispatch(): void {
	const engine = createLayoutEngine(mockLayoutGraph);
	const columnId = Object.values(mockLayoutGraph.nodes).find((node) => node.type === 'column')?.id;

	assert(columnId, 'Mock graph should contain a column');

	const result = engine.dispatch({
		type: 'UPDATE_NODE_SETTINGS',
		nodeId: columnId,
		patch: {
			settings: {
				span: { base: 12, lg: 5 },
			},
		},
	});

	assert(result.success, 'Settings update should succeed');

	const updated = result.graph.nodes[columnId];

	assert(updated?.type === 'column', 'Updated node should remain a column');
	assert(updated.settings.span?.lg === 5, 'Column lg span should update to 5');
}

const tests = [
	['responsive column resize', testResponsiveColumnResize],
	['nested layout factory', testNestedLayoutConstraints],
	['json round trip', testJsonRoundTrip],
	['normalize row spans', testNormalizeRowSpans],
	['layout engine dispatch', testLayoutEngineDispatch],
] as const;

let passed = 0;

for (const [name, run] of tests) {
	run();
	passed += 1;
	console.log(`✓ ${name}`);
}

console.log(`\n${passed}/${tests.length} layout engine tests passed.`);

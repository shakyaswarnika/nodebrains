import type {
	LayoutNodeId,
	WidgetInstanceId,
	WidgetTypeId,
} from '@theme/builder/core/primitives';
import type {
	ColumnLayoutNode,
	ContainerLayoutNode,
	LayoutNode,
	ResponsiveSpan,
	RowLayoutNode,
	SectionLayoutNode,
	WidgetInstance,
} from '@theme/builder/layout-engine/types';

import { distributeEqualSpans } from './grid';
import { getWidgetSDK } from '../widget-sdk';

export function createId(prefix: string): string {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function asLayoutNodeId(value: string): LayoutNodeId {
	return value as LayoutNodeId;
}

export function asWidgetInstanceId(value: string): WidgetInstanceId {
	return value as WidgetInstanceId;
}

export interface CreatedSubtree {
	readonly nodes: LayoutNode[];
	readonly widgets: WidgetInstance[];
	readonly rootId: LayoutNodeId;
}

const WIDGET_TYPE_LABELS: Record<string, string> = {
	'content.hero': 'Hero',
	'content.services': 'Services',
	'content.placeholder': 'Placeholder',
};

export function getWidgetLabel(widgetType: WidgetTypeId): string {
	const module = getWidgetSDK().getModule(widgetType);

	if (module) {
		return module.registration.metadata.name;
	}

	return WIDGET_TYPE_LABELS[String(widgetType)] ?? String(widgetType);
}

export function createSubtreeFromWidgetType(widgetType: WidgetTypeId): CreatedSubtree {
	const type = String(widgetType);

	switch (type) {
		case 'layout.section':
			return wrapSingle(createSectionNode());
		case 'layout.container':
			return wrapSingle(createContainerNode());
		case 'layout.columns':
			return createColumnsSubtree(2);
		case 'layout.row':
			return wrapSingle(createRowNode());
		default:
			return createWidgetSubtree(widgetType);
	}
}

function wrapSingle(node: LayoutNode): CreatedSubtree {
	return {
		nodes: [node],
		widgets: [],
		rootId: node.id,
	};
}

function createWidgetSubtree(widgetType: WidgetTypeId): CreatedSubtree {
	const widgetInstanceId = asWidgetInstanceId(createId('widget'));
	const nodeId = asLayoutNodeId(createId('node-widget'));
	const widget = createWidgetInstance(widgetInstanceId, widgetType);

	return {
		nodes: [
			{
				id: nodeId,
				type: 'widget',
				parentId: null,
				children: [],
				widgetInstanceId,
			},
		],
		widgets: [widget],
		rootId: nodeId,
	};
}

export function createSectionNode(overrides?: Partial<SectionLayoutNode['settings']>): SectionLayoutNode {
	return {
		id: asLayoutNodeId(createId('section')),
		type: 'section',
		parentId: null,
		children: [],
		settings: {
			tag: 'section',
			fullWidth: false,
			...overrides,
		},
	};
}

export function createContainerNode(overrides?: Partial<ContainerLayoutNode['settings']>): ContainerLayoutNode {
	return {
		id: asLayoutNodeId(createId('container')),
		type: 'container',
		parentId: null,
		children: [],
		settings: {
			width: 'default',
			...overrides,
		},
	};
}

export function createRowNode(overrides?: Partial<RowLayoutNode['settings']>): RowLayoutNode {
	return {
		id: asLayoutNodeId(createId('row')),
		type: 'row',
		parentId: null,
		children: [],
		settings: {
			gap: 'md',
			align: 'stretch',
			justify: 'between',
			...overrides,
		},
	};
}

export function createColumnNode(
	span: ResponsiveSpan = { base: 12, lg: 6 },
): ColumnLayoutNode {
	return {
		id: asLayoutNodeId(createId('column')),
		type: 'column',
		parentId: null,
		children: [],
		settings: {
			span,
		},
	};
}

export function createColumnsSubtree(columnCount = 2): CreatedSubtree {
	const row = createRowNode();
	const spans = distributeEqualSpans(columnCount);
	const columns = spans.map((span) => ({
		...createColumnNode({
			base: 12,
			lg: span,
		}),
		parentId: row.id,
	}));

	return {
		nodes: [
			{
				...row,
				children: columns.map((column) => column.id),
			},
			...columns,
		],
		widgets: [],
		rootId: row.id,
	};
}

export function createNestedRowSubtree(): CreatedSubtree {
	const row = createRowNode({ gap: 'sm' });
	const leftColumn = {
		...createColumnNode({ base: 12, lg: 8 }),
		parentId: row.id,
	};
	const rightColumn = {
		...createColumnNode({ base: 12, lg: 4 }),
		parentId: row.id,
	};
	const nestedRow = {
		...createRowNode({ gap: 'sm' }),
		parentId: rightColumn.id,
	};
	const nestedLeft = {
		...createColumnNode({ base: 12, lg: 6 }),
		parentId: nestedRow.id,
	};
	const nestedRight = {
		...createColumnNode({ base: 12, lg: 6 }),
		parentId: nestedRow.id,
	};

	return {
		nodes: [
			{
				...row,
				children: [leftColumn.id, rightColumn.id],
			},
			leftColumn,
			{
				...rightColumn,
				children: [nestedRow.id],
			},
			{
				...nestedRow,
				children: [nestedLeft.id, nestedRight.id],
			},
			nestedLeft,
			nestedRight,
		],
		widgets: [],
		rootId: row.id,
	};
}

export function createWidgetInstance(
	instanceId: WidgetInstanceId,
	widgetType: WidgetTypeId,
): WidgetInstance {
	const sdk = getWidgetSDK();
	const module = sdk.getModule(widgetType);

	if (module) {
		return sdk.serializer.createInstance(widgetType, instanceId);
	}

	return {
		id: instanceId,
		type: widgetType,
		props: {
			label: getWidgetLabel(widgetType),
		},
	};
}

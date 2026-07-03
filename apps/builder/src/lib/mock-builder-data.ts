import type { PageDocument } from '@theme/builder/core/document';
import type { LayoutNodeId, WidgetInstanceId } from '@theme/builder/core/primitives';
import type {
	LayoutGraph,
	LayoutNode,
	RootLayoutNode,
	WidgetLayoutNode,
} from '@theme/builder/layout-engine/types';
import type { BreakpointDefinition } from '@theme/builder/responsive-engine/types';
import type { ComponentRegistryEntry } from '@theme/builder/component-registry/types';
import type { WidgetDefinition, WidgetPaletteGroup } from '@theme/builder/widget-registry/types';

import { registerBuiltInWidgets } from './widget-sdk';

const widgetSdk = registerBuiltInWidgets();

function layoutNodeId(value: string): LayoutNodeId {
	return value as LayoutNodeId;
}

export const builderBreakpoints: readonly BreakpointDefinition[] = [
	{ slug: 'sm', label: 'Tablet', minWidth: 640 },
	{ slug: 'md', label: 'Laptop', minWidth: 768 },
	{ slug: 'lg', label: 'Desktop', minWidth: 1024 },
	{ slug: 'xl', label: 'Wide', minWidth: 1280 },
];

const rootNode: RootLayoutNode = {
	id: layoutNodeId('root'),
	type: 'root',
	parentId: null,
	children: [layoutNodeId('section-hero'), layoutNodeId('section-content')],
};

export const mockLayoutGraph = {
	rootId: rootNode.id,
	nodes: {
		[rootNode.id]: rootNode,
		[layoutNodeId('section-hero')]: {
			id: layoutNodeId('section-hero'),
			type: 'section',
			parentId: rootNode.id,
			children: [layoutNodeId('container-hero')],
			anchorId: 'hero',
			settings: {
				tag: 'header',
				fullWidth: true,
				background: {
					color: 'accent',
					overlay: true,
					overlayOpacity: 0.6,
				},
			},
		},
		[layoutNodeId('container-hero')]: {
			id: layoutNodeId('container-hero'),
			type: 'container',
			parentId: layoutNodeId('section-hero'),
			children: [layoutNodeId('row-hero')],
			settings: {
				width: 'wide',
			},
		},
		[layoutNodeId('row-hero')]: {
			id: layoutNodeId('row-hero'),
			type: 'row',
			parentId: layoutNodeId('container-hero'),
			children: [layoutNodeId('column-hero-copy')],
			settings: {
				gap: 'lg',
				align: 'center',
				justify: 'between',
			},
		},
		[layoutNodeId('column-hero-copy')]: {
			id: layoutNodeId('column-hero-copy'),
			type: 'column',
			parentId: layoutNodeId('row-hero'),
			children: [layoutNodeId('widget-hero')],
			settings: {
				span: {
					base: 12,
					lg: 7,
				},
			},
		},
		[layoutNodeId('widget-hero')]: {
			id: layoutNodeId('widget-hero'),
			type: 'widget',
			parentId: layoutNodeId('column-hero-copy'),
			children: [],
			widgetInstanceId: layoutNodeId('widget-instance-hero') as unknown as WidgetInstanceId,
		} as WidgetLayoutNode,
		[layoutNodeId('section-content')]: {
			id: layoutNodeId('section-content'),
			type: 'section',
			parentId: rootNode.id,
			children: [layoutNodeId('container-content')],
			anchorId: 'content',
			settings: {
				tag: 'main',
				spacing: {
					paddingTop: 'xl',
					paddingBottom: 'xl',
				},
			},
		},
		[layoutNodeId('container-content')]: {
			id: layoutNodeId('container-content'),
			type: 'container',
			parentId: layoutNodeId('section-content'),
			children: [layoutNodeId('row-grid')],
			settings: {
				width: 'default',
			},
		},
		[layoutNodeId('row-grid')]: {
			id: layoutNodeId('row-grid'),
			type: 'row',
			parentId: layoutNodeId('container-content'),
			children: [layoutNodeId('column-left'), layoutNodeId('column-right')],
			settings: {
				gap: 'md',
				align: 'stretch',
				justify: 'between',
			},
		},
		[layoutNodeId('column-left')]: {
			id: layoutNodeId('column-left'),
			type: 'column',
			parentId: layoutNodeId('row-grid'),
			children: [],
			settings: {
				span: {
					base: 12,
					lg: 6,
				},
			},
		},
		[layoutNodeId('column-right')]: {
			id: layoutNodeId('column-right'),
			type: 'column',
			parentId: layoutNodeId('row-grid'),
			children: [],
			settings: {
				span: {
					base: 12,
					lg: 6,
				},
			},
		},
	},
	widgets: {
		[layoutNodeId('widget-instance-hero')]: widgetSdk.serializer.createInstance(
			'content.hero' as never,
			layoutNodeId('widget-instance-hero') as unknown as WidgetInstanceId,
			{
				padding: {
					base: { top: 24, right: 16, bottom: 24, left: 16, linked: false },
					md: { top: 36, right: 20, bottom: 36, left: 20, linked: false },
					lg: { top: 48, right: 24, bottom: 48, left: 24, linked: false },
				},
				typography: {
					base: {
						fontFamily: 'Inter',
						fontSize: '2rem',
						fontWeight: '700',
						lineHeight: '1.15',
						letterSpacing: '-0.02em',
						textTransform: 'none',
					},
					lg: {
						fontFamily: 'Inter',
						fontSize: '3rem',
						fontWeight: '700',
						lineHeight: '1.1',
						letterSpacing: '-0.02em',
						textTransform: 'none',
					},
				},
				contentAlignment: {
					base: { horizontal: 'center', vertical: 'center' },
					lg: { horizontal: 'left', vertical: 'center' },
				},
				columns: { base: 1, md: 1, lg: 2 },
			},
		),
	},
} as unknown as LayoutGraph;

export const mockDocument: PageDocument = {
	version: '1.0.0',
	meta: {
		title: 'NodeBrains Builder Demo',
		status: 'draft',
		timestamps: {
			createdAt: '2026-07-02T09:30:00.000Z',
			updatedAt: '2026-07-02T09:30:00.000Z',
		},
	},
	root: {
		id: rootNode.id,
		type: 'root',
		children: rootNode.children,
	},
	settings: {
		containerWidth: 'default',
	},
};

export const mockComponentRegistry: readonly ComponentRegistryEntry[] = [
	{
		slug: 'hero' as never,
		name: 'Hero',
		description: 'Existing PHP component bridge placeholder.',
		category: 'content',
		assets: { style: 'style.css', script: null },
		supports: { responsive: true },
		schema: heroWidgetSchema(),
		defaults: {},
		version: '1.0.0',
	},
	{
		slug: 'services' as never,
		name: 'Services',
		description: 'Existing PHP component bridge placeholder.',
		category: 'content',
		assets: { style: 'style.css', script: 'script.js' },
		supports: { responsive: true, repeaterFields: ['services'] },
		schema: servicesWidgetSchema(),
		defaults: {},
		version: '1.0.0',
	},
];

function heroWidgetSchema() {
	return widgetSdk.getModule('content.hero' as never)?.registration.schema ?? {};
}

function servicesWidgetSchema() {
	return widgetSdk.getModule('content.services' as never)?.registration.schema ?? {};
}

export const mockPaletteGroups: readonly WidgetPaletteGroup[] = widgetSdk.registry.listPaletteGroups();

export const mockWidgetRegistry: readonly WidgetDefinition[] = widgetSdk.registry.list();

export function getNodeLabel(node: LayoutNode, graph?: LayoutGraph): string {
	switch (node.type) {
		case 'section':
			return node.anchorId ? `Section · ${node.anchorId}` : 'Section';
		case 'container':
			return 'Container';
		case 'row':
			return 'Row';
		case 'column':
			return 'Column';
		case 'widget': {
			const widget = graph?.widgets[node.widgetInstanceId];

			if (widget) {
				const module = widgetSdk.getModule(widget.type);
				const title =
					widget.props.title ?? widget.props.label ?? widget.props.heading;

				if (typeof title === 'string' && title.length > 0) {
					return `Widget · ${title}`;
				}

				if (module) {
					return `Widget · ${module.registration.metadata.name}`;
				}
			}

			return widget ? `Widget · ${String(widget.type)}` : 'Widget';
		}
		case 'template-ref':
			return `Template · ${node.templateId}`;
		default:
			return 'Root';
	}
}

export { widgetSdk };

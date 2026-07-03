import type { LayoutNodeId, WidgetTypeId } from '@theme/builder/core/primitives';
import type { LayoutNodeType } from '@theme/builder/layout-engine/types';

export type DropPosition = 'before' | 'after' | 'inside';

export interface DropTarget {
	readonly parentId: LayoutNodeId;
	readonly index: number;
	readonly position: DropPosition;
}

export type DragSource =
	| { readonly kind: 'palette'; readonly widgetType: WidgetTypeId }
	| { readonly kind: 'canvas'; readonly nodeId: LayoutNodeId };

export interface ClipboardPayload {
	readonly rootNodeId: LayoutNodeId;
	readonly nodes: Record<string, LayoutNodeSnapshot>;
	readonly widgets: Record<string, WidgetWidgetSnapshot>;
}

export interface LayoutNodeSnapshot {
	readonly id: string;
	readonly type: LayoutNodeType;
	readonly parentId: string | null;
	readonly children: readonly string[];
	readonly locked?: boolean;
	readonly hidden?: boolean;
	readonly className?: string;
	readonly anchorId?: string;
	readonly settings?: Record<string, unknown>;
	readonly widgetInstanceId?: string;
	readonly templateId?: string;
}

export interface WidgetWidgetSnapshot {
	readonly id: string;
	readonly type: string;
	readonly componentSlug?: string;
	readonly props: Record<string, unknown>;
}

export interface ResizeColumnCommandContext {
	readonly breakpoint: import('@theme/builder/core/primitives').BreakpointSlug;
}

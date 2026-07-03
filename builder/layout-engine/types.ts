/**
 * Layout Engine — document tree, constraints, and mutation contracts.
 *
 * @package NodeBrains
 */

import type {
  ComponentSlug,
  LayoutNodeId,
  WidgetInstanceId,
  WidgetTypeId,
} from '../core/primitives.js';
import type { PropertyRecord } from '../property-system/types.js';
import type { ResponsiveStyleMap } from '../responsive-engine/types.js';

// ---------------------------------------------------------------------------
// Layout node types
// ---------------------------------------------------------------------------

export type LayoutNodeType =
  | 'root'
  | 'section'
  | 'container'
  | 'row'
  | 'column'
  | 'widget'
  | 'template-ref';

export interface LayoutNodeBase {
  readonly id: LayoutNodeId;
  readonly type: LayoutNodeType;
  readonly parentId: LayoutNodeId | null;
  readonly children: readonly LayoutNodeId[];
  readonly locked?: boolean;
  readonly hidden?: boolean;
  readonly className?: string;
  readonly anchorId?: string;
}

export interface SectionLayoutNode extends LayoutNodeBase {
  readonly type: 'section';
  readonly settings: SectionSettings;
}

export interface ContainerLayoutNode extends LayoutNodeBase {
  readonly type: 'container';
  readonly settings: ContainerSettings;
}

export interface RowLayoutNode extends LayoutNodeBase {
  readonly type: 'row';
  readonly settings: RowSettings;
}

export interface ColumnLayoutNode extends LayoutNodeBase {
  readonly type: 'column';
  readonly settings: ColumnSettings;
}

export interface WidgetLayoutNode extends LayoutNodeBase {
  readonly type: 'widget';
  readonly widgetInstanceId: WidgetInstanceId;
}

export interface TemplateRefLayoutNode extends LayoutNodeBase {
  readonly type: 'template-ref';
  readonly templateId: string;
}

export interface RootLayoutNode extends LayoutNodeBase {
  readonly type: 'root';
}

export type LayoutNode =
  | RootLayoutNode
  | SectionLayoutNode
  | ContainerLayoutNode
  | RowLayoutNode
  | ColumnLayoutNode
  | WidgetLayoutNode
  | TemplateRefLayoutNode;

// ---------------------------------------------------------------------------
// Layout settings
// ---------------------------------------------------------------------------

export interface SectionSettings {
  readonly tag?: 'section' | 'header' | 'footer' | 'main' | 'aside';
  readonly fullWidth?: boolean;
  readonly background?: LayoutBackground;
  readonly spacing?: LayoutSpacing;
  readonly responsive?: ResponsiveStyleMap;
}

export interface ContainerSettings {
  readonly width?: 'default' | 'narrow' | 'wide' | 'fluid' | 'full';
  readonly padding?: LayoutSpacing;
}

export interface RowSettings {
  readonly gap?: 'sm' | 'md' | 'lg';
  readonly align?: 'start' | 'center' | 'end' | 'stretch';
  readonly justify?: 'start' | 'center' | 'end' | 'between';
  readonly wrap?: boolean;
}

export interface ColumnSettings {
  readonly span?: ResponsiveSpan;
  readonly order?: ResponsiveOrder;
  readonly valign?: 'start' | 'center' | 'end' | 'stretch';
}

export interface LayoutBackground {
  readonly color?: string;
  readonly image?: string;
  readonly overlay?: boolean;
  readonly overlayOpacity?: number;
}

export interface LayoutSpacing {
  readonly paddingTop?: string;
  readonly paddingBottom?: string;
  readonly marginTop?: string;
  readonly marginBottom?: string;
}

export interface ResponsiveSpan {
  readonly base?: number;
  readonly sm?: number;
  readonly md?: number;
  readonly lg?: number;
  readonly xl?: number;
}

export interface ResponsiveOrder {
  readonly base?: number;
  readonly sm?: number;
  readonly md?: number;
  readonly lg?: number;
  readonly xl?: number;
}

// ---------------------------------------------------------------------------
// Widget instance (leaf data)
// ---------------------------------------------------------------------------

export interface WidgetInstance {
  readonly id: WidgetInstanceId;
  readonly type: WidgetTypeId;
  readonly componentSlug?: ComponentSlug;
  readonly props: PropertyRecord;
  readonly responsiveOverrides?: ResponsiveStyleMap;
}

// ---------------------------------------------------------------------------
// Engine graph
// ---------------------------------------------------------------------------

export interface LayoutGraph {
  readonly nodes: Readonly<Record<LayoutNodeId, LayoutNode>>;
  readonly widgets: Readonly<Record<WidgetInstanceId, WidgetInstance>>;
  readonly rootId: LayoutNodeId;
}

export interface LayoutContext {
  readonly graph: LayoutGraph;
  readonly activeNodeId: LayoutNodeId | null;
  readonly path: readonly LayoutNodeId[];
}

// ---------------------------------------------------------------------------
// Mutations (command pattern — UI consumes, engine implements)
// ---------------------------------------------------------------------------

export type LayoutCommand =
  | { readonly type: 'INSERT_NODE'; readonly parentId: LayoutNodeId; readonly node: LayoutNode; readonly index?: number }
  | { readonly type: 'REMOVE_NODE'; readonly nodeId: LayoutNodeId }
  | { readonly type: 'MOVE_NODE'; readonly nodeId: LayoutNodeId; readonly newParentId: LayoutNodeId; readonly index: number }
  | { readonly type: 'UPDATE_NODE_SETTINGS'; readonly nodeId: LayoutNodeId; readonly patch: Partial<LayoutNode> }
  | { readonly type: 'UPDATE_WIDGET_PROPS'; readonly instanceId: WidgetInstanceId; readonly patch: PropertyRecord }
  | { readonly type: 'DUPLICATE_NODE'; readonly nodeId: LayoutNodeId }
  | { readonly type: 'LOCK_NODE'; readonly nodeId: LayoutNodeId; readonly locked: boolean };

export interface LayoutCommandResult {
  readonly success: boolean;
  readonly graph: LayoutGraph;
  readonly errors?: readonly LayoutError[];
}

export interface LayoutError {
  readonly code: string;
  readonly message: string;
  readonly nodeId?: LayoutNodeId;
}

export interface LayoutConstraintValidator {
  canInsert(parent: LayoutNode, child: LayoutNode, graph: LayoutGraph): boolean;
  canMove(nodeId: LayoutNodeId, newParentId: LayoutNodeId, graph: LayoutGraph): boolean;
  canRemove(nodeId: LayoutNodeId, graph: LayoutGraph): boolean;
}

export interface LayoutEngine {
  readonly graph: LayoutGraph;
  dispatch(command: LayoutCommand): LayoutCommandResult;
  getNode(id: LayoutNodeId): LayoutNode | undefined;
  getWidget(id: WidgetInstanceId): WidgetInstance | undefined;
  getAncestors(id: LayoutNodeId): readonly LayoutNode[];
  getDescendants(id: LayoutNodeId): readonly LayoutNode[];
  serialize(): LayoutGraph;
  hydrate(graph: LayoutGraph): void;
}

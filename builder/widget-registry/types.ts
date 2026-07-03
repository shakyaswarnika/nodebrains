/**
 * Widget Registry — editor-side widget catalog.
 *
 * A widget is the builder's unit of insertion. It may map 1:1 to a PHP
 * component or compose multiple components / custom preview logic.
 *
 * @package NodeBrains
 */

import type { ComponentSlug, WidgetTypeId } from '../core/primitives.js';
import type { PropertyFieldMap } from '../property-system/types.js';
import type { ComponentCategory } from '../component-registry/types.js';
import type { WidgetPreviewRenderer } from '../widget-sdk/types.js';

export type WidgetKind = 'component' | 'layout' | 'template' | 'extension';

export interface WidgetPaletteGroup {
  readonly id: string;
  readonly label: string;
  readonly order?: number;
}

export interface WidgetDefinition {
  readonly type: WidgetTypeId;
  readonly name: string;
  readonly description?: string;
  readonly icon?: string;
  readonly kind: WidgetKind;
  readonly category: ComponentCategory;
  readonly paletteGroup: string;
  readonly keywords?: readonly string[];

  /** Primary PHP component slug when kind === 'component'. */
  readonly componentSlug?: ComponentSlug;

  /** Property schema — usually mirrors component schema, may extend it. */
  readonly schema: PropertyFieldMap;
  readonly defaults: Readonly<Record<string, unknown>>;

  readonly allowedParents?: readonly WidgetTypeId[];
  readonly allowedChildren?: readonly WidgetTypeId[];
  readonly maxInstances?: number;

  readonly preview?: WidgetPreviewRenderer;
  readonly deprecated?: boolean;
  readonly replacedBy?: WidgetTypeId;
}

export interface WidgetRegistryFilter {
  readonly kind?: WidgetKind;
  readonly category?: ComponentCategory;
  readonly paletteGroup?: string;
  readonly parentType?: WidgetTypeId;
  readonly keyword?: string;
}

export interface WidgetRegistry {
  register(definition: WidgetDefinition): void;
  unregister(type: WidgetTypeId): void;
  get(type: WidgetTypeId): WidgetDefinition | undefined;
  has(type: WidgetTypeId): boolean;
  list(filter?: WidgetRegistryFilter): readonly WidgetDefinition[];
  listPaletteGroups(): readonly WidgetPaletteGroup[];
}

/**
 * Factory that auto-registers widgets from the Component Registry.
 */
export interface ComponentWidgetBridge {
  syncFromComponents(): void;
  mapComponentToWidget(slug: ComponentSlug): WidgetDefinition;
}

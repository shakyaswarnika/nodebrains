/**
 * Shared primitives for the NodeBrains visual page builder.
 *
 * @package NodeBrains
 */

/** Semantic version of the page document format. */
export type DocumentVersion = `${number}.${number}.${number}`;

/** Unique identifier for any entity in the builder graph. */
export type EntityId = string & { readonly __brand: 'EntityId' };

export type WidgetInstanceId = EntityId & { readonly __brand: 'WidgetInstanceId' };
export type LayoutNodeId = EntityId & { readonly __brand: 'LayoutNodeId' };
export type WidgetTypeId = string & { readonly __brand: 'WidgetTypeId' };

/**
 * Slug of a PHP theme component (`nodebrains_component()`).
 * Mirrors `inc/components/registry.php`.
 */
export type ComponentSlug = string & { readonly __brand: 'ComponentSlug' };

/** Design-token breakpoint slugs aligned with theme tokens. */
export type BreakpointSlug = 'base' | 'sm' | 'md' | 'lg' | 'xl';

/** Ordered breakpoints from smallest to largest (excluding `base`). */
export const BREAKPOINT_ORDER: readonly Exclude<BreakpointSlug, 'base'>[] = [
  'sm',
  'md',
  'lg',
  'xl',
] as const;

export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ColorToken = string;
export type ContainerWidth = 'default' | 'narrow' | 'wide' | 'fluid' | 'full';

/** ISO-8601 timestamp. */
export type ISODateTime = string;

export interface Timestamps {
  readonly createdAt: ISODateTime;
  readonly updatedAt: ISODateTime;
}

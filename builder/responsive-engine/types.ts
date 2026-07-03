/**
 * Responsive Engine — breakpoint resolution and override merging.
 *
 * Aligned with theme tokens (`sm`, `md`, `lg`, `xl`) from
 * `inc/framework/layout.php`.
 *
 * @package NodeBrains
 */

import type { BreakpointSlug } from '../core/primitives.js';
import type { PropertyRecord, PropertyValue } from '../property-system/types.js';

// ---------------------------------------------------------------------------
// Responsive value model
// ---------------------------------------------------------------------------

/**
 * Value that may vary per breakpoint.
 * `base` is the mobile-first default; larger breakpoints override.
 */
export type ResponsiveValue<T> =
  | T
  | {
      readonly base?: T;
      readonly sm?: T;
      readonly md?: T;
      readonly lg?: T;
      readonly xl?: T;
    };

export type ResponsivePropertyMap = Readonly<
  Record<string, ResponsiveValue<PropertyValue>>
>;

export interface ResponsiveStyleMap {
  readonly display?: ResponsiveValue<'block' | 'flex' | 'grid' | 'none'>;
  readonly visibility?: ResponsiveValue<'visible' | 'hidden'>;
  readonly columns?: ResponsiveValue<number>;
  readonly gap?: ResponsiveValue<string>;
  readonly padding?: ResponsiveValue<string>;
  readonly margin?: ResponsiveValue<string>;
  readonly textAlign?: ResponsiveValue<'left' | 'center' | 'right'>;
  readonly flexDirection?: ResponsiveValue<'row' | 'column'>;
  readonly custom?: ResponsivePropertyMap;
}

// ---------------------------------------------------------------------------
// Breakpoint configuration
// ---------------------------------------------------------------------------

export interface BreakpointDefinition {
  readonly slug: Exclude<BreakpointSlug, 'base'>;
  readonly label: string;
  readonly minWidth: number;
  readonly maxWidth?: number;
}

export interface BreakpointConfig {
  readonly breakpoints: readonly BreakpointDefinition[];
  readonly defaultPreview: BreakpointSlug;
}

// ---------------------------------------------------------------------------
// Resolution engine
// ---------------------------------------------------------------------------

export interface ResponsiveResolveContext {
  readonly breakpoint: BreakpointSlug;
  readonly cascade?: boolean;
}

export interface ResponsiveResolver {
  /**
   * Resolve a responsive value for the active breakpoint,
   * walking down the cascade (mobile-first) when `cascade` is true.
   */
  resolve<T>(value: ResponsiveValue<T>, context: ResponsiveResolveContext): T | undefined;

  /** Flatten all responsive props to a single PropertyRecord for PHP render. */
  flattenProps(
    props: PropertyRecord,
    breakpoint: BreakpointSlug,
  ): PropertyRecord;

  /** Merge layout + widget responsive style maps into CSS custom properties. */
  resolveStyles(
    styles: ResponsiveStyleMap,
    breakpoint: BreakpointSlug,
  ): Readonly<Record<string, string>>;
}

export interface ResponsiveEngine {
  readonly config: BreakpointConfig;
  readonly resolver: ResponsiveResolver;
  getActiveBreakpoint(): BreakpointSlug;
  setActiveBreakpoint(slug: BreakpointSlug): void;
  matchMedia(width: number): BreakpointSlug;
  listBreakpoints(): readonly BreakpointDefinition[];
}

// ---------------------------------------------------------------------------
// Editor preview contract (no UI — state only)
// ---------------------------------------------------------------------------

export interface ResponsivePreviewState {
  readonly activeBreakpoint: BreakpointSlug;
  readonly customWidth?: number;
  readonly rotated?: boolean;
}

export interface ResponsivePreviewController {
  readonly state: ResponsivePreviewState;
  setBreakpoint(slug: BreakpointSlug): void;
  setCustomWidth(width: number | undefined): void;
  subscribe(listener: (state: ResponsivePreviewState) => void): () => void;
}

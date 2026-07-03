/**
 * Property System — typed field definitions, values, and validation contracts.
 *
 * Maps to PHP `get_builder_schema()` field descriptors in theme components.
 *
 * @package NodeBrains
 */

import type { BreakpointSlug, ColorToken } from '../core/primitives.js';
import type { ResponsiveValue } from '../responsive-engine/types.js';

// ---------------------------------------------------------------------------
// Property type catalog
// ---------------------------------------------------------------------------

export type PropertyType =
  | 'string'
  | 'richtext'
  | 'number'
  | 'boolean'
  | 'range'
  | 'slider'
  | 'select'
  | 'color'
  | 'image'
  | 'url'
  | 'link'
  | 'button'
  | 'html'
  | 'repeater'
  | 'group'
  | 'menu'
  | 'taxonomy'
  | 'shortcode'
  | 'responsive-columns'
  | 'sidebar-list'
  | 'spacing'
  | 'typography'
  | 'border'
  | 'shadow'
  | 'alignment'
  | 'visibility';

// ---------------------------------------------------------------------------
// Value types
// ---------------------------------------------------------------------------

export interface ImageValue {
  readonly id?: number;
  readonly src: string;
  readonly alt?: string;
  readonly width?: number;
  readonly height?: number;
}

export interface LinkValue {
  readonly text?: string;
  readonly url: string;
  readonly external?: boolean;
  readonly rel?: string;
  readonly target?: '_self' | '_blank';
}

export interface ButtonValue extends LinkValue {
  readonly variant?: string;
  readonly size?: string;
}

export interface MenuValue {
  readonly themeLocation?: string;
  readonly menuId?: number;
}

export interface TaxonomyValue {
  readonly taxonomy: string;
  readonly termId?: number;
  readonly slug?: string;
}

export type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6;

export type ResponsiveColumnsValue = ResponsiveValue<ColumnCount>;

export interface SpacingValue {
  readonly top?: string | number;
  readonly right?: string | number;
  readonly bottom?: string | number;
  readonly left?: string | number;
  readonly linked?: boolean;
}

export interface TypographyValue {
  readonly fontFamily?: string;
  readonly fontSize?: string | number;
  readonly fontWeight?: string | number;
  readonly lineHeight?: string | number;
  readonly letterSpacing?: string | number;
  readonly textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export interface BorderValue {
  readonly width?: string | number;
  readonly style?: 'none' | 'solid' | 'dashed' | 'dotted';
  readonly color?: string;
  readonly radius?: string | number;
}

export interface ShadowValue {
  readonly x?: number;
  readonly y?: number;
  readonly blur?: number;
  readonly spread?: number;
  readonly color?: string;
  readonly inset?: boolean;
}

export interface AlignmentValue {
  readonly horizontal?: 'left' | 'center' | 'right' | 'stretch';
  readonly vertical?: 'top' | 'center' | 'bottom' | 'stretch';
}

export interface VisibilityValue {
  readonly visible?: boolean;
  readonly display?: 'block' | 'flex' | 'grid' | 'none';
  readonly opacity?: number;
}

export type PropertyScalarValue =
  | string
  | number
  | boolean
  | ImageValue
  | LinkValue
  | ButtonValue
  | MenuValue
  | TaxonomyValue
  | ResponsiveColumnsValue
  | SpacingValue
  | TypographyValue
  | BorderValue
  | ShadowValue
  | AlignmentValue
  | VisibilityValue
  | null;

export type PropertyValue =
  | PropertyScalarValue
  | readonly PropertyValue[]
  | PropertyRecord;

export interface PropertyRecord {
  readonly [key: string]: PropertyValue;
}

// ---------------------------------------------------------------------------
// Schema descriptors (editor metadata)
// ---------------------------------------------------------------------------

export interface PropertySchemaBase {
  readonly type: PropertyType;
  readonly label: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly default?: PropertyValue;
  readonly group?: string;
  readonly order?: number;
  readonly visibleWhen?: PropertyVisibilityRule;
  /** When true, the field supports per-breakpoint overrides in the property panel. */
  readonly responsive?: boolean;
}

export interface PropertyVisibilityRule {
  readonly field: string;
  readonly equals?: PropertyScalarValue;
  readonly notEquals?: PropertyScalarValue;
  readonly oneOf?: readonly PropertyScalarValue[];
}

export interface StringPropertySchema extends PropertySchemaBase {
  readonly type: 'string' | 'richtext' | 'html' | 'url' | 'shortcode';
  readonly maxLength?: number;
  readonly placeholder?: string;
}

export interface NumberPropertySchema extends PropertySchemaBase {
  readonly type: 'number';
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}

export interface RangePropertySchema extends PropertySchemaBase {
  readonly type: 'range' | 'slider';
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly unit?: string;
}

export interface BooleanPropertySchema extends PropertySchemaBase {
  readonly type: 'boolean';
}

export interface SelectPropertySchema extends PropertySchemaBase {
  readonly type: 'select';
  readonly options: readonly SelectOption[];
}

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export interface ColorPropertySchema extends PropertySchemaBase {
  readonly type: 'color';
  readonly tokens?: boolean;
  readonly allowedTokens?: readonly ColorToken[];
}

export interface ImagePropertySchema extends PropertySchemaBase {
  readonly type: 'image';
  readonly allowedMimeTypes?: readonly string[];
}

export interface LinkPropertySchema extends PropertySchemaBase {
  readonly type: 'link' | 'button';
}

export interface RepeaterPropertySchema extends PropertySchemaBase {
  readonly type: 'repeater';
  readonly fields: PropertyFieldMap;
  readonly minItems?: number;
  readonly maxItems?: number;
  readonly itemLabelField?: string;
}

export interface GroupPropertySchema extends PropertySchemaBase {
  readonly type: 'group';
  readonly fields: PropertyFieldMap;
}

export interface MenuPropertySchema extends PropertySchemaBase {
  readonly type: 'menu';
  readonly themeLocations?: readonly string[];
}

export interface TaxonomyPropertySchema extends PropertySchemaBase {
  readonly type: 'taxonomy';
  readonly tax: string;
}

export interface ResponsiveColumnsPropertySchema extends PropertySchemaBase {
  readonly type: 'responsive-columns';
  readonly min?: ColumnCount;
  readonly max?: ColumnCount;
}

export interface SidebarListPropertySchema extends PropertySchemaBase {
  readonly type: 'sidebar-list';
  readonly sidebars?: readonly string[];
}

export interface SpacingPropertySchema extends PropertySchemaBase {
  readonly type: 'spacing';
  readonly units?: readonly string[];
  readonly min?: number;
  readonly max?: number;
}

export interface TypographyPropertySchema extends PropertySchemaBase {
  readonly type: 'typography';
  readonly fontFamilies?: readonly string[];
  readonly fontSizes?: readonly (string | number)[];
  readonly fontWeights?: readonly (string | number)[];
}

export interface BorderPropertySchema extends PropertySchemaBase {
  readonly type: 'border';
  readonly styles?: readonly BorderValue['style'][];
}

export interface ShadowPropertySchema extends PropertySchemaBase {
  readonly type: 'shadow';
  readonly presets?: readonly string[];
}

export interface AlignmentPropertySchema extends PropertySchemaBase {
  readonly type: 'alignment';
  readonly horizontal?: boolean;
  readonly vertical?: boolean;
}

export interface VisibilityPropertySchema extends PropertySchemaBase {
  readonly type: 'visibility';
  readonly allowDisplay?: boolean;
  readonly allowOpacity?: boolean;
}

export type PropertySchema =
  | StringPropertySchema
  | NumberPropertySchema
  | RangePropertySchema
  | BooleanPropertySchema
  | SelectPropertySchema
  | ColorPropertySchema
  | ImagePropertySchema
  | LinkPropertySchema
  | RepeaterPropertySchema
  | GroupPropertySchema
  | MenuPropertySchema
  | TaxonomyPropertySchema
  | ResponsiveColumnsPropertySchema
  | SidebarListPropertySchema
  | SpacingPropertySchema
  | TypographyPropertySchema
  | BorderPropertySchema
  | ShadowPropertySchema
  | AlignmentPropertySchema
  | VisibilityPropertySchema;

export type PropertyFieldMap = Readonly<Record<string, PropertySchema>>;

// ---------------------------------------------------------------------------
// Runtime contracts (no UI — validation & coercion only)
// ---------------------------------------------------------------------------

export interface PropertyValidationError {
  readonly path: string;
  readonly code: string;
  readonly message: string;
}

export interface PropertyValidationResult {
  readonly valid: boolean;
  readonly value: PropertyValue;
  readonly errors: readonly PropertyValidationError[];
}

export interface PropertyCoercionContext {
  readonly breakpoint?: BreakpointSlug;
  readonly locale?: string;
}

export interface PropertyValidator {
  validate(
    schema: PropertySchema,
    value: unknown,
    context?: PropertyCoercionContext,
  ): PropertyValidationResult;
}

export interface PropertyResolver {
  /** Merge defaults → stored values → responsive overrides for a breakpoint. */
  resolve(
    schema: PropertyFieldMap,
    defaults: PropertyRecord,
    stored: PropertyRecord,
    breakpoint: BreakpointSlug,
  ): PropertyRecord;
}

export interface PropertySystem {
  readonly validator: PropertyValidator;
  readonly resolver: PropertyResolver;
  normalize(schema: PropertySchema, value: unknown): PropertyValue;
}

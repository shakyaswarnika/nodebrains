/**
 * NodeBrains Visual Page Builder — public type surface.
 *
 * Architecture-only. No production UI.
 *
 * @package NodeBrains
 */

// Core
export type {
  BreakpointSlug,
  ColorToken,
  ComponentSlug,
  ContainerWidth,
  DocumentVersion,
  EntityId,
  ISODateTime,
  LayoutNodeId,
  SpacingToken,
  Timestamps,
  WidgetInstanceId,
  WidgetTypeId,
} from './core/primitives.js';

export { BREAKPOINT_ORDER } from './core/primitives.js';

export type {
  LayoutDocumentRoot,
  PageDocument,
  PageMeta,
  PageSeoSettings,
  PageSettings,
} from './core/document.js';

export type {
  BuilderDocumentPayload,
  SerializedLayoutGraph,
  SerializedLayoutNodeSnapshot,
  SerializedWidgetSnapshot,
} from './core/payload.js';

// Property System
export type {
  BooleanPropertySchema,
  ButtonValue,
  ColorPropertySchema,
  GroupPropertySchema,
  ImagePropertySchema,
  ImageValue,
  LinkPropertySchema,
  LinkValue,
  MenuPropertySchema,
  MenuValue,
  NumberPropertySchema,
  PropertyCoercionContext,
  PropertyFieldMap,
  PropertyRecord,
  PropertyResolver,
  PropertySchema,
  PropertySchemaBase,
  PropertySystem,
  PropertyType,
  PropertyValidationError,
  PropertyValidationResult,
  PropertyValidator,
  PropertyValue,
  RangePropertySchema,
  RepeaterPropertySchema,
  ResponsiveColumnsPropertySchema,
  SelectPropertySchema,
  SelectOption,
  SidebarListPropertySchema,
  StringPropertySchema,
  TaxonomyPropertySchema,
  TaxonomyValue,
  AlignmentPropertySchema,
  AlignmentValue,
  BorderPropertySchema,
  BorderValue,
  ShadowPropertySchema,
  ShadowValue,
  SpacingPropertySchema,
  SpacingValue,
  TypographyPropertySchema,
  TypographyValue,
  VisibilityPropertySchema,
  VisibilityValue,
} from './property-system/types.js';

// Component Registry
export type {
  ComponentAssetManifest,
  ComponentCapabilities,
  ComponentCategory,
  ComponentDefinition,
  ComponentManifestLoader,
  ComponentRegistry,
  ComponentRegistryEntry,
  ComponentRegistryFilter,
  ComponentRenderClient,
  ComponentRenderRequest,
  ComponentRenderResponse,
} from './component-registry/types.js';

// Widget Registry
export type {
  ComponentWidgetBridge,
  WidgetDefinition,
  WidgetKind,
  WidgetPaletteGroup,
  WidgetRegistry,
  WidgetRegistryFilter,
} from './widget-registry/types.js';

// Widget SDK
export type {
  SerializedWidgetProps,
  WidgetExtensionContribution,
  WidgetExtensionManifest,
  WidgetHookContext,
  WidgetHooks,
  WidgetInspectorControls,
  WidgetMetadata,
  WidgetModule,
  WidgetPreviewContext,
  WidgetPreviewMode,
  WidgetPreviewRenderer,
  WidgetPreviewRequest,
  WidgetPreviewResult,
  WidgetRegistration,
  WidgetRenderContext,
  WidgetRenderInput,
  WidgetRenderOutput,
  WidgetRenderer,
  WidgetResponsiveSettings,
  WidgetSDK,
  WidgetSDKConfig,
  WidgetSDKContext,
  WidgetSerializer,
  WidgetValidationInput,
  WidgetValidator,
} from './widget-sdk/types.js';

// Layout Engine
export type {
  ColumnLayoutNode,
  ColumnSettings,
  ContainerLayoutNode,
  ContainerSettings,
  LayoutBackground,
  LayoutCommand,
  LayoutCommandResult,
  LayoutConstraintValidator,
  LayoutContext,
  LayoutEngine,
  LayoutError,
  LayoutGraph,
  LayoutNode,
  LayoutNodeBase,
  LayoutNodeType,
  LayoutSpacing,
  ResponsiveOrder,
  ResponsiveSpan,
  RootLayoutNode,
  RowLayoutNode,
  RowSettings,
  SectionLayoutNode,
  SectionSettings,
  TemplateRefLayoutNode,
  WidgetInstance,
  WidgetLayoutNode,
} from './layout-engine/types.js';

// Responsive Engine
export type {
  BreakpointConfig,
  BreakpointDefinition,
  ResponsiveEngine,
  ResponsivePreviewController,
  ResponsivePreviewState,
  ResponsivePropertyMap,
  ResponsiveResolveContext,
  ResponsiveResolver,
  ResponsiveStyleMap,
  ResponsiveValue,
} from './responsive-engine/types.js';

// JSON Schema
export type {
  DocumentMigration,
  DocumentMigrationRegistry,
  DocumentSerializer,
  DocumentValidationIssue,
  DocumentValidationResult,
  DocumentValidator,
  JsonSchema,
  JsonSchemaArray,
  JsonSchemaBase,
  JsonSchemaBoolean,
  JsonSchemaNumber,
  JsonSchemaObject,
  JsonSchemaRegistry,
  JsonSchemaString,
  JsonSchemaType,
  PropertySchemaCompiler,
  SchemaRegistryEntry,
} from './json-schema/types.js';

export {
  CURRENT_DOCUMENT_VERSION,
  DOCUMENT_SCHEMA_ID,
  PAGE_DOCUMENT_SCHEMA_SKELETON,
} from './json-schema/document-schema.js';

export {
  BUILDER_DOCUMENT_PAYLOAD_SCHEMA,
  LAYOUT_GRAPH_SCHEMA,
  LAYOUT_NODE_SNAPSHOT_SCHEMA,
} from './json-schema/layout-schema.js';

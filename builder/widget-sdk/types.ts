/**
 * Widget SDK — extension API for third-party and theme widgets.
 *
 * Every widget must provide: metadata, default props, validation,
 * inspector controls, renderer, responsive settings, registration,
 * and serialization.
 *
 * @package NodeBrains
 */

import type { BreakpointSlug, WidgetInstanceId, WidgetTypeId } from '../core/primitives.js';
import type { WidgetInstance } from '../layout-engine/types.js';
import type {
  PropertyFieldMap,
  PropertyRecord,
  PropertyValidationResult,
} from '../property-system/types.js';
import type { ResponsiveValue } from '../responsive-engine/types.js';
import type { WidgetDefinition, WidgetKind } from '../widget-registry/types.js';
import type { LayoutContext } from '../layout-engine/types.js';

// ---------------------------------------------------------------------------
// Widget metadata
// ---------------------------------------------------------------------------

export interface WidgetMetadata {
  readonly type: WidgetTypeId;
  readonly name: string;
  readonly description?: string;
  readonly icon?: string;
  readonly version: string;
  readonly kind: WidgetKind;
  readonly category: WidgetDefinition['category'];
  readonly paletteGroup: string;
  readonly keywords?: readonly string[];
  readonly componentSlug?: WidgetDefinition['componentSlug'];
  readonly deprecated?: boolean;
  readonly replacedBy?: WidgetTypeId;
}

// ---------------------------------------------------------------------------
// Responsive settings
// ---------------------------------------------------------------------------

export interface WidgetResponsiveSettings {
  /** Property keys that accept per-breakpoint values. */
  readonly fields: readonly string[];
}

// ---------------------------------------------------------------------------
// Inspector controls (schema-driven — no UI in contracts)
// ---------------------------------------------------------------------------

export type WidgetInspectorControls = PropertyFieldMap;

// ---------------------------------------------------------------------------
// Renderer contracts
// ---------------------------------------------------------------------------

export type WidgetPreviewMode = 'server' | 'client' | 'hybrid';

export interface WidgetRenderContext {
  readonly instanceId: WidgetInstanceId;
  readonly type: WidgetTypeId;
  readonly breakpoint: BreakpointSlug;
  readonly isEditor: boolean;
  readonly layout?: LayoutContext;
}

export interface WidgetRenderInput {
  readonly props: PropertyRecord;
  readonly context: WidgetRenderContext;
}

/** Client-side render output (HTML string for contract portability). */
export interface WidgetRenderOutput {
  readonly html: string;
  readonly className?: string;
}

export interface WidgetRenderer {
  readonly mode: WidgetPreviewMode;
  render(input: WidgetRenderInput): WidgetRenderOutput | Promise<WidgetRenderOutput>;
}

export interface WidgetPreviewContext {
  readonly instanceId: WidgetInstanceId;
  readonly breakpoint: BreakpointSlug;
  readonly layout: LayoutContext;
  readonly isEditor: boolean;
}

export interface WidgetPreviewRequest {
  readonly type: WidgetTypeId;
  readonly props: PropertyRecord;
  readonly context: WidgetPreviewContext;
}

export interface WidgetPreviewResult {
  readonly html: string;
  readonly css?: readonly string[];
  readonly js?: readonly string[];
}

export interface WidgetPreviewRenderer {
  readonly mode: WidgetPreviewMode;
  render(request: WidgetPreviewRequest): Promise<WidgetPreviewResult>;
}

// ---------------------------------------------------------------------------
// Validation (Interface Segregation)
// ---------------------------------------------------------------------------

export interface WidgetValidationInput {
  readonly type: WidgetTypeId;
  readonly props: PropertyRecord;
  readonly breakpoint?: BreakpointSlug;
}

export interface WidgetValidator {
  validate(input: WidgetValidationInput): PropertyValidationResult;
}

// ---------------------------------------------------------------------------
// Serialization (Interface Segregation)
// ---------------------------------------------------------------------------

export interface SerializedWidgetProps {
  readonly type: WidgetTypeId;
  readonly props: PropertyRecord;
  readonly responsiveOverrides?: Readonly<Record<string, ResponsiveValue<unknown>>>;
}

export interface WidgetSerializer {
  serialize(instance: WidgetInstance): SerializedWidgetProps;
  deserialize(payload: SerializedWidgetProps, instanceId: WidgetInstanceId): WidgetInstance;
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

export interface WidgetRegistration {
  readonly metadata: WidgetMetadata;
  readonly defaults: PropertyRecord;
  readonly schema: WidgetInspectorControls;
  readonly responsive: WidgetResponsiveSettings;
  readonly renderer: WidgetRenderer;
  readonly hooks?: WidgetHooks;
}

export interface WidgetModule {
  readonly registration: WidgetRegistration;
  toDefinition(): WidgetDefinition;
  createInstance(instanceId: WidgetInstanceId, overrides?: PropertyRecord): WidgetInstance;
  resolveProps(stored: PropertyRecord, breakpoint: BreakpointSlug): PropertyRecord;
  validate(props: PropertyRecord, breakpoint?: BreakpointSlug): PropertyValidationResult;
  serialize(instance: WidgetInstance): SerializedWidgetProps;
  deserialize(payload: SerializedWidgetProps, instanceId: WidgetInstanceId): WidgetInstance;
}

// ---------------------------------------------------------------------------
// Lifecycle hooks
// ---------------------------------------------------------------------------

export interface WidgetHookContext {
  readonly instanceId: WidgetInstanceId;
  readonly type: WidgetTypeId;
  readonly props: PropertyRecord;
}

export interface WidgetHooks {
  readonly onRegister?: (definition: WidgetDefinition) => void;
  readonly onBeforeSave?: (ctx: WidgetHookContext) => PropertyRecord | void;
  readonly onAfterSave?: (ctx: WidgetHookContext) => void;
  readonly onValidate?: (ctx: WidgetHookContext) => PropertyValidationResult | void;
  readonly onDuplicate?: (ctx: WidgetHookContext) => PropertyRecord | void;
  readonly onDelete?: (ctx: WidgetHookContext) => void;
}

// ---------------------------------------------------------------------------
// Extension manifest
// ---------------------------------------------------------------------------

export interface WidgetExtensionManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly widgets: readonly WidgetExtensionContribution[];
}

export interface WidgetExtensionContribution {
  readonly module: WidgetModule;
  readonly hooks?: WidgetHooks;
}

// ---------------------------------------------------------------------------
// SDK surface
// ---------------------------------------------------------------------------

export interface WidgetSDKContext {
  readonly registerWidget: (module: WidgetModule) => void;
  readonly unregisterWidget: (type: WidgetTypeId) => void;
  readonly getModule: (type: WidgetTypeId) => WidgetModule | undefined;
  readonly getSchema: (type: WidgetTypeId) => PropertyFieldMap | undefined;
}

export interface WidgetSDK {
  readonly version: string;
  readonly registry: import('../widget-registry/types.js').WidgetRegistry;
  readonly validator: WidgetValidator;
  readonly serializer: WidgetSerializer;
  createContext(): WidgetSDKContext;
  register(module: WidgetModule): void;
  unregister(type: WidgetTypeId): void;
  getModule(type: WidgetTypeId): WidgetModule | undefined;
  loadExtension(manifest: WidgetExtensionManifest): void;
  unloadExtension(extensionId: string): void;
}

export interface WidgetSDKConfig {
  readonly allowedExtensionOrigins?: readonly string[];
  readonly enableThirdPartyWidgets?: boolean;
}

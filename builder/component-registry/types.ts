/**
 * Component Registry — server-side PHP component catalog bridge.
 *
 * Describes theme components registered in `inc/components/registry.php`
 * and their PHP render contracts (`get_defaults`, `get_builder_schema`).
 *
 * @package NodeBrains
 */

import type { ComponentSlug } from '../core/primitives.js';
import type { PropertyFieldMap } from '../property-system/types.js';

export type ComponentCategory =
  | 'atomic'
  | 'layout'
  | 'content'
  | 'media'
  | 'navigation'
  | 'forms'
  | 'commerce'
  | 'utility';

export interface ComponentAssetManifest {
  readonly style?: string | null;
  readonly script?: string | null;
}

/**
 * Static metadata exported from PHP (via REST or build-time manifest).
 */
export interface ComponentDefinition {
  readonly slug: ComponentSlug;
  readonly name: string;
  readonly description?: string;
  readonly category: ComponentCategory;
  readonly icon?: string;
  readonly keywords?: readonly string[];
  readonly assets: ComponentAssetManifest;
  readonly supports: ComponentCapabilities;
  readonly schema: PropertyFieldMap;
  readonly defaults: Readonly<Record<string, unknown>>;
}

export interface ComponentCapabilities {
  readonly innerBlocks?: boolean;
  readonly anchor?: boolean;
  readonly responsive?: boolean;
  readonly equalHeight?: boolean;
  readonly repeaterFields?: readonly string[];
}

export interface ComponentRegistryEntry extends ComponentDefinition {
  readonly version: string;
  readonly deprecated?: boolean;
  readonly replacedBy?: ComponentSlug;
}

export interface ComponentRegistryFilter {
  readonly category?: ComponentCategory;
  readonly keyword?: string;
  readonly includeDeprecated?: boolean;
}

export interface ComponentRegistry {
  register(entry: ComponentRegistryEntry): void;
  unregister(slug: ComponentSlug): void;
  get(slug: ComponentSlug): ComponentRegistryEntry | undefined;
  has(slug: ComponentSlug): boolean;
  list(filter?: ComponentRegistryFilter): readonly ComponentRegistryEntry[];
  getSchema(slug: ComponentSlug): PropertyFieldMap | undefined;
  getDefaults(slug: ComponentSlug): Readonly<Record<string, unknown>> | undefined;
}

/**
 * Adapter that hydrates the registry from a PHP-generated manifest
 * (`GET /wp-json/nodebrains/v1/components`).
 */
export interface ComponentManifestLoader {
  load(): Promise<readonly ComponentRegistryEntry[]>;
  refresh(): Promise<readonly ComponentRegistryEntry[]>;
}

export interface ComponentRenderRequest {
  readonly slug: ComponentSlug;
  readonly props: Readonly<Record<string, unknown>>;
  readonly preview?: boolean;
}

export interface ComponentRenderResponse {
  readonly html: string;
  readonly assets: readonly string[];
}

export interface ComponentRenderClient {
  render(request: ComponentRenderRequest): Promise<ComponentRenderResponse>;
}

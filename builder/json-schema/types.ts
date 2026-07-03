/**
 * JSON Schema layer — document validation and serialization contracts.
 *
 * Uses JSON Schema draft 2020-12 semantics as TypeScript interfaces.
 * Runtime validators (Ajv, etc.) implement these contracts later.
 *
 * @package NodeBrains
 */

import type { DocumentVersion } from '../core/primitives.js';
import type { LayoutGraph } from '../layout-engine/types.js';
import type { PageDocument } from '../core/document.js';
import type { PropertyFieldMap } from '../property-system/types.js';

// ---------------------------------------------------------------------------
// JSON Schema meta-types (subset for builder use)
// ---------------------------------------------------------------------------

export type JsonSchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';

export interface JsonSchemaBase {
  readonly $id?: string;
  readonly $schema?: string;
  readonly title?: string;
  readonly description?: string;
  readonly type?: JsonSchemaType | readonly JsonSchemaType[];
  readonly enum?: readonly (string | number | boolean | null)[];
  readonly const?: string | number | boolean | null;
  readonly default?: unknown;
  readonly examples?: readonly unknown[];
}

export interface JsonSchemaString extends JsonSchemaBase {
  readonly type: 'string';
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly format?: 'uri' | 'email' | 'date-time' | 'uuid';
  readonly pattern?: string;
}

export interface JsonSchemaNumber extends JsonSchemaBase {
  readonly type: 'number' | 'integer';
  readonly minimum?: number;
  readonly maximum?: number;
  readonly multipleOf?: number;
}

export interface JsonSchemaBoolean extends JsonSchemaBase {
  readonly type: 'boolean';
}

export interface JsonSchemaArray extends JsonSchemaBase {
  readonly type: 'array';
  readonly items: JsonSchema;
  readonly minItems?: number;
  readonly maxItems?: number;
}

export interface JsonSchemaObject extends JsonSchemaBase {
  readonly type: 'object';
  readonly properties?: Readonly<Record<string, JsonSchema>>;
  readonly required?: readonly string[];
  readonly additionalProperties?: boolean | JsonSchema;
  readonly propertyNames?: JsonSchemaString;
}

export type JsonSchema =
  | JsonSchemaString
  | JsonSchemaNumber
  | JsonSchemaBoolean
  | JsonSchemaArray
  | JsonSchemaObject;

// ---------------------------------------------------------------------------
// Builder-specific schema registry
// ---------------------------------------------------------------------------

export interface SchemaRegistryEntry {
  readonly id: string;
  readonly version: DocumentVersion;
  readonly schema: JsonSchema;
}

export interface JsonSchemaRegistry {
  register(entry: SchemaRegistryEntry): void;
  get(id: string, version?: DocumentVersion): SchemaRegistryEntry | undefined;
  list(): readonly SchemaRegistryEntry[];
}

// ---------------------------------------------------------------------------
// Property → JSON Schema compiler
// ---------------------------------------------------------------------------

export interface PropertySchemaCompiler {
  compile(fields: PropertyFieldMap): JsonSchemaObject;
  compileField(key: string, field: PropertyFieldMap[string]): JsonSchema;
}

// ---------------------------------------------------------------------------
// Document validation
// ---------------------------------------------------------------------------

export interface DocumentValidationIssue {
  readonly path: string;
  readonly keyword: string;
  readonly message: string;
  readonly params?: Readonly<Record<string, unknown>>;
}

export interface DocumentValidationResult {
  readonly valid: boolean;
  readonly document?: PageDocument;
  readonly issues: readonly DocumentValidationIssue[];
}

export interface DocumentValidator {
  validate(document: unknown): DocumentValidationResult;
  validateGraph(graph: LayoutGraph): DocumentValidationResult;
  getSupportedVersions(): readonly DocumentVersion[];
}

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

export interface DocumentSerializer {
  readonly version: DocumentVersion;
  serialize(document: PageDocument): string;
  deserialize(payload: string): PageDocument;
  migrate(payload: string, fromVersion: DocumentVersion): PageDocument;
}

export interface DocumentMigration {
  readonly from: DocumentVersion;
  readonly to: DocumentVersion;
  migrate(document: PageDocument): PageDocument;
}

export interface DocumentMigrationRegistry {
  register(migration: DocumentMigration): void;
  migrate(document: PageDocument, targetVersion: DocumentVersion): PageDocument;
}

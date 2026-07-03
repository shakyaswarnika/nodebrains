/**
 * Canonical JSON Schema identifiers and structural constants for page documents.
 *
 * @package NodeBrains
 */

import type { DocumentVersion } from '../core/primitives.js';
import type { JsonSchemaObject } from './types.js';

export const DOCUMENT_SCHEMA_ID = 'https://nodebrains.com/schemas/page-document.json' as const;

export const CURRENT_DOCUMENT_VERSION: DocumentVersion = '1.0.0';

/**
 * Top-level document JSON Schema shape (structural skeleton).
 * Property-level schemas are compiled per widget via PropertySchemaCompiler.
 */
export const PAGE_DOCUMENT_SCHEMA_SKELETON: JsonSchemaObject = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: DOCUMENT_SCHEMA_ID,
  title: 'NodeBrains Page Document',
  type: 'object',
  required: ['version', 'meta', 'root'],
  additionalProperties: false,
  properties: {
    version: {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      const: CURRENT_DOCUMENT_VERSION,
    },
    meta: {
      type: 'object',
      required: ['title', 'status', 'timestamps'],
      additionalProperties: false,
      properties: {
        title: { type: 'string', minLength: 1 },
        slug: { type: 'string' },
        status: { type: 'string', enum: ['draft', 'published', 'archived'] },
        locale: { type: 'string' },
        timestamps: {
          type: 'object',
          required: ['createdAt', 'updatedAt'],
          properties: {
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    root: {
      type: 'object',
      required: ['id', 'type', 'children'],
      properties: {
        id: { type: 'string' },
        type: { type: 'string', const: 'root' },
        children: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    settings: {
      type: 'object',
      additionalProperties: true,
    },
  },
};

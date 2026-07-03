/**
 * JSON Schema skeleton for layout graph serialization.
 *
 * @package NodeBrains
 */

import type { JsonSchemaObject } from './types.js';

const responsiveSpanSchema: JsonSchemaObject = {
	type: 'object',
	additionalProperties: false,
	properties: {
		base: { type: 'integer', minimum: 1, maximum: 12 },
		sm: { type: 'integer', minimum: 1, maximum: 12 },
		md: { type: 'integer', minimum: 1, maximum: 12 },
		lg: { type: 'integer', minimum: 1, maximum: 12 },
		xl: { type: 'integer', minimum: 1, maximum: 12 },
	},
};

export const LAYOUT_NODE_SNAPSHOT_SCHEMA: JsonSchemaObject = {
	type: 'object',
	required: ['id', 'type', 'parentId', 'children'],
	additionalProperties: false,
	properties: {
		id: { type: 'string', minLength: 1 },
		type: {
			type: 'string',
			enum: ['root', 'section', 'container', 'row', 'column', 'widget', 'template-ref'],
		},
		parentId: { type: 'string' },
		children: {
			type: 'array',
			items: { type: 'string' },
		},
		locked: { type: 'boolean' },
		hidden: { type: 'boolean' },
		className: { type: 'string' },
		anchorId: { type: 'string' },
		settings: {
			type: 'object',
			additionalProperties: true,
			properties: {
				span: responsiveSpanSchema,
			},
		},
		widgetInstanceId: { type: 'string' },
		templateId: { type: 'string' },
	},
};

export const LAYOUT_GRAPH_SCHEMA: JsonSchemaObject = {
	type: 'object',
	required: ['rootId', 'nodes', 'widgets'],
	additionalProperties: false,
	properties: {
		rootId: { type: 'string', minLength: 1 },
		nodes: {
			type: 'object',
			additionalProperties: LAYOUT_NODE_SNAPSHOT_SCHEMA,
		},
		widgets: {
			type: 'object',
			additionalProperties: {
				type: 'object',
				required: ['id', 'type', 'props'],
				additionalProperties: false,
				properties: {
					id: { type: 'string' },
					type: { type: 'string' },
					componentSlug: { type: 'string' },
					props: { type: 'object', additionalProperties: true },
				},
			},
		},
	},
};

export const BUILDER_DOCUMENT_PAYLOAD_SCHEMA: JsonSchemaObject = {
	type: 'object',
	required: ['version', 'meta', 'root', 'graph'],
	additionalProperties: false,
	properties: {
		version: {
			type: 'string',
			pattern: '^\\d+\\.\\d+\\.\\d+$',
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
			additionalProperties: false,
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
		graph: LAYOUT_GRAPH_SCHEMA,
	},
};

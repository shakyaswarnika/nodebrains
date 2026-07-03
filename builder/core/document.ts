/**
 * Page document model — persisted builder state.
 *
 * @package NodeBrains
 */

import type {
  DocumentVersion,
  LayoutNodeId,
  Timestamps,
} from './primitives.js';

export interface PageMeta {
  readonly title: string;
  readonly slug?: string;
  readonly status: 'draft' | 'published' | 'archived';
  readonly locale?: string;
  readonly timestamps: Timestamps;
}

export interface PageSettings {
  readonly containerWidth?: string;
  readonly customCss?: string;
  readonly seo?: PageSeoSettings;
}

export interface PageSeoSettings {
  readonly title?: string;
  readonly description?: string;
  readonly canonicalUrl?: string;
  readonly noindex?: boolean;
}

/**
 * Top-level persisted document exchanged between editor, REST API, and PHP.
 */
export interface PageDocument {
  readonly version: DocumentVersion;
  readonly meta: PageMeta;
  readonly root: LayoutDocumentRoot;
  readonly settings?: PageSettings;
}

export interface LayoutDocumentRoot {
  readonly id: LayoutNodeId;
  readonly type: 'root';
  readonly children: readonly LayoutNodeId[];
}

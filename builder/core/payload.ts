/**
 * Builder document payload — persisted editor state with layout graph.
 *
 * @package NodeBrains
 */

import type { PageDocument } from './document.js';
import type { LayoutNodeId } from './primitives.js';

export interface SerializedLayoutNodeSnapshot {
	readonly id: string;
	readonly type: string;
	readonly parentId: string | null;
	readonly children: readonly string[];
	readonly locked?: boolean;
	readonly hidden?: boolean;
	readonly className?: string;
	readonly anchorId?: string;
	readonly settings?: Readonly<Record<string, unknown>>;
	readonly widgetInstanceId?: string;
	readonly templateId?: string;
}

export interface SerializedWidgetSnapshot {
	readonly id: string;
	readonly type: string;
	readonly componentSlug?: string;
	readonly props: Readonly<Record<string, unknown>>;
}

export interface SerializedLayoutGraph {
	readonly rootId: string;
	readonly nodes: Readonly<Record<string, SerializedLayoutNodeSnapshot>>;
	readonly widgets: Readonly<Record<string, SerializedWidgetSnapshot>>;
}

/**
 * Full persisted payload exchanged between editor, REST API, and PHP render.
 */
export interface BuilderDocumentPayload {
	readonly version: PageDocument['version'];
	readonly meta: PageDocument['meta'];
	readonly root: {
		readonly id: LayoutNodeId;
		readonly type: 'root';
		readonly children: readonly LayoutNodeId[];
	};
	readonly settings?: PageDocument['settings'];
	readonly graph: SerializedLayoutGraph;
}

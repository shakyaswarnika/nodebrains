'use client';

import { useEffect, useRef } from 'react';

import {
	fetchPageLayout,
	getNodeBuilderConfig,
	savePageLayout,
	type PersistedLayoutPayload,
} from '@builder/lib/wp-bridge';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { PageDocument } from '@theme/builder/core/document';
import type { LayoutGraph } from '@theme/builder/layout-engine/types';

const SAVE_DEBOUNCE_MS = 1200;

function isLayoutGraph(value: unknown): value is LayoutGraph {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const graph = value as LayoutGraph;

	return typeof graph.rootId === 'string' && typeof graph.nodes === 'object' && typeof graph.widgets === 'object';
}

function isPageDocument(value: unknown): value is PageDocument {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const document = value as PageDocument;

	return typeof document.version === 'string' && typeof document.meta === 'object';
}

function buildPersistedPayload(
	graph: LayoutGraph,
	document: PageDocument,
): PersistedLayoutPayload {
	return {
		sections: [],
		graph,
		document,
	};
}

export function WordPressBridge(): null {
	const config = getNodeBuilderConfig();
	const hydrateLayout = useBuilderStore((state) => state.hydrateLayout);
	const graph = useBuilderStore((state) => state.graph);
	const document = useBuilderStore((state) => state.document);
	const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const hasLoadedRef = useRef(false);
	const skipNextSaveRef = useRef(true);

	useEffect(() => {
		if (!config?.pageId) {
			return;
		}

		let cancelled = false;

		void fetchPageLayout(config.pageId)
			.then((layout) => {
				if (cancelled) {
					return;
				}

				hydrateLayout({
					graph: isLayoutGraph(layout.graph) ? layout.graph : undefined,
					document: isPageDocument(layout.document) ? layout.document : undefined,
				});

				hasLoadedRef.current = true;
				skipNextSaveRef.current = true;
			})
			.catch(() => {
				hasLoadedRef.current = true;
			});

		return () => {
			cancelled = true;
		};
	}, [config?.pageId, hydrateLayout]);

	useEffect(() => {
		if (!config?.pageId || !hasLoadedRef.current) {
			return;
		}

		if (skipNextSaveRef.current) {
			skipNextSaveRef.current = false;
			return;
		}

		if (saveTimerRef.current) {
			clearTimeout(saveTimerRef.current);
		}

		saveTimerRef.current = setTimeout(() => {
			const payload = buildPersistedPayload(graph, document);

			void savePageLayout(config.pageId, payload).catch(() => {
				// Persistence errors are intentionally silent for now.
			});
		}, SAVE_DEBOUNCE_MS);

		return () => {
			if (saveTimerRef.current) {
				clearTimeout(saveTimerRef.current);
			}
		};
	}, [config?.pageId, document, graph]);

	return null;
}

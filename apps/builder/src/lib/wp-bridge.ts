export interface NodeBuilderConfig {
	readonly pageId: number;
	readonly restUrl: string;
	readonly nonce: string;
	readonly theme: string;
}

export interface PersistedLayoutPayload {
	readonly sections?: readonly unknown[];
	readonly graph?: unknown;
	readonly document?: unknown;
	readonly version?: string;
	readonly meta?: unknown;
	readonly root?: unknown;
	readonly settings?: unknown;
}

declare global {
	interface Window {
		NodeBuilder?: NodeBuilderConfig;
	}
}

export function getNodeBuilderConfig(): NodeBuilderConfig | null {
	if (typeof window === 'undefined' || !window.NodeBuilder) {
		return null;
	}

	return window.NodeBuilder;
}

export async function fetchPageLayout(pageId: number): Promise<PersistedLayoutPayload> {
	const config = getNodeBuilderConfig();

	if (!config) {
		return { sections: [] };
	}

	const response = await fetch(`${config.restUrl}/layout/${pageId}`, {
		headers: {
			'X-WP-Nonce': config.nonce,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to load layout (${response.status})`);
	}

	return (await response.json()) as PersistedLayoutPayload;
}

export async function savePageLayout(
	pageId: number,
	payload: PersistedLayoutPayload,
): Promise<PersistedLayoutPayload> {
	const config = getNodeBuilderConfig();

	if (!config) {
		throw new Error('Node Builder configuration is missing.');
	}

	const response = await fetch(`${config.restUrl}/layout/${pageId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': config.nonce,
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error(`Failed to save layout (${response.status})`);
	}

	const result = (await response.json()) as { layout?: PersistedLayoutPayload };

	return result.layout ?? payload;
}

export const BUILDER_DRAG_MIME = 'application/x-nodebrains-builder';

export function serializeDragPayload(payload: unknown): string {
	return JSON.stringify(payload);
}

export function parseDragPayload<T>(data: string): T | null {
	try {
		return JSON.parse(data) as T;
	} catch {
		return null;
	}
}

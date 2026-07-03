import type { BreakpointSlug } from '@theme/builder/core/primitives';

/** Editor-facing device presets mapped to technical breakpoint slugs. */
export type EditorDeviceSlug = 'mobile' | 'tablet' | 'desktop';

export interface EditorBreakpointDefinition {
	readonly id: EditorDeviceSlug;
	readonly label: string;
	readonly slug: BreakpointSlug;
	readonly previewWidth: number;
	readonly minWidth: number;
	readonly description: string;
}

export const EDITOR_BREAKPOINTS: readonly EditorBreakpointDefinition[] = [
	{
		id: 'mobile',
		label: 'Mobile',
		slug: 'base',
		previewWidth: 390,
		minWidth: 0,
		description: 'Base styles — inherited by tablet and desktop unless overridden.',
	},
	{
		id: 'tablet',
		label: 'Tablet',
		slug: 'md',
		previewWidth: 768,
		minWidth: 768,
		description: 'Tablet overrides — inherits from mobile when not set.',
	},
	{
		id: 'desktop',
		label: 'Desktop',
		slug: 'lg',
		previewWidth: 1280,
		minWidth: 1024,
		description: 'Desktop overrides — inherits from tablet and mobile when not set.',
	},
] as const;

export function getEditorBreakpoint(id: EditorDeviceSlug): EditorBreakpointDefinition {
	const match = EDITOR_BREAKPOINTS.find((entry) => entry.id === id);

	if (!match) {
		return EDITOR_BREAKPOINTS[0]!;
	}

	return match;
}

export function getEditorBreakpointBySlug(slug: BreakpointSlug): EditorBreakpointDefinition {
	const match = EDITOR_BREAKPOINTS.find((entry) => entry.slug === slug);

	if (match) {
		return match;
	}

	if (slug === 'sm') {
		return EDITOR_BREAKPOINTS[1]!;
	}

	if (slug === 'xl') {
		return EDITOR_BREAKPOINTS[2]!;
	}

	return EDITOR_BREAKPOINTS[0]!;
}

export function getTechnicalBreakpoint(device: EditorDeviceSlug): BreakpointSlug {
	return getEditorBreakpoint(device).slug;
}

export function getPreviewWidth(device: EditorDeviceSlug): number {
	return getEditorBreakpoint(device).previewWidth;
}

export function listEditorDevices(): readonly EditorBreakpointDefinition[] {
	return EDITOR_BREAKPOINTS;
}

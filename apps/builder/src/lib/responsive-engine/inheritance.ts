import { BREAKPOINT_ORDER } from '@theme/builder/core/primitives';
import type { BreakpointSlug } from '@theme/builder/core/primitives';
import type { ResponsiveValue } from '@theme/builder/responsive-engine/types';

import { getEditorBreakpointBySlug } from './editor-breakpoints';
import { resolveResponsiveValue } from './resolver';

const BREAKPOINT_CASCADE: readonly BreakpointSlug[] = ['base', ...BREAKPOINT_ORDER];

type ResponsiveObject<T> = {
	readonly base?: T;
	readonly sm?: T;
	readonly md?: T;
	readonly lg?: T;
	readonly xl?: T;
};

export interface ResponsiveInheritanceInfo<T = unknown> {
	readonly resolved: T | undefined;
	readonly hasOverride: boolean;
	readonly inherited: boolean;
	readonly sourceBreakpoint: BreakpointSlug | null;
	readonly sourceLabel: string | null;
	readonly overrideBreakpoints: readonly BreakpointSlug[];
}

function isResponsiveObject(value: unknown): value is ResponsiveObject<unknown> {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return false;
	}

	return (
		'base' in value ||
		'sm' in value ||
		'md' in value ||
		'lg' in value ||
		'xl' in value
	);
}

export function getOverrideBreakpoints(value: unknown): BreakpointSlug[] {
	if (!isResponsiveObject(value)) {
		return [];
	}

	return BREAKPOINT_CASCADE.filter(
		(slug) => value[slug as keyof ResponsiveObject<unknown>] !== undefined,
	);
}

export function hasDirectOverride(value: unknown, breakpoint: BreakpointSlug): boolean {
	if (!isResponsiveObject(value) || breakpoint === 'base') {
		return !isResponsiveObject(value) && breakpoint === 'base';
	}

	return value[breakpoint as keyof ResponsiveObject<unknown>] !== undefined;
}

export function getInheritanceSourceBreakpoint(
	value: unknown,
	breakpoint: BreakpointSlug,
): BreakpointSlug | null {
	if (!isResponsiveObject(value)) {
		return breakpoint === 'base' ? 'base' : 'base';
	}

	if (hasDirectOverride(value, breakpoint)) {
		return breakpoint;
	}

	const targetIndex = BREAKPOINT_CASCADE.indexOf(breakpoint);

	for (let index = targetIndex; index >= 0; index -= 1) {
		const slug = BREAKPOINT_CASCADE[index]!;
		const candidate = value[slug as keyof ResponsiveObject<unknown>];

		if (candidate !== undefined) {
			return slug;
		}
	}

	return null;
}

export function getResponsiveInheritance<T>(
	value: ResponsiveValue<T> | T | undefined,
	breakpoint: BreakpointSlug,
): ResponsiveInheritanceInfo<T> {
	const resolved = resolveResponsiveValue(value as ResponsiveValue<T>, breakpoint);
	const overrideBreakpoints = getOverrideBreakpoints(value);
	const hasOverride = hasDirectOverride(value, breakpoint);
	const sourceBreakpoint = getInheritanceSourceBreakpoint(value, breakpoint);
	const inherited =
		isResponsiveObject(value) && !hasOverride && breakpoint !== 'base' && sourceBreakpoint !== breakpoint;

	return {
		resolved,
		hasOverride,
		inherited,
		sourceBreakpoint,
		sourceLabel: sourceBreakpoint ? getEditorBreakpointBySlug(sourceBreakpoint).label : null,
		overrideBreakpoints,
	};
}

export function writeResponsiveOverride<T>(
	currentValue: ResponsiveValue<T> | T | undefined,
	breakpoint: BreakpointSlug,
	nextValue: T,
): ResponsiveValue<T> {
	if (breakpoint === 'base') {
		return nextValue;
	}

	if (!isResponsiveObject(currentValue)) {
		return {
			base: currentValue as T | undefined,
			[breakpoint]: nextValue,
		} as ResponsiveValue<T>;
	}

	return {
		...currentValue,
		[breakpoint]: nextValue,
	};
}

export function clearResponsiveOverride<T>(
	currentValue: ResponsiveValue<T> | T | undefined,
	breakpoint: BreakpointSlug,
): ResponsiveValue<T> | T | undefined {
	if (!isResponsiveObject(currentValue) || breakpoint === 'base') {
		return currentValue;
	}

	const next = { ...currentValue };
	delete next[breakpoint as keyof ResponsiveObject<T>];

	const keys = Object.keys(next);

	if (keys.length === 0) {
		return undefined;
	}

	if (keys.length === 1 && next.base !== undefined) {
		return next.base;
	}

	return next;
}

export function countResponsiveOverrides(props: Record<string, unknown>): number {
	let count = 0;

	for (const value of Object.values(props)) {
		if (getOverrideBreakpoints(value).length > 0) {
			count += 1;
		}
	}

	return count;
}

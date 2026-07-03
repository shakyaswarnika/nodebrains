import { BREAKPOINT_ORDER } from '@theme/builder/core/primitives';
import type { BreakpointSlug } from '@theme/builder/core/primitives';
import type {
	BreakpointConfig,
	BreakpointDefinition,
	ResponsiveResolveContext,
	ResponsiveResolver,
	ResponsiveValue,
} from '@theme/builder/responsive-engine/types';
import type { PropertyRecord, PropertyValue } from '@theme/builder/property-system/types';

const BREAKPOINT_CASCADE: readonly BreakpointSlug[] = ['base', ...BREAKPOINT_ORDER];

type ResponsiveObject<T> = {
	readonly base?: T;
	readonly sm?: T;
	readonly md?: T;
	readonly lg?: T;
	readonly xl?: T;
};

function isResponsiveObject<T>(value: ResponsiveValue<T>): value is ResponsiveObject<T> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function resolveResponsiveValue<T>(
	value: ResponsiveValue<T> | undefined,
	breakpoint: BreakpointSlug,
): T | undefined {
	if (value === undefined) {
		return undefined;
	}

	if (!isResponsiveObject(value)) {
		return value as T;
	}

	const targetIndex = BREAKPOINT_CASCADE.indexOf(breakpoint);
	let resolved: T | undefined;

	for (let index = 0; index <= targetIndex; index += 1) {
		const slug = BREAKPOINT_CASCADE[index] as keyof ResponsiveObject<T>;
		const candidate = value[slug];

		if (candidate !== undefined) {
			resolved = candidate;
		}
	}

	return resolved;
}

export function setResponsiveValueAtBreakpoint<T>(
	value: ResponsiveValue<T> | undefined,
	breakpoint: BreakpointSlug,
	nextValue: T,
): ResponsiveValue<T> {
	if (value === undefined || !isResponsiveObject(value)) {
		if (breakpoint === 'base') {
			return nextValue;
		}

		const baseValue = value === undefined ? undefined : (value as T);

		return {
			...(baseValue !== undefined ? { base: baseValue } : {}),
			[breakpoint]: nextValue,
		} as ResponsiveValue<T>;
	}

	return {
		...value,
		[breakpoint]: nextValue,
	};
}

export function matchBreakpoint(width: number, breakpoints: readonly BreakpointDefinition[]): BreakpointSlug {
	let matched: BreakpointSlug = 'base';

	for (const breakpoint of breakpoints) {
		if (width >= breakpoint.minWidth) {
			matched = breakpoint.slug;
		}
	}

	return matched;
}

export function createResponsiveResolver(): ResponsiveResolver {
	return {
		resolve<T>(value: ResponsiveValue<T>, context: ResponsiveResolveContext): T | undefined {
			if (context.cascade === false && isResponsiveObject(value)) {
				return value[context.breakpoint as keyof ResponsiveObject<T>];
			}

			return resolveResponsiveValue(value, context.breakpoint);
		},

		flattenProps(props, breakpoint) {
			const flattened: Record<string, PropertyValue> = {};

			for (const [key, value] of Object.entries(props)) {
				const resolved = resolveResponsiveValue(
					value as ResponsiveValue<PropertyValue>,
					breakpoint,
				);

				if (resolved !== undefined) {
					flattened[key] = resolved;
				}
			}

			return flattened as PropertyRecord;
		},

		resolveStyles(styles, breakpoint) {
			const resolved: Record<string, string> = {};

			for (const [key, value] of Object.entries(styles)) {
				if (key === 'custom') {
					continue;
				}

				const resolvedValue = resolveResponsiveValue(value as ResponsiveValue<unknown>, breakpoint);

				if (resolvedValue !== undefined) {
					resolved[key] = String(resolvedValue);
				}
			}

			return resolved;
		},
	};
}

export function createResponsiveEngine(config: BreakpointConfig) {
	let activeBreakpoint = config.defaultPreview;

	return {
		config,
		resolver: createResponsiveResolver(),
		getActiveBreakpoint: () => activeBreakpoint,
		setActiveBreakpoint: (slug: BreakpointSlug) => {
			activeBreakpoint = slug;
		},
		matchMedia: (width: number) => matchBreakpoint(width, config.breakpoints),
		listBreakpoints: () => config.breakpoints,
	};
}

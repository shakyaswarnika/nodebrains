import type { BreakpointSlug } from '@theme/builder/core/primitives';
import type { PropertyFieldMap, PropertySchema } from '@theme/builder/property-system/types';
import type { ResponsiveValue } from '@theme/builder/responsive-engine/types';

import {
	clearResponsiveOverride,
	getResponsiveInheritance,
	resolveResponsiveValue,
	writeResponsiveOverride,
} from '@builder/lib/responsive-engine';

export interface PropertyFieldEntry {
	readonly key: string;
	readonly schema: PropertySchema;
}

export interface PropertyFieldGroup {
	readonly id: string;
	readonly label: string;
	readonly fields: readonly PropertyFieldEntry[];
}

const DEFAULT_GROUP = 'general';

const GROUP_LABELS: Record<string, string> = {
	general: 'General',
	content: 'Content',
	style: 'Style',
	layout: 'Layout',
	spacing: 'Spacing',
	typography: 'Typography',
	border: 'Border',
	effects: 'Effects',
	visibility: 'Visibility',
};

export function groupPropertyFields(schema: PropertyFieldMap): readonly PropertyFieldGroup[] {
	const buckets = new Map<string, PropertyFieldEntry[]>();

	for (const [key, fieldSchema] of Object.entries(schema)) {
		const groupId = fieldSchema.group ?? DEFAULT_GROUP;
		const entries = buckets.get(groupId) ?? [];
		entries.push({ key, schema: fieldSchema });
		buckets.set(groupId, entries);
	}

	return [...buckets.entries()]
		.map(([id, fields]) => ({
			id,
			label: GROUP_LABELS[id] ?? capitalize(id),
			fields: fields.sort(
				(left, right) => (left.schema.order ?? 0) - (right.schema.order ?? 0),
			),
		}))
		.sort((left, right) => left.label.localeCompare(right.label));
}

function capitalize(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function isResponsiveObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function resolveFieldValue<T>(
	value: ResponsiveValue<T> | T | undefined,
	breakpoint: BreakpointSlug,
): T | undefined {
	return resolveResponsiveValue(value as import('@theme/builder/responsive-engine/types').ResponsiveValue<T>, breakpoint);
}

export function getFieldInheritance(value: unknown, breakpoint: BreakpointSlug) {
	return getResponsiveInheritance(value, breakpoint);
}

export function hasBreakpointOverride(value: unknown, breakpoint: BreakpointSlug): boolean {
	return getResponsiveInheritance(value, breakpoint).hasOverride;
}

export function writeResponsiveFieldValue(
	currentValue: unknown,
	breakpoint: BreakpointSlug,
	nextValue: unknown,
	isResponsiveField: boolean,
): unknown {
	if (!isResponsiveField) {
		return nextValue;
	}

	return writeResponsiveOverride(currentValue, breakpoint, nextValue);
}

export function clearBreakpointOverride(currentValue: unknown, breakpoint: BreakpointSlug): unknown {
	return clearResponsiveOverride(currentValue, breakpoint);
}

export function isFieldVisible(
	schema: PropertySchema,
	values: Record<string, unknown>,
): boolean {
	if (!schema.visibleWhen) {
		return true;
	}

	const current = values[schema.visibleWhen.field];

	if (schema.visibleWhen.equals !== undefined) {
		return current === schema.visibleWhen.equals;
	}

	if (schema.visibleWhen.notEquals !== undefined) {
		return current !== schema.visibleWhen.notEquals;
	}

	if (schema.visibleWhen.oneOf) {
		return schema.visibleWhen.oneOf.includes(current as never);
	}

	return true;
}

export function filterVisibleFieldGroups(
	groups: readonly PropertyFieldGroup[],
	values: Record<string, unknown>,
): readonly PropertyFieldGroup[] {
	return groups
		.map((group) => ({
			...group,
			fields: group.fields.filter((field) => isFieldVisible(field.schema, values)),
		}))
		.filter((group) => group.fields.length > 0);
}

export function isResponsiveField(
	fieldKey: string,
	schema: PropertySchema,
	responsiveFields: readonly string[],
): boolean {
	return schema.responsive === true || responsiveFields.includes(fieldKey);
}

export function asRecord(value: unknown): Record<string, unknown> {
	return isResponsiveObject(value) ? value : {};
}

export const inputClassName =
	'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent';

export const labelClassName =
	'text-xs font-medium uppercase tracking-[0.16em] text-slate-500';

export interface ResponsiveShellProps {
	readonly responsive?: boolean;
	readonly deviceLabel?: string;
	readonly inherited?: boolean;
	readonly sourceLabel?: string | null;
	readonly hasOverride?: boolean;
	readonly onResetOverride?: () => void;
}

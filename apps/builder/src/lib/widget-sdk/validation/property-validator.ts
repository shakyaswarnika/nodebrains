import type { BreakpointSlug } from '@theme/builder/core/primitives';
import type {
	PropertyCoercionContext,
	PropertyFieldMap,
	PropertyRecord,
	PropertySchema,
	PropertyValidationError,
	PropertyValidationResult,
	PropertyValidator,
	PropertyValue,
} from '@theme/builder/property-system/types';
import type { ResponsiveValue } from '@theme/builder/responsive-engine/types';

import { resolveResponsiveValue } from '../../responsive-engine';

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function pushError(
	errors: PropertyValidationError[],
	path: string,
	code: string,
	message: string,
): void {
	errors.push({ path, code, message });
}

function validateScalar(
	schema: PropertySchema,
	value: unknown,
	path: string,
	errors: PropertyValidationError[],
): PropertyValue {
	if (value === undefined || value === null) {
		if (schema.required) {
			pushError(errors, path, 'required', `${schema.label} is required.`);
		}

		return schema.default ?? null;
	}

	switch (schema.type) {
		case 'string':
		case 'richtext':
		case 'html':
		case 'url':
		case 'shortcode': {
			if (typeof value !== 'string') {
				pushError(errors, path, 'type', `${schema.label} must be a string.`);
				return String(value);
			}

			if (schema.required && value.trim().length === 0) {
				pushError(errors, path, 'required', `${schema.label} is required.`);
			}

			if (schema.maxLength !== undefined && value.length > schema.maxLength) {
				pushError(errors, path, 'maxLength', `${schema.label} exceeds max length.`);
			}

			return value;
		}

		case 'number':
		case 'range':
		case 'slider': {
			const numeric = typeof value === 'number' ? value : Number(value);

			if (Number.isNaN(numeric)) {
				pushError(errors, path, 'type', `${schema.label} must be a number.`);
				return schema.default ?? 0;
			}

			if ('min' in schema && schema.min !== undefined && numeric < schema.min) {
				pushError(errors, path, 'min', `${schema.label} is below minimum.`);
			}

			if ('max' in schema && schema.max !== undefined && numeric > schema.max) {
				pushError(errors, path, 'max', `${schema.label} exceeds maximum.`);
			}

			return numeric;
		}

		case 'boolean': {
			if (typeof value !== 'boolean') {
				pushError(errors, path, 'type', `${schema.label} must be a boolean.`);
				return Boolean(value);
			}

			return value;
		}

		case 'select': {
			const selected = String(value);
			const allowed = schema.options.map((option) => option.value);

			if (!allowed.includes(selected)) {
				pushError(errors, path, 'enum', `${schema.label} has an invalid option.`);
			}

			return selected;
		}

		case 'color': {
			if (typeof value !== 'string') {
				pushError(errors, path, 'type', `${schema.label} must be a color string.`);
				return String(value);
			}

			return value;
		}

		case 'image':
		case 'link':
		case 'button':
		case 'menu':
		case 'taxonomy':
		case 'responsive-columns':
		case 'sidebar-list':
		case 'spacing':
		case 'typography':
		case 'border':
		case 'shadow':
		case 'alignment':
		case 'visibility':
			if (!isPlainObject(value)) {
				return (schema.default ?? {}) as PropertyValue;
			}

			return value as PropertyValue;

		case 'group': {
			const record = isPlainObject(value) ? value : {};
			return validateRecord(schema.fields, record, path, errors);
		}

		case 'repeater': {
			if (!Array.isArray(value)) {
				pushError(errors, path, 'type', `${schema.label} must be an array.`);

				return [];
			}

			if (schema.minItems !== undefined && value.length < schema.minItems) {
				pushError(errors, path, 'minItems', `${schema.label} requires more items.`);
			}

			if (schema.maxItems !== undefined && value.length > schema.maxItems) {
				pushError(errors, path, 'maxItems', `${schema.label} has too many items.`);
			}

			return value.map((item, index) =>
				validateRecord(schema.fields, isPlainObject(item) ? item : {}, `${path}[${index}]`, errors),
			);
		}

		default:
			return value as PropertyValue;
	}
}

function validateRecord(
	schema: PropertyFieldMap,
	value: Record<string, unknown>,
	basePath: string,
	errors: PropertyValidationError[],
): PropertyRecord {
	const result: Record<string, PropertyValue> = {};

	for (const [key, fieldSchema] of Object.entries(schema)) {
		const path = basePath ? `${basePath}.${key}` : key;
		result[key] = validateScalar(fieldSchema, value[key], path, errors);
	}

	return result as PropertyRecord;
}

export class PropertyValidatorImpl implements PropertyValidator {
	validate(
		schema: PropertySchema,
		value: unknown,
		_context?: PropertyCoercionContext,
	): PropertyValidationResult {
		const errors: PropertyValidationError[] = [];
		const validated = validateScalar(schema, value, '', errors);

		return {
			valid: errors.length === 0,
			value: validated,
			errors,
		};
	}

	validateRecord(
		schema: PropertyFieldMap,
		value: PropertyRecord,
		context?: PropertyCoercionContext,
	): PropertyValidationResult {
		const errors: PropertyValidationError[] = [];
		const validated = validateRecord(schema, value as Record<string, unknown>, '', errors);

		if (context?.breakpoint) {
			return {
				valid: errors.length === 0,
				value: validated,
				errors,
			};
		}

		return {
			valid: errors.length === 0,
			value: validated,
			errors,
		};
	}
}

export class PropertyResolverImpl {
	resolve(
		schema: PropertyFieldMap,
		defaults: PropertyRecord,
		stored: PropertyRecord,
		breakpoint: BreakpointSlug,
		responsiveFields: readonly string[] = [],
	): PropertyRecord {
		const merged: Record<string, PropertyValue> = { ...defaults, ...stored };

		for (const fieldKey of responsiveFields) {
			const fieldSchema = schema[fieldKey];
			const storedValue = stored[fieldKey];

			if (!fieldSchema || storedValue === undefined) {
				continue;
			}

			const resolved = resolveResponsiveValue(
				storedValue as ResponsiveValue<PropertyValue>,
				breakpoint,
			);

			if (resolved !== undefined) {
				merged[fieldKey] = resolved;
			}
		}

		for (const [fieldKey, fieldSchema] of Object.entries(schema)) {
			if (!fieldSchema.responsive || responsiveFields.includes(fieldKey)) {
				continue;
			}

			const storedValue = stored[fieldKey];

			if (storedValue === undefined) {
				continue;
			}

			const resolved = resolveResponsiveValue(
				storedValue as ResponsiveValue<PropertyValue>,
				breakpoint,
			);

			if (resolved !== undefined) {
				merged[fieldKey] = resolved;
			}
		}

		return merged as PropertyRecord;
	}
}

export const defaultPropertyValidator = new PropertyValidatorImpl();
export const defaultPropertyResolver = new PropertyResolverImpl();

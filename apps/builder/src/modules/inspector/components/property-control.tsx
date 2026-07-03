'use client';

import type { ReactElement } from 'react';

import type { PropertySchema } from '@theme/builder/property-system/types';

import { AlignmentControl } from './controls/alignment-control';
import { BorderControl } from './controls/border-control';
import { ColorControl } from './controls/color-control';
import { FieldShell } from './controls/field-shell';
import { ShadowControl } from './controls/shadow-control';
import { SliderControl } from './controls/slider-control';
import { SpacingControl } from './controls/spacing-control';
import { TextControl } from './controls/text-control';
import { TypographyControl } from './controls/typography-control';
import { VisibilityControl } from './controls/visibility-control';
import { inputClassName, type ResponsiveShellProps } from '../lib/property-panel-utils';

interface PropertyControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: PropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: unknown) => void;
}

export function PropertyControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: PropertyControlProps): ReactElement {
	const baseProps = { fieldKey, value, onChange, ...shell };

	switch (schema.type) {
		case 'string':
		case 'richtext':
		case 'html':
		case 'url':
		case 'shortcode':
			return <TextControl {...baseProps} schema={schema} />;

		case 'color':
			return <ColorControl {...baseProps} schema={schema} />;

		case 'range':
		case 'slider':
		case 'number':
			return (
				<SliderControl
					{...baseProps}
					schema={{
						...schema,
						type: 'slider',
						min: 'min' in schema ? (schema.min ?? 0) : 0,
						max: 'max' in schema ? (schema.max ?? 100) : 100,
					}}
				/>
			);

		case 'spacing':
			return <SpacingControl {...baseProps} schema={schema} />;

		case 'typography':
			return <TypographyControl {...baseProps} schema={schema} />;

		case 'border':
			return <BorderControl {...baseProps} schema={schema} />;

		case 'shadow':
			return <ShadowControl {...baseProps} schema={schema} />;

		case 'alignment':
			return <AlignmentControl {...baseProps} schema={schema} />;

		case 'visibility':
			return <VisibilityControl {...baseProps} schema={schema} />;

		case 'boolean':
			return (
				<FieldShell fieldKey={fieldKey} label={schema.label} description={schema.description} {...shell}>
					<label className="flex items-center gap-3 text-sm text-slate-200">
						<input
							type="checkbox"
							checked={Boolean(value)}
							onChange={(event) => onChange(event.target.checked)}
							className="h-4 w-4 rounded border-slate-600 bg-slate-950"
						/>
						Enabled
					</label>
				</FieldShell>
			);

		case 'select':
			return (
				<FieldShell fieldKey={fieldKey} label={schema.label} description={schema.description} {...shell}>
					<select
						value={typeof value === 'string' ? value : String(schema.default ?? '')}
						onChange={(event) => onChange(event.target.value)}
						className={inputClassName}
					>
						{schema.options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</FieldShell>
			);

		case 'responsive-columns':
			return (
				<SliderControl
					{...baseProps}
					schema={{
						type: 'slider',
						label: schema.label,
						description: schema.description,
						min: schema.min ?? 1,
						max: schema.max ?? 6,
						step: 1,
						default: schema.default ?? 1,
					}}
				/>
			);

		case 'group':
			return (
				<FieldShell fieldKey={fieldKey} label={schema.label} description={schema.description}>
					<div className="space-y-3">
						{Object.entries(schema.fields).map(([nestedKey, nestedSchema]) => (
							<PropertyControl
								key={nestedKey}
								fieldKey={`${fieldKey}.${nestedKey}`}
								schema={nestedSchema}
								value={(value as Record<string, unknown> | undefined)?.[nestedKey]}
								onChange={(nextValue) =>
									onChange({
										...(typeof value === 'object' && value !== null ? value : {}),
										[nestedKey]: nextValue,
									})
								}
							/>
						))}
					</div>
				</FieldShell>
			);

		default:
			return (
				<FieldShell fieldKey={fieldKey} label={schema.label} description={schema.description}>
					<p className="text-xs text-slate-500">Unsupported control type: {schema.type}</p>
				</FieldShell>
			);
	}
}

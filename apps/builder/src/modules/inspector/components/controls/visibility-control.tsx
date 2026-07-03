'use client';

import type { ReactElement } from 'react';

import type { VisibilityPropertySchema, VisibilityValue } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { SliderControl } from './slider-control';
import { asRecord, inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface VisibilityControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: VisibilityPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: VisibilityValue) => void;
}

function normalizeVisibility(value: unknown): VisibilityValue {
	return asRecord(value) as VisibilityValue;
}

export function VisibilityControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: VisibilityControlProps): ReactElement {
	const visibility = normalizeVisibility(value);
	const patch = (partial: Partial<VisibilityValue>) => onChange({ ...visibility, ...partial });

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="space-y-3">
				<label className="flex items-center gap-3 text-sm text-slate-200">
					<input
						type="checkbox"
						checked={visibility.visible !== false}
						onChange={(event) => patch({ visible: event.target.checked })}
						className="h-4 w-4 rounded border-slate-600 bg-slate-950"
					/>
					Visible on canvas
				</label>

				{schema.allowDisplay !== false ? (
					<label className="space-y-1">
						<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Display</span>
						<select
							value={visibility.display ?? 'block'}
							onChange={(event) =>
								patch({ display: event.target.value as VisibilityValue['display'] })
							}
							className={inputClassName}
						>
							<option value="block">Block</option>
							<option value="flex">Flex</option>
							<option value="grid">Grid</option>
							<option value="none">None</option>
						</select>
					</label>
				) : null}

				{schema.allowOpacity !== false ? (
					<SliderControl
						fieldKey={`${fieldKey}-opacity`}
						schema={{
							type: 'slider',
							label: 'Opacity',
							min: 0,
							max: 100,
							step: 1,
							unit: '%',
							default: 100,
						}}
						value={visibility.opacity ?? 100}
						onChange={(opacity) => patch({ opacity })}
					/>
				) : null}
			</div>
		</FieldShell>
	);
}

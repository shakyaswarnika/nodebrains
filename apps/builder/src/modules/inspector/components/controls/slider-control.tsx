'use client';

import type { ReactElement } from 'react';

import type { RangePropertySchema } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface SliderControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: RangePropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: number) => void;
}

export function SliderControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: SliderControlProps): ReactElement {
	const id = `property-field-${fieldKey}`;
	const numericValue = typeof value === 'number' ? value : Number(schema.default ?? schema.min);
	const unit = schema.unit ?? '';

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="space-y-3">
				<input
					id={id}
					type="range"
					min={schema.min}
					max={schema.max}
					step={schema.step ?? 1}
					value={numericValue}
					onChange={(event) => onChange(Number(event.target.value))}
					className="w-full accent-accent"
				/>
				<div className="flex items-center gap-3">
					<input
						type="number"
						min={schema.min}
						max={schema.max}
						step={schema.step ?? 1}
						value={numericValue}
						onChange={(event) => onChange(Number(event.target.value))}
						className={inputClassName}
					/>
					{unit ? <span className="text-xs text-slate-500">{unit}</span> : null}
				</div>
			</div>
		</FieldShell>
	);
}

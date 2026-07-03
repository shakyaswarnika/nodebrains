'use client';

import type { ReactElement } from 'react';

import type { AlignmentPropertySchema, AlignmentValue } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { asRecord, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface AlignmentControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: AlignmentPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: AlignmentValue) => void;
}

const HORIZONTAL = [
	{ value: 'left', label: 'Left' },
	{ value: 'center', label: 'Center' },
	{ value: 'right', label: 'Right' },
	{ value: 'stretch', label: 'Stretch' },
] as const;

const VERTICAL = [
	{ value: 'top', label: 'Top' },
	{ value: 'center', label: 'Center' },
	{ value: 'bottom', label: 'Bottom' },
	{ value: 'stretch', label: 'Stretch' },
] as const;

function normalizeAlignment(value: unknown): AlignmentValue {
	return asRecord(value) as AlignmentValue;
}

function OptionGroup<T extends string>({
	label,
	options,
	value,
	onSelect,
}: {
	label: string;
	options: ReadonlyArray<{ value: T; label: string }>;
	value?: T;
	onSelect: (next: T) => void;
}): ReactElement {
	return (
		<div className="space-y-2">
			<p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
			<div className="grid grid-cols-2 gap-2">
				{options.map((option) => (
					<button
						key={option.value}
						type="button"
						onClick={() => onSelect(option.value)}
						className={`rounded-lg border px-2 py-1.5 text-xs ${
							value === option.value
								? 'border-accent bg-accent/15 text-accent'
								: 'border-slate-700 text-slate-300 hover:border-slate-600'
						}`}
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
}

export function AlignmentControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: AlignmentControlProps): ReactElement {
	const alignment = normalizeAlignment(value);
	const showHorizontal = schema.horizontal !== false;
	const showVertical = schema.vertical === true;

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="space-y-4">
				{showHorizontal ? (
					<OptionGroup
						label="Horizontal"
						options={HORIZONTAL}
						value={alignment.horizontal}
						onSelect={(horizontal) => onChange({ ...alignment, horizontal })}
					/>
				) : null}
				{showVertical ? (
					<OptionGroup
						label="Vertical"
						options={VERTICAL}
						value={alignment.vertical}
						onSelect={(vertical) => onChange({ ...alignment, vertical })}
					/>
				) : null}
			</div>
		</FieldShell>
	);
}

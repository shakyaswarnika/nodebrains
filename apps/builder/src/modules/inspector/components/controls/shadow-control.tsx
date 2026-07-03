'use client';

import type { ReactElement } from 'react';

import type { ShadowPropertySchema, ShadowValue } from '@theme/builder/property-system/types';

import { ColorControl } from './color-control';
import { FieldShell } from './field-shell';
import { asRecord, inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface ShadowControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: ShadowPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: ShadowValue) => void;
}

function normalizeShadow(value: unknown): ShadowValue {
	return asRecord(value) as ShadowValue;
}

export function ShadowControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: ShadowControlProps): ReactElement {
	const shadow = normalizeShadow(value);

	const patch = (partial: Partial<ShadowValue>) => onChange({ ...shadow, ...partial });

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="grid grid-cols-2 gap-2">
				{(['x', 'y', 'blur', 'spread'] as const).map((key) => (
					<label key={key} className="space-y-1">
						<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{key}</span>
						<input
							type="number"
							value={shadow[key] ?? 0}
							onChange={(event) => patch({ [key]: Number(event.target.value) })}
							className={inputClassName}
						/>
					</label>
				))}
			</div>
			<label className="mt-2 flex items-center gap-2 text-sm text-slate-300">
				<input
					type="checkbox"
					checked={Boolean(shadow.inset)}
					onChange={(event) => patch({ inset: event.target.checked })}
					className="h-4 w-4 rounded border-slate-600 bg-slate-950"
				/>
				Inset shadow
			</label>
			<div className="pt-2">
				<ColorControl
					fieldKey={`${fieldKey}-color`}
					schema={{ type: 'color', label: 'Shadow color' }}
					value={shadow.color ?? 'rgba(15, 23, 42, 0.25)'}
					onChange={(nextColor) => patch({ color: nextColor })}
				/>
			</div>
			{schema.presets && schema.presets.length > 0 ? (
				<div className="flex flex-wrap gap-2 pt-2">
					{schema.presets.map((preset) => (
						<button
							key={preset}
							type="button"
							onClick={() => patch({ color: preset })}
							className="rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400"
						>
							{preset}
						</button>
					))}
				</div>
			) : null}
		</FieldShell>
	);
}

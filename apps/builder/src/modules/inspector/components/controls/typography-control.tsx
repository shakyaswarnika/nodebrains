'use client';

import type { ReactElement } from 'react';

import type { TypographyPropertySchema, TypographyValue } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { asRecord, inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface TypographyControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: TypographyPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: TypographyValue) => void;
}

const DEFAULT_FAMILIES = ['Inter', 'Georgia', 'Merriweather', 'system-ui'];
const DEFAULT_WEIGHTS = ['400', '500', '600', '700'];

function normalizeTypography(value: unknown): TypographyValue {
	return asRecord(value) as TypographyValue;
}

export function TypographyControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: TypographyControlProps): ReactElement {
	const typography = normalizeTypography(value);
	const families = schema.fontFamilies ?? DEFAULT_FAMILIES;
	const weights = schema.fontWeights ?? DEFAULT_WEIGHTS;

	const patch = (partial: Partial<TypographyValue>) => onChange({ ...typography, ...partial });

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="grid grid-cols-2 gap-2">
				<label className="col-span-2 space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Font family</span>
					<select
						value={typography.fontFamily ?? families[0]}
						onChange={(event) => patch({ fontFamily: event.target.value })}
						className={inputClassName}
					>
						{families.map((family) => (
							<option key={family} value={family}>
								{family}
							</option>
						))}
					</select>
				</label>
				<label className="space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Size</span>
					<input
						type="text"
						value={typography.fontSize ?? ''}
						onChange={(event) => patch({ fontSize: event.target.value })}
						className={inputClassName}
					/>
				</label>
				<label className="space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Weight</span>
					<select
						value={String(typography.fontWeight ?? weights[0])}
						onChange={(event) => patch({ fontWeight: event.target.value })}
						className={inputClassName}
					>
						{weights.map((weight) => (
							<option key={String(weight)} value={String(weight)}>
								{weight}
							</option>
						))}
					</select>
				</label>
				<label className="space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Line height</span>
					<input
						type="text"
						value={typography.lineHeight ?? ''}
						onChange={(event) => patch({ lineHeight: event.target.value })}
						className={inputClassName}
					/>
				</label>
				<label className="space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Letter spacing</span>
					<input
						type="text"
						value={typography.letterSpacing ?? ''}
						onChange={(event) => patch({ letterSpacing: event.target.value })}
						className={inputClassName}
					/>
				</label>
				<label className="col-span-2 space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Transform</span>
					<select
						value={typography.textTransform ?? 'none'}
						onChange={(event) =>
							patch({ textTransform: event.target.value as TypographyValue['textTransform'] })
						}
						className={inputClassName}
					>
						<option value="none">None</option>
						<option value="uppercase">Uppercase</option>
						<option value="lowercase">Lowercase</option>
						<option value="capitalize">Capitalize</option>
					</select>
				</label>
			</div>
		</FieldShell>
	);
}

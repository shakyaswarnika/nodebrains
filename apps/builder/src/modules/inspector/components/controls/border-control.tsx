'use client';

import type { ReactElement } from 'react';

import type { BorderPropertySchema, BorderValue } from '@theme/builder/property-system/types';

import { ColorControl } from './color-control';
import { FieldShell } from './field-shell';
import { asRecord, inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface BorderControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: BorderPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: BorderValue) => void;
}

const DEFAULT_STYLES: BorderValue['style'][] = ['none', 'solid', 'dashed', 'dotted'];

function normalizeBorder(value: unknown): BorderValue {
	return asRecord(value) as BorderValue;
}

export function BorderControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: BorderControlProps): ReactElement {
	const border = normalizeBorder(value);
	const styles = schema.styles ?? DEFAULT_STYLES;

	const patch = (partial: Partial<BorderValue>) => onChange({ ...border, ...partial });

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="grid grid-cols-2 gap-2">
				<label className="space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Width</span>
					<input
						type="text"
						value={border.width ?? ''}
						onChange={(event) => patch({ width: event.target.value })}
						className={inputClassName}
					/>
				</label>
				<label className="space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Radius</span>
					<input
						type="text"
						value={border.radius ?? ''}
						onChange={(event) => patch({ radius: event.target.value })}
						className={inputClassName}
					/>
				</label>
				<label className="col-span-2 space-y-1">
					<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Style</span>
					<select
						value={border.style ?? 'solid'}
						onChange={(event) => patch({ style: event.target.value as BorderValue['style'] })}
						className={inputClassName}
					>
						{styles.map((style) => (
							<option key={style} value={style}>
								{style}
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="pt-2">
				<ColorControl
					fieldKey={`${fieldKey}-color`}
					schema={{ type: 'color', label: 'Border color' }}
					value={border.color ?? '#334155'}
					onChange={(nextColor) => patch({ color: nextColor })}
				/>
			</div>
		</FieldShell>
	);
}

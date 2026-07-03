'use client';

import type { ReactElement } from 'react';

import type { ColorPropertySchema } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface ColorControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: ColorPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: string) => void;
}

const TOKEN_SWATCHES = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ffffff', '#0f172a'];

export function ColorControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: ColorControlProps): ReactElement {
	const id = `property-field-${fieldKey}`;
	const colorValue = typeof value === 'string' ? value : '#6366f1';

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="flex items-center gap-3">
				<input
					id={id}
					type="color"
					value={colorValue.startsWith('#') ? colorValue : '#6366f1'}
					onChange={(event) => onChange(event.target.value)}
					className="h-10 w-14 cursor-pointer rounded-lg border border-slate-700 bg-slate-950"
				/>
				<input
					type="text"
					value={colorValue}
					onChange={(event) => onChange(event.target.value)}
					className={inputClassName}
				/>
			</div>
			{schema.tokens ? (
				<div className="flex flex-wrap gap-2 pt-1">
					{TOKEN_SWATCHES.map((token) => (
						<button
							key={token}
							type="button"
							aria-label={`Use ${token}`}
							onClick={() => onChange(token)}
							className="h-6 w-6 rounded-full border border-slate-700"
							style={{ backgroundColor: token }}
						/>
					))}
				</div>
			) : null}
		</FieldShell>
	);
}

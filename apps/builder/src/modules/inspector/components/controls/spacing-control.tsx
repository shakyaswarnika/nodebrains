'use client';

import type { ReactElement } from 'react';

import type { SpacingPropertySchema, SpacingValue } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { asRecord, inputClassName, type ResponsiveShellProps } from '../../lib/property-panel-utils';

interface SpacingControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: SpacingPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: SpacingValue) => void;
}

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

function normalizeSpacing(value: unknown): SpacingValue {
	const record = asRecord(value);

	return {
		top: record.top as SpacingValue['top'],
		right: record.right as SpacingValue['right'],
		bottom: record.bottom as SpacingValue['bottom'],
		left: record.left as SpacingValue['left'],
		linked: record.linked !== false,
	};
}

export function SpacingControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: SpacingControlProps): ReactElement {
	const spacing = normalizeSpacing(value);

	const updateSide = (side: typeof SIDES[number], next: string) => {
		const parsed = next === '' ? undefined : Number.isNaN(Number(next)) ? next : Number(next);

		if (spacing.linked) {
			onChange({
				top: parsed,
				right: parsed,
				bottom: parsed,
				left: parsed,
				linked: true,
			});
			return;
		}

		onChange({
			...spacing,
			[side]: parsed,
			linked: false,
		});
	};

	const toggleLinked = () => {
		if (spacing.linked) {
			onChange({ ...spacing, linked: false });
			return;
		}

		const unified = spacing.top ?? spacing.right ?? spacing.bottom ?? spacing.left ?? 0;
		onChange({
			top: unified,
			right: unified,
			bottom: unified,
			left: unified,
			linked: true,
		});
	};

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			<div className="space-y-3">
				<button
					type="button"
					onClick={toggleLinked}
					className="text-[11px] text-slate-400 hover:text-slate-200"
				>
					{spacing.linked ? 'Linked sides' : 'Unlinked sides'} · click to toggle
				</button>
				<div className="grid grid-cols-2 gap-2">
					{SIDES.map((side) => (
						<label key={side} className="space-y-1">
							<span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{side}</span>
							<input
								type="text"
								value={spacing[side] ?? ''}
								onChange={(event) => updateSide(side, event.target.value)}
								className={inputClassName}
							/>
						</label>
					))}
				</div>
			</div>
		</FieldShell>
	);
}

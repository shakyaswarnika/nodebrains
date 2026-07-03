'use client';

import type { ReactElement } from 'react';

import type { StringPropertySchema } from '@theme/builder/property-system/types';

import { FieldShell } from './field-shell';
import { inputClassName } from '../../lib/property-panel-utils';

import type { ResponsiveShellProps } from '../../lib/property-panel-utils';

interface TextControlProps extends ResponsiveShellProps {
	readonly fieldKey: string;
	readonly schema: StringPropertySchema;
	readonly value: unknown;
	readonly onChange: (nextValue: string) => void;
}

export function TextControl({
	fieldKey,
	schema,
	value,
	onChange,
	...shell
}: TextControlProps): ReactElement {
	const id = `property-field-${fieldKey}`;
	const stringValue = typeof value === 'string' ? value : String(schema.default ?? '');

	return (
		<FieldShell
			fieldKey={fieldKey}
			label={schema.label}
			description={schema.description}
			{...shell}
		>
			{schema.type === 'richtext' || schema.type === 'html' ? (
				<textarea
					id={id}
					value={stringValue}
					onChange={(event) => onChange(event.target.value)}
					rows={4}
					className={inputClassName}
				/>
			) : (
				<input
					id={id}
					type={schema.type === 'url' ? 'url' : 'text'}
					value={stringValue}
					placeholder={schema.placeholder}
					onChange={(event) => onChange(event.target.value)}
					className={inputClassName}
				/>
			)}
		</FieldShell>
	);
}

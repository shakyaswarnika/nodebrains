'use client';

import type { ReactElement, ReactNode } from 'react';

interface FieldShellProps {
	readonly fieldKey: string;
	readonly label: string;
	readonly description?: string;
	readonly responsive?: boolean;
	readonly deviceLabel?: string;
	readonly inherited?: boolean;
	readonly sourceLabel?: string | null;
	readonly hasOverride?: boolean;
	readonly onResetOverride?: () => void;
	readonly children: ReactNode;
}

export function FieldShell({
	fieldKey,
	label,
	description,
	responsive = false,
	deviceLabel,
	inherited = false,
	sourceLabel,
	hasOverride = false,
	onResetOverride,
	children,
}: FieldShellProps): ReactElement {
	const id = `property-field-${fieldKey}`;

	return (
		<div
			className={`space-y-2 rounded-xl border p-3 ${
				hasOverride
					? 'border-accent/30 bg-accent/5'
					: inherited
						? 'border-slate-800/60 bg-slate-900/30'
						: 'border-slate-800/80 bg-slate-900/40'
			}`}
		>
			<div className="flex items-start justify-between gap-3">
				<div>
					<label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
						{label}
					</label>
					{description ? <p className="mt-1 text-[11px] text-slate-500">{description}</p> : null}
					{responsive && inherited && sourceLabel ? (
						<p className="mt-1 text-[11px] text-sky-400">
							Inherited from {sourceLabel}
						</p>
					) : null}
					{responsive && hasOverride ? (
						<p className="mt-1 text-[11px] text-accent">Override at {deviceLabel}</p>
					) : null}
				</div>
				{responsive ? (
					<div className="flex flex-col items-end gap-1">
						{deviceLabel ? (
							<span className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-400">
								{deviceLabel}
							</span>
						) : null}
						{hasOverride && onResetOverride ? (
							<button
								type="button"
								onClick={onResetOverride}
								className="text-[10px] text-accent hover:underline"
							>
								Clear override
							</button>
						) : null}
					</div>
				) : null}
			</div>
			{children}
		</div>
	);
}

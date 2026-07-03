import type { ReactElement, ReactNode } from 'react';

interface PanelProps {
	title: string;
	subtitle?: string;
	actions?: ReactNode;
	children: ReactNode;
	className?: string;
}

export function Panel({
	title,
	subtitle,
	actions,
	children,
	className = '',
}: PanelProps): ReactElement {
	return (
		<section
			className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 ${className}`.trim()}
		>
			<header className="flex items-start justify-between gap-4 border-b border-slate-800 px-4 py-3">
				<div>
					<h2 className="text-sm font-semibold text-slate-100">{title}</h2>
					{subtitle ? (
						<p className="mt-1 text-xs text-slate-400">{subtitle}</p>
					) : null}
				</div>
				{actions ? <div className="flex items-center gap-2">{actions}</div> : null}
			</header>
			<div className="min-h-0 flex-1 overflow-auto">{children}</div>
		</section>
	);
}

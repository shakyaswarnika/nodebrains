'use client';

import type { ReactElement } from 'react';

import { PaletteDraggable } from '@builder/components/dnd/draggable';
import { Panel } from '@builder/components/ui/panel';
import { Navigator } from '@builder/modules/navigator/components/navigator';
import { useBuilderStore } from '@builder/store/use-builder-store';

const sidebarTabs = [
	{ id: 'navigator', label: 'Navigator' },
	{ id: 'library', label: 'Library' },
	{ id: 'components', label: 'Components' },
] as const;

export function Sidebar(): ReactElement | null {
	const sidebarTab = useBuilderStore((state) => state.sidebarTab);
	const setSidebarTab = useBuilderStore((state) => state.setSidebarTab);
	const sidebarCollapsed = useBuilderStore((state) => state.sidebarCollapsed);
	const components = useBuilderStore((state) => state.components);
	const widgets = useBuilderStore((state) => state.widgets);
	const paletteGroups = useBuilderStore((state) => state.paletteGroups);

	if (sidebarCollapsed) {
		return null;
	}

	return (
		<Panel
			title="Sidebar"
			subtitle="Structure, widget library, and component bridge"
			className="h-full"
			actions={
				<div className="flex rounded-lg border border-slate-800 bg-slate-900 p-1">
					{sidebarTabs.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setSidebarTab(tab.id)}
							className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
								sidebarTab === tab.id
									? 'bg-accent text-white'
									: 'text-slate-400 hover:text-slate-200'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			}
		>
			{sidebarTab === 'navigator' ? <Navigator /> : null}

			{sidebarTab === 'library' ? (
				<div className="space-y-5 px-4 py-4">
					<div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
						Drag layout blocks and content widgets onto the canvas. Drop targets appear on
						compatible containers and columns.
					</div>
					{paletteGroups.map((group) => (
						<section key={group.id} className="space-y-2">
							<h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
								{group.label}
							</h3>
							<div className="grid gap-2">
								{widgets
									.filter((widget) => widget.paletteGroup === group.id)
									.map((widget) => (
										<PaletteDraggable
											key={widget.type}
											widgetType={widget.type}
											className="cursor-grab rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 transition hover:border-slate-600 hover:bg-slate-900/90 active:cursor-grabbing"
										>
											<div className="flex items-center justify-between gap-3">
												<p className="text-sm font-medium text-slate-100">{widget.name}</p>
												<span className="text-xs text-slate-500">{widget.kind}</span>
											</div>
											<p className="mt-1 text-xs text-slate-400">{widget.description}</p>
										</PaletteDraggable>
									))}
							</div>
						</section>
					))}
				</div>
			) : null}

			{sidebarTab === 'components' ? (
				<div className="space-y-3 px-4 py-4">
					<div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
						This registry reflects PHP-backed components available to the visual builder.
					</div>
					{components.map((component) => (
						<div
							key={component.slug}
							className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2"
						>
							<div className="flex items-center justify-between gap-3">
								<p className="text-sm font-medium text-slate-100">{component.name}</p>
								<span className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
									{component.category}
								</span>
							</div>
							<p className="mt-1 text-xs text-slate-400">{component.description}</p>
						</div>
					))}
				</div>
			) : null}
		</Panel>
	);
}

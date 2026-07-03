'use client';

import type { ReactElement } from 'react';

import { useBuilderKeyboard } from '@builder/hooks/use-builder-keyboard';
import { Canvas } from '@builder/modules/canvas/components/canvas';
import { InspectorPanel } from '@builder/modules/inspector/components/inspector-panel';
import { Sidebar } from '@builder/modules/sidebar/components/sidebar';
import { Toolbar } from '@builder/modules/toolbar/components/toolbar';

export function BuilderLayout(): ReactElement {
	useBuilderKeyboard();

	return (
		<div className="flex h-screen flex-col bg-slate-950 text-slate-100">
			<Toolbar />
			<div className="grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)_360px] gap-4 p-4">
				<div className="min-h-0">
					<Sidebar />
				</div>
				<div className="min-h-0">
					<Canvas />
				</div>
				<div className="min-h-0">
					<InspectorPanel />
				</div>
			</div>
		</div>
	);
}

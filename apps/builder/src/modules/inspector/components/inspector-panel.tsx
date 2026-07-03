'use client';

import type { ReactElement } from 'react';

import { Panel } from '@builder/components/ui/panel';
import { isLayoutInspectableNode, LayoutInspector } from '@builder/modules/inspector/components/layout-inspector';
import { WidgetInspector } from '@builder/modules/inspector/components/widget-inspector';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { LayoutNode } from '@theme/builder/layout-engine/types';

const inspectorTabs = [
	{ id: 'properties', label: 'Properties' },
	{ id: 'structure', label: 'Structure' },
	{ id: 'meta', label: 'Meta' },
] as const;

function LayoutJsonExport(): ReactElement {
	const exportLayoutJson = useBuilderStore((state) => state.exportLayoutJson);
	const json = exportLayoutJson();

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-3">
				<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Layout JSON</p>
				<button
					type="button"
					onClick={() => navigator.clipboard.writeText(json)}
					className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-300 hover:border-slate-600"
				>
					Copy
				</button>
			</div>
			<pre className="max-h-[420px] overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-300">
				{json}
			</pre>
		</div>
	);
}

function renderNodeProperties(node: LayoutNode): ReactElement {
	if (node.type === 'widget') {
		return <WidgetInspector node={node} />;
	}

	if (isLayoutInspectableNode(node)) {
		return <LayoutInspector node={node} />;
	}

	return (
		<div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
			This node type does not expose editable settings yet.
		</div>
	);
}

export function InspectorPanel(): ReactElement | null {
	const graph = useBuilderStore((state) => state.graph);
	const inspectorCollapsed = useBuilderStore((state) => state.inspectorCollapsed);
	const inspectorTab = useBuilderStore((state) => state.inspectorTab);
	const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
	const setInspectorTab = useBuilderStore((state) => state.setInspectorTab);
	const document = useBuilderStore((state) => state.document);

	if (inspectorCollapsed) {
		return null;
	}

	const node = selectedNodeId ? graph.nodes[selectedNodeId] : null;

	return (
		<Panel
			title="Inspector"
			subtitle="Schema-driven property panel with responsive overrides"
			className="h-full"
			actions={
				<div className="flex rounded-lg border border-slate-800 bg-slate-900 p-1">
					{inspectorTabs.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setInspectorTab(tab.id)}
							className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
								inspectorTab === tab.id
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
			<div className="space-y-4 px-4 py-4">
				{!node ? (
					<div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
						Select a node from the canvas or navigator to inspect it.
					</div>
				) : null}

				{node && inspectorTab === 'properties' ? (
					<>
						{node.type !== 'widget' ? (
							<div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
								<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Node</p>
								<p className="mt-2 text-sm font-semibold text-slate-100">{node.type}</p>
								<p className="mt-1 break-all text-xs text-slate-400">{node.id}</p>
							</div>
						) : null}
						{renderNodeProperties(node)}
					</>
				) : null}

				{node && inspectorTab === 'structure' ? (
					<div className="space-y-3">
						<div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Parent</p>
							<p className="mt-2 break-all text-sm text-slate-100">{node.parentId ?? 'none'}</p>
						</div>
						<div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Children</p>
							<ul className="mt-2 space-y-1 text-sm text-slate-100">
								{node.children.length > 0 ? (
									node.children.map((childId) => <li key={childId}>{childId}</li>)
								) : (
									<li className="text-slate-400">No child nodes</li>
								)}
							</ul>
						</div>
					</div>
				) : null}

				{inspectorTab === 'meta' ? (
					<div className="space-y-3">
						<div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
							<p className="text-xs uppercase tracking-[0.2em] text-slate-500">Document</p>
							<p className="mt-2 text-sm font-semibold text-slate-100">{document.meta.title}</p>
							<p className="mt-1 text-xs text-slate-400">
								Version {document.version} · {document.meta.status}
							</p>
						</div>
						<LayoutJsonExport />
					</div>
				) : null}
			</div>
		</Panel>
	);
}

'use client';

import type { ReactElement } from 'react';

import { getEditorBreakpoint } from '@builder/lib/responsive-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { PropertyFieldMap, PropertyRecord } from '@theme/builder/property-system/types';
import type {
	ColumnLayoutNode,
	ContainerLayoutNode,
	LayoutNode,
	RowLayoutNode,
	SectionLayoutNode,
} from '@theme/builder/layout-engine/types';

import { PropertyControl } from './property-control';
import { ResponsiveContextBar } from '../../responsive/components/responsive-context-bar';
import {
	columnLayoutSchema,
	columnResponsiveFields,
	containerLayoutSchema,
	rowLayoutSchema,
	sectionLayoutSchema,
} from '../lib/layout-node-schemas';
import {
	clearBreakpointOverride,
	filterVisibleFieldGroups,
	getFieldInheritance,
	groupPropertyFields,
	isResponsiveField,
	resolveFieldValue,
	writeResponsiveFieldValue,
} from '../lib/property-panel-utils';

type LayoutInspectableNode =
	| SectionLayoutNode
	| ContainerLayoutNode
	| RowLayoutNode
	| ColumnLayoutNode;

interface LayoutInspectorConfig {
	readonly schema: PropertyFieldMap;
	readonly responsiveFields: readonly string[];
	readonly settings: Record<string, unknown>;
}

function getLayoutInspectorConfig(node: LayoutInspectableNode): LayoutInspectorConfig {
	switch (node.type) {
		case 'column':
			return {
				schema: columnLayoutSchema,
				responsiveFields: columnResponsiveFields,
				settings: node.settings as Record<string, unknown>,
			};
		case 'row':
			return {
				schema: rowLayoutSchema,
				responsiveFields: [],
				settings: node.settings as Record<string, unknown>,
			};
		case 'section':
			return {
				schema: sectionLayoutSchema,
				responsiveFields: [],
				settings: node.settings as Record<string, unknown>,
			};
		case 'container':
			return {
				schema: containerLayoutSchema,
				responsiveFields: [],
				settings: node.settings as Record<string, unknown>,
			};
	}
}

interface LayoutInspectorProps {
	readonly node: LayoutInspectableNode;
}

export function LayoutInspector({ node }: LayoutInspectorProps): ReactElement {
	const activeBreakpoint = useBuilderStore((state) => state.activeBreakpoint);
	const editorDevice = useBuilderStore((state) => state.editorDevice);
	const patchNodeSettings = useBuilderStore((state) => state.patchNodeSettings);
	const deviceLabel = getEditorBreakpoint(editorDevice).label;

	const { schema, responsiveFields, settings } = getLayoutInspectorConfig(node);
	const groups = filterVisibleFieldGroups(groupPropertyFields(schema), settings);

	const applySettings = (nextSettings: Record<string, unknown>) => {
		patchNodeSettings(node.id, { settings: nextSettings });
	};

	const handleFieldChange = (fieldKey: string, fieldSchema: PropertyFieldMap[string], nextValue: unknown) => {
		const responsive = isResponsiveField(fieldKey, fieldSchema, responsiveFields);
		const storedValue = settings[fieldKey];
		const nextStoredValue = writeResponsiveFieldValue(
			storedValue,
			activeBreakpoint,
			nextValue,
			responsive,
		);

		applySettings({
			...settings,
			[fieldKey]: nextStoredValue,
		});
	};

	const handleResetOverride = (fieldKey: string) => {
		applySettings({
			...settings,
			[fieldKey]: clearBreakpointOverride(settings[fieldKey], activeBreakpoint),
		});
	};

	const contextProps: Record<string, unknown> = {};

	for (const fieldKey of responsiveFields) {
		if (settings[fieldKey] !== undefined) {
			contextProps[fieldKey] = settings[fieldKey];
		}
	}

	return (
		<div className="space-y-5">
			{responsiveFields.length > 0 ? (
				<ResponsiveContextBar
					props={contextProps as PropertyRecord}
					responsiveFieldCount={responsiveFields.length}
				/>
			) : null}

			{groups.map((group) => (
				<section key={group.id} className="space-y-3">
					<h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
						{group.label}
					</h3>
					<div className="space-y-3">
						{group.fields.map(({ key, schema: fieldSchema }) => {
							const responsive = isResponsiveField(key, fieldSchema, responsiveFields);
							const storedValue = settings[key];
							const displayValue = resolveFieldValue(storedValue, activeBreakpoint);
							const inheritance = getFieldInheritance(storedValue, activeBreakpoint);

							return (
								<PropertyControl
									key={key}
									fieldKey={key}
									schema={fieldSchema}
									value={displayValue ?? fieldSchema.default}
									responsive={responsive}
									deviceLabel={responsive ? deviceLabel : undefined}
									inherited={responsive ? inheritance.inherited : undefined}
									sourceLabel={responsive ? inheritance.sourceLabel : undefined}
									hasOverride={responsive ? inheritance.hasOverride : undefined}
									onResetOverride={
										responsive && inheritance.hasOverride
											? () => handleResetOverride(key)
											: undefined
									}
									onChange={(nextValue) => handleFieldChange(key, fieldSchema, nextValue)}
								/>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
}

export function isLayoutInspectableNode(node: LayoutNode): node is LayoutInspectableNode {
	return (
		node.type === 'section' ||
		node.type === 'container' ||
		node.type === 'row' ||
		node.type === 'column'
	);
}

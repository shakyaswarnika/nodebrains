import type { PropertyFieldMap } from '@theme/builder/property-system/types';

export const columnLayoutSchema = {
	span: {
		type: 'slider',
		label: 'Column span',
		description: 'Grid columns (1–12) at the active breakpoint.',
		min: 1,
		max: 12,
		step: 1,
		default: 12,
		responsive: true,
		group: 'layout',
		order: 1,
	},
	valign: {
		type: 'select',
		label: 'Vertical align',
		default: 'stretch',
		group: 'layout',
		order: 2,
		options: [
			{ value: 'start', label: 'Start' },
			{ value: 'center', label: 'Center' },
			{ value: 'end', label: 'End' },
			{ value: 'stretch', label: 'Stretch' },
		],
	},
} satisfies PropertyFieldMap;

export const columnResponsiveFields = ['span'] as const;

export const rowLayoutSchema = {
	gap: {
		type: 'select',
		label: 'Gap',
		default: 'md',
		group: 'layout',
		order: 1,
		options: [
			{ value: 'sm', label: 'Small' },
			{ value: 'md', label: 'Medium' },
			{ value: 'lg', label: 'Large' },
		],
	},
	align: {
		type: 'select',
		label: 'Align items',
		default: 'stretch',
		group: 'layout',
		order: 2,
		options: [
			{ value: 'start', label: 'Start' },
			{ value: 'center', label: 'Center' },
			{ value: 'end', label: 'End' },
			{ value: 'stretch', label: 'Stretch' },
		],
	},
	justify: {
		type: 'select',
		label: 'Justify content',
		default: 'start',
		group: 'layout',
		order: 3,
		options: [
			{ value: 'start', label: 'Start' },
			{ value: 'center', label: 'Center' },
			{ value: 'end', label: 'End' },
			{ value: 'between', label: 'Space between' },
		],
	},
} satisfies PropertyFieldMap;

export const sectionLayoutSchema = {
	tag: {
		type: 'select',
		label: 'Semantic tag',
		default: 'section',
		group: 'general',
		order: 1,
		options: [
			{ value: 'section', label: 'Section' },
			{ value: 'header', label: 'Header' },
			{ value: 'footer', label: 'Footer' },
			{ value: 'main', label: 'Main' },
			{ value: 'aside', label: 'Aside' },
		],
	},
	fullWidth: {
		type: 'boolean',
		label: 'Full width',
		default: false,
		group: 'layout',
		order: 2,
	},
} satisfies PropertyFieldMap;

export const containerLayoutSchema = {
	width: {
		type: 'select',
		label: 'Container width',
		default: 'default',
		group: 'layout',
		order: 1,
		options: [
			{ value: 'default', label: 'Default' },
			{ value: 'narrow', label: 'Narrow' },
			{ value: 'wide', label: 'Wide' },
			{ value: 'fluid', label: 'Fluid' },
			{ value: 'full', label: 'Full' },
		],
	},
} satisfies PropertyFieldMap;

import { defineWidget, asWidgetTypeId } from '../core/define-widget';
import { escapeHtml } from '../rendering/widget-renderer-registry';

function createLayoutWidget(config: {
	type: string;
	name: string;
	description: string;
	icon: string;
	kind: 'layout';
}) {
	return defineWidget({
		metadata: {
			type: asWidgetTypeId(config.type),
			name: config.name,
			description: config.description,
			icon: config.icon,
			version: '1.0.0',
			kind: config.kind,
			category: 'layout',
			paletteGroup: 'layout',
		},
		defaults: {},
		schema: {},
		responsive: { fields: [] },
		renderer: {
			mode: 'client',
			render() {
				return {
					className: `nb-widget nb-widget-${config.type.replace('.', '-')}`,
					html: `<div class="nb-layout-chip">${escapeHtml(config.name)} layout block</div>`,
				};
			},
		},
	});
}

export const sectionWidget = createLayoutWidget({
	type: 'layout.section',
	name: 'Section',
	description: 'Layout section wrapper',
	icon: 'S',
	kind: 'layout',
});

export const containerWidget = createLayoutWidget({
	type: 'layout.container',
	name: 'Container',
	description: 'Width-constrained container',
	icon: 'C',
	kind: 'layout',
});

export const columnsWidget = createLayoutWidget({
	type: 'layout.columns',
	name: 'Columns',
	description: 'Row + columns layout primitive',
	icon: 'G',
	kind: 'layout',
});

export const layoutWidgets = [sectionWidget, containerWidget, columnsWidget];

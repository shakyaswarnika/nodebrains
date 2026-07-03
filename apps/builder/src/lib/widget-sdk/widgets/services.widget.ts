import { defineWidget, asWidgetTypeId } from '../core/define-widget';
import { escapeHtml, readString } from '../rendering/widget-renderer-registry';

const servicesSchema = {
	heading: {
		type: 'string',
		label: 'Heading',
		default: 'Our Services',
		required: true,
	},
	description: {
		type: 'string',
		label: 'Description',
		default: 'Everything you need to launch quickly.',
	},
	columns: {
		type: 'responsive-columns',
		label: 'Grid Columns',
		default: 3,
		min: 1,
		max: 4,
		responsive: true,
		group: 'layout',
		order: 1,
	},
} as const;

export const servicesWidget = defineWidget({
	metadata: {
		type: asWidgetTypeId('content.services'),
		name: 'Services',
		description: 'Services grid content block',
		icon: 'S',
		version: '1.0.0',
		kind: 'template',
		category: 'content',
		paletteGroup: 'content',
		keywords: ['grid', 'services', 'features'],
		componentSlug: 'services' as never,
	},
	defaults: {
		heading: 'Our Services',
		description: 'Everything you need to launch quickly.',
		columns: 3,
	},
	schema: servicesSchema as import('@theme/builder/property-system/types').PropertyFieldMap,
	responsive: {
		fields: ['columns'],
	},
	renderer: {
		mode: 'client',
		render({ props, context }) {
			const heading = readString(props, 'heading', 'Services');
			const description = readString(props, 'description');
			const columns =
				typeof props.columns === 'number'
					? props.columns
					: typeof props.columns === 'object' && props.columns !== null
						? Number((props.columns as { lg?: number }).lg ?? 3)
						: 3;

			return {
				className: 'nb-widget nb-widget-services',
				html: `
					<div class="nb-widget-services__inner">
						<h3 class="nb-widget-services__heading">${escapeHtml(heading)}</h3>
						${description ? `<p class="nb-widget-services__description">${escapeHtml(description)}</p>` : ''}
						<div class="nb-widget-services__grid" data-columns="${columns}" data-breakpoint="${escapeHtml(String(context.breakpoint))}">
							<span>Services grid · ${columns} columns</span>
						</div>
					</div>
				`.trim(),
			};
		},
	},
});

import { defineWidget, asWidgetTypeId } from '../core/define-widget';
import { escapeHtml, readString } from '../rendering/widget-renderer-registry';

const placeholderSchema = {
	label: {
		type: 'string',
		label: 'Label',
		default: 'Widget Placeholder',
		required: true,
	},
	note: {
		type: 'string',
		label: 'Note',
		default: 'Reserved for upcoming widget SDK integration.',
	},
} as const;

export const placeholderWidget = defineWidget({
	metadata: {
		type: asWidgetTypeId('content.placeholder'),
		name: 'Widget Placeholder',
		description: 'Generic placeholder content block',
		icon: 'W',
		version: '1.0.0',
		kind: 'template',
		category: 'utility',
		paletteGroup: 'content',
	},
	defaults: {
		label: 'Widget Placeholder',
		note: 'Reserved for upcoming widget SDK integration.',
	},
	schema: placeholderSchema as import('@theme/builder/property-system/types').PropertyFieldMap,
	responsive: {
		fields: [],
	},
	renderer: {
		mode: 'client',
		render({ props }) {
			const label = readString(props, 'label', 'Placeholder');
			const note = readString(props, 'note');

			return {
				className: 'nb-widget nb-widget-placeholder',
				html: `
					<div class="nb-widget-placeholder__inner">
						<strong>${escapeHtml(label)}</strong>
						${note ? `<p>${escapeHtml(note)}</p>` : ''}
					</div>
				`.trim(),
			};
		},
	},
});

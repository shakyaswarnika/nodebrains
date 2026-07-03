import type { WidgetTypeId } from '@theme/builder/core/primitives';
import type { PropertyRecord } from '@theme/builder/property-system/types';
import type {
	WidgetRenderInput,
	WidgetRenderOutput,
	WidgetRenderer,
} from '@theme/builder/widget-sdk/types';

export interface WidgetRendererRegistry {
	register(type: WidgetTypeId, renderer: WidgetRenderer): void;
	unregister(type: WidgetTypeId): void;
	get(type: WidgetTypeId): WidgetRenderer | undefined;
	render(type: WidgetTypeId, input: WidgetRenderInput): WidgetRenderOutput;
}

export class WidgetRendererRegistryImpl implements WidgetRendererRegistry {
	private readonly renderers = new Map<WidgetTypeId, WidgetRenderer>();

	register(type: WidgetTypeId, renderer: WidgetRenderer): void {
		this.renderers.set(type, renderer);
	}

	unregister(type: WidgetTypeId): void {
		this.renderers.delete(type);
	}

	get(type: WidgetTypeId): WidgetRenderer | undefined {
		return this.renderers.get(type);
	}

	render(type: WidgetTypeId, input: WidgetRenderInput): WidgetRenderOutput {
		const renderer = this.renderers.get(type);

		if (!renderer) {
			return {
				html: `<div class="nb-widget nb-widget--missing">Missing renderer: ${escapeHtml(String(type))}</div>`,
				className: 'nb-widget nb-widget--missing',
			};
		}

		const output = renderer.render(input);

		if (output instanceof Promise) {
			throw new Error('Async renderers must be resolved before calling WidgetRendererRegistry.render().');
		}

		return output;
	}
}

export function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function readString(props: PropertyRecord, key: string, fallback = ''): string {
	const value = props[key];

	return typeof value === 'string' ? value : fallback;
}

export function readBoolean(props: PropertyRecord, key: string, fallback = false): boolean {
	const value = props[key];

	return typeof value === 'boolean' ? value : fallback;
}

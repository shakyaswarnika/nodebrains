import type { WidgetPaletteGroup } from '@theme/builder/widget-registry/types';

import { getWidgetSDK } from '../core/widget-sdk-impl';
import { heroWidget } from './hero.widget';
import { layoutWidgets } from './layout.widgets';
import { placeholderWidget } from './placeholder.widget';
import { servicesWidget } from './services.widget';

export const defaultPaletteGroups: readonly WidgetPaletteGroup[] = [
	{ id: 'layout', label: 'Layout', order: 1 },
	{ id: 'content', label: 'Content', order: 2 },
];

export const builtInWidgets = [
	...layoutWidgets,
	heroWidget,
	servicesWidget,
	placeholderWidget,
];

export function registerBuiltInWidgets(): ReturnType<typeof getWidgetSDK> {
	const sdk = getWidgetSDK();
	const registryImpl = sdk.registry as import('../registry/widget-registry-impl').WidgetRegistryImpl;

	for (const group of defaultPaletteGroups) {
		registryImpl.registerPaletteGroup(group);
	}

	for (const widget of builtInWidgets) {
		sdk.register(widget);
	}

	return sdk;
}

export { heroWidget, servicesWidget, placeholderWidget, layoutWidgets };

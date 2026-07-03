import type { WidgetInstanceId, WidgetTypeId } from '@theme/builder/core/primitives';
import type { WidgetRegistration } from '@theme/builder/widget-sdk/types';

import { WidgetModuleImpl } from './widget-module';

export function defineWidget(registration: WidgetRegistration): WidgetModuleImpl {
	if (!registration.metadata.type) {
		throw new Error('Widget metadata.type is required.');
	}

	if (!registration.renderer) {
		throw new Error(`Widget "${String(registration.metadata.type)}" requires a renderer.`);
	}

	return new WidgetModuleImpl(registration);
}

export function asWidgetTypeId(value: string): WidgetTypeId {
	return value as WidgetTypeId;
}

export function asWidgetInstanceId(value: string): WidgetInstanceId {
	return value as WidgetInstanceId;
}

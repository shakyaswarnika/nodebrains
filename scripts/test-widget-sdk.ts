/**
 * Widget SDK integration tests.
 */

import {
	asWidgetInstanceId,
	asWidgetTypeId,
	defineWidget,
	getWidgetSDK,
	registerBuiltInWidgets,
} from '../apps/builder/src/lib/widget-sdk/index.ts';

function assert(condition: unknown, message: string): void {
	if (!condition) {
		throw new Error(message);
	}
}

function testDefineWidgetHasAllCapabilities(): void {
	const widget = defineWidget({
		metadata: {
			type: asWidgetTypeId('test.widget'),
			name: 'Test Widget',
			version: '1.0.0',
			kind: 'template',
			category: 'utility',
			paletteGroup: 'content',
		},
		defaults: { label: 'Hello' },
		schema: {
			label: { type: 'string', label: 'Label', required: true, maxLength: 20 },
		},
		responsive: { fields: ['label'] },
		renderer: {
			mode: 'client',
			render({ props }) {
				return { html: `<strong>${String(props.label)}</strong>` };
			},
		},
	});

	const instanceId = asWidgetInstanceId('instance-1');
	const instance = widget.createInstance(instanceId);
	const validation = widget.validate({ label: '' });
	const serialized = widget.serialize(instance);
	const restored = widget.deserialize(serialized, instanceId);
	const definition = widget.toDefinition();

	assert(definition.name === 'Test Widget', 'Metadata should map to definition');
	assert(typeof instance.props.label === 'string', 'Defaults should create props');
	assert(!validation.valid, 'Empty required label should fail validation');
	assert(serialized.type === widget.registration.metadata.type, 'Serialization should preserve type');
	assert(restored.id === instanceId, 'Deserialization should preserve instance id');
}

function testBuiltInRegistration(): void {
	registerBuiltInWidgets();
	const sdk = getWidgetSDK();

	assert(sdk.registry.has('content.hero' as never), 'Hero widget should register');
	assert(sdk.registry.has('layout.section' as never), 'Section widget should register');
	assert(sdk.registry.list().length >= 6, 'Built-in widgets should register');

	const hero = sdk.getModule('content.hero' as never);
	assert(Boolean(hero?.registration.schema.title), 'Hero should expose inspector schema');

	const output = sdk.rendererRegistry.render('content.hero' as never, {
		props: hero!.resolveProps(hero!.registration.defaults, 'lg'),
		context: {
			instanceId: asWidgetInstanceId('preview'),
			type: 'content.hero' as never,
			breakpoint: 'lg',
			isEditor: true,
		},
	});

	assert(output.html.includes('Build with NodeBrains'), 'Hero renderer should produce HTML');
}

function testSerializerRoundTrip(): void {
	const sdk = getWidgetSDK();
	const hero = sdk.getModule('content.hero' as never)!;
	const instanceId = asWidgetInstanceId('hero-instance');
	const instance = hero.createInstance(instanceId, { title: 'Custom Hero' });
	const payload = sdk.serializer.serialize(instance);
	const restored = sdk.serializer.deserialize(payload, instanceId);

	assert(restored.props.title === 'Custom Hero', 'Serializer should round-trip props');
}

function testCreateInstancePreservesResponsiveValues(): void {
	const sdk = getWidgetSDK();
	const hero = sdk.getModule('content.hero' as never)!;
	const instanceId = asWidgetInstanceId('hero-responsive');
	const padding = {
		base: { top: 16, right: 16, bottom: 16, left: 16, linked: false },
		lg: { top: 48, right: 24, bottom: 48, left: 24, linked: false },
	};
	const instance = hero.createInstance(instanceId, { padding });

	assert(
		typeof instance.props.padding === 'object' &&
			instance.props.padding !== null &&
			'base' in (instance.props.padding as object),
		'createInstance should preserve responsive value maps',
	);

	const mobilePadding = hero.resolveProps(instance.props, 'base').padding as { top?: number };
	const desktopPadding = hero.resolveProps(instance.props, 'lg').padding as { top?: number };

	assert(mobilePadding.top === 16, 'Mobile padding should resolve from base');
	assert(desktopPadding.top === 48, 'Desktop padding should resolve from lg override');
}

const tests = [
	['defineWidget capabilities', testDefineWidgetHasAllCapabilities],
	['built-in registration', testBuiltInRegistration],
	['serializer round trip', testSerializerRoundTrip],
	['responsive createInstance', testCreateInstancePreservesResponsiveValues],
] as const;

for (const [name, run] of tests) {
	run();
	console.log(`✓ ${name}`);
}

console.log(`\n${tests.length}/${tests.length} widget SDK tests passed.`);

import type { WidgetTypeId } from '@theme/builder/core/primitives';
import type {
	WidgetExtensionManifest,
	WidgetModule,
	WidgetSDK,
	WidgetSDKConfig,
	WidgetSDKContext,
} from '@theme/builder/widget-sdk/types';
import type { WidgetRegistry } from '@theme/builder/widget-registry/types';

import { WidgetRegistryImpl } from '../registry/widget-registry-impl';
import { WidgetRendererRegistryImpl } from '../rendering/widget-renderer-registry';
import { WidgetSerializerImpl, WidgetValidatorImpl } from '../serialization/widget-serializer';

export class WidgetSDKImpl implements WidgetSDK {
	readonly version = '1.0.0';
	readonly registry: WidgetRegistry;
	readonly validator: WidgetValidatorImpl;
	readonly serializer: WidgetSerializerImpl;
	readonly rendererRegistry: WidgetRendererRegistryImpl;

	private readonly extensions = new Map<string, WidgetExtensionManifest>();
	private readonly config: WidgetSDKConfig;

	constructor(config: WidgetSDKConfig = {}) {
		const registryImpl = new WidgetRegistryImpl();
		this.registry = registryImpl;
		this.rendererRegistry = new WidgetRendererRegistryImpl();
		this.config = config;

		this.validator = new WidgetValidatorImpl({
			getModule: (type: WidgetTypeId) => registryImpl.getModule(type),
		});

		this.serializer = new WidgetSerializerImpl((type: WidgetTypeId) => registryImpl.getModule(type));
	}

	register(module: WidgetModule): void {
		const registryImpl = this.registry as WidgetRegistryImpl;
		registryImpl.registerModule(module);
		this.rendererRegistry.register(
			module.registration.metadata.type,
			module.registration.renderer,
		);
		module.registration.hooks?.onRegister?.(module.toDefinition());
	}

	unregister(type: WidgetTypeId): void {
		const registryImpl = this.registry as WidgetRegistryImpl;
		registryImpl.unregisterModule(type);
		this.rendererRegistry.unregister(type);
	}

	getModule(type: WidgetTypeId): WidgetModule | undefined {
		return (this.registry as WidgetRegistryImpl).getModule(type);
	}

	createContext(): WidgetSDKContext {
		return {
			registerWidget: (module) => this.register(module),
			unregisterWidget: (type) => this.unregister(type),
			getModule: (type) => this.getModule(type),
			getSchema: (type) => this.getModule(type)?.registration.schema,
		};
	}

	loadExtension(manifest: WidgetExtensionManifest): void {
		if (this.config.enableThirdPartyWidgets === false) {
			throw new Error('Third-party widget extensions are disabled.');
		}

		for (const contribution of manifest.widgets) {
			const module = contribution.module;

			if (contribution.hooks) {
				this.register({
					...module,
					registration: {
						...module.registration,
						hooks: {
							...module.registration.hooks,
							...contribution.hooks,
						},
					},
				});
				continue;
			}

			this.register(module);
		}

		this.extensions.set(manifest.id, manifest);
	}

	unloadExtension(extensionId: string): void {
		const manifest = this.extensions.get(extensionId);

		if (!manifest) {
			return;
		}

		for (const contribution of manifest.widgets) {
			const type =
				'module' in contribution
					? contribution.module.registration.metadata.type
					: (contribution as never as { metadata: { type: WidgetTypeId } }).metadata.type;

			this.unregister(type);
		}

		this.extensions.delete(extensionId);
	}
}

let sharedSdk: WidgetSDKImpl | null = null;

export function createWidgetSDK(config?: WidgetSDKConfig): WidgetSDKImpl {
	return new WidgetSDKImpl(config);
}

export function getWidgetSDK(): WidgetSDKImpl {
	if (!sharedSdk) {
		sharedSdk = createWidgetSDK();
	}

	return sharedSdk;
}

export function setWidgetSDK(sdk: WidgetSDKImpl): void {
	sharedSdk = sdk;
}

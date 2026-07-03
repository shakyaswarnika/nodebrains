import type { WidgetTypeId } from '@theme/builder/core/primitives';
import type {
	WidgetPaletteGroup,
	WidgetRegistry,
	WidgetRegistryFilter,
} from '@theme/builder/widget-registry/types';
import type { WidgetModule } from '@theme/builder/widget-sdk/types';

export class WidgetRegistryImpl implements WidgetRegistry {
	private readonly modules = new Map<WidgetTypeId, WidgetModule>();
	private readonly paletteGroups = new Map<string, WidgetPaletteGroup>();

	registerModule(module: WidgetModule): void {
		this.modules.set(module.registration.metadata.type, module);
	}

	unregisterModule(type: WidgetTypeId): void {
		this.modules.delete(type);
	}

	getModule(type: WidgetTypeId): WidgetModule | undefined {
		return this.modules.get(type);
	}

	registerPaletteGroup(group: WidgetPaletteGroup): void {
		this.paletteGroups.set(group.id, group);
	}

	register(_definition: ReturnType<WidgetModule['toDefinition']>): void {
		throw new Error('Use registerModule() — WidgetRegistryImpl requires a full WidgetModule.');
	}

	unregister(type: WidgetTypeId): void {
		this.unregisterModule(type);
	}

	get(type: WidgetTypeId) {
		return this.modules.get(type)?.toDefinition();
	}

	has(type: WidgetTypeId): boolean {
		return this.modules.has(type);
	}

	list(filter?: WidgetRegistryFilter) {
		let definitions = [...this.modules.values()].map((module) => module.toDefinition());

		if (filter?.kind) {
			definitions = definitions.filter((definition) => definition.kind === filter.kind);
		}

		if (filter?.category) {
			definitions = definitions.filter((definition) => definition.category === filter.category);
		}

		if (filter?.paletteGroup) {
			definitions = definitions.filter(
				(definition) => definition.paletteGroup === filter.paletteGroup,
			);
		}

		if (filter?.keyword) {
			const keyword = filter.keyword.toLowerCase();
			definitions = definitions.filter((definition) => {
				const haystack = [
					definition.name,
					definition.description ?? '',
					...(definition.keywords ?? []),
				]
					.join(' ')
					.toLowerCase();

				return haystack.includes(keyword);
			});
		}

		return definitions;
	}

	listPaletteGroups(): readonly WidgetPaletteGroup[] {
		return [...this.paletteGroups.values()].sort(
			(left, right) => (left.order ?? 0) - (right.order ?? 0),
		);
	}

	listModules(): readonly WidgetModule[] {
		return [...this.modules.values()];
	}
}

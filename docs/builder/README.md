# Visual Page Builder

> **Status:** Phase 0 — scaffolding only. No builder UI yet.

## Architecture Plan

```
apps/builder/          → Next.js + React + TypeScript admin app
inc/builder/           → PHP bootstrap, module registry
builder/modules/       → Server-side module definitions
```

## Module Registration (Future)

```php
add_action( 'nodebrains_builder_init', function () {
    \NodeBrains\Builder\Module_Registry::register( 'section', [
        'label'    => 'Section',
        'category' => 'layout',
    ] );
} );
```

## Technology Stack (Planned)

| Layer     | Technology                 |
| --------- | -------------------------- |
| Admin UI  | Next.js, React, TypeScript |
| Styling   | Tailwind CSS               |
| State     | TBD (Phase 2)              |
| Storage   | Post meta + REST API       |
| Rendering | PHP server-side render     |

## Non-Goals

- No Elementor dependency
- No third-party page builders
- No Gutenberg block replacement in Phase 0

See [ROADMAP.md](../../ROADMAP.md) for phase timeline.

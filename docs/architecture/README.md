# Architecture

NodeBrains uses a **hybrid architecture**: a classic PHP WordPress theme today, evolving into a theme + proprietary visual page builder.

## Layers

```
┌─────────────────────────────────────────────┐
│  Presentation (templates, template-parts)     │
├─────────────────────────────────────────────┤
│  Theme Logic (inc/ — namespaced PHP)        │
├─────────────────────────────────────────────┤
│  Builder Layer (inc/builder/, builder/)     │
├─────────────────────────────────────────────┤
│  Future: apps/builder (Next.js + React)     │
├─────────────────────────────────────────────┤
│  WordPress Core APIs                        │
└─────────────────────────────────────────────┘
```

## Key Principles

1. **Thin `functions.php`** — only loads `/inc` modules
2. **Namespaces** — `NodeBrains\*` prevents global collisions
3. **Separation of concerns** — logic in `/inc`, markup in templates
4. **Builder-ready hooks** — `nodebrains_builder_init` action
5. **No third-party page builders** — proprietary builder only

## Directory Map

| Path               | Responsibility                      |
| ------------------ | ----------------------------------- |
| `inc/`             | PHP bootstrap, hooks, theme support |
| `inc/builder/`     | Server-side builder scaffolding     |
| `builder/modules/` | Future PHP builder modules          |
| `apps/builder/`    | Future Next.js admin UI             |
| `assets/`          | Enqueued front-end assets           |
| `template-parts/`  | Reusable template fragments         |

See [development/setup.md](development/setup.md) for local environment configuration.

# NodeBrains Visual Page Builder (Future)

This directory will host the **Next.js + React + TypeScript** admin application for the proprietary visual page builder.

## Status

**Phase 0** — placeholder only. No application code yet.

## Planned Structure

```
apps/builder/
├── src/
│   ├── components/
│   ├── modules/
│   ├── hooks/
│   └── lib/
├── public/
├── package.json      # Workspace package (future)
└── next.config.ts
```

## TypeScript

Project-wide strict TypeScript is configured in the root `tsconfig.json` with paths:

- `@builder/*` → `apps/builder/src/*`

## Getting Started (Future)

```bash
cd apps/builder
npm run dev
```

See [docs/builder/README.md](../../docs/builder/README.md) for architecture details.

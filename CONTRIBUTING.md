# Contributing to NodeBrains

Thank you for contributing to NodeBrains. This document outlines the development workflow for a long-term, enterprise-grade WordPress product.

## Prerequisites

| Tool      | Version |
| --------- | ------- |
| PHP       | 8.2+    |
| WordPress | 6.7+    |
| Node.js   | 20+     |
| Composer  | 2.x     |
| Git       | 2.x+    |

## Getting Started

```bash
git clone git@github.com:shakyaswarnika/nodebrains.git
cd nodebrains
composer install
npm install
```

## Branch Strategy

| Branch      | Purpose                         |
| ----------- | ------------------------------- |
| `main`      | Production-ready releases       |
| `develop`   | Integration branch for features |
| `feature/*` | New features                    |
| `fix/*`     | Bug fixes                       |
| `chore/*`   | Tooling and maintenance         |

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add hero builder module
fix: correct sidebar visibility on archives
chore: update eslint dependencies
docs: add architecture overview
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

## Code Quality

Before committing, hooks automatically run:

- **ESLint** on JavaScript
- **Prettier** on supported files
- **PHPCS** on PHP (WordPress Coding Standards)

Manual checks:

```bash
npm run check        # Full quality gate
npm run lint         # ESLint + PHPCS
npm run format       # Prettier write
composer run lint:php
```

## PHP Standards

- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)
- Use strict types in `/inc` files
- Escape all output; sanitize all input
- Keep `functions.php` minimal

## JavaScript Standards

- ESLint recommended + Prettier
- No unnecessary dependencies
- Future builder code lives in `apps/builder/`

## Pull Requests

1. Fork and create a feature branch from `develop`
2. Ensure `npm run check` passes locally
3. Update `CHANGELOG.md` under `[Unreleased]`
4. Open a PR with a clear description and test plan
5. Request review before merge

## Do Not Modify Without Discussion

- WordPress template hierarchy contracts
- Public hook names (`nodebrains_builder_init`)
- Text domain (`nodebrains`)

## Questions

Open a [GitHub Issue](https://github.com/shakyaswarnika/nodebrains/issues) for questions or proposals.

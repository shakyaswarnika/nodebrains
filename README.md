# NodeBrains

[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](LICENSE)
[![PHP](https://img.shields.io/badge/PHP-8.2%2B-777BB4)](https://php.net/)
[![WordPress](https://img.shields.io/badge/WordPress-6.7%2B-21759B)](https://wordpress.org/)

A lightweight, modular, high-performance **WordPress theme** designed as the foundation for a proprietary **Visual Page Builder** (React, TypeScript, Next.js).

**Author:** Swarnika Shakya · **Website:** [nodebrains.com](https://nodebrains.com) · **Repository:** [github.com/shakyaswarnika/nodebrains](https://github.com/shakyaswarnika/nodebrains)

---

## Features

- Classic PHP theme with namespaced `/inc` architecture
- Block editor support via `theme.json`
- Customizer integration with live preview
- Builder scaffolding for future React/Next.js UI
- Enterprise dev tooling (Composer, ESLint, Prettier, Husky, CI/CD)
- No Elementor or third-party page builder dependencies

## Requirements

| Requirement | Version           |
| ----------- | ----------------- |
| PHP         | 8.2+              |
| WordPress   | 6.7+              |
| Node.js     | 20+ (development) |
| Composer    | 2.x (development) |

## Quick Start

### WordPress Installation

1. Copy or clone into `wp-content/themes/nodebrains/`
2. Activate **NodeBrains** under **Appearance → Themes**

### Development Setup

```bash
composer install
npm install
npm run check
```

See [docs/development/setup.md](docs/development/setup.md) for detailed environment configuration.

## Project Structure

```
nodebrains/
├── .github/workflows/     # CI/CD pipelines
├── .husky/                # Git hooks
├── apps/builder/          # Future Next.js builder app
├── assets/                # Front-end CSS/JS/images
├── builder/               # Future PHP builder modules
├── docs/                  # Project documentation
├── inc/                   # Theme PHP logic (namespaced)
├── scripts/               # Build & utility scripts
├── template-parts/        # Reusable template fragments
├── templates/             # Custom page templates
├── composer.json          # PHP dev dependencies
├── package.json           # Node dev dependencies
├── phpcs.xml              # WordPress Coding Standards config
├── theme.json             # Block editor design tokens
└── style.css              # Theme header (required by WP)
```

## Development Commands

| Command                     | Description                  |
| --------------------------- | ---------------------------- |
| `npm run lint`              | ESLint + PHPCS               |
| `npm run format`            | Prettier (write)             |
| `npm run format:check`      | Prettier (check only)        |
| `npm run build`             | Build pipeline (placeholder) |
| `npm run test`              | Test suite (placeholder)     |
| `npm run check`             | Full quality gate            |
| `composer run lint:php`     | WordPress Coding Standards   |
| `composer run lint:php:fix` | Auto-fix PHPCS issues        |

## Git Hooks

Every commit automatically runs:

- **ESLint** + **Prettier** on staged JS/CSS/JSON/MD
- **PHPCS** on staged PHP files
- **Commitlint** for Conventional Commits

## CI/CD

GitHub Actions workflows:

| Workflow                         | Purpose                             |
| -------------------------------- | ----------------------------------- |
| `php-lint.yml`                   | PHP syntax validation (`php -l`)    |
| `javascript-lint.yml`            | ESLint on theme JavaScript          |
| `wordpress-coding-standards.yml` | PHPCS (WPCS + PHPCompatibility)     |
| `composer-validate.yml`          | `composer.json` integrity           |
| `node-build.yml`                 | Prettier check + build/test scripts |

## Documentation

| Document                                   | Description             |
| ------------------------------------------ | ----------------------- |
| [CHANGELOG.md](CHANGELOG.md)               | Version history         |
| [CONTRIBUTING.md](CONTRIBUTING.md)         | Contribution guidelines |
| [ROADMAP.md](ROADMAP.md)                   | Product roadmap         |
| [SECURITY.md](SECURITY.md)                 | Vulnerability reporting |
| [docs/architecture/](docs/architecture/)   | System architecture     |
| [docs/builder/](docs/builder/)             | Visual builder plans    |
| [docs/design-system/](docs/design-system/) | Design tokens           |

## Roadmap

- **Phase 0** — Project foundation ✅
- **Phase 1** — Theme hardening & tests
- **Phase 2** — Builder architecture (Next.js)
- **Phase 3** — Visual Page Builder MVP

See [ROADMAP.md](ROADMAP.md) for details.

## License

GPL-2.0-or-later — see [LICENSE](LICENSE).

WordPress theme header and `readme.txt` are included for WordPress.org compatibility.

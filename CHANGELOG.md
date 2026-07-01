# Changelog

All notable changes to the NodeBrains WordPress theme are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Phase 0 project foundation (Composer, npm, linting, Git hooks, CI/CD)
- Enterprise documentation structure under `docs/`
- GitHub Actions workflows for PHP, JavaScript, PHPCS, Composer, and Node build
- Husky pre-commit hooks (ESLint, Prettier, PHPCS)
- Commitlint for Conventional Commits

## [1.0.0] - 2026-06-30

### Added

- Initial NodeBrains WordPress theme foundation
- Modular `/inc` architecture with namespaced PHP
- Template hierarchy and template parts
- Theme Customizer copyright setting
- Block editor support via `theme.json`
- Builder scaffolding (`inc/builder/`, `builder/`)
- Full-width page template
- Translation-ready text domain (`nodebrains`)

[Unreleased]: https://github.com/shakyaswarnika/nodebrains/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/shakyaswarnika/nodebrains/releases/tag/v1.0.0

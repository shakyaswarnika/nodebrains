# Development Guide

## Local Setup (XAMPP)

1. Clone into `wp-content/themes/nodebrains/`
2. Activate theme in WordPress admin
3. Install dependencies:

```bash
composer install
npm install
```

## Environment Variables

Copy `.env.example` to `.env` when introduced in later phases. Never commit `.env`.

## Commands

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `npm run lint`          | ESLint + PHPCS               |
| `npm run format`        | Prettier format              |
| `npm run check`         | Full quality gate            |
| `npm run build`         | Build pipeline (placeholder) |
| `composer run lint:php` | WordPress Coding Standards   |

## Git Hooks

Husky runs on every commit:

- `pre-commit` → lint-staged (ESLint, Prettier, PHPCS)
- `commit-msg` → Commitlint (Conventional Commits)

## CI/CD

GitHub Actions run on push/PR to `main` and `develop`:

- PHP syntax lint
- ESLint
- PHPCS (WPCS + PHPCompatibility)
- Composer validation
- Node build + format check

## PHP Binary (Windows/XAMPP)

```powershell
$env:PHP_BINARY = "d:\xampp\php\php.exe"
npm run lint:php:syntax
```

See [setup.md](setup.md) for detailed environment configuration.

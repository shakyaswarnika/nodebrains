# Development Setup

## Requirements

- PHP 8.2+ (XAMPP recommended for Windows)
- WordPress 6.7+
- Node.js 20+
- Composer 2.x
- Git 2.x+

## Windows (XAMPP)

```powershell
# Add PHP to PATH for the session
$env:Path = "d:\xampp\php;C:\Program Files\Git\cmd;" + $env:Path

# Install dependencies
cd d:\xampp\htdocs\nodebrains\wp-content\themes\nodebrains
composer install
npm install
```

## Verify Toolchain

```bash
php -v
composer -V
node -v
npm -v
npm run check
```

## IDE Recommendations

- **PHP:** Intelephense or PHPStorm with WordPress stubs
- **JS/TS:** VS Code / Cursor with ESLint + Prettier extensions
- **EditorConfig:** Enable EditorConfig support in your IDE

## Troubleshooting

| Issue                        | Solution                                                 |
| ---------------------------- | -------------------------------------------------------- |
| `git` not found              | Restart terminal after Git install                       |
| `node` not found             | Install Node.js 20 LTS                                   |
| PHPCS errors on commit       | Run `composer run lint:php:fix`                          |
| Husky hooks not running      | Run `npm run prepare`                                    |
| Composer zip extension error | Enable `extension=zip` in `d:\xampp\php\php.ini` (XAMPP) |

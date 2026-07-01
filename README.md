# NodeBrains WordPress Theme

A lightweight, modular, high-performance custom WordPress theme designed as the foundation for a proprietary visual page builder integration.

**Version:** 1.0.0  
**Author:** Swarnika Shakya  
**Requires PHP:** 8.2+  
**Requires WordPress:** 6.7+  
**License:** GPL-2.0-or-later

---

## Overview

NodeBrains is a classic PHP-based WordPress theme built with extensibility in mind. It follows WordPress Coding Standards, separates logic from presentation, and provides a clean architecture for future custom builder development.

This theme does **not** depend on Elementor or any third-party page builder.

---

## Installation

1. Copy the `nodebrains` folder into your WordPress installation:
   ```
   wp-content/themes/nodebrains/
   ```
2. Log in to the WordPress admin dashboard.
3. Navigate to **Appearance → Themes**.
4. Activate **NodeBrains**.

### Local development (XAMPP)

If this project lives at `htdocs/nodebrains/`, the theme path is:

```
htdocs/nodebrains/wp-content/themes/nodebrains/
```

Ensure Apache and MySQL are running, then visit your local site URL and activate the theme.

---

## Folder Structure

```
nodebrains/
├── assets/
│   ├── css/          # Front-end stylesheets (main.css)
│   ├── js/           # Front-end scripts (main.js)
│   ├── images/       # Theme images
│   └── fonts/        # Web fonts
├── inc/
│   ├── constants.php         # Theme path, URI, and version constants
│   ├── setup.php             # Theme bootstrap and text domain
│   ├── theme-support.php     # add_theme_support() registrations
│   ├── enqueue.php           # Script and style enqueuing
│   ├── menus.php             # Navigation menu locations
│   ├── sidebars.php          # Widget areas
│   ├── helpers.php           # Shared utility functions
│   ├── customizer.php        # Theme Customizer settings
│   ├── template-functions.php# Template output helpers
│   └── builder/              # Visual page builder scaffolding
│       ├── bootstrap.php     # Builder init hook
│       └── registry.php      # Future module registry
├── builder/                  # Future builder modules and assets
│   └── modules/
├── template-parts/
│   ├── header/               # Header partials
│   ├── footer/               # Footer partials
│   └── content/              # Loop content partials
├── patterns/                 # Future block patterns
├── parts/                    # Future block template parts
├── templates/                # Custom page templates
│   └── full-width.php        # Full-width page layout
├── languages/                # Translation files (.pot, .po, .mo)
├── styles/                   # Block editor styles
├── theme.json                # Block editor design tokens
├── readme.txt                # WordPress.org readme
├── searchform.php            # Accessible search form
├── functions.php             # Loads inc/ modules only
├── style.css         # Theme header (required by WordPress)
├── index.php         # Main fallback template
├── header.php        # Document head and site header
├── footer.php        # Site footer and closing markup
├── sidebar.php       # Main sidebar widget area
├── comments.php      # Comments template
├── search.php        # Search results
├── 404.php           # Not found template
├── archive.php       # Archive pages
├── single.php        # Single post template
├── page.php          # Page template
├── front-page.php    # Static front page
├── home.php          # Blog posts index
└── screenshot.png    # Theme screenshot for admin
```

---

## Theme Features

### Registered Theme Support

- Title tag
- Post thumbnails
- Automatic feed links
- Custom logo
- Custom background
- HTML5 markup
- Custom header
- Responsive embeds
- Editor styles
- Wide block alignment
- Core block styles

### Navigation Menus

| Location  | Description        |
|-----------|--------------------|
| `primary` | Main site navigation |
| `footer`  | Footer navigation  |

### Widget Areas

| ID               | Name               |
|------------------|--------------------|
| `main-sidebar`   | Main Sidebar       |
| `footer-widgets` | Footer Widget Area |

### Customizer

- **Footer → Copyright Text** — editable site copyright notice

---

## Development Workflow

### 1. Keep `functions.php` lean

All theme logic belongs in `/inc`. Only require modules from `functions.php`.

### 2. Separate logic from templates

- Use `/inc` for hooks, registrations, and reusable logic.
- Use `/template-parts` for reusable markup fragments.
- Keep root template files focused on structure and the WordPress Loop.

### 3. Asset versioning

Styles and scripts are versioned with `filemtime()` for cache busting during development. Edit files in:

- `assets/css/main.css`
- `assets/js/main.js`

### 4. Namespaces

PHP modules under `/inc` use the `NodeBrains` namespace to avoid global function collisions. Template files call namespaced functions explicitly.

### 5. Coding standards

Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/):

- Escape all output (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`).
- Sanitize all inputs in Customizer and admin callbacks.
- Use PHPDoc blocks on functions and files.
- Prefix handles and settings with `nodebrains`.

### 6. Internationalization

All user-facing strings use the `nodebrains` text domain. Place translation files in `/languages`.

Generate a POT file (requires WP-CLI):

```bash
wp i18n make-pot wp-content/themes/nodebrains wp-content/themes/nodebrains/languages/nodebrains.pot
```

### 7. Future extension points

The following are intentionally reserved for later development:

- `/builder/modules/` — visual builder elements and widgets
- `/inc/builder/registry.php` — module registration API
- `/patterns/` — block patterns
- `/parts/` — block template parts
- `nodebrains_builder_init` action — builder bootstrap hook

---

## Requirements

| Requirement | Version |
|-------------|---------|
| PHP         | 8.2+    |
| WordPress   | 6.7+    |

---

## License

This theme is licensed under the [GNU General Public License v2.0 or later](https://www.gnu.org/licenses/gpl-2.0.html).

---

## Links

- Theme URI: [https://nodebrains.com](https://nodebrains.com)
- Author URI: [https://nodebrains.com](https://nodebrains.com)

# Features Component

Responsive grid of feature items with icon, heading, and description. Builder-ready via `Features\get_builder_schema()`.

## Files

| File               | Purpose                                 |
| ------------------ | --------------------------------------- |
| `component.php`    | Defaults, normalization, builder schema |
| `template.php`     | Section wrapper and grid                |
| `feature-item.php` | Single feature partial                  |
| `style.css`        | Token-based styles                      |
| `script.js`        | Optional equal-height items             |
| `README.md`        | Documentation                           |

## Usage

```php
nodebrains_component(
	'features',
	array(
		'heading'     => __( 'Why Choose Us', 'nodebrains' ),
		'description' => $section_intro,
		'columns'     => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'variant'     => 'centered',
		'icon_style'  => 'circle',
		'equal_height'=> true,
		'features'    => array(
			array(
				'icon'        => '<svg aria-hidden="true" focusable="false">...</svg>',
				'heading'     => __( 'Fast Performance', 'nodebrains' ),
				'description' => $feature_desc,
			),
			array(
				'icon'        => $icon_html,
				'heading'     => __( 'Secure by Default', 'nodebrains' ),
				'description' => $feature_desc_two,
			),
		),
	)
);
```

## Section arguments

| Key               | Type       | Default          | Description                       |
| ----------------- | ---------- | ---------------- | --------------------------------- |
| `features`        | array      | `[]`             | List of feature items             |
| `heading`         | string     | `''`             | Section heading                   |
| `description`     | string     | `''`             | Section description               |
| `heading_level`   | int        | `2`              | Section heading level             |
| `columns`         | array\|int | sm:1, md:2, lg:3 | Responsive columns                |
| `gap`             | string     | `md`             | Grid gap: `sm`, `md`, `lg`        |
| `variant`         | string     | `default`        | `default`, `bordered`, `centered` |
| `icon_style`      | string     | `default`        | `default`, `circle`, `plain`      |
| `container_width` | string     | `default`        | Container variant                 |
| `equal_height`    | bool       | `true`           | Equalize item heights             |
| `class`           | string     | `''`             | Extra classes                     |
| `id`              | string     | `''`             | HTML `id`                         |
| `attributes`      | array      | `[]`             | Extra attributes                  |

## Feature item fields

| Key             | Type             | Description                    |
| --------------- | ---------------- | ------------------------------ |
| `icon`          | string\|callable | Decorative icon HTML           |
| `heading`       | string           | Feature heading                |
| `description`   | string           | Feature description            |
| `heading_level` | int              | Item heading level (default 3) |
| `class`         | string           | Extra item classes             |
| `attributes`    | array            | Extra item attributes          |

## Accessibility

- Section uses `aria-labelledby` when a heading is present, otherwise `aria-label`.
- Icons are decorative (`aria-hidden="true"`); provide accessible text in the heading.
- Feature grid uses `role="list"` / `role="listitem"` for screen reader structure.
- Each item links its region to its heading via `aria-labelledby`.
- Semantic heading levels are configurable and clamped between `h2`–`h6`.

## Filters

- `nodebrains_component_features_args`
- `nodebrains_component_features_html`

## BEM

```
nb-c-features
nb-c-features__grid
nb-c-features-item
nb-c-features-item__icon
nb-c-features-item__heading
nb-c-features-item__description
```

## JavaScript

When `equal_height` is `true`, `script.js` equalizes `.nb-c-features-item` heights per grid row using the configured `columns` map and recalculates on resize.

## Builder compatibility

`get_builder_schema()` exposes a `features` repeater with icon, heading, and description fields, plus layout controls for columns, gap, variant, and icon style.

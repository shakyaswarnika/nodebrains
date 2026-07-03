# Footer Component

Reusable footer with 1–4 column layouts, logo, navigation, widget areas, newsletter placeholder, copyright, and social icons. Builder-ready via `Footer\get_builder_schema()`.

## Files

| File            | Purpose                             |
| --------------- | ----------------------------------- |
| `component.php` | Layout plans, normalization, schema |
| `template.php`  | Footer wrapper and column grid      |
| `blocks/*.php`  | Modular block partials              |
| `style.css`     | Responsive column styles            |
| `script.js`     | Placeholder newsletter guard        |
| `README.md`     | Documentation                       |

## Column layouts

| Columns | Distribution                                     |
| ------- | ------------------------------------------------ |
| `1`     | Logo, nav, widgets, newsletter, social (stacked) |
| `2`     | Logo + social + newsletter \| Nav + widgets      |
| `3`     | Logo + social \| Nav + widgets \| Newsletter     |
| `4`     | Logo \| Nav \| Widgets \| Newsletter + social    |

Copyright always renders in a full-width bar below the columns.

## Usage

```php
nodebrains_component(
	'footer',
	array(
		'columns' => 4,
		'variant' => 'bordered',
		'logo'    => array(
			'use_site_logo' => true,
			'tagline'       => get_bloginfo( 'description' ),
		),
		'navigation' => array(
			'menu_args' => array(
				'theme_location' => 'footer',
			),
		),
		'newsletter' => array(
			'content' => '[mailpoet_form id="1"]',
			'title'   => __( 'Stay Updated', 'nodebrains' ),
		),
		'social' => array(
			'links' => array(
				array(
					'label'    => 'LinkedIn',
					'url'      => $linkedin_url,
					'icon'     => '<svg>...</svg>',
					'external' => true,
				),
			),
		),
		'copyright' => array(
			'text' => sprintf( '© %s %s', gmdate( 'Y' ), get_bloginfo( 'name' ) ),
		),
	)
);
```

### Theme footer integration

```php
// template-parts/footer/site-footer.php
nodebrains_component( 'footer' );
```

## Arguments

| Key               | Type   | Default   | Description                      |
| ----------------- | ------ | --------- | -------------------------------- |
| `columns`         | int    | `4`       | `1`, `2`, `3`, or `4`            |
| `variant`         | string | `default` | `default`, `bordered`, `surface` |
| `logo`            | array  | see below | Logo block config                |
| `navigation`      | array  | see below | Footer menu config               |
| `widget_areas`    | array  | see below | Sidebar IDs per column           |
| `newsletter`      | array  | see below | Newsletter slot or placeholder   |
| `copyright`       | array  | see below | Copyright bar                    |
| `social`          | array  | see below | Social icon links                |
| `container_width` | string | `default` | Container variant                |

## Widget areas

By default the component maps columns to `footer-1` … `footer-4`. Register sidebars in `inc/sidebars.php` or pass custom IDs:

```php
'widget_areas' => array(
	'areas' => array(
		array( 'id' => 'footer-1' ),
		array( 'id' => 'footer-2' ),
	),
),
```

Filter: `nodebrains_footer_widget_area_ids`

## Accessibility

- Root `<footer role="contentinfo">`.
- Navigation and social blocks use labelled `<nav>` elements.
- Social links support icons with visually hidden labels (`aria-label`).
- Newsletter placeholder fields are disabled until a real form is connected.
- Widget areas use `role="complementary"`.

## Filters

- `nodebrains_component_footer_args`
- `nodebrains_component_footer_html`
- `nodebrains_footer_widget_area_ids`

## BEM

```
nb-c-footer
nb-c-footer__columns
nb-c-footer__column
nb-c-footer__logo
nb-c-footer__newsletter
nb-c-footer__social
nb-c-footer__copyright
```

## Builder compatibility

`get_builder_schema()` exposes column count, variant, and grouped controls for every footer block.

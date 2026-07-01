# Services Component

Responsive grid of service items with icon, title, description, and link. Builder-ready via `Services\get_builder_schema()`.

## Files

| File               | Purpose                                 |
| ------------------ | --------------------------------------- |
| `component.php`    | Defaults, normalization, builder schema |
| `template.php`     | Section wrapper and grid                |
| `service-item.php` | Single service partial                  |
| `style.css`        | Token-based styles                      |
| `script.js`        | Optional equal-height items             |
| `README.md`        | Documentation                           |

## Usage

```php
nodebrains_component(
	'services',
	array(
		'heading'     => __( 'Our Services', 'nodebrains' ),
		'description' => $section_intro,
		'columns'     => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'variant'     => 'bordered',
		'equal_height'=> true,
		'services'    => array(
			array(
				'icon'        => $icon_html,
				'title'       => __( 'Web Design', 'nodebrains' ),
				'description' => $service_desc,
				'link'        => array(
					'text'     => __( 'View service', 'nodebrains' ),
					'url'      => $service_url,
					'external' => false,
				),
			),
		),
	)
);
```

## Section arguments

| Key               | Type       | Default          | Description                      |
| ----------------- | ---------- | ---------------- | -------------------------------- |
| `services`        | array      | `[]`             | List of service items            |
| `heading`         | string     | `''`             | Section heading                  |
| `description`     | string     | `''`             | Section description              |
| `heading_level`   | int        | `2`              | Section heading level            |
| `columns`         | array\|int | sm:1, md:2, lg:3 | Responsive columns               |
| `gap`             | string     | `md`             | Grid gap                         |
| `variant`         | string     | `default`        | `default`, `bordered`, `surface` |
| `container_width` | string     | `default`        | Container variant                |
| `equal_height`    | bool       | `true`           | Equalize item heights            |
| `class`           | string     | `''`             | Extra classes                    |
| `id`              | string     | `''`             | HTML `id`                        |
| `attributes`      | array      | `[]`             | Extra attributes                 |

## Service item fields

| Key             | Type             | Description                           |
| --------------- | ---------------- | ------------------------------------- |
| `icon`          | string\|callable | Decorative icon HTML                  |
| `title`         | string           | Service title                         |
| `description`   | string           | Service description                   |
| `link`          | array            | `{ text, url, external, attributes }` |
| `heading_level` | int              | Item title level (default `3`)        |
| `class`         | string           | Extra item classes                    |
| `attributes`    | array            | Extra item attributes                 |

## Filters

- `nodebrains_component_services_args`
- `nodebrains_component_services_html`

## BEM

```
nb-c-services
nb-c-services__grid
nb-c-services-item
nb-c-services-item__icon
nb-c-services-item__link
```

## Builder compatibility

`get_builder_schema()` exposes a `services` repeater with icon, title, description, and link fields.

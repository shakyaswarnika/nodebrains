# Cards Component

Responsive grid of feature cards. Each card supports icon, image, title, description, button, link, and badge. Builder-ready via `Cards\get_builder_schema()`.

## Files

| File            | Purpose                                 |
| --------------- | --------------------------------------- |
| `component.php` | Defaults, normalization, builder schema |
| `template.php`  | Section wrapper and grid                |
| `card-item.php` | Single card partial (modular)           |
| `style.css`     | Token-based styles                      |
| `script.js`     | Optional equal-height card bodies       |
| `README.md`     | Documentation                           |

## Usage

```php
nodebrains_component(
	'cards',
	array(
		'heading'     => __( 'Why NodeBrains', 'nodebrains' ),
		'description' => $section_intro,
		'columns'     => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'gap'         => 'md',
		'card_variant'=> 'elevated',
		'equal_height'=> true,
		'cards'       => array(
			array(
				'icon'        => '<svg>...</svg>',
				'title'       => __( 'Fast', 'nodebrains' ),
				'description' => $card_one_desc,
				'badge'       => array(
					'text'    => __( 'New', 'nodebrains' ),
					'variant' => 'accent',
				),
				'button'      => array(
					'text' => __( 'Learn more', 'nodebrains' ),
					'url'  => $url,
				),
			),
			array(
				'image'       => array(
					'src' => $image_url,
					'alt' => $image_alt,
				),
				'title'       => $title,
				'description' => $description,
				'link'        => array(
					'text'     => __( 'Read article', 'nodebrains' ),
					'url'      => $permalink,
					'external' => false,
				),
			),
		),
	)
);
```

## Section arguments

| Key               | Type       | Default          | Description                       |
| ----------------- | ---------- | ---------------- | --------------------------------- |
| `cards`           | array      | `[]`             | List of card item objects         |
| `heading`         | string     | `''`             | Optional section heading          |
| `description`     | string     | `''`             | Optional section description      |
| `heading_level`   | int        | `2`              | Section heading level             |
| `columns`         | array\|int | sm:1, md:2, lg:3 | Responsive column map             |
| `gap`             | string     | `md`             | Grid gap: `sm`, `md`, `lg`        |
| `card_variant`    | string     | `default`        | `default`, `elevated`, `bordered` |
| `container_width` | string     | `default`        | Framework container variant       |
| `equal_height`    | bool       | `true`           | Equalize card body heights        |
| `class`           | string     | `''`             | Extra classes                     |
| `id`              | string     | `''`             | HTML `id`                         |
| `attributes`      | array      | `[]`             | Extra attributes                  |

## Card item fields

| Key             | Type             | Description                           |
| --------------- | ---------------- | ------------------------------------- |
| `icon`          | string\|callable | Decorative icon HTML                  |
| `image`         | array            | `{ src, alt }`                        |
| `title`         | string           | Card heading                          |
| `description`   | string           | Card body copy                        |
| `button`        | array            | `{ text, url, attributes }`           |
| `link`          | array            | `{ text, url, external, attributes }` |
| `badge`         | array            | `{ text, variant }`                   |
| `heading_level` | int              | Card title level (default `3`)        |
| `variant`       | string           | Override section `card_variant`       |
| `class`         | string           | Extra item classes                    |
| `attributes`    | array            | Extra item attributes                 |

## Filters

- `nodebrains_component_cards_args`
- `nodebrains_component_cards_html`

## BEM

```
nb-c-cards
nb-c-cards__grid
nb-c-cards-item
nb-c-cards-item__title
nb-c-cards-item__footer
```

## JavaScript

When `equal_height` is `true`, `script.js` equalizes `.nb-c-cards-item__body` heights per grid row and recalculates on resize.

## Builder compatibility

`get_builder_schema()` defines a `cards` repeater with typed sub-fields for future widget controls.

## Architecture

- **Section** (`template.php`) — layout and grid wrapper
- **Item** (`card-item.php`) — isolated card markup; reusable partial
- **Child components** — `badge`, `button`, `link` composed inside each card

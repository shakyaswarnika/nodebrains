# CTA Component

Reusable call-to-action block for conversions, promos, and end-of-content prompts. Builder-ready via `Cta\get_builder_schema()`.

## Files

| File            | Purpose                                      |
| --------------- | -------------------------------------------- |
| `component.php` | Defaults, helpers, builder schema            |
| `template.php`  | Semantic markup (used by component renderer) |
| `style.css`     | Token-based styles                           |
| `script.js`     | Optional scroll-reveal animation             |
| `README.md`     | Documentation                                |

## Usage

```php
nodebrains_component(
	'cta',
	array(
		'heading'          => __( 'Ready to get started?', 'nodebrains' ),
		'description'      => $pitch_html,
		'primary_button'   => array(
			'text' => __( 'Start Free Trial', 'nodebrains' ),
			'url'  => $signup_url,
		),
		'secondary_button' => array(
			'text' => __( 'Contact Sales', 'nodebrains' ),
			'url'  => $contact_url,
		),
		'background_color' => 'surface',
		'background_image' => $image_url,
		'overlay'          => true,
		'overlay_opacity'  => 0.4,
		'align'            => 'center',
		'width'            => 'wide',
		'padding'          => 'lg',
		'reveal_on_scroll' => true,
	)
);
```

## Arguments

| Key                    | Type   | Default   | Description                         |
| ---------------------- | ------ | --------- | ----------------------------------- |
| `heading`              | string | `''`      | CTA heading                         |
| `description`          | string | `''`      | Supporting copy (limited HTML)      |
| `primary_button`       | array  | `[]`      | `{ text, url, attributes }`         |
| `secondary_button`     | array  | `[]`      | `{ text, url, attributes }`         |
| `background_color`     | string | `surface` | Token slug or hex                   |
| `background_image`     | string | `''`      | Image URL                           |
| `background_image_alt` | string | `''`      | Meaningful image alt text           |
| `overlay`              | bool   | `false`   | Toggle overlay on image/color       |
| `overlay_color`        | string | `''`      | Token slug or hex                   |
| `overlay_opacity`      | float  | `0.5`     | `0`–`1`                             |
| `align`                | string | `center`  | `left`, `center`, `right`           |
| `width`                | string | `default` | `default`, `narrow`, `wide`, `full` |
| `padding`              | string | `lg`      | `none`, `sm`, `md`, `lg`, `xl`      |
| `heading_level`        | int    | `2`       | Semantic heading level              |
| `reveal_on_scroll`     | bool   | `false`   | Animate in on scroll                |
| `class`                | string | `''`      | Extra classes                       |
| `id`                   | string | `''`      | HTML `id`                           |
| `attributes`           | array  | `[]`      | Extra attributes                    |

## Filters

- `nodebrains_component_cta_args`
- `nodebrains_component_cta_html`

## BEM

```
nb-c-cta
nb-c-cta--align-center
nb-c-cta--width-wide
nb-c-cta--padding-lg
nb-c-cta__heading
nb-c-cta__actions
```

## JavaScript

When `reveal_on_scroll` is `true`, `script.js` adds an `is-visible` class via `IntersectionObserver`. Respects `prefers-reduced-motion`.

## Builder compatibility

`get_builder_schema()` maps all fields to future widget controls with typed inputs (string, richtext, button, color, image, range, select, boolean).

# Banner Component

Compact, reusable banner section for page headers, promos, and archive intros. Builder-ready via `Banner\get_builder_schema()`.

## Files

| File            | Purpose                                      |
| --------------- | -------------------------------------------- |
| `component.php` | Defaults, helpers, builder schema            |
| `template.php`  | Semantic markup (used by component renderer) |
| `style.css`     | Token-based styles                           |
| `script.js`     | Optional dismissible banner behavior         |
| `README.md`     | Documentation                                |

## Usage

```php
nodebrains_component(
	'banner',
	array(
		'heading'          => $page_title,
		'description'      => $intro,
		'cta_button'       => array(
			'text' => __( 'View Plans', 'nodebrains' ),
			'url'  => $plans_url,
		),
		'background_image' => $image_url,
		'background_color' => 'surface',
		'overlay'          => true,
		'overlay_opacity'  => 0.5,
		'align'            => 'center',
		'height'           => 'md',
		'breadcrumb_items' => array(
			array( 'label' => __( 'Home', 'nodebrains' ), 'url' => home_url( '/' ) ),
			array( 'label' => $page_title, 'url' => '' ),
		),
	)
);
```

## Arguments

| Key                    | Type             | Default   | Description                    |
| ---------------------- | ---------------- | --------- | ------------------------------ |
| `heading`              | string           | `''`      | Main heading                   |
| `description`          | string           | `''`      | Supporting copy (limited HTML) |
| `cta_button`           | array            | `[]`      | `{ text, url, attributes }`    |
| `background_image`     | string           | `''`      | Image URL                      |
| `background_image_alt` | string           | `''`      | Meaningful image alt text      |
| `background_color`     | string           | `''`      | Token slug or hex              |
| `overlay`              | bool             | `true`    | Toggle overlay                 |
| `overlay_color`        | string           | `''`      | Token slug or hex              |
| `overlay_opacity`      | float            | `0.45`    | `0`–`1`                        |
| `align`                | string           | `left`    | `left`, `center`, `right`      |
| `height`               | string           | `md`      | `sm`, `md`, `lg`               |
| `container_width`      | string           | `default` | Framework container variant    |
| `breadcrumb`           | string\|callable | `''`      | Custom breadcrumb HTML         |
| `breadcrumb_items`     | array            | `[]`      | `{ label, url }` items         |
| `breadcrumb_label`     | string           | `''`      | Breadcrumb `aria-label`        |
| `heading_level`        | int              | `2`       | Semantic heading level         |
| `dismissible`          | bool             | `false`   | Show dismiss control           |
| `dismiss_id`           | string           | `''`      | Session storage key            |
| `dismiss_label`        | string           | `''`      | Dismiss button `aria-label`    |
| `class`                | string           | `''`      | Extra classes                  |
| `id`                   | string           | `''`      | HTML `id`                      |
| `attributes`           | array            | `[]`      | Extra attributes               |

## Filters

- `nodebrains_component_banner_args`
- `nodebrains_component_banner_html`

## BEM

```
nb-c-banner
nb-c-banner--align-center
nb-c-banner--height-md
nb-c-banner__heading
nb-c-banner__cta
```

## JavaScript

When `dismissible` is `true`, `script.js` loads automatically and:

- Hides the banner on dismiss
- Persists dismissal for the browser session via `sessionStorage`

## Builder compatibility

`get_builder_schema()` mirrors all configurable fields for future widget controls.

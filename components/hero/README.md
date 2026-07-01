# Hero Component

Reusable, accessible hero section for the NodeBrains theme. Designed for direct template use today and future Visual Builder widget mapping.

## Files

| File            | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| `component.php` | Defaults, helpers, builder schema (`get_builder_schema()`) |
| `template.php`  | Semantic markup (loaded by the component renderer)         |
| `style.css`     | Component styles using design tokens                       |
| `README.md`     | Documentation                                              |

No `script.js` — the Hero is static and does not require JavaScript.

## Usage

```php
nodebrains_component(
	'hero',
	array(
		'title'       => $page_title,
		'subtitle'    => $eyebrow,
		'description' => $intro,
		'primary_button'   => array(
			'text' => __( 'Get Started', 'nodebrains' ),
			'url'  => $cta_url,
		),
		'secondary_button' => array(
			'text' => __( 'Learn More', 'nodebrains' ),
			'url'  => $docs_url,
		),
		'background_image' => $image_url,
		'background_color' => 'surface',
		'overlay'          => true,
		'overlay_opacity'  => 0.6,
		'align'            => 'center',
		'height'           => 'lg',
		'container_width'  => 'default',
		'breadcrumb_items' => array(
			array( 'label' => __( 'Home', 'nodebrains' ), 'url' => home_url( '/' ) ),
			array( 'label' => $page_title, 'url' => '' ),
		),
	)
);
```

## Arguments

| Key                    | Type             | Default   | Description                                                  |
| ---------------------- | ---------------- | --------- | ------------------------------------------------------------ |
| `title`                | string           | `''`      | Main heading                                                 |
| `subtitle`             | string           | `''`      | Eyebrow text above title                                     |
| `description`          | string           | `''`      | Supporting copy (limited HTML via `wp_kses_post`)            |
| `primary_button`       | array            | `[]`      | `{ text, url, attributes }`                                  |
| `secondary_button`     | array            | `[]`      | `{ text, url, attributes }`                                  |
| `background_image`     | string           | `''`      | Image URL                                                    |
| `background_image_alt` | string           | `''`      | If set, renders `<img>` instead of decorative CSS background |
| `background_color`     | string           | `''`      | Color token slug or hex value                                |
| `overlay`              | bool             | `true`    | Toggle overlay                                               |
| `overlay_color`        | string           | `''`      | Token slug or hex (defaults to black token)                  |
| `overlay_opacity`      | float            | `0.55`    | `0`–`1`                                                      |
| `align`                | string           | `left`    | `left`, `center`, `right`                                    |
| `height`               | string           | `md`      | `sm`, `md`, `lg`, `full`                                     |
| `container_width`      | string           | `default` | `default`, `narrow`, `wide`, `fluid`, `full`                 |
| `breadcrumb`           | string\|callable | `''`      | Custom breadcrumb slot HTML                                  |
| `breadcrumb_items`     | array            | `[]`      | Structured crumbs: `{ label, url }`                          |
| `breadcrumb_label`     | string           | `''`      | `aria-label` for breadcrumb nav                              |
| `heading_level`        | int              | `1`       | Semantic heading level (`1`–`6`)                             |
| `class`                | string           | `''`      | Additional CSS classes                                       |
| `id`                   | string           | `''`      | HTML `id` attribute                                          |
| `attributes`           | array            | `[]`      | Extra HTML attributes                                        |

## Filters

- `nodebrains_component_hero_args` — modify arguments before render
- `nodebrains_component_hero_html` — modify rendered HTML

## Builder compatibility

`Hero\get_builder_schema()` returns a field map that mirrors component arguments for future widget registration. Each key maps 1:1 to builder controls.

## BEM structure

```
nb-c-hero
nb-c-hero--align-center
nb-c-hero--height-lg
nb-c-hero__media
nb-c-hero__overlay
nb-c-hero__content
nb-c-hero__title
nb-c-hero__actions
```

## Accessibility

- Semantic `<section>` with `aria-labelledby` when a title is present
- Decorative backgrounds use `aria-hidden="true"`; meaningful images use `background_image_alt`
- Breadcrumb uses `<nav>` + `<ol>` with `aria-current="page"` on the last item
- Buttons delegate to the accessible `button` component
- Focus styles inherited from framework / button component

## Styles

Styles load conditionally when the Hero is rendered on the page. Design tokens (`--nb-color-*`, `--nb-spacing-*`, `--nb-font-*`) are used throughout.

After editing `style.css`, no build step is required (plain CSS).

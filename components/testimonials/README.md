# Testimonials Component

Responsive grid or accessible slider of customer testimonials. Builder-ready via `Testimonials\get_builder_schema()`.

## Files

| File                   | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `component.php`        | Defaults, normalization, builder schema |
| `template.php`         | Section wrapper, grid or slider layout  |
| `testimonial-item.php` | Single testimonial partial              |
| `style.css`            | Token-based responsive styles           |
| `script.js`            | Slider and equal-height grid support    |
| `README.md`            | Documentation                           |

## Usage

### Grid layout

```php
nodebrains_component(
	'testimonials',
	array(
		'heading'      => __( 'What Our Clients Say', 'nodebrains' ),
		'description'  => $section_intro,
		'layout'       => 'grid',
		'columns'      => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'variant'      => 'bordered',
		'equal_height' => true,
		'testimonials' => array(
			array(
				'name'     => __( 'Jane Doe', 'nodebrains' ),
				'position' => __( 'CEO', 'nodebrains' ),
				'company'  => __( 'Acme Inc.', 'nodebrains' ),
				'image'    => array(
					'src' => $avatar_url,
					'alt' => __( 'Photo of Jane Doe', 'nodebrains' ),
				),
				'rating'   => 5,
				'quote'    => $quote_html,
			),
		),
	)
);
```

### Slider layout

```php
nodebrains_component(
	'testimonials',
	array(
		'layout'          => 'slider',
		'slider_autoplay' => true,
		'slider_interval' => 6000,
		'slider_controls' => true,
		'slider_dots'     => true,
		'testimonials'    => $items,
	)
);
```

## Section arguments

| Key               | Type       | Default          | Description                         |
| ----------------- | ---------- | ---------------- | ----------------------------------- |
| `testimonials`    | array      | `[]`             | List of testimonial items           |
| `heading`         | string     | `''`             | Section heading                     |
| `description`     | string     | `''`             | Section description                 |
| `heading_level`   | int        | `2`              | Section heading level               |
| `layout`          | string     | `grid`           | `grid` or `slider`                  |
| `columns`         | array\|int | sm:1, md:2, lg:3 | Grid columns (grid layout only)     |
| `gap`             | string     | `md`             | Grid gap: `sm`, `md`, `lg`          |
| `variant`         | string     | `default`        | `default`, `bordered`, `quote`      |
| `slider_autoplay` | bool       | `false`          | Autoplay slider slides              |
| `slider_interval` | int        | `5000`           | Autoplay interval in milliseconds   |
| `slider_controls` | bool       | `true`           | Show previous/next buttons          |
| `slider_dots`     | bool       | `true`           | Show dot navigation                 |
| `container_width` | string     | `default`        | Container variant                   |
| `equal_height`    | bool       | `true`           | Equalize item heights (grid layout) |
| `class`           | string     | `''`             | Extra classes                       |
| `id`              | string     | `''`             | HTML `id`                           |
| `attributes`      | array      | `[]`             | Extra attributes                    |

## Testimonial item fields

| Key          | Type   | Description                           |
| ------------ | ------ | ------------------------------------- |
| `name`       | string | Person name                           |
| `position`   | string | Job title or role                     |
| `company`    | string | Company or organization               |
| `image`      | array  | `{ src, alt }` — alt defaults to name |
| `rating`     | int    | Star rating from 0–5                  |
| `quote`      | string | Testimonial quote (rich text)         |
| `class`      | string | Extra item classes                    |
| `attributes` | array  | Extra item attributes                 |

## Accessibility

- Semantic `<figure>`, `<blockquote>`, `<figcaption>`, and `<cite>` markup.
- Star ratings use `role="img"` with an accessible label (e.g. "5 out of 5 stars").
- Slider follows the WAI-ARIA carousel pattern with `aria-roledescription`, slide labels, and `aria-live="polite"`.
- Dot navigation uses `role="tablist"` / `role="tab"` with `aria-selected`.
- Autoplay respects `prefers-reduced-motion` and pauses on hover/focus.
- Keyboard: `←` / `→` navigate slides, `Home` / `End` jump to first/last.

## Filters

- `nodebrains_component_testimonials_args`
- `nodebrains_component_testimonials_html`

## BEM

```
nb-c-testimonials
nb-c-testimonials__grid
nb-c-testimonials__slider
nb-c-testimonials-item
nb-c-testimonials-item__quote
nb-c-testimonials-item__rating
```

## Builder compatibility

`get_builder_schema()` exposes a `testimonials` repeater with all item fields plus layout, grid, and slider controls.

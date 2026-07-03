# Contact Component

Responsive contact section with information, form placeholder, map placeholder, and social links. Builder-ready via `Contact\get_builder_schema()`.

## Files

| File               | Purpose                                 |
| ------------------ | --------------------------------------- |
| `component.php`    | Defaults, normalization, builder schema |
| `template.php`     | Section layout and aside/main regions   |
| `contact-form.php` | Form slot or placeholder partial        |
| `contact-map.php`  | Map embed or placeholder partial        |
| `style.css`        | Token-based responsive styles           |
| `script.js`        | Lazy map loading on user action         |
| `README.md`        | Documentation                           |

## Usage

```php
nodebrains_component(
	'contact',
	array(
		'heading'     => __( 'Get in Touch', 'nodebrains' ),
		'description' => $section_intro,
		'layout'      => 'split',
		'variant'     => 'bordered',
		'contact_info'=> array(
			array(
				'label' => __( 'Email', 'nodebrains' ),
				'value' => 'hello@example.com',
				'type'  => 'email',
			),
			array(
				'label' => __( 'Phone', 'nodebrains' ),
				'value' => '+1 (555) 123-4567',
				'type'  => 'phone',
			),
			array(
				'label' => __( 'Address', 'nodebrains' ),
				'value' => "123 Main St\nAnytown, ST 12345",
				'type'  => 'address',
			),
		),
		'form'        => array(
			'content' => '[contact-form-7 id="123"]',
			'title'   => __( 'Send a Message', 'nodebrains' ),
		),
		'map'         => array(
			'embed_url' => 'https://www.google.com/maps/embed?pb=...',
			'title'     => __( 'Our Office', 'nodebrains' ),
			'lazy'      => true,
		),
		'social_links'=> array(
			array(
				'label'    => 'LinkedIn',
				'url'      => $linkedin_url,
				'external' => true,
			),
		),
	)
);
```

## Section arguments

| Key               | Type   | Default   | Description             |
| ----------------- | ------ | --------- | ----------------------- |
| `heading`         | string | `''`      | Section heading         |
| `description`     | string | `''`      | Section description     |
| `heading_level`   | int    | `2`       | Section heading level   |
| `contact_info`    | array  | `[]`      | Contact detail items    |
| `form`            | array  | see below | Form slot configuration |
| `map`             | array  | see below | Map embed configuration |
| `social_links`    | array  | `[]`      | Social profile links    |
| `show_form`       | bool   | `true`    | Show form region        |
| `show_map`        | bool   | `true`    | Show map region         |
| `layout`          | string | `split`   | `split` or `stacked`    |
| `variant`         | string | `default` | `default` or `bordered` |
| `container_width` | string | `default` | Container variant       |
| `class`           | string | `''`      | Extra classes           |
| `id`              | string | `''`      | HTML `id`               |
| `attributes`      | array  | `[]`      | Extra attributes        |

## Contact info item fields

| Key     | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| `label` | string | Field label (e.g. Email)                |
| `value` | string | Display value                           |
| `type`  | string | `text`, `email`, `phone`, `address`     |
| `url`   | string | Optional link (auto `mailto:` / `tel:`) |

## Form configuration (`form`)

| Key           | Type             | Description                           |
| ------------- | ---------------- | ------------------------------------- |
| `content`     | string\|callable | Shortcode, HTML, or callback output   |
| `title`       | string           | Form region heading                   |
| `placeholder` | string           | Text when no form content is provided |

## Map configuration (`map`)

| Key           | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| `embed_url`   | string | Google Maps (or OpenStreetMap) embed URL |
| `title`       | string | Map iframe title / region heading        |
| `placeholder` | string | Text when no embed URL is provided       |
| `lazy`        | bool   | Require user click to load map           |

## Accessibility

- Section uses `aria-labelledby` or `aria-label`.
- Contact details use semantic `<dl>`, `<address>`, and linked email/phone values.
- Form and map areas are `role="region"` with labelled headings.
- Map lazy-load requires explicit user action before third-party iframe loads.
- Social links use the shared `link` component with external link support.

## Filters

- `nodebrains_component_contact_args`
- `nodebrains_component_contact_html`

## BEM

```
nb-c-contact
nb-c-contact__layout
nb-c-contact__info
nb-c-contact__form
nb-c-contact__map
nb-c-contact__social
```

## Builder compatibility

`get_builder_schema()` exposes heading, description, contact info repeater, form/map groups, social links, and layout controls.

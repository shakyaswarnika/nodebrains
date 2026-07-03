# Pricing Component

Responsive grid of pricing plan cards with features, CTA buttons, and featured badges. Builder-ready via `Pricing\get_builder_schema()`.

## Files

| File               | Purpose                                 |
| ------------------ | --------------------------------------- |
| `component.php`    | Defaults, normalization, builder schema |
| `template.php`     | Section wrapper and plan grid           |
| `pricing-plan.php` | Single pricing plan partial             |
| `style.css`        | Token-based responsive styles           |
| `script.js`        | Optional equal-height plan cards        |
| `README.md`        | Documentation                           |

## Usage

```php
nodebrains_component(
	'pricing',
	array(
		'heading'     => __( 'Simple, Transparent Pricing', 'nodebrains' ),
		'description' => $section_intro,
		'columns'     => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'variant'     => 'elevated',
		'equal_height'=> true,
		'plans'       => array(
			array(
				'plan_name'     => __( 'Starter', 'nodebrains' ),
				'price'         => '$19',
				'billing_cycle' => __( '/ month', 'nodebrains' ),
				'features'      => array(
					__( 'Up to 5 projects', 'nodebrains' ),
					__( 'Email support', 'nodebrains' ),
				),
				'button'        => array(
					'text' => __( 'Get Started', 'nodebrains' ),
					'url'  => $signup_url,
				),
			),
			array(
				'plan_name'     => __( 'Pro', 'nodebrains' ),
				'price'         => '$49',
				'billing_cycle' => __( '/ month', 'nodebrains' ),
				'featured'      => true,
				'badge'         => array(
					'text'    => __( 'Most Popular', 'nodebrains' ),
					'variant' => 'accent',
				),
				'features'      => array(
					__( 'Unlimited projects', 'nodebrains' ),
					__( 'Priority support', 'nodebrains' ),
					__( 'Advanced analytics', 'nodebrains' ),
				),
				'button'        => array(
					'text' => __( 'Start Free Trial', 'nodebrains' ),
					'url'  => $trial_url,
				),
			),
		),
	)
);
```

## Section arguments

| Key               | Type       | Default          | Description                       |
| ----------------- | ---------- | ---------------- | --------------------------------- |
| `plans`           | array      | `[]`             | List of pricing plans             |
| `heading`         | string     | `''`             | Section heading                   |
| `description`     | string     | `''`             | Section description               |
| `heading_level`   | int        | `2`              | Section heading level             |
| `columns`         | array\|int | sm:1, md:2, lg:3 | Responsive columns                |
| `gap`             | string     | `md`             | Grid gap: `sm`, `md`, `lg`        |
| `variant`         | string     | `default`        | `default`, `bordered`, `elevated` |
| `container_width` | string     | `default`        | Container variant                 |
| `equal_height`    | bool       | `true`           | Equalize plan card heights        |
| `class`           | string     | `''`             | Extra classes                     |
| `id`              | string     | `''`             | HTML `id`                         |
| `attributes`      | array      | `[]`             | Extra attributes                  |

## Plan item fields

| Key             | Type   | Description                                  |
| --------------- | ------ | -------------------------------------------- |
| `plan_name`     | string | Plan title                                   |
| `price`         | string | Price display (e.g. `$49`, `Free`)           |
| `billing_cycle` | string | Billing period (e.g. `/ month`)              |
| `features`      | array  | List of feature strings or `{ text }`        |
| `button`        | array  | `{ text, url, attributes }` CTA button       |
| `featured`      | bool   | Highlight plan with accent border            |
| `badge`         | array  | `{ text, variant }` — defaults when featured |
| `heading_level` | int    | Plan name heading level (default `3`)        |
| `class`         | string | Extra plan classes                           |
| `attributes`    | array  | Extra plan attributes                        |

## Accessibility

- Section uses `aria-labelledby` or `aria-label`.
- Each plan is an `<article>` with semantic headings.
- Price block includes an `aria-label` combining plan name, price, and billing cycle.
- Feature list uses `<ul>` with `aria-label="Plan features"`.
- Checkmark icons are decorative (`aria-hidden="true"`).
- CTA uses the shared `button` component with full-width layout.

## Filters

- `nodebrains_component_pricing_args`
- `nodebrains_component_pricing_html`

## BEM

```
nb-c-pricing
nb-c-pricing__grid
nb-c-pricing-plan
nb-c-pricing-plan__price
nb-c-pricing-plan__features
nb-c-pricing-plan__button
```

## Builder compatibility

`get_builder_schema()` exposes a `plans` repeater with all plan fields, plus grid and style controls.

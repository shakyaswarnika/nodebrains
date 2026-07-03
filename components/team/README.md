# Team Component

Responsive grid of team member cards with photo, name, position, bio, and social links. Builder-ready via `Team\get_builder_schema()`.

## Files

| File              | Purpose                                 |
| ----------------- | --------------------------------------- |
| `component.php`   | Defaults, normalization, builder schema |
| `template.php`    | Section wrapper and member grid         |
| `team-member.php` | Single team member partial              |
| `style.css`       | Token-based responsive styles           |
| `script.js`       | Optional equal-height cards             |
| `README.md`       | Documentation                           |

## Usage

```php
nodebrains_component(
	'team',
	array(
		'heading'     => __( 'Meet Our Team', 'nodebrains' ),
		'description' => $section_intro,
		'variant'     => 'centered',
		'columns'     => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 4,
		),
		'members'     => array(
			array(
				'photo'    => array(
					'src' => $photo_url,
					'alt' => __( 'Photo of Jane Doe', 'nodebrains' ),
				),
				'name'     => __( 'Jane Doe', 'nodebrains' ),
				'position' => __( 'CEO & Founder', 'nodebrains' ),
				'bio'      => $member_bio,
				'social_links' => array(
					array(
						'label'    => __( 'LinkedIn', 'nodebrains' ),
						'url'      => 'https://linkedin.com/in/janedoe',
						'external' => true,
					),
					array(
						'label'    => __( 'X', 'nodebrains' ),
						'url'      => 'https://x.com/janedoe',
						'external' => true,
					),
				),
			),
		),
	)
);
```

## Section arguments

| Key               | Type       | Default          | Description                       |
| ----------------- | ---------- | ---------------- | --------------------------------- |
| `members`         | array      | `[]`             | List of team member items         |
| `heading`         | string     | `''`             | Section heading                   |
| `description`     | string     | `''`             | Section description               |
| `heading_level`   | int        | `2`              | Section heading level             |
| `columns`         | array\|int | sm:1, md:2, lg:3 | Responsive columns                |
| `gap`             | string     | `md`             | Grid gap: `sm`, `md`, `lg`        |
| `variant`         | string     | `default`        | `default`, `bordered`, `centered` |
| `container_width` | string     | `default`        | Container variant                 |
| `equal_height`    | bool       | `true`           | Equalize card heights             |
| `class`           | string     | `''`             | Extra classes                     |
| `id`              | string     | `''`             | HTML `id`                         |
| `attributes`      | array      | `[]`             | Extra attributes                  |

## Member item fields

| Key             | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| `photo`         | array  | `{ src, alt }` — alt defaults to name    |
| `name`          | string | Member name                              |
| `position`      | string | Job title or role                        |
| `bio`           | string | Member biography (rich text)             |
| `social_links`  | array  | List of `{ label, url, external }` links |
| `heading_level` | int    | Name heading level (default `3`)         |
| `class`         | string | Extra member classes                     |
| `attributes`    | array  | Extra member attributes                  |

## Accessibility

- Section uses `aria-labelledby` or `aria-label`.
- Each member is an `<article>` in a `role="list"` grid.
- Photos include descriptive `alt` text (auto-generated from name when omitted).
- Social links are grouped in a `<nav>` with a per-member `aria-label`.
- External links use the shared `link` component with `noopener noreferrer`.

## Filters

- `nodebrains_component_team_args`
- `nodebrains_component_team_html`

## BEM

```
nb-c-team
nb-c-team__grid
nb-c-team-member
nb-c-team-member__photo
nb-c-team-member__name
nb-c-team-member__social
```

## Builder compatibility

`get_builder_schema()` exposes a `members` repeater with photo, name, position, bio, and nested social link fields.

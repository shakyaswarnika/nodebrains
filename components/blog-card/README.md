# Blog Card Component

Responsive grid of blog post cards powered by `WP_Query`. Builder-ready via `BlogCard\get_builder_schema()`.

## Files

| File                 | Purpose                                 |
| -------------------- | --------------------------------------- |
| `component.php`      | Query builder, defaults, builder schema |
| `template.php`       | Section wrapper and WordPress loop      |
| `blog-card-item.php` | Single post card partial                |
| `style.css`          | Token-based responsive styles           |
| `script.js`          | Optional equal-height cards             |
| `README.md`          | Documentation                           |

## Usage

```php
nodebrains_component(
	'blog-card',
	array(
		'heading'        => __( 'Latest Articles', 'nodebrains' ),
		'description'    => $section_intro,
		'posts_per_page' => 3,
		'category'       => 'news',
		'columns'        => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'variant'        => 'elevated',
		'excerpt_length' => 24,
		'read_more_text' => __( 'Read Article', 'nodebrains' ),
		'show_author'    => true,
		'show_date'      => true,
	)
);
```

### Query specific posts

```php
nodebrains_component(
	'blog-card',
	array(
		'post__in'       => array( 12, 45, 78 ),
		'posts_per_page' => 3,
	)
);
```

## Section arguments

| Key                  | Type        | Default          | Description                       |
| -------------------- | ----------- | ---------------- | --------------------------------- |
| `posts_per_page`     | int         | `3`              | Number of posts to query          |
| `category`           | string\|int | `''`             | Category slug or ID               |
| `categories`         | array       | `[]`             | Category IDs (`category__in`)     |
| `tag`                | string\|int | `''`             | Tag slug or ID                    |
| `orderby`            | string      | `date`           | `date`, `title`, `rand`, etc.     |
| `order`              | string      | `DESC`           | `DESC` or `ASC`                   |
| `offset`             | int         | `0`              | Query offset                      |
| `post__in`           | array       | `[]`             | Specific post IDs                 |
| `post__not_in`       | array       | `[]`             | Excluded post IDs                 |
| `exclude_current`    | bool        | `false`          | Exclude current post on singular  |
| `heading`            | string      | `''`             | Section heading                   |
| `description`        | string      | `''`             | Section description               |
| `heading_level`      | int         | `2`              | Section heading level             |
| `card_heading_level` | int         | `3`              | Card title heading level          |
| `columns`            | array\|int  | sm:1, md:2, lg:3 | Responsive columns                |
| `gap`                | string      | `md`             | Grid gap: `sm`, `md`, `lg`        |
| `variant`            | string      | `default`        | `default`, `bordered`, `elevated` |
| `image_size`         | string      | `medium_large`   | WordPress image size              |
| `excerpt_length`     | int         | `20`             | Excerpt word count                |
| `read_more_text`     | string      | `Read More`      | CTA button label                  |
| `show_image`         | bool        | `true`           | Show featured image               |
| `show_category`      | bool        | `true`           | Show primary category             |
| `show_excerpt`       | bool        | `true`           | Show excerpt                      |
| `show_author`        | bool        | `true`           | Show author                       |
| `show_date`          | bool        | `true`           | Show publish date                 |
| `show_button`        | bool        | `true`           | Show read more button             |
| `container_width`    | string      | `default`        | Container variant                 |
| `equal_height`       | bool        | `true`           | Equalize card heights             |
| `class`              | string      | `''`             | Extra classes                     |
| `id`                 | string      | `''`             | HTML `id`                         |
| `attributes`         | array       | `[]`             | Extra attributes                  |

## Card fields (from WordPress loop)

Each card renders data from the current post:

| Field            | Source                           |
| ---------------- | -------------------------------- |
| Featured Image   | `the_post_thumbnail()`           |
| Category         | Primary `category` term          |
| Title            | `get_the_title()`                |
| Excerpt          | Trimmed excerpt or content       |
| Author           | `get_the_author()`               |
| Date             | `get_the_date()` with `datetime` |
| Read More Button | Shared `button` component        |

## Accessibility

- Section uses `aria-labelledby` or `aria-label`.
- Cards are `<article>` elements in a `role="list"` grid.
- Featured image link is decorative (`aria-hidden`, `tabindex="-1"`).
- Title link is the primary navigation target.
- Read more button includes `aria-label` with post title context.
- Publish date uses semantic `<time datetime="...">`.

## Filters

- `nodebrains_component_blog-card_args`
- `nodebrains_component_blog-card_html`
- `nodebrains_blog_card_query_args`

## BEM

```
nb-c-blog-card
nb-c-blog-card__grid
nb-c-blog-card-item
nb-c-blog-card-item__image
nb-c-blog-card-item__title
nb-c-blog-card-item__excerpt
nb-c-blog-card-item__button
```

## Builder compatibility

`get_builder_schema()` exposes query, display, and layout controls for future widget registration.

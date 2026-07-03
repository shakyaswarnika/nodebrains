<?php
/**
 * Blog Card component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\BlogCard;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;
use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default blog card component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'heading'            => '',
		'description'        => '',
		'heading_level'      => 2,
		'card_heading_level' => 3,
		'posts_per_page'     => 3,
		'category'           => '',
		'categories'         => array(),
		'tag'                => '',
		'orderby'            => 'date',
		'order'              => 'DESC',
		'offset'             => 0,
		'post__in'           => array(),
		'post__not_in'       => array(),
		'exclude_current'    => false,
		'columns'            => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'gap'                => 'md',
		'variant'            => 'default',
		'image_size'         => 'medium_large',
		'excerpt_length'     => 20,
		'read_more_text'     => '',
		'show_image'         => true,
		'show_category'      => true,
		'show_excerpt'       => true,
		'show_author'        => true,
		'show_date'          => true,
		'show_button'        => true,
		'container_width'    => 'default',
		'equal_height'       => true,
		'class'              => '',
		'id'                 => '',
		'attributes'         => array(),
	);
}

/**
 * Builder-ready settings schema.
 *
 * @return array<string, array<string, mixed>>
 */
function get_builder_schema(): array {
	return array(
		'heading'        => array(
			'type'  => 'string',
			'label' => __( 'Section Heading', 'nodebrains' ),
		),
		'description'    => array(
			'type'  => 'richtext',
			'label' => __( 'Section Description', 'nodebrains' ),
		),
		'posts_per_page' => array(
			'type'  => 'number',
			'label' => __( 'Number of Posts', 'nodebrains' ),
		),
		'category'       => array(
			'type'  => 'taxonomy',
			'label' => __( 'Category', 'nodebrains' ),
			'tax'   => 'category',
		),
		'tag'            => array(
			'type'  => 'taxonomy',
			'label' => __( 'Tag', 'nodebrains' ),
			'tax'   => 'post_tag',
		),
		'orderby'        => array(
			'type'    => 'select',
			'label'   => __( 'Order By', 'nodebrains' ),
			'options' => array( 'date', 'title', 'rand', 'comment_count', 'modified' ),
		),
		'order'          => array(
			'type'    => 'select',
			'label'   => __( 'Order', 'nodebrains' ),
			'options' => array( 'DESC', 'ASC' ),
		),
		'columns'        => array(
			'type'  => 'responsive-columns',
			'label' => __( 'Grid Columns', 'nodebrains' ),
		),
		'gap'            => array(
			'type'    => 'select',
			'label'   => __( 'Grid Gap', 'nodebrains' ),
			'options' => array( 'sm', 'md', 'lg' ),
		),
		'variant'        => array(
			'type'    => 'select',
			'label'   => __( 'Card Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'elevated' ),
		),
		'excerpt_length' => array(
			'type'  => 'number',
			'label' => __( 'Excerpt Length', 'nodebrains' ),
		),
		'read_more_text' => array(
			'type'  => 'string',
			'label' => __( 'Read More Text', 'nodebrains' ),
		),
		'show_image'     => array(
			'type'  => 'boolean',
			'label' => __( 'Show Featured Image', 'nodebrains' ),
		),
		'show_category'  => array(
			'type'  => 'boolean',
			'label' => __( 'Show Category', 'nodebrains' ),
		),
		'show_excerpt'   => array(
			'type'  => 'boolean',
			'label' => __( 'Show Excerpt', 'nodebrains' ),
		),
		'show_author'    => array(
			'type'  => 'boolean',
			'label' => __( 'Show Author', 'nodebrains' ),
		),
		'show_date'      => array(
			'type'  => 'boolean',
			'label' => __( 'Show Date', 'nodebrains' ),
		),
		'show_button'    => array(
			'type'  => 'boolean',
			'label' => __( 'Show Read More Button', 'nodebrains' ),
		),
		'equal_height'   => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Cards', 'nodebrains' ),
		),
	);
}

/**
 * Build blog cards section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'elevated' ), true ) ) {
		$variant = 'default';
	}

	return Support\block_class(
		'blog-card',
		$args,
		array(
			'variant'      => $variant,
			'equal-height' => ! empty( $args['equal_height'] ),
		)
	);
}

/**
 * Build grid CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_grid_classes( array $args ): string {
	$columns = $args['columns'] ?? array(
		'sm' => 1,
		'md' => 2,
		'lg' => 3,
	);

	if ( ! is_array( $columns ) ) {
		$columns = array(
			'sm' => max( 1, min( 4, (int) $columns ) ),
		);
	}

	$sanitized = array();

	foreach ( $columns as $breakpoint => $count ) {
		$sanitized[ sanitize_html_class( (string) $breakpoint ) ] = max( 1, min( 4, (int) $count ) );
	}

	return Layout\grid_class(
		array(
			'columns' => $sanitized,
			'gap'     => (string) ( $args['gap'] ?? 'md' ),
			'class'   => Support\element_class( 'blog-card', 'grid' ),
		)
	);
}

/**
 * Get container class for the section.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_container_class( array $args ): string {
	$variant = (string) ( $args['container_width'] ?? 'default' );

	if ( ! in_array( $variant, Layout\get_container_variants(), true ) ) {
		$variant = 'default';
	}

	return Layout\container_class(
		array(
			'variant' => $variant,
			'class'   => Support\element_class( 'blog-card', 'container' ),
		)
	);
}

/**
 * Build WP_Query arguments from component args.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<string, mixed>
 */
function get_query_args( array $args ): array {
	$query_args = array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => max( 1, (int) ( $args['posts_per_page'] ?? 3 ) ),
		'orderby'             => sanitize_key( (string) ( $args['orderby'] ?? 'date' ) ),
		'order'               => 'ASC' === strtoupper( (string) ( $args['order'] ?? 'DESC' ) ) ? 'ASC' : 'DESC',
		'offset'              => max( 0, (int) ( $args['offset'] ?? 0 ) ),
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	);

	$category = trim( (string) ( $args['category'] ?? '' ) );

	if ( '' !== $category ) {
		if ( is_numeric( $category ) ) {
			$query_args['cat'] = (int) $category;
		} else {
			$query_args['category_name'] = sanitize_title( $category );
		}
	}

	$categories = $args['categories'] ?? array();

	if ( is_array( $categories ) && ! empty( $categories ) ) {
		$query_args['category__in'] = array_map( 'absint', $categories );
	}

	$tag = trim( (string) ( $args['tag'] ?? '' ) );

	if ( '' !== $tag ) {
		if ( is_numeric( $tag ) ) {
			$query_args['tag_id'] = (int) $tag;
		} else {
			$query_args['tag'] = sanitize_title( $tag );
		}
	}

	$post_in = $args['post__in'] ?? array();

	if ( is_array( $post_in ) && ! empty( $post_in ) ) {
		$query_args['post__in'] = array_map( 'absint', $post_in );
		$query_args['orderby']  = 'post__in';
	}

	$post_not_in = $args['post__not_in'] ?? array();

	if ( is_array( $post_not_in ) ) {
		$query_args['post__not_in'] = array_map( 'absint', $post_not_in );
	}

	if ( ! empty( $args['exclude_current'] ) && is_singular( 'post' ) ) {
		$query_args['post__not_in'][] = get_queried_object_id();
	}

	/**
	 * Filter blog card query arguments.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, mixed> $query_args WP_Query arguments.
	 * @param array<string, mixed> $args       Component arguments.
	 */
	return (array) apply_filters( 'nodebrains_blog_card_query_args', $query_args, $args );
}

/**
 * Run the blog card WordPress query.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return WP_Query
 */
function run_query( array $args ): WP_Query {
	return new WP_Query( get_query_args( $args ) );
}

/**
 * Whether a text field has content.
 *
 * @param array<string, mixed> $data Data array.
 * @param string               $key  Field key.
 * @return bool
 */
function has_text( array $data, string $key ): bool {
	$value = $data[ $key ] ?? '';

	return is_string( $value ) && '' !== trim( $value );
}

/**
 * Whether a display option is enabled.
 *
 * @param array<string, mixed> $args Component arguments.
 * @param string               $key  Display option key.
 * @return bool
 */
function show( array $args, string $key ): bool {
	return ! isset( $args[ $key ] ) || ! empty( $args[ $key ] );
}

/**
 * Get read more button label.
 *
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get_read_more_text( array $args ): string {
	$text = trim( (string) ( $args['read_more_text'] ?? '' ) );

	if ( '' !== $text ) {
		return $text;
	}

	return __( 'Read More', 'nodebrains' );
}

/**
 * Get excerpt for the current post in the loop.
 *
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get_card_excerpt( array $args ): string {
	$length = max( 5, (int) ( $args['excerpt_length'] ?? 20 ) );
	$text   = get_the_excerpt();

	if ( '' === trim( $text ) ) {
		$text = wp_strip_all_tags( (string) get_the_content( '', false ) );
	}

	return wp_trim_words( $text, $length, '&hellip;' );
}

/**
 * Get primary category for the current post.
 *
 * @return \WP_Term|null
 */
function get_primary_category(): ?\WP_Term {
	$categories = get_the_category();

	if ( empty( $categories ) || ! is_array( $categories ) ) {
		return null;
	}

	return $categories[0];
}

/**
 * Get semantic heading tag for section header.
 *
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get_heading_tag( array $args ): string {
	$level = max( 2, min( 6, (int) ( $args['heading_level'] ?? 2 ) ) );

	return 'h' . $level;
}

/**
 * Get semantic heading tag for card titles.
 *
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get_card_heading_tag( array $args ): string {
	$level = max( 2, min( 6, (int) ( $args['card_heading_level'] ?? 3 ) ) );

	return 'h' . $level;
}

/**
 * Build CSS classes for a blog card item.
 *
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get_item_classes( array $args ): string {
	$modifiers = array(
		'has-image' => show( $args, 'show_image' ) && has_post_thumbnail(),
	);

	return Support\block_class( 'blog-card-item', array(), $modifiers );
}

/**
 * Get path to the blog card item partial.
 *
 * @return string
 */
function get_card_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/blog-card/blog-card-item.php';
}

<?php
/**
 * Testimonials component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Testimonials;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single testimonial item structure.
 *
 * @return array<string, mixed>
 */
function get_testimonial_item_defaults(): array {
	return array(
		'name'       => '',
		'position'   => '',
		'company'    => '',
		'image'      => array(),
		'rating'     => 0,
		'quote'      => '',
		'class'      => '',
		'attributes' => array(),
	);
}

/**
 * Default testimonials component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'testimonials'    => array(),
		'heading'         => '',
		'description'     => '',
		'heading_level'   => 2,
		'layout'          => 'grid',
		'columns'         => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'gap'             => 'md',
		'variant'         => 'default',
		'slider_autoplay' => false,
		'slider_interval' => 5000,
		'slider_controls' => true,
		'slider_dots'     => true,
		'container_width' => 'default',
		'equal_height'    => true,
		'class'           => '',
		'id'              => '',
		'attributes'      => array(),
	);
}

/**
 * Builder-ready settings schema.
 *
 * @return array<string, array<string, mixed>>
 */
function get_builder_schema(): array {
	return array(
		'heading'         => array(
			'type'  => 'string',
			'label' => __( 'Section Heading', 'nodebrains' ),
		),
		'description'     => array(
			'type'  => 'richtext',
			'label' => __( 'Section Description', 'nodebrains' ),
		),
		'testimonials'    => array(
			'type'   => 'repeater',
			'label'  => __( 'Testimonials', 'nodebrains' ),
			'fields' => array(
				'name'     => array( 'type' => 'string' ),
				'position' => array( 'type' => 'string' ),
				'company'  => array( 'type' => 'string' ),
				'image'    => array( 'type' => 'image' ),
				'rating'   => array(
					'type' => 'range',
					'min'  => 0,
					'max'  => 5,
				),
				'quote'    => array( 'type' => 'richtext' ),
			),
		),
		'layout'          => array(
			'type'    => 'select',
			'label'   => __( 'Layout', 'nodebrains' ),
			'options' => array( 'grid', 'slider' ),
		),
		'columns'         => array(
			'type'  => 'responsive-columns',
			'label' => __( 'Grid Columns', 'nodebrains' ),
		),
		'gap'             => array(
			'type'    => 'select',
			'label'   => __( 'Grid Gap', 'nodebrains' ),
			'options' => array( 'sm', 'md', 'lg' ),
		),
		'variant'         => array(
			'type'    => 'select',
			'label'   => __( 'Testimonial Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'quote' ),
		),
		'slider_autoplay' => array(
			'type'  => 'boolean',
			'label' => __( 'Slider Autoplay', 'nodebrains' ),
		),
		'slider_interval' => array(
			'type'  => 'number',
			'label' => __( 'Autoplay Interval (ms)', 'nodebrains' ),
		),
		'slider_controls' => array(
			'type'  => 'boolean',
			'label' => __( 'Show Slider Controls', 'nodebrains' ),
		),
		'slider_dots'     => array(
			'type'  => 'boolean',
			'label' => __( 'Show Slider Dots', 'nodebrains' ),
		),
		'equal_height'    => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Items', 'nodebrains' ),
		),
	);
}

/**
 * Build testimonials section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'quote' ), true ) ) {
		$variant = 'default';
	}

	$layout = sanitize_html_class( (string) ( $args['layout'] ?? 'grid' ) );

	if ( ! in_array( $layout, array( 'grid', 'slider' ), true ) ) {
		$layout = 'grid';
	}

	return Support\block_class(
		'testimonials',
		$args,
		array(
			'variant'      => $variant,
			'layout'       => $layout,
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
			'class'   => Support\element_class( 'testimonials', 'grid' ),
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
			'class'   => Support\element_class( 'testimonials', 'container' ),
		)
	);
}

/**
 * Whether the component uses slider layout.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function is_slider_layout( array $args ): bool {
	return 'slider' === (string) ( $args['layout'] ?? 'grid' );
}

/**
 * Normalize and validate testimonial items.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_testimonials( array $args ): array {
	$testimonials = $args['testimonials'] ?? array();
	$items        = array();

	if ( ! is_array( $testimonials ) ) {
		return $items;
	}

	foreach ( $testimonials as $testimonial ) {
		if ( ! is_array( $testimonial ) ) {
			continue;
		}

		$normalized = normalize_testimonial_item( $testimonial );

		if ( testimonial_item_has_content( $normalized ) ) {
			$items[] = $normalized;
		}
	}

	return $items;
}

/**
 * Normalize a single testimonial item.
 *
 * @param array<string, mixed> $testimonial Raw testimonial data.
 * @return array<string, mixed>
 */
function normalize_testimonial_item( array $testimonial ): array {
	$item = wp_parse_args( $testimonial, get_testimonial_item_defaults() );

	$item['image']  = normalize_image( $item['image'] ?? array(), (string) ( $item['name'] ?? '' ) );
	$item['rating'] = normalize_rating( $item['rating'] ?? 0 );

	return $item;
}

/**
 * Normalize image configuration.
 *
 * @param mixed  $image Image configuration.
 * @param string $name  Person name for fallback alt text.
 * @return array<string, string>
 */
function normalize_image( $image, string $name = '' ): array {
	if ( ! is_array( $image ) ) {
		return array(
			'src' => '',
			'alt' => '',
		);
	}

	$alt = (string) ( $image['alt'] ?? '' );

	if ( '' === trim( $alt ) && '' !== trim( $name ) ) {
		/* translators: %s: person name */
		$alt = sprintf( __( 'Photo of %s', 'nodebrains' ), $name );
	}

	return array(
		'src' => (string) ( $image['src'] ?? $image['url'] ?? '' ),
		'alt' => $alt,
	);
}

/**
 * Normalize rating value.
 *
 * @param mixed $rating Raw rating value.
 * @return int
 */
function normalize_rating( $rating ): int {
	$value = (int) round( (float) $rating );

	return max( 0, min( 5, $value ) );
}

/**
 * Whether a testimonial item has renderable content.
 *
 * @param array<string, mixed> $item Normalized testimonial item.
 * @return bool
 */
function testimonial_item_has_content( array $item ): bool {
	if ( has_text( $item, 'quote' ) || has_text( $item, 'name' ) ) {
		return true;
	}

	return has_image( $item ) || has_rating( $item ) || has_attribution( $item );
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
 * Whether an image is configured.
 *
 * @param array<string, mixed> $item Testimonial item.
 * @return bool
 */
function has_image( array $item ): bool {
	$image = $item['image'] ?? array();

	return is_array( $image ) && '' !== trim( (string) ( $image['src'] ?? '' ) );
}

/**
 * Whether a rating is set.
 *
 * @param array<string, mixed> $item Testimonial item.
 * @return bool
 */
function has_rating( array $item ): bool {
	return normalize_rating( $item['rating'] ?? 0 ) > 0;
}

/**
 * Whether position or company is set.
 *
 * @param array<string, mixed> $item Testimonial item.
 * @return bool
 */
function has_attribution( array $item ): bool {
	return has_text( $item, 'position' ) || has_text( $item, 'company' );
}

/**
 * Build attribution line from position and company.
 *
 * @param array<string, mixed> $item Testimonial item.
 * @return string
 */
function get_attribution_line( array $item ): string {
	$position = trim( (string) ( $item['position'] ?? '' ) );
	$company  = trim( (string) ( $item['company'] ?? '' ) );

	if ( '' !== $position && '' !== $company ) {
		/* translators: 1: job position, 2: company name */
		return sprintf( __( '%1$s, %2$s', 'nodebrains' ), $position, $company );
	}

	return '' !== $position ? $position : $company;
}

/**
 * Build accessible rating label.
 *
 * @param int $rating Rating value.
 * @return string
 */
function get_rating_label( int $rating ): string {
	/* translators: %d: star rating out of 5 */
	return sprintf( __( '%d out of 5 stars', 'nodebrains' ), $rating );
}

/**
 * Build CSS classes for a testimonial item.
 *
 * @param array<string, mixed> $item Testimonial item.
 * @return string
 */
function get_item_classes( array $item ): string {
	return Support\block_class(
		'testimonials-item',
		array( 'class' => $item['class'] ?? '' ),
		array(
			'has-image'  => has_image( $item ),
			'has-rating' => has_rating( $item ),
		)
	);
}

/**
 * Get path to the testimonial item partial.
 *
 * @return string
 */
function get_testimonial_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/testimonials/testimonial-item.php';
}

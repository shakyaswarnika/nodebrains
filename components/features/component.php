<?php
/**
 * Features component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Features;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single feature item structure.
 *
 * @return array<string, mixed>
 */
function get_feature_item_defaults(): array {
	return array(
		'icon'          => '',
		'heading'       => '',
		'description'   => '',
		'heading_level' => 3,
		'class'         => '',
		'attributes'    => array(),
	);
}

/**
 * Default features component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'features'        => array(),
		'heading'         => '',
		'description'     => '',
		'heading_level'   => 2,
		'columns'         => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'gap'             => 'md',
		'variant'         => 'default',
		'icon_style'      => 'default',
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
		'heading'      => array(
			'type'  => 'string',
			'label' => __( 'Section Heading', 'nodebrains' ),
		),
		'description'  => array(
			'type'  => 'richtext',
			'label' => __( 'Section Description', 'nodebrains' ),
		),
		'features'     => array(
			'type'   => 'repeater',
			'label'  => __( 'Features', 'nodebrains' ),
			'fields' => array(
				'icon'        => array( 'type' => 'html' ),
				'heading'     => array( 'type' => 'string' ),
				'description' => array( 'type' => 'richtext' ),
			),
		),
		'columns'      => array(
			'type'  => 'responsive-columns',
			'label' => __( 'Grid Columns', 'nodebrains' ),
		),
		'gap'          => array(
			'type'    => 'select',
			'label'   => __( 'Grid Gap', 'nodebrains' ),
			'options' => array( 'sm', 'md', 'lg' ),
		),
		'variant'      => array(
			'type'    => 'select',
			'label'   => __( 'Feature Layout', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'centered' ),
		),
		'icon_style'   => array(
			'type'    => 'select',
			'label'   => __( 'Icon Style', 'nodebrains' ),
			'options' => array( 'default', 'circle', 'plain' ),
		),
		'equal_height' => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Items', 'nodebrains' ),
		),
	);
}

/**
 * Build features section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'centered' ), true ) ) {
		$variant = 'default';
	}

	$icon_style = sanitize_html_class( (string) ( $args['icon_style'] ?? 'default' ) );

	if ( ! in_array( $icon_style, array( 'default', 'circle', 'plain' ), true ) ) {
		$icon_style = 'default';
	}

	return Support\block_class(
		'features',
		$args,
		array(
			'variant'      => $variant,
			'icon-style'   => $icon_style,
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
			'class'   => Support\element_class( 'features', 'grid' ),
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
			'class'   => Support\element_class( 'features', 'container' ),
		)
	);
}

/**
 * Normalize and validate feature items.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_features( array $args ): array {
	$features = $args['features'] ?? array();
	$items    = array();

	if ( ! is_array( $features ) ) {
		return $items;
	}

	foreach ( $features as $feature ) {
		if ( ! is_array( $feature ) ) {
			continue;
		}

		$normalized = normalize_feature_item( $feature );

		if ( feature_item_has_content( $normalized ) ) {
			$items[] = $normalized;
		}
	}

	return $items;
}

/**
 * Normalize a single feature item.
 *
 * @param array<string, mixed> $feature Raw feature data.
 * @return array<string, mixed>
 */
function normalize_feature_item( array $feature ): array {
	return wp_parse_args( $feature, get_feature_item_defaults() );
}

/**
 * Whether a feature item has renderable content.
 *
 * @param array<string, mixed> $item Normalized feature item.
 * @return bool
 */
function feature_item_has_content( array $item ): bool {
	if ( has_text( $item, 'heading' ) || has_text( $item, 'description' ) ) {
		return true;
	}

	return has_icon( $item );
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
 * Whether an icon slot has content.
 *
 * @param array<string, mixed> $item Feature item.
 * @return bool
 */
function has_icon( array $item ): bool {
	$icon = $item['icon'] ?? '';

	if ( is_callable( $icon ) ) {
		return true;
	}

	return is_string( $icon ) && '' !== trim( $icon );
}

/**
 * Build CSS classes for a feature item.
 *
 * @param array<string, mixed> $item Feature item.
 * @return string
 */
function get_item_classes( array $item ): string {
	return Support\block_class(
		'features-item',
		array( 'class' => $item['class'] ?? '' ),
		array(
			'has-icon' => has_icon( $item ),
		)
	);
}

/**
 * Get semantic heading tag for a feature item.
 *
 * @param array<string, mixed> $item Feature item.
 * @return string
 */
function get_item_heading_tag( array $item ): string {
	$level = max( 2, min( 6, (int) ( $item['heading_level'] ?? 3 ) ) );

	return 'h' . $level;
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
 * Get path to the feature item partial.
 *
 * @return string
 */
function get_feature_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/features/feature-item.php';
}

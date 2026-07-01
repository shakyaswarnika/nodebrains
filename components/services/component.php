<?php
/**
 * Services component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Services;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single service item structure.
 *
 * @return array<string, mixed>
 */
function get_service_item_defaults(): array {
	return array(
		'icon'          => '',
		'title'         => '',
		'description'   => '',
		'link'          => array(),
		'heading_level' => 3,
		'class'         => '',
		'attributes'    => array(),
	);
}

/**
 * Default services component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'services'        => array(),
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
		'services'     => array(
			'type'   => 'repeater',
			'label'  => __( 'Services', 'nodebrains' ),
			'fields' => array(
				'icon'        => array( 'type' => 'html' ),
				'title'       => array( 'type' => 'string' ),
				'description' => array( 'type' => 'richtext' ),
				'link'        => array( 'type' => 'link' ),
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
			'label'   => __( 'Service Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'surface' ),
		),
		'equal_height' => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Items', 'nodebrains' ),
		),
	);
}

/**
 * Build services section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'surface' ), true ) ) {
		$variant = 'default';
	}

	return Support\block_class(
		'services',
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
			'class'   => Support\element_class( 'services', 'grid' ),
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
			'class'   => Support\element_class( 'services', 'container' ),
		)
	);
}

/**
 * Normalize and validate service items.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_services( array $args ): array {
	$services = $args['services'] ?? array();
	$items    = array();

	if ( ! is_array( $services ) ) {
		return $items;
	}

	foreach ( $services as $service ) {
		if ( ! is_array( $service ) ) {
			continue;
		}

		$normalized = normalize_service_item( $service );

		if ( service_item_has_content( $normalized ) ) {
			$items[] = $normalized;
		}
	}

	return $items;
}

/**
 * Normalize a single service item.
 *
 * @param array<string, mixed> $service Raw service data.
 * @return array<string, mixed>
 */
function normalize_service_item( array $service ): array {
	$item = wp_parse_args( $service, get_service_item_defaults() );

	$item['link'] = normalize_link( $item['link'] ?? array() );

	return $item;
}

/**
 * Normalize link configuration.
 *
 * @param mixed $link Link configuration.
 * @return array<string, mixed>
 */
function normalize_link( $link ): array {
	if ( ! is_array( $link ) ) {
		return array(
			'text'     => '',
			'url'      => '',
			'external' => false,
		);
	}

	return array(
		'text'       => (string) ( $link['text'] ?? '' ),
		'url'        => (string) ( $link['url'] ?? '' ),
		'external'   => ! empty( $link['external'] ),
		'attributes' => is_array( $link['attributes'] ?? null ) ? $link['attributes'] : array(),
	);
}

/**
 * Whether a service item has renderable content.
 *
 * @param array<string, mixed> $item Normalized service item.
 * @return bool
 */
function service_item_has_content( array $item ): bool {
	if ( has_text( $item, 'title' ) || has_text( $item, 'description' ) ) {
		return true;
	}

	return has_icon( $item ) || has_link( $item );
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
 * @param array<string, mixed> $item Service item.
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
 * Whether a link is configured.
 *
 * @param array<string, mixed> $item Service item.
 * @return bool
 */
function has_link( array $item ): bool {
	$service_link = $item['link'] ?? array();

	return is_array( $service_link )
		&& '' !== (string) ( $service_link['text'] ?? '' )
		&& '' !== (string) ( $service_link['url'] ?? '' );
}

/**
 * Build CSS classes for a service item.
 *
 * @param array<string, mixed> $item Service item.
 * @return string
 */
function get_item_classes( array $item ): string {
	return Support\block_class(
		'services-item',
		array( 'class' => $item['class'] ?? '' ),
		array(
			'has-icon' => has_icon( $item ),
			'has-link' => has_link( $item ),
		)
	);
}

/**
 * Get semantic heading tag for a service item.
 *
 * @param array<string, mixed> $item Service item.
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
 * Get path to the service item partial.
 *
 * @return string
 */
function get_service_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/services/service-item.php';
}

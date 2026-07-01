<?php
/**
 * Media component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Media;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default media arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'src'          => '',
		'alt'          => '',
		'width'        => '',
		'height'       => '',
		'caption'      => '',
		'aspect_ratio' => '',
		'loading'      => 'lazy',
		'class'        => '',
		'id'           => '',
		'attributes'   => array(),
	);
}

/**
 * Build media CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$modifiers = array();

	if ( ! empty( $args['aspect_ratio'] ) ) {
		$modifiers[ 'ratio-' . (string) $args['aspect_ratio'] ] = true;
	}

	if ( ! empty( $args['caption'] ) ) {
		$modifiers['has-caption'] = true;
	}

	return Support\block_class( 'media', $args, $modifiers );
}

/**
 * Build image attributes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_image_attributes( array $args ): array {
	$attributes = array(
		'class'    => Support\element_class( 'media', 'image' ),
		'src'      => esc_url( (string) ( $args['src'] ?? '' ) ),
		'alt'      => (string) ( $args['alt'] ?? '' ),
		'loading'  => in_array( (string) ( $args['loading'] ?? 'lazy' ), array( 'lazy', 'eager' ), true )
			? (string) $args['loading']
			: 'lazy',
		'decoding' => 'async',
	);

	if ( ! empty( $args['width'] ) ) {
		$attributes['width'] = (string) $args['width'];
	}

	if ( ! empty( $args['height'] ) ) {
		$attributes['height'] = (string) $args['height'];
	}

	$image_attributes = $args['image_attributes'] ?? array();

	if ( is_array( $image_attributes ) ) {
		$attributes = array_merge( $attributes, $image_attributes );
	}

	return $attributes;
}

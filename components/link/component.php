<?php
/**
 * Link component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Link;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default link arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'text'       => '',
		'url'        => '',
		'variant'    => 'default',
		'external'   => false,
		'class'      => '',
		'id'         => '',
		'attributes' => array(),
	);
}

/**
 * Build link CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'link',
		$args,
		array(
			'variant'  => $args['variant'] ?? 'default',
			'external' => ! empty( $args['external'] ),
		)
	);
}

/**
 * Build link attributes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_attributes( array $args ): array {
	$attributes = array(
		'class' => get_classes( $args ),
		'href'  => esc_url( (string) ( $args['url'] ?? '' ) ),
	);

	if ( ! empty( $args['external'] ) ) {
		$attributes['target']       = '_blank';
		$attributes['rel']          = 'noopener noreferrer';
		$attributes['aria-label'] ??= '';
	}

	return Support\merge_attributes( $args, $attributes );
}

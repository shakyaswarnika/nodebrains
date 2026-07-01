<?php
/**
 * Search form component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\SearchForm;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default search form arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'action'         => '',
		'label'          => '',
		'placeholder'    => '',
		'button_text'    => '',
		'button_sr_text' => '',
		'label_hidden'   => false,
		'value'          => '',
		'input_name'     => 's',
		'variant'        => 'default',
		'class'          => '',
		'id'             => '',
		'attributes'     => array(),
	);
}

/**
 * Build search form CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'search-form',
		$args,
		array(
			'variant' => $args['variant'] ?? 'default',
		)
	);
}

/**
 * Resolve form action URL.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_action( array $args ): string {
	$action = (string) ( $args['action'] ?? '' );

	return '' !== $action ? $action : home_url( '/' );
}

/**
 * Resolve field ID.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_field_id( array $args ): string {
	if ( ! empty( $args['id'] ) ) {
		return (string) $args['id'];
	}

	return Support\unique_id( 'search-form' );
}

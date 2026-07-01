<?php
/**
 * Card component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Card;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default card arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'header'     => '',
		'body'       => '',
		'footer'     => '',
		'media'      => '',
		'variant'    => 'default',
		'tag'        => 'article',
		'class'      => '',
		'id'         => '',
		'attributes' => array(),
	);
}

/**
 * Build card CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'card',
		$args,
		array(
			'variant' => $args['variant'] ?? 'default',
			'media'   => ! empty( $args['media'] ),
		)
	);
}

/**
 * Check whether the card has a given slot.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @param string               $slot Slot name.
 * @return bool
 */
function has_slot( array $args, string $slot ): bool {
	$content = $args[ $slot ] ?? '';

	if ( is_callable( $content ) ) {
		return true;
	}

	return is_string( $content ) && '' !== trim( $content );
}

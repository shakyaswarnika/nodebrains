<?php
/**
 * Button component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Button;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default button arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'text'          => '',
		'url'           => '',
		'type'          => 'button',
		'variant'       => 'primary',
		'size'          => 'md',
		'icon'          => '',
		'icon_position' => 'left',
		'class'         => '',
		'id'            => '',
		'attributes'    => array(),
		'disabled'      => false,
		'full_width'    => false,
	);
}

/**
 * Build button CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'button',
		$args,
		array(
			'variant' => $args['variant'] ?? 'primary',
			'size'    => $args['size'] ?? 'md',
			'icon'    => ! empty( $args['icon'] ) ? ( $args['icon_position'] ?? 'left' ) : false,
			'block'   => ! empty( $args['full_width'] ),
		)
	);
}

/**
 * Build button attributes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_attributes( array $args ): array {
	$is_link = '' !== (string) ( $args['url'] ?? '' );

	$attributes = array(
		'class' => get_classes( $args ),
	);

	if ( $is_link ) {
		$attributes['href'] = esc_url( (string) $args['url'] );
	} else {
		$attributes['type'] = in_array( (string) ( $args['type'] ?? 'button' ), array( 'button', 'submit', 'reset' ), true )
			? (string) $args['type']
			: 'button';
	}

	if ( ! empty( $args['disabled'] ) ) {
		if ( $is_link ) {
			$attributes['aria-disabled'] = 'true';
			$attributes['tabindex']      = '-1';
		} else {
			$attributes['disabled'] = true;
		}
	}

	return Support\merge_attributes( $args, $attributes );
}

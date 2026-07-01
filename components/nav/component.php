<?php
/**
 * Nav component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Nav;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default nav arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'label'              => '',
		'menu_args'          => array(),
		'menu_html'          => '',
		'toggle_label'       => '',
		'toggle_label_close' => '',
		'collapse'           => 'lg',
		'class'              => '',
		'id'                 => '',
		'attributes'         => array(),
	);
}

/**
 * Build nav CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'nav',
		$args,
		array(
			'collapse' => $args['collapse'] ?? 'lg',
		)
	);
}

/**
 * Resolve navigation label.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_label( array $args ): string {
	$label = (string) ( $args['label'] ?? '' );

	return '' !== $label ? $label : __( 'Navigation', 'nodebrains' );
}

/**
 * Resolve toggle button label.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_toggle_label( array $args ): string {
	$label = (string) ( $args['toggle_label'] ?? '' );

	return '' !== $label ? $label : __( 'Open menu', 'nodebrains' );
}

/**
 * Resolve toggle close label.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_toggle_close_label( array $args ): string {
	$label = (string) ( $args['toggle_label_close'] ?? '' );

	return '' !== $label ? $label : __( 'Close menu', 'nodebrains' );
}

/**
 * Render menu markup.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_menu_html( array $args ): string {
	$menu_html = Support\render_slot( $args['menu_html'] ?? '' );

	if ( '' !== $menu_html ) {
		return $menu_html;
	}

	$menu_args = $args['menu_args'] ?? array();

	if ( ! is_array( $menu_args ) || empty( $menu_args ) ) {
		return '';
	}

	$menu_args = wp_parse_args(
		$menu_args,
		array(
			'container'   => false,
			'menu_class'  => Support\element_class( 'nav', 'list' ),
			'fallback_cb' => false,
			'depth'       => 0,
			'echo'        => false,
		)
	);

	return (string) wp_nav_menu( $menu_args );
}

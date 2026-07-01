<?php
/**
 * Navigation menus.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Menus;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register navigation menu locations.
 *
 * @return void
 */
function register_menus(): void {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\register_menu_locations' );
}

/**
 * Register theme menu locations.
 *
 * @return void
 */
function register_menu_locations(): void {
	\register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'nodebrains' ),
			'footer'  => esc_html__( 'Footer Menu', 'nodebrains' ),
		)
	);
}

register_menus();

<?php
/**
 * Hidden Node Builder admin page registration.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Admin\Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the hidden Node Builder admin page.
 */
final class Admin_Builder {

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public static function register(): void {
		add_action( 'admin_menu', array( self::class, 'register_hidden_page' ) );
	}

	/**
	 * Register a hidden submenu page accessible only via direct URL.
	 *
	 * @return void
	 */
	public static function register_hidden_page(): void {
		add_submenu_page(
			null,
			__( 'Node Builder', 'nodebrains' ),
			__( 'Node Builder', 'nodebrains' ),
			'edit_pages',
			Access::PAGE_SLUG,
			array( Builder_Screen::class, 'render_placeholder' )
		);
	}
}

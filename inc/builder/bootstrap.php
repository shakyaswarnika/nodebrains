<?php
/**
 * Visual page builder bootstrap (placeholder).
 *
 * Reserved for future proprietary builder integration.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialize builder scaffolding.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'init', __NAMESPACE__ . '\\register_builder_hooks', 20 );
}

/**
 * Register builder-related hooks.
 *
 * @return void
 */
function register_builder_hooks(): void {
	require_once NODEBRAINS_PATH . '/inc/builder/registry.php';
	require_once NODEBRAINS_PATH . '/inc/admin/builder/class-access.php';
	require_once NODEBRAINS_PATH . '/inc/builder/admin/class-admin-bar.php';

	Admin\Admin_Bar::register();

	/**
	 * Fires when the NodeBrains visual builder should register modules.
	 *
	 * @since 1.0.0
	 */
	do_action( 'nodebrains_builder_init' );
}

bootstrap();

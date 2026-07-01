<?php
/**
 * Component library bootstrap.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load component modules.
 *
 * @return void
 */
function load_modules(): void {
	$base = NODEBRAINS_PATH . '/inc/components/';

	require $base . 'support.php';
	require $base . 'registry.php';
	require $base . 'renderer.php';
	require $base . 'assets.php';
	require $base . 'api.php';
}

/**
 * Initialize the component library.
 *
 * @return void
 */
function bootstrap(): void {
	load_modules();

	Registry\register_all();
	Assets\register_hooks();

	/**
	 * Fires after the NodeBrains component library is loaded.
	 *
	 * @since 1.0.0
	 */
	do_action( 'nodebrains_components_loaded' );
}

bootstrap();

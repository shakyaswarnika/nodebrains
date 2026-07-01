<?php
/**
 * Theme setup.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Setup;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register theme setup hooks.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\configure_theme' );
}

/**
 * Load text domain and delegate theme support registration.
 *
 * @return void
 */
function configure_theme(): void {
	load_theme_textdomain( 'nodebrains', NODEBRAINS_PATH . '/languages' );

	require NODEBRAINS_PATH . '/inc/theme-support.php';

	\NodeBrains\ThemeSupport\register();

	$builder_bootstrap = NODEBRAINS_PATH . '/inc/builder/bootstrap.php';
	if ( is_readable( $builder_bootstrap ) ) {
		require $builder_bootstrap;
	}
}

bootstrap();

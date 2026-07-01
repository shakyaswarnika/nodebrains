<?php
/**
 * Theme framework bootstrap.
 *
 * Loads the scalable theme framework: design tokens, settings API,
 * typography, colors, layout helpers, and CSS utilities.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load framework modules.
 *
 * @return void
 */
function load_modules(): void {
	$base = NODEBRAINS_PATH . '/inc/framework/';

	require $base . 'tokens.php';
	require $base . 'helpers.php';
	require $base . 'settings.php';
	require $base . 'colors.php';
	require $base . 'typography.php';
	require $base . 'layout.php';
	require $base . 'css.php';
	require $base . 'api.php';
}

/**
 * Initialize framework hooks.
 *
 * @return void
 */
function bootstrap(): void {
	load_modules();

	Settings\apply_content_width();
	Css\register();

	add_action(
		'after_setup_theme',
		static function (): void {
			Settings\apply_content_width();
		},
		20
	);

	/**
	 * Fires after the NodeBrains theme framework is loaded.
	 *
	 * @since 1.0.0
	 */
	do_action( 'nodebrains_framework_loaded' );
}

bootstrap();

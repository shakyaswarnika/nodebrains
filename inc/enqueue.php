<?php
/**
 * Enqueue scripts and styles.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Enqueue;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register front-end assets.
 *
 * @return void
 */
function register_assets(): void {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_styles' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_comment_reply' );
}

/**
 * Enqueue theme stylesheets.
 *
 * @return void
 */
function enqueue_styles(): void {
	$main_css_path = NODEBRAINS_PATH . '/assets/css/main.css';

	if ( ! file_exists( $main_css_path ) ) {
		return;
	}

	wp_enqueue_style(
		'nodebrains-main',
		NODEBRAINS_URI . '/assets/css/main.css',
		array(
			'nodebrains-components',
			'nodebrains-framework-layout',
			'nodebrains-framework-grid',
			'nodebrains-framework-type',
		),
		\NodeBrains\Helpers\get_asset_version( 'assets/css/main.css' )
	);
}

/**
 * Enqueue theme scripts.
 *
 * @return void
 */
function enqueue_scripts(): void {
	$main_js_path = NODEBRAINS_PATH . '/assets/js/main.js';

	if ( ! file_exists( $main_js_path ) ) {
		return;
	}

	wp_enqueue_script(
		'nodebrains-main',
		NODEBRAINS_URI . '/assets/js/main.js',
		array(),
		\NodeBrains\Helpers\get_asset_version( 'assets/js/main.js' ),
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);
}

/**
 * Enqueue the comment-reply script on singular posts with open threaded comments.
 *
 * @return void
 */
function enqueue_comment_reply(): void {
	if ( ! is_singular() || ! comments_open() || ! get_option( 'thread_comments' ) ) {
		return;
	}

	wp_enqueue_script( 'comment-reply' );
}

register_assets();

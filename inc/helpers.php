<?php
/**
 * Helper functions.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get a cache-busting version string for a theme asset.
 *
 * Uses file modification time during development and the theme version in production.
 *
 * @param string $relative_path Path relative to the theme root.
 * @return string
 */
function get_asset_version( string $relative_path ): string {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		$absolute_path = NODEBRAINS_PATH . '/' . ltrim( $relative_path, '/' );

		if ( file_exists( $absolute_path ) ) {
			return (string) filemtime( $absolute_path );
		}
	}

	return NODEBRAINS_VERSION;
}

/**
 * Display posts pagination.
 *
 * @return void
 */
function the_posts_pagination_markup(): void {
	the_posts_pagination(
		array(
			'mid_size'  => 2,
			'prev_text' => esc_html__( 'Previous', 'nodebrains' ),
			'next_text' => esc_html__( 'Next', 'nodebrains' ),
		)
	);
}

/**
 * Determine whether the main sidebar should be displayed.
 *
 * @return bool
 */
function has_visible_sidebar(): bool {
	return is_active_sidebar( 'main-sidebar' ) && ! is_page_template( 'templates/full-width.php' );
}

/**
 * Load the main sidebar when appropriate.
 *
 * @return void
 */
function load_sidebar(): void {
	if ( has_visible_sidebar() ) {
		get_sidebar();
	}
}

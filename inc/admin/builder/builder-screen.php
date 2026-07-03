<?php
/**
 * Full-screen Node Builder screen renderer.
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
 * Outputs the standalone Node Builder application shell.
 */
final class Builder_Screen {

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public static function register(): void {
		add_action( 'admin_init', array( self::class, 'maybe_render' ), 1 );
	}

	/**
	 * Render the full-screen builder before the admin chrome loads.
	 *
	 * @return void
	 */
	public static function maybe_render(): void {
		if ( ! Access::is_builder_screen_request() ) {
			return;
		}

		$post_id = Access::validate_builder_screen_access();

		if ( $post_id <= 0 ) {
			wp_die(
				esc_html__( 'You are not allowed to edit this page with Node Builder.', 'nodebrains' ),
				esc_html__( 'Node Builder', 'nodebrains' ),
				array(
					'response' => 403,
				)
			);
		}

		Builder_Loader::enqueue_assets( $post_id );

		show_admin_bar( false );

		$template = NODEBRAINS_PATH . '/inc/admin/builder/templates/builder-screen.php';

		if ( ! is_readable( $template ) ) {
			wp_die(
				esc_html__( 'The Node Builder screen template is missing.', 'nodebrains' ),
				esc_html__( 'Node Builder', 'nodebrains' ),
				array(
					'response' => 500,
				)
			);
		}

		require $template;
		exit;
	}

	/**
	 * Placeholder callback for the registered admin page.
	 *
	 * The real screen is rendered on admin_init and exits early.
	 *
	 * @return void
	 */
	public static function render_placeholder(): void {
		// Intentionally empty. maybe_render() handles output.
	}
}

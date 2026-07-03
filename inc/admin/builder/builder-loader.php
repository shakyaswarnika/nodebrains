<?php
/**
 * Node Builder asset loader and configuration bridge.
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
 * Enqueues the React bundle and passes runtime configuration to the app.
 */
final class Builder_Loader {

	/**
	 * Script handle.
	 */
	public const SCRIPT_HANDLE = 'nodebrains-builder-admin';

	/**
	 * Style handle.
	 */
	public const STYLE_HANDLE = 'nodebrains-builder-admin';

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public static function register(): void {
		// Assets are enqueued directly before the screen exits on admin_init.
	}

	/**
	 * Enqueue builder assets for the current screen.
	 *
	 * @param int $post_id Page ID being edited.
	 * @return void
	 */
	public static function enqueue_assets( int $post_id ): void {
		$script_path = 'assets/admin/builder/builder.js';
		$style_path  = 'assets/admin/builder/builder.css';

		if ( ! file_exists( NODEBRAINS_PATH . '/' . $script_path ) ) {
			wp_die(
				esc_html__( 'Node Builder assets are missing. Run npm run build:builder-admin in the theme directory.', 'nodebrains' ),
				esc_html__( 'Node Builder', 'nodebrains' ),
				array(
					'response' => 500,
				)
			);
		}

		wp_enqueue_style(
			self::STYLE_HANDLE,
			NODEBRAINS_URI . '/' . $style_path,
			array(),
			\NodeBrains\Helpers\get_asset_version( $style_path )
		);

		wp_enqueue_script(
			self::SCRIPT_HANDLE,
			NODEBRAINS_URI . '/' . $script_path,
			array(),
			\NodeBrains\Helpers\get_asset_version( $script_path ),
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);

		wp_localize_script(
			self::SCRIPT_HANDLE,
			'NodeBuilder',
			array(
				'pageId'  => $post_id,
				'restUrl' => esc_url_raw( rest_url( 'node-builder/v1' ) ),
				'nonce'   => wp_create_nonce( 'wp_rest' ),
				'theme'   => 'NodeBrains',
			)
		);

		/**
		 * Fires after Node Builder admin assets are enqueued.
		 *
		 * @since 1.0.0
		 *
		 * @param int $post_id Page ID being edited.
		 */
		do_action( 'nodebrains_builder_admin_enqueue', $post_id );
	}
}

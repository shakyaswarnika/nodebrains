<?php
/**
 * Node Builder access validation helpers.
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
 * Validates access to the Node Builder screen and REST endpoints.
 */
final class Access {

	/**
	 * Admin page slug.
	 */
	public const PAGE_SLUG = 'node-builder';

	/**
	 * Post meta key for persisted layout JSON.
	 */
	public const LAYOUT_META_KEY = '_node_builder_layout';

	/**
	 * Determine whether the current request targets the builder screen.
	 *
	 * @return bool
	 */
	public static function is_builder_screen_request(): bool {
		if ( ! is_admin() ) {
			return false;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Screen detection only.
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';

		return self::PAGE_SLUG === $page;
	}

	/**
	 * Read the requested page ID from the query string.
	 *
	 * @return int
	 */
	public static function get_requested_post_id(): int {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- ID is validated before use.
		return isset( $_GET['post'] ) ? absint( wp_unslash( $_GET['post'] ) ) : 0;
	}

	/**
	 * Validate that a page exists and the current user may edit it.
	 *
	 * @param int $post_id Page ID.
	 * @return bool
	 */
	public static function can_edit_page( int $post_id ): bool {
		if ( $post_id <= 0 ) {
			return false;
		}

		if ( 'page' !== get_post_type( $post_id ) ) {
			return false;
		}

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return false;
		}

		return 'trash' !== get_post_status( $post_id );
	}

	/**
	 * Validate builder screen access for the requested post.
	 *
	 * @return int Valid page ID or 0 when access is denied.
	 */
	public static function validate_builder_screen_access(): int {
		$post_id = self::get_requested_post_id();

		if ( ! self::can_edit_page( $post_id ) ) {
			return 0;
		}

		return $post_id;
	}

	/**
	 * Build the Node Builder admin URL for a page.
	 *
	 * @param int $post_id Page ID.
	 * @return string
	 */
	public static function get_editor_url( int $post_id ): string {
		return add_query_arg(
			array(
				'page' => self::PAGE_SLUG,
				'post' => $post_id,
			),
			admin_url( 'admin.php' )
		);
	}
}

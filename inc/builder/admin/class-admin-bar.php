<?php
/**
 * Node Builder admin bar integration.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Builder\Admin;

use NodeBrains\Admin\Builder\Access;
use WP_Admin_Bar;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds an "Edit with Node Builder" item to the WordPress admin bar.
 */
final class Admin_Bar {

	/**
	 * Admin bar menu priority.
	 *
	 * Core registers the "Edit" item at priority 80.
	 */
	private const MENU_PRIORITY = 81;

	/**
	 * Admin bar node ID.
	 */
	private const NODE_ID = 'nodebrains-edit-with-builder';

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public static function register(): void {
		add_action( 'admin_bar_menu', array( self::class, 'add_menu_item' ), self::MENU_PRIORITY );
	}

	/**
	 * Add the Node Builder link to the admin bar when viewing an editable page.
	 *
	 * @param WP_Admin_Bar $wp_admin_bar Admin bar instance.
	 * @return void
	 */
	public static function add_menu_item( WP_Admin_Bar $wp_admin_bar ): void {
		if ( ! is_user_logged_in() || ! is_admin_bar_showing() ) {
			return;
		}

		if ( ! is_singular( 'page' ) ) {
			return;
		}

		$post_id = get_queried_object_id();

		if ( ! Access::can_edit_page( $post_id ) ) {
			return;
		}

		$edit_node = $wp_admin_bar->get_node( 'edit' );

		$args = array(
			'id'    => self::NODE_ID,
			'title' => esc_html__( 'Edit with Node Builder', 'nodebrains' ),
			'href'  => esc_url( Access::get_editor_url( $post_id ) ),
			'meta'  => array(
				'class' => 'nodebrains-edit-with-builder',
			),
		);

		if ( $edit_node ) {
			$args['parent'] = $edit_node->parent;

			if ( ! empty( $edit_node->group ) ) {
				$args['group'] = $edit_node->group;
			}
		} else {
			$args['parent'] = 'top-secondary';
		}

		$wp_admin_bar->add_node( $args );
	}
}

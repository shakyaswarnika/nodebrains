<?php
/**
 * Node Builder page list row actions.
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
 * Adds the "Edit with Node Builder" action to the Pages list table.
 */
final class Builder_Actions {

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public static function register(): void {
		add_filter( 'page_row_actions', array( self::class, 'add_row_action' ), 10, 2 );
	}

	/**
	 * Append the Node Builder row action for editable pages.
	 *
	 * @param array<string, string> $actions Existing row actions.
	 * @param \WP_Post              $post    Current page object.
	 * @return array<string, string>
	 */
	public static function add_row_action( array $actions, \WP_Post $post ): array {
		if ( 'page' !== $post->post_type ) {
			return $actions;
		}

		if ( ! Access::can_edit_page( (int) $post->ID ) ) {
			return $actions;
		}

		$url = Access::get_editor_url( (int) $post->ID );

		$actions['node_builder'] = sprintf(
			'<a href="%1$s" aria-label="%2$s">%3$s</a>',
			esc_url( $url ),
			esc_attr(
				sprintf(
					/* translators: %s: page title */
					__( 'Edit "%s" with Node Builder', 'nodebrains' ),
					get_the_title( $post )
				)
			),
			esc_html__( 'Edit with Node Builder', 'nodebrains' )
		);

		return $actions;
	}
}

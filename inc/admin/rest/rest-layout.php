<?php
/**
 * Node Builder layout REST endpoints.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Admin\Rest;

use NodeBrains\Admin\Builder\Access;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * REST controller for page layout persistence.
 */
final class Rest_Layout {

	/**
	 * REST namespace.
	 */
	public const NAMESPACE = 'node-builder/v1';

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public static function register_routes(): void {
		register_rest_route(
			self::NAMESPACE,
			'/layout/(?P<id>\d+)',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( self::class, 'get_layout' ),
					'permission_callback' => array( self::class, 'can_edit_layout' ),
					'args'                => self::get_route_args(),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( self::class, 'save_layout' ),
					'permission_callback' => array( self::class, 'can_edit_layout' ),
					'args'                => self::get_route_args(),
				),
			)
		);
	}

	/**
	 * Route argument schema.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	private static function get_route_args(): array {
		return array(
			'id' => array(
				'description' => __( 'Page ID.', 'nodebrains' ),
				'type'        => 'integer',
				'required'    => true,
				'minimum'     => 1,
			),
		);
	}

	/**
	 * Validate edit permissions for the requested page.
	 *
	 * @param WP_REST_Request $request REST request.
	 * @return bool|WP_Error
	 */
	public static function can_edit_layout( WP_REST_Request $request ) {
		$post_id = absint( $request->get_param( 'id' ) );

		if ( ! Access::can_edit_page( $post_id ) ) {
			return new WP_Error(
				'nodebrains_forbidden',
				__( 'You are not allowed to edit this page layout.', 'nodebrains' ),
				array(
					'status' => 403,
				)
			);
		}

		return true;
	}

	/**
	 * GET /node-builder/v1/layout/{id}
	 *
	 * @param WP_REST_Request $request REST request.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function get_layout( WP_REST_Request $request ) {
		$post_id = absint( $request->get_param( 'id' ) );
		$stored  = get_post_meta( $post_id, Access::LAYOUT_META_KEY, true );

		if ( empty( $stored ) || ! is_string( $stored ) ) {
			return rest_ensure_response(
				array(
					'sections' => array(),
				)
			);
		}

		$decoded = json_decode( $stored, true );

		if ( ! is_array( $decoded ) ) {
			return rest_ensure_response(
				array(
					'sections' => array(),
				)
			);
		}

		return rest_ensure_response( self::prepare_layout_response( $decoded ) );
	}

	/**
	 * POST /node-builder/v1/layout/{id}
	 *
	 * @param WP_REST_Request $request REST request.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function save_layout( WP_REST_Request $request ) {
		$post_id = absint( $request->get_param( 'id' ) );
		$payload = $request->get_json_params();

		if ( ! is_array( $payload ) ) {
			return new WP_Error(
				'nodebrains_invalid_layout',
				__( 'Layout payload must be a JSON object.', 'nodebrains' ),
				array(
					'status' => 400,
				)
			);
		}

		$sanitized = self::sanitize_layout_input( $payload );
		$encoded   = wp_json_encode( $sanitized );

		if ( false === $encoded ) {
			return new WP_Error(
				'nodebrains_encode_failed',
				__( 'Unable to encode layout data.', 'nodebrains' ),
				array(
					'status' => 500,
				)
			);
		}

		update_post_meta( $post_id, Access::LAYOUT_META_KEY, $encoded );

		return rest_ensure_response(
			array(
				'success' => true,
				'layout'  => self::prepare_layout_response( $sanitized ),
			)
		);
	}

	/**
	 * Recursively sanitize layout input.
	 *
	 * @param mixed $value Raw value.
	 * @return mixed
	 */
	private static function sanitize_layout_input( mixed $value ): mixed {
		if ( is_array( $value ) ) {
			$sanitized = array();

			foreach ( $value as $key => $item ) {
				$clean_key               = is_string( $key ) ? wp_check_invalid_utf8( $key ) : $key;
				$sanitized[ $clean_key ] = self::sanitize_layout_input( $item );
			}

			return $sanitized;
		}

		if ( is_bool( $value ) || is_int( $value ) || is_float( $value ) || null === $value ) {
			return $value;
		}

		if ( is_string( $value ) ) {
			return wp_check_invalid_utf8( $value );
		}

		return null;
	}

	/**
	 * Normalize layout data for REST responses.
	 *
	 * @param array<string|int, mixed> $layout Layout data.
	 * @return array<string|int, mixed>
	 */
	private static function prepare_layout_response( array $layout ): array {
		return $layout;
	}
}

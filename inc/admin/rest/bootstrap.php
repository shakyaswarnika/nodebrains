<?php
/**
 * Node Builder REST API bootstrap.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Admin\Rest;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once NODEBRAINS_PATH . '/inc/admin/rest/rest-layout.php';

/**
 * Initialize REST routes.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'rest_api_init', array( Rest_Layout::class, 'register_routes' ) );
}

bootstrap();

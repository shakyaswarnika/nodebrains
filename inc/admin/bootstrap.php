<?php
/**
 * WordPress admin integration bootstrap.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once NODEBRAINS_PATH . '/inc/admin/rest/bootstrap.php';

if ( is_admin() ) {
	require_once NODEBRAINS_PATH . '/inc/admin/builder/bootstrap.php';
}

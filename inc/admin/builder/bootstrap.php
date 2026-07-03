<?php
/**
 * Node Builder admin bootstrap.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Admin\Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once NODEBRAINS_PATH . '/inc/admin/builder/class-access.php';
require_once NODEBRAINS_PATH . '/inc/admin/builder/admin-builder.php';
require_once NODEBRAINS_PATH . '/inc/admin/builder/builder-loader.php';
require_once NODEBRAINS_PATH . '/inc/admin/builder/builder-actions.php';
require_once NODEBRAINS_PATH . '/inc/admin/builder/builder-screen.php';

/**
 * Initialize Node Builder admin integration.
 *
 * @return void
 */
function bootstrap(): void {
	Admin_Builder::register();
	Builder_Loader::register();
	Builder_Actions::register();
	Builder_Screen::register();
}

bootstrap();

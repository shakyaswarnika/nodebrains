<?php
/**
 * NodeBrains functions and definitions.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require get_template_directory() . '/inc/constants.php';
require NODEBRAINS_PATH . '/inc/setup.php';
require NODEBRAINS_PATH . '/inc/enqueue.php';
require NODEBRAINS_PATH . '/inc/menus.php';
require NODEBRAINS_PATH . '/inc/sidebars.php';
require NODEBRAINS_PATH . '/inc/helpers.php';
require NODEBRAINS_PATH . '/inc/customizer.php';
require NODEBRAINS_PATH . '/inc/template-functions.php';

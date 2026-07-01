<?php
/**
 * Theme constants.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'NODEBRAINS_VERSION' ) ) {
	define( 'NODEBRAINS_VERSION', '1.0.0' );
}

if ( ! defined( 'NODEBRAINS_PATH' ) ) {
	define( 'NODEBRAINS_PATH', get_template_directory() );
}

if ( ! defined( 'NODEBRAINS_URI' ) ) {
	define( 'NODEBRAINS_URI', get_template_directory_uri() );
}

if ( ! defined( 'NODEBRAINS_BUILDER_PATH' ) ) {
	define( 'NODEBRAINS_BUILDER_PATH', NODEBRAINS_PATH . '/builder' );
}

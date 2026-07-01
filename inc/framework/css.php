<?php
/**
 * Framework CSS output and asset registration.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Css;

use NodeBrains\Framework\Colors;
use NodeBrains\Framework\Tokens;
use NodeBrains\Framework\Typography;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register framework stylesheet hooks.
 *
 * @return void
 */
function register(): void {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_styles', 5 );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_styles', 5 );
	add_filter( 'wp_theme_json_data_theme', __NAMESPACE__ . '\\sync_theme_json' );
}

/**
 * Get framework stylesheet handles and paths.
 *
 * @return array<string, array<string, string>>
 */
function get_stylesheets(): array {
	return array(
		'nodebrains-framework-layout' => array(
			'path' => 'assets/css/framework/layout.css',
			'deps' => array(),
		),
		'nodebrains-framework-grid'   => array(
			'path' => 'assets/css/framework/grid.css',
			'deps' => array( 'nodebrains-framework-layout' ),
		),
		'nodebrains-framework-type'   => array(
			'path' => 'assets/css/framework/typography.css',
			'deps' => array( 'nodebrains-framework-layout' ),
		),
	);
}

/**
 * Enqueue framework stylesheets on the front end.
 *
 * @return void
 */
function enqueue_styles(): void {
	$first_handle = '';

	foreach ( get_stylesheets() as $handle => $config ) {
		$relative = $config['path'];
		$absolute = NODEBRAINS_PATH . '/' . $relative;

		if ( ! file_exists( $absolute ) ) {
			continue;
		}

		wp_enqueue_style(
			$handle,
			NODEBRAINS_URI . '/' . $relative,
			$config['deps'],
			\NodeBrains\Helpers\get_asset_version( $relative )
		);

		if ( '' === $first_handle ) {
			$first_handle = $handle;
		}
	}

	if ( '' !== $first_handle ) {
		wp_add_inline_style( $first_handle, get_root_css() );
	}
}

/**
 * Enqueue framework styles in the block editor.
 *
 * @return void
 */
function enqueue_editor_styles(): void {
	$relative = 'assets/css/framework/layout.css';
	$absolute = NODEBRAINS_PATH . '/' . $relative;

	if ( ! file_exists( $absolute ) ) {
		return;
	}

	wp_enqueue_style(
		'nodebrains-framework-editor',
		NODEBRAINS_URI . '/' . $relative,
		array(),
		\NodeBrains\Helpers\get_asset_version( $relative )
	);

	wp_add_inline_style( 'nodebrains-framework-editor', get_root_css() );
}

/**
 * Build :root CSS custom properties from design tokens.
 *
 * @return string
 */
function get_root_css(): string {
	$lines = array( ':root {' );

	foreach ( Tokens\get_css_variables() as $property => $value ) {
		$lines[] = sprintf(
			"\t%s: %s;",
			esc_attr( $property ),
			\NodeBrains\Framework\Helpers\esc_css_value( (string) $value )
		);
	}

	$lines[] = '}';

	return implode( "\n", $lines );
}

/**
 * Sync theme.json palette and typography from PHP design tokens.
 *
 * @param \WP_Theme_JSON_Data $theme_json Theme JSON data object.
 * @return \WP_Theme_JSON_Data
 */
function sync_theme_json( $theme_json ) {
	$data = $theme_json->get_data();

	if ( ! isset( $data['settings'] ) || ! is_array( $data['settings'] ) ) {
		$data['settings'] = array();
	}

	$data['settings']['color']['palette'] = Colors\get_theme_json_palette();

	if ( ! isset( $data['settings']['typography'] ) || ! is_array( $data['settings']['typography'] ) ) {
		$data['settings']['typography'] = array();
	}

	$data['settings']['typography']['fontFamilies'] = Typography\get_theme_json_font_families();
	$data['settings']['typography']['fontSizes']    = Typography\get_theme_json_font_sizes();

	$container_width = Tokens\get( 'layout', 'container_width', 'value' );

	if ( is_string( $container_width ) && '' !== $container_width ) {
		$data['settings']['layout']['contentSize'] = $container_width;
		$data['settings']['layout']['wideSize']    = (string) Tokens\get( 'layout', 'container_width_wide', 'value' );
	}

	return $theme_json->update_with( $data );
}

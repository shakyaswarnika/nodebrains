<?php
/**
 * Component asset registration.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Assets;

use NodeBrains\Components\Registry;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Components rendered during the current request.
 *
 * @var array<string, bool>
 */
$rendered_components = array();

/**
 * Register asset hooks.
 *
 * @return void
 */
function register_hooks(): void {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_styles', 15 );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts', 20 );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_styles', 15 );
}

/**
 * Track a component as rendered for conditional script loading.
 *
 * @param string $slug Component slug.
 * @return void
 */
function track( string $slug ): void {
	global $rendered_components;

	$rendered_components[ sanitize_key( $slug ) ] = true;
}

/**
 * Check whether a component was rendered.
 *
 * @param string $slug Component slug.
 * @return bool
 */
function was_rendered( string $slug ): bool {
	global $rendered_components;

	return ! empty( $rendered_components[ sanitize_key( $slug ) ] );
}

/**
 * Enqueue the bundled component stylesheet.
 *
 * @return void
 */
function enqueue_styles(): void {
	$relative = 'assets/css/components.css';
	$absolute = NODEBRAINS_PATH . '/' . $relative;

	if ( ! file_exists( $absolute ) ) {
		return;
	}

	wp_enqueue_style(
		'nodebrains-components',
		NODEBRAINS_URI . '/' . $relative,
		array(
			'nodebrains-framework-layout',
			'nodebrains-framework-grid',
			'nodebrains-framework-type',
		),
		\NodeBrains\Helpers\get_asset_version( $relative )
	);

	enqueue_component_styles();
}

/**
 * Enqueue per-component stylesheets for rendered components.
 *
 * @return void
 */
function enqueue_component_styles(): void {
	foreach ( Registry\get_all() as $slug => $config ) {
		if ( empty( $config['style'] ) || ! was_rendered( $slug ) ) {
			continue;
		}

		$style_file = (string) $config['style'];
		$relative   = 'components/' . $slug . '/' . $style_file;
		$absolute   = NODEBRAINS_PATH . '/' . $relative;

		if ( ! file_exists( $absolute ) ) {
			continue;
		}

		$handle = 'nodebrains-component-' . $slug;

		wp_enqueue_style(
			$handle,
			NODEBRAINS_URI . '/' . $relative,
			array( 'nodebrains-components' ),
			\NodeBrains\Helpers\get_asset_version( $relative )
		);
	}
}

/**
 * Enqueue component scripts that were used on the page.
 *
 * @return void
 */
function enqueue_scripts(): void {
	foreach ( Registry\get_all() as $slug => $config ) {
		if ( empty( $config['script'] ) || ! was_rendered( $slug ) ) {
			continue;
		}

		$script_file = (string) $config['script'];
		$relative    = 'components/' . $slug . '/' . $script_file;
		$absolute    = NODEBRAINS_PATH . '/' . $relative;

		if ( ! file_exists( $absolute ) ) {
			continue;
		}

		$handle = 'nodebrains-component-' . $slug;

		wp_enqueue_script(
			$handle,
			NODEBRAINS_URI . '/' . $relative,
			array(),
			\NodeBrains\Helpers\get_asset_version( $relative ),
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);
	}
}

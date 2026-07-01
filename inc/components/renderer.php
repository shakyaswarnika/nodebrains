<?php
/**
 * Component renderer.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Renderer;

use NodeBrains\Components\Assets;
use NodeBrains\Components\Registry;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render a theme component.
 *
 * @param string               $slug Component slug.
 * @param array<string, mixed> $args Component arguments.
 * @param bool                 $should_echo Whether to echo the markup.
 * @return string
 */
function render( string $slug, array $args = array(), bool $should_echo = true ): string {
	$component = Registry\get( $slug );

	if ( null === $component ) {
		return '';
	}

	$defaults_callback = Registry\get_defaults_callback( $slug );

	if ( null === $defaults_callback ) {
		return '';
	}

	$args = wp_parse_args( $args, $defaults_callback() );

	/**
	 * Filter component arguments before rendering.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, mixed> $args Component arguments.
	 * @param string               $slug Component slug.
	 */
	$args = (array) apply_filters( "nodebrains_component_{$slug}_args", $args, $slug );

	Assets\track( $slug );

	$template = $component['path'] . '/template.php';

	if ( ! is_readable( $template ) ) {
		return '';
	}

	ob_start();
	include $template;
	$html = (string) ob_get_clean();

	/**
	 * Filter rendered component HTML.
	 *
	 * @since 1.0.0
	 *
	 * @param string               $html Rendered markup.
	 * @param array<string, mixed> $args Component arguments.
	 * @param string               $slug Component slug.
	 */
	$html = (string) apply_filters( "nodebrains_component_{$slug}_html", $html, $args, $slug );

	if ( $should_echo ) {
		echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in templates.
	}

	return $html;
}

/**
 * Return rendered component markup without echoing.
 *
 * @param string               $slug Component slug.
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get( string $slug, array $args = array() ): string {
	return render( $slug, $args, false );
}

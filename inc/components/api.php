<?php
/**
 * Public component API.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

use NodeBrains\Components\Renderer;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render a theme component.
 *
 * @param string               $slug Component slug.
 * @param array<string, mixed> $args Component arguments.
 * @param bool                 $should_echo Whether to echo markup.
 * @return string
 */
function nodebrains_component( string $slug, array $args = array(), bool $should_echo = true ): string {
	return Renderer\render( $slug, $args, $should_echo );
}

/**
 * Return component markup without echoing.
 *
 * @param string               $slug Component slug.
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function nodebrains_get_component( string $slug, array $args = array() ): string {
	return Renderer\get( $slug, $args );
}

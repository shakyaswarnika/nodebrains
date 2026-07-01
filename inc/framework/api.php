<?php
/**
 * Public theme framework API.
 *
 * Thin global wrappers around namespaced framework functions for use in
 * templates, child themes, and plugins.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

use NodeBrains\Framework\Colors;
use NodeBrains\Framework\Helpers as FrameworkHelpers;
use NodeBrains\Framework\Layout;
use NodeBrains\Framework\Settings;
use NodeBrains\Framework\Tokens;
use NodeBrains\Framework\Typography;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get a theme setting value.
 *
 * @param string $key     Setting key.
 * @param mixed  $fallback Optional default.
 * @return mixed
 */
function nodebrains_get_setting( string $key, $fallback = null ) {
	return Settings\get( $key, $fallback );
}

/**
 * Get a color value by slug.
 *
 * @param string $slug Color token slug.
 * @return string
 */
function nodebrains_get_color( string $slug ): string {
	return Colors\get( $slug );
}

/**
 * Get a spacing value by slug.
 *
 * @param string $slug Spacing token slug.
 * @return string
 */
function nodebrains_get_spacing( string $slug ): string {
	return Layout\get_spacing( $slug );
}

/**
 * Get a design token value.
 *
 * @param string      $group Token group.
 * @param string      $slug  Token slug.
 * @param string|null $key   Token key (value, css_var, label).
 * @return mixed|null
 */
function nodebrains_get_token( string $group, string $slug, ?string $key = 'value' ) {
	return Tokens\get( $group, $slug, $key );
}

/**
 * Build a space-separated class string.
 *
 * @param mixed ...$args Class arguments.
 * @return string
 */
function nodebrains_class_names( ...$args ): string {
	return FrameworkHelpers\class_names( ...$args );
}

/**
 * Build container CSS classes.
 *
 * @param array<string, mixed> $args Container arguments.
 * @return string
 */
function nodebrains_container_class( array $args = array() ): string {
	return Layout\container_class( $args );
}

/**
 * Build grid CSS classes.
 *
 * @param array<string, mixed> $args Grid arguments.
 * @return string
 */
function nodebrains_grid_class( array $args = array() ): string {
	return Layout\grid_class( $args );
}

/**
 * Build typography utility classes.
 *
 * @param array<string, string|bool> $modifiers Typography modifiers.
 * @return string
 */
function nodebrains_typography_class( array $modifiers ): string {
	return Typography\class_names( $modifiers );
}

/**
 * Output an opening container element.
 *
 * @param array<string, mixed> $args Container arguments.
 * @return void
 */
function nodebrains_the_container_open( array $args = array() ): void {
	Layout\the_container_open( $args );
}

/**
 * Output a closing container element.
 *
 * @param string $tag HTML tag name.
 * @return void
 */
function nodebrains_the_container_close( string $tag = 'div' ): void {
	Layout\the_container_close( $tag );
}

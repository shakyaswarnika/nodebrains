<?php
/**
 * Color palette API.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Colors;

use NodeBrains\Framework\Settings;
use NodeBrains\Framework\Tokens;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the full color palette.
 *
 * @return array<string, array<string, mixed>>
 */
function get_palette(): array {
	$palette = Tokens\get_group( 'colors' );

	/**
	 * Filter the theme color palette.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, array<string, mixed>> $palette Color palette tokens.
	 */
	return (array) apply_filters( 'nodebrains_color_palette', $palette );
}

/**
 * Get a color value by slug.
 *
 * @param string $slug Color token slug.
 * @return string
 */
function get( string $slug ): string {
	$value = Tokens\get( 'colors', $slug, 'value' );

	if ( null === $value ) {
		return '';
	}

	return (string) $value;
}

/**
 * Get the CSS custom property name for a color slug.
 *
 * @param string $slug Color token slug.
 * @return string
 */
function get_css_var_name( string $slug ): string {
	$css_var = Tokens\get( 'colors', $slug, 'css_var' );

	return is_string( $css_var ) ? $css_var : '';
}

/**
 * Get a CSS var() reference for a color slug.
 *
 * @param string $slug Color token slug.
 * @return string
 */
function get_css_var( string $slug ): string {
	$css_var = get_css_var_name( $slug );

	if ( '' === $css_var ) {
		return '';
	}

	return 'var(' . $css_var . ')';
}

/**
 * Resolve a theme setting color slug to its hex/rgb value.
 *
 * @param string $setting_key Theme setting key (e.g. color_accent).
 * @return string
 */
function from_setting( string $setting_key ): string {
	$slug = (string) Settings\get( $setting_key, '' );

	if ( '' === $slug ) {
		return '';
	}

	return get( $slug );
}

/**
 * Build inline style for a color CSS property.
 *
 * @param string $slug     Color token slug.
 * @param string $property CSS property name.
 * @return string
 */
function get_inline_style( string $slug, string $property = 'color' ): string {
	$css_var = get_css_var_name( $slug );

	if ( '' === $css_var ) {
		return '';
	}

	return sanitize_key( $property ) . ':' . esc_attr( 'var(' . $css_var . ')' ) . ';';
}

/**
 * Get palette formatted for theme.json sync.
 *
 * @return array<int, array<string, string>>
 */
function get_theme_json_palette(): array {
	$entries = array();

	foreach ( get_palette() as $slug => $token ) {
		if ( ! is_array( $token ) ) {
			continue;
		}

		$entries[] = array(
			'slug'  => (string) $slug,
			'color' => (string) ( $token['value'] ?? '' ),
			'name'  => (string) ( $token['label'] ?? ucfirst( str_replace( '-', ' ', $slug ) ) ),
		);
	}

	return $entries;
}

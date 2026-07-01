<?php
/**
 * Typography system API.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Typography;

use NodeBrains\Framework\Settings;
use NodeBrains\Framework\Tokens;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get font family value by slug.
 *
 * @param string $slug Font family slug.
 * @return string
 */
function get_font_family( string $slug ): string {
	$value = Tokens\get( 'typography', 'font_families', null );

	if ( ! is_array( $value ) || ! isset( $value[ $slug ]['value'] ) ) {
		$nested = Tokens\get( 'typography', $slug, 'value' );

		if ( is_string( $nested ) ) {
			return $nested;
		}

		return '';
	}

	return (string) $value[ $slug ]['value'];
}

/**
 * Get font family CSS custom property reference.
 *
 * @param string $slug Font family slug.
 * @return string
 */
function get_font_family_var( string $slug ): string {
	$families = Tokens\get_group( 'typography' )['font_families'] ?? array();

	if ( ! isset( $families[ $slug ]['css_var'] ) ) {
		return '';
	}

	return 'var(' . $families[ $slug ]['css_var'] . ')';
}

/**
 * Get font size value by slug.
 *
 * @param string $slug Font size slug.
 * @return string
 */
function get_font_size( string $slug ): string {
	$sizes = Tokens\get_group( 'typography' )['font_sizes'] ?? array();

	return isset( $sizes[ $slug ]['value'] ) ? (string) $sizes[ $slug ]['value'] : '';
}

/**
 * Get font size CSS custom property reference.
 *
 * @param string $slug Font size slug.
 * @return string
 */
function get_font_size_var( string $slug ): string {
	$sizes = Tokens\get_group( 'typography' )['font_sizes'] ?? array();

	if ( ! isset( $sizes[ $slug ]['css_var'] ) ) {
		return '';
	}

	return 'var(' . $sizes[ $slug ]['css_var'] . ')';
}

/**
 * Get line height value by slug.
 *
 * @param string $slug Line height slug.
 * @return string
 */
function get_line_height( string $slug ): string {
	$line_heights = Tokens\get_group( 'typography' )['line_heights'] ?? array();

	return isset( $line_heights[ $slug ]['value'] ) ? (string) $line_heights[ $slug ]['value'] : '';
}

/**
 * Get line height CSS custom property reference.
 *
 * @param string $slug Line height slug.
 * @return string
 */
function get_line_height_var( string $slug ): string {
	$line_heights = Tokens\get_group( 'typography' )['line_heights'] ?? array();

	if ( ! isset( $line_heights[ $slug ]['css_var'] ) ) {
		return '';
	}

	return 'var(' . $line_heights[ $slug ]['css_var'] . ')';
}

/**
 * Get font weight value by slug.
 *
 * @param string $slug Font weight slug.
 * @return string
 */
function get_font_weight( string $slug ): string {
	$weights = Tokens\get_group( 'typography' )['font_weights'] ?? array();

	return isset( $weights[ $slug ]['value'] ) ? (string) $weights[ $slug ]['value'] : '';
}

/**
 * Get font weight CSS custom property reference.
 *
 * @param string $slug Font weight slug.
 * @return string
 */
function get_font_weight_var( string $slug ): string {
	$weights = Tokens\get_group( 'typography' )['font_weights'] ?? array();

	if ( ! isset( $weights[ $slug ]['css_var'] ) ) {
		return '';
	}

	return 'var(' . $weights[ $slug ]['css_var'] . ')';
}

/**
 * Get base body typography styles from theme settings.
 *
 * @return array<string, string>
 */
function get_body_styles(): array {
	$family_slug = (string) Settings\get( 'font_family_base', 'sans' );
	$size_slug   = (string) Settings\get( 'font_size_base', 'base' );
	$line_slug   = (string) Settings\get( 'line_height_base', 'normal' );

	return array(
		'font-family' => get_font_family_var( $family_slug ),
		'font-size'   => get_font_size_var( $size_slug ),
		'line-height' => get_line_height_var( $line_slug ),
		'font-weight' => get_font_weight_var( 'normal' ),
	);
}

/**
 * Get heading scale definitions.
 *
 * @return array<string, array<string, string>>
 */
function get_heading_scale(): array {
	return array(
		'h1' => array(
			'font-size'   => get_font_size_var( '3xl' ),
			'line-height' => get_line_height_var( 'tight' ),
			'font-weight' => get_font_weight_var( 'bold' ),
		),
		'h2' => array(
			'font-size'   => get_font_size_var( '2xl' ),
			'line-height' => get_line_height_var( 'tight' ),
			'font-weight' => get_font_weight_var( 'bold' ),
		),
		'h3' => array(
			'font-size'   => get_font_size_var( 'xl' ),
			'line-height' => get_line_height_var( 'tight' ),
			'font-weight' => get_font_weight_var( 'semibold' ),
		),
		'h4' => array(
			'font-size'   => get_font_size_var( 'lg' ),
			'line-height' => get_line_height_var( 'normal' ),
			'font-weight' => get_font_weight_var( 'semibold' ),
		),
		'h5' => array(
			'font-size'   => get_font_size_var( 'md' ),
			'line-height' => get_line_height_var( 'normal' ),
			'font-weight' => get_font_weight_var( 'medium' ),
		),
		'h6' => array(
			'font-size'   => get_font_size_var( 'sm' ),
			'line-height' => get_line_height_var( 'normal' ),
			'font-weight' => get_font_weight_var( 'medium' ),
		),
	);
}

/**
 * Build typography utility class names.
 *
 * @param array<string, string|bool> $modifiers Class modifiers (size, weight, leading, family).
 * @return string
 */
function class_names( array $modifiers ): string {
	$classes = array( 'nb-text' );

	if ( ! empty( $modifiers['size'] ) ) {
		$classes[] = 'nb-text--' . sanitize_html_class( (string) $modifiers['size'] );
	}

	if ( ! empty( $modifiers['weight'] ) ) {
		$classes[] = 'nb-text--weight-' . sanitize_html_class( (string) $modifiers['weight'] );
	}

	if ( ! empty( $modifiers['leading'] ) ) {
		$classes[] = 'nb-text--leading-' . sanitize_html_class( (string) $modifiers['leading'] );
	}

	if ( ! empty( $modifiers['family'] ) ) {
		$classes[] = 'nb-text--family-' . sanitize_html_class( (string) $modifiers['family'] );
	}

	if ( ! empty( $modifiers['muted'] ) ) {
		$classes[] = 'nb-text--muted';
	}

	return implode( ' ', array_unique( $classes ) );
}

/**
 * Get font families formatted for theme.json sync.
 *
 * @return array<int, array<string, string>>
 */
function get_theme_json_font_families(): array {
	$families = Tokens\get_group( 'typography' )['font_families'] ?? array();
	$entries  = array();

	foreach ( $families as $slug => $token ) {
		if ( ! is_array( $token ) ) {
			continue;
		}

		$entries[] = array(
			'fontFamily' => (string) ( $token['value'] ?? '' ),
			'slug'       => (string) $slug,
			'name'       => (string) ( $token['label'] ?? ucfirst( $slug ) ),
		);
	}

	return $entries;
}

/**
 * Get font sizes formatted for theme.json sync.
 *
 * @return array<int, array<string, string>>
 */
function get_theme_json_font_sizes(): array {
	$sizes   = Tokens\get_group( 'typography' )['font_sizes'] ?? array();
	$entries = array();

	foreach ( $sizes as $slug => $token ) {
		if ( ! is_array( $token ) ) {
			continue;
		}

		$entries[] = array(
			'slug' => (string) $slug,
			'size' => (string) ( $token['value'] ?? '' ),
			'name' => (string) ( $token['label'] ?? ucfirst( $slug ) ),
		);
	}

	return $entries;
}

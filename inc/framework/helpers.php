<?php
/**
 * Framework helper functions.
 *
 * Reusable utilities for class names, attributes, and CSS value handling.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build a space-separated class string from mixed inputs.
 *
 * Accepts strings, arrays of strings, or associative arrays where keys with
 * truthy values are included.
 *
 * @param mixed ...$args Class name arguments.
 * @return string
 */
function class_names( ...$args ): string {
	$classes = array();

	foreach ( $args as $arg ) {
		if ( is_string( $arg ) && '' !== $arg ) {
			$classes[] = $arg;
			continue;
		}

		if ( ! is_array( $arg ) ) {
			continue;
		}

		foreach ( $arg as $key => $value ) {
			if ( is_int( $key ) ) {
				if ( is_string( $value ) && '' !== $value ) {
					$classes[] = $value;
				}
				continue;
			}

			if ( $value ) {
				$classes[] = (string) $key;
			}
		}
	}

	return implode( ' ', array_unique( array_map( 'sanitize_html_class', explode( ' ', implode( ' ', $classes ) ) ) ) );
}

/**
 * Build an HTML attribute string from an associative array.
 *
 * Boolean true outputs a boolean attribute. False and null values are omitted.
 *
 * @param array<string, mixed> $attributes HTML attributes.
 * @return string
 */
function attribute_string( array $attributes ): string {
	$parts = array();

	foreach ( $attributes as $name => $value ) {
		if ( false === $value || null === $value ) {
			continue;
		}

		$name = preg_replace( '/[^a-zA-Z0-9_\-:]/', '', (string) $name );

		if ( '' === $name ) {
			continue;
		}

		if ( true === $value ) {
			$parts[] = esc_attr( $name );
			continue;
		}

		$parts[] = sprintf( '%1$s="%2$s"', esc_attr( $name ), esc_attr( (string) $value ) );
	}

	return implode( ' ', $parts );
}

/**
 * Escape a value for safe use inside inline CSS.
 *
 * @param string $value CSS value.
 * @return string
 */
function esc_css_value( string $value ): string {
	return esc_attr( $value );
}

/**
 * Build inline style string from property map.
 *
 * @param array<string, string> $styles CSS property-value pairs.
 * @return string
 */
function inline_styles( array $styles ): string {
	$parts = array();

	foreach ( $styles as $property => $value ) {
		if ( '' === $value ) {
			continue;
		}

		$property = sanitize_key( (string) $property );
		$parts[]  = $property . ':' . esc_css_value( $value );
	}

	return implode( ';', $parts );
}

/**
 * Prefix a class name with the theme framework prefix.
 *
 * @param string $suffix Class suffix without leading dot.
 * @return string
 */
function prefixed_class( string $suffix ): string {
	return 'nb-' . ltrim( $suffix, 'nb-' );
}

/**
 * Check whether a string references a design token slug.
 *
 * @param string $value   Value to inspect.
 * @param string $pattern Optional regex pattern for slug validation.
 * @return bool
 */
function is_token_slug( string $value, string $pattern = '/^[a-z0-9\-]+$/i' ): bool {
	return (bool) preg_match( $pattern, $value );
}

/**
 * Convert a pixel integer to rem based on 16px root.
 *
 * @param int|float $pixels Pixel value.
 * @param int|float $base   Root font size in pixels.
 * @return string
 */
function px_to_rem( $pixels, $base = 16 ): string {
	$base = (float) $base;

	if ( $base <= 0 ) {
		$base = 16;
	}

	return round( (float) $pixels / $base, 4 ) . 'rem';
}

/**
 * Get a data attribute name prefixed for the theme.
 *
 * @param string $name Attribute suffix.
 * @return string
 */
function data_attribute_name( string $name ): string {
	return 'data-nb-' . sanitize_key( $name );
}

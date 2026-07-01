<?php
/**
 * Shared component helpers.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Support;

use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build a BEM block class name for a component.
 *
 * @param string               $block     Component block name without prefix.
 * @param array<string, mixed> $args      Component arguments.
 * @param array<string, mixed> $modifiers Modifier map (variant, size, etc.).
 * @return string
 */
function block_class( string $block, array $args, array $modifiers = array() ): string {
	$base    = 'nb-c-' . sanitize_html_class( $block );
	$classes = array( $base );

	foreach ( $modifiers as $key => $value ) {
		if ( empty( $value ) ) {
			continue;
		}

		if ( true === $value ) {
			$classes[] = $base . '--' . sanitize_html_class( (string) $key );
			continue;
		}

		$classes[] = $base . '--' . sanitize_html_class( (string) $key ) . '-' . sanitize_html_class( (string) $value );
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	return FrameworkHelpers\class_names( $classes );
}

/**
 * Build an element class inside a component block.
 *
 * @param string $block   Component block name.
 * @param string $element BEM element name.
 * @param string $extra   Optional extra classes.
 * @return string
 */
function element_class( string $block, string $element, string $extra = '' ): string {
	return FrameworkHelpers\class_names(
		'nb-c-' . sanitize_html_class( $block ) . '__' . sanitize_html_class( $element ),
		$extra
	);
}

/**
 * Merge component attributes with defaults.
 *
 * @param array<string, mixed> $args       Component arguments.
 * @param array<string, mixed> $attributes Base attributes.
 * @return array<string, mixed>
 */
function merge_attributes( array $args, array $attributes ): array {
	$user_attributes = $args['attributes'] ?? array();

	if ( ! is_array( $user_attributes ) ) {
		$user_attributes = array();
	}

	$merged = array_merge( $attributes, $user_attributes );

	if ( ! empty( $args['id'] ) ) {
		$merged['id'] = (string) $args['id'];
	}

	return $merged;
}

/**
 * Render optional slot content.
 *
 * @param callable|string $content Slot content or callback.
 * @return string
 */
function render_slot( $content ): string {
	if ( is_callable( $content ) ) {
		ob_start();
		call_user_func( $content );
		return (string) ob_get_clean();
	}

	if ( ! is_string( $content ) ) {
		return '';
	}

	return $content;
}

/**
 * Output slot content with allowed HTML.
 *
 * @param callable|string $content Slot content.
 * @return void
 */
function the_slot( $content ): void {
	echo wp_kses_post( render_slot( $content ) );
}

/**
 * Build a unique ID for a component instance.
 *
 * @param string $block Component block name.
 * @param string $suffix Optional suffix.
 * @return string
 */
function unique_id( string $block, string $suffix = '' ): string {
	$id = 'nb-c-' . sanitize_html_class( $block );

	if ( '' !== $suffix ) {
		$id .= '-' . sanitize_html_class( $suffix );
	}

	return wp_unique_id( $id . '-' );
}

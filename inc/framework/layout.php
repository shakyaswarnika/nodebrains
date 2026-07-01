<?php
/**
 * Layout helpers and container utilities.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Layout;

use NodeBrains\Framework\Helpers;
use NodeBrains\Framework\Settings;
use NodeBrains\Framework\Tokens;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Valid container width variants.
 *
 * @return array<int, string>
 */
function get_container_variants(): array {
	return array( 'default', 'narrow', 'wide', 'fluid', 'full' );
}

/**
 * Get container max-width for a variant.
 *
 * @param string $variant Container variant slug.
 * @return string
 */
function get_container_width( string $variant = 'default' ): string {
	switch ( $variant ) {
		case 'narrow':
			return (string) Tokens\get( 'layout', 'container_width_narrow', 'value' );
		case 'wide':
			return (string) Tokens\get( 'layout', 'container_width_wide', 'value' );
		case 'fluid':
		case 'full':
			return '100%';
		default:
			return (string) Settings\get( 'container_width', Tokens\get( 'layout', 'container_width', 'value' ) );
	}
}

/**
 * Get container horizontal padding.
 *
 * @return string
 */
function get_container_padding(): string {
	return (string) Settings\get( 'container_padding', Tokens\get( 'layout', 'container_padding', 'value' ) );
}

/**
 * Get a breakpoint value.
 *
 * @param string $slug Breakpoint slug (sm, md, lg, xl).
 * @return string
 */
function get_breakpoint( string $slug ): string {
	$value = Tokens\get( 'breakpoints', $slug, 'value' );

	return null !== $value ? (string) $value : '';
}

/**
 * Get spacing value by slug.
 *
 * @param string $slug Spacing slug.
 * @return string
 */
function get_spacing( string $slug ): string {
	$value = Tokens\get( 'spacing', $slug, 'value' );

	return null !== $value ? (string) $value : '';
}

/**
 * Get spacing CSS custom property reference.
 *
 * @param string $slug Spacing slug.
 * @return string
 */
function get_spacing_var( string $slug ): string {
	$css_var = Tokens\get( 'spacing', $slug, 'css_var' );

	if ( ! is_string( $css_var ) || '' === $css_var ) {
		return '';
	}

	return 'var(' . $css_var . ')';
}

/**
 * Build container CSS class string.
 *
 * @param array<string, mixed> $args {
 *     Optional container arguments.
 *
 *     @type string               $variant   Container variant (default, narrow, wide, fluid, full).
 *     @type string|array<string> $class     Additional class names.
 *     @type bool                 $centered  Whether to center the container. Default true.
 * }
 * @return string
 */
function container_class( array $args = array() ): string {
	$defaults = array(
		'variant'  => 'default',
		'class'    => '',
		'centered' => true,
	);

	$args    = wp_parse_args( $args, $defaults );
	$variant = sanitize_html_class( (string) $args['variant'] );

	$classes = array( 'nb-container' );

	if ( 'default' !== $variant && in_array( $variant, get_container_variants(), true ) ) {
		$classes[] = 'nb-container--' . $variant;
	}

	if ( ! $args['centered'] ) {
		$classes[] = 'nb-container--uncentered';
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	/**
	 * Filter container CSS classes.
	 *
	 * @since 1.0.0
	 *
	 * @param array<int, string>   $classes Container classes.
	 * @param array<string, mixed> $args    Container arguments.
	 */
	$classes = (array) apply_filters( 'nodebrains_container_classes', $classes, $args );

	return Helpers\class_names( $classes );
}

/**
 * Build grid CSS class string.
 *
 * @param array<string, mixed> $args {
 *     Optional grid arguments.
 *
 *     @type int|string           $columns   Column count or responsive map keyed by breakpoint.
 *     @type string               $gap       Gap size slug (sm, md, lg) or custom.
 *     @type string|array<string> $class     Additional classes.
 *     @type bool                 $inline    Use inline-grid display mode.
 * }
 * @return string
 */
function grid_class( array $args = array() ): string {
	$defaults = array(
		'columns' => (int) Settings\get( 'grid_columns', 12 ),
		'gap'     => 'md',
		'class'   => '',
		'inline'  => false,
	);

	$args    = wp_parse_args( $args, $defaults );
	$classes = array( $args['inline'] ? 'nb-inline-grid' : 'nb-grid' );

	if ( is_array( $args['columns'] ) ) {
		foreach ( $args['columns'] as $breakpoint => $count ) {
			$breakpoint = sanitize_html_class( (string) $breakpoint );
			$count      = max( 1, min( 12, (int) $count ) );
			$classes[]  = 'nb-grid--' . $breakpoint . '-cols-' . $count;
		}
	} else {
		$count     = max( 1, min( 12, (int) $args['columns'] ) );
		$classes[] = 'nb-grid--cols-' . $count;
	}

	$gap = (string) $args['gap'];

	if ( in_array( $gap, array( 'sm', 'md', 'lg', 'none' ), true ) ) {
		$classes[] = 'nb-grid--gap-' . $gap;
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	/**
	 * Filter grid CSS classes.
	 *
	 * @since 1.0.0
	 *
	 * @param array<int, string>   $classes Grid classes.
	 * @param array<string, mixed> $args    Grid arguments.
	 */
	$classes = (array) apply_filters( 'nodebrains_grid_classes', $classes, $args );

	return Helpers\class_names( $classes );
}

/**
 * Build stack (vertical flex) CSS class string.
 *
 * @param array<string, mixed> $args {
 *     Optional stack arguments.
 *
 *     @type string               $gap   Spacing slug for gap.
 *     @type string               $align Align items (start, center, end, stretch).
 *     @type string|array<string> $class Additional classes.
 * }
 * @return string
 */
function stack_class( array $args = array() ): string {
	$defaults = array(
		'gap'   => 'sm',
		'align' => 'stretch',
		'class' => '',
	);

	$args    = wp_parse_args( $args, $defaults );
	$classes = array( 'nb-stack' );

	$gap = sanitize_html_class( (string) $args['gap'] );

	if ( '' !== $gap ) {
		$classes[] = 'nb-stack--gap-' . $gap;
	}

	$align = sanitize_html_class( (string) $args['align'] );

	if ( in_array( $align, array( 'start', 'center', 'end', 'stretch' ), true ) ) {
		$classes[] = 'nb-stack--align-' . $align;
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	return Helpers\class_names( $classes );
}

/**
 * Build cluster (horizontal flex wrap) CSS class string.
 *
 * @param array<string, mixed> $args {
 *     Optional cluster arguments.
 *
 *     @type string               $gap      Spacing slug.
 *     @type string               $justify  Justify content value.
 *     @type string               $align    Align items value.
 *     @type string|array<string> $class    Additional classes.
 * }
 * @return string
 */
function cluster_class( array $args = array() ): string {
	$defaults = array(
		'gap'     => 'sm',
		'justify' => 'start',
		'align'   => 'center',
		'class'   => '',
	);

	$args    = wp_parse_args( $args, $defaults );
	$classes = array( 'nb-cluster' );

	$gap = sanitize_html_class( (string) $args['gap'] );

	if ( '' !== $gap ) {
		$classes[] = 'nb-cluster--gap-' . $gap;
	}

	$justify = sanitize_html_class( (string) $args['justify'] );

	if ( in_array( $justify, array( 'start', 'center', 'end', 'between', 'around' ), true ) ) {
		$classes[] = 'nb-cluster--justify-' . $justify;
	}

	$align = sanitize_html_class( (string) $args['align'] );

	if ( in_array( $align, array( 'start', 'center', 'end', 'stretch' ), true ) ) {
		$classes[] = 'nb-cluster--align-' . $align;
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	return Helpers\class_names( $classes );
}

/**
 * Build column span CSS class string.
 *
 * @param int                  $span  Number of columns to span (1-12).
 * @param string               $bp    Optional breakpoint prefix.
 * @param array<string, mixed> $args  Additional arguments (class).
 * @return string
 */
function col_class( int $span, string $bp = '', array $args = array() ): string {
	$span    = max( 1, min( 12, $span ) );
	$classes = array();

	if ( '' !== $bp ) {
		$classes[] = 'nb-col-' . sanitize_html_class( $bp ) . '-span-' . $span;
	} else {
		$classes[] = 'nb-col-span-' . $span;
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	return Helpers\class_names( $classes );
}

/**
 * Output an opening container element.
 *
 * @param array<string, mixed> $args Container arguments (see container_class()).
 * @return void
 */
function the_container_open( array $args = array() ): void {
	$tag        = isset( $args['tag'] ) ? tag_escape( (string) $args['tag'] ) : 'div';
	$attributes = $args['attributes'] ?? array();

	$attributes['class'] = Helpers\class_names(
		container_class( $args ),
		$attributes['class'] ?? ''
	);

	printf( '<%1$s %2$s>', $tag, Helpers\attribute_string( $attributes ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- attribute_string escapes values.
}

/**
 * Output a closing container element.
 *
 * @param string $tag HTML tag used in the_container_open(). Default div.
 * @return void
 */
function the_container_close( string $tag = 'div' ): void {
	printf( '</%s>', tag_escape( $tag ) );
}

/**
 * Build section wrapper class string.
 *
 * @param array<string, mixed> $args Optional section arguments.
 * @return string
 */
function section_class( array $args = array() ): string {
	$defaults = array(
		'class'    => '',
		'spacing'  => 'lg',
		'surface'  => false,
		'bordered' => false,
	);

	$args    = wp_parse_args( $args, $defaults );
	$classes = array( 'nb-section' );

	if ( ! empty( $args['spacing'] ) ) {
		$classes[] = 'nb-section--spacing-' . sanitize_html_class( (string) $args['spacing'] );
	}

	if ( ! empty( $args['surface'] ) ) {
		$classes[] = 'nb-section--surface';
	}

	if ( ! empty( $args['bordered'] ) ) {
		$classes[] = 'nb-section--bordered';
	}

	if ( ! empty( $args['class'] ) ) {
		$classes[] = $args['class'];
	}

	return Helpers\class_names( $classes );
}

<?php
/**
 * CTA component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Cta;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Colors;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Valid width variants.
 *
 * @return array<int, string>
 */
function get_width_variants(): array {
	return array( 'default', 'narrow', 'wide', 'full' );
}

/**
 * Valid padding variants.
 *
 * @return array<int, string>
 */
function get_padding_variants(): array {
	return array( 'none', 'sm', 'md', 'lg', 'xl' );
}

/**
 * Default CTA arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'heading'              => '',
		'description'          => '',
		'primary_button'       => array(),
		'secondary_button'     => array(),
		'background_color'     => 'surface',
		'background_image'     => '',
		'background_image_alt' => '',
		'overlay'              => false,
		'overlay_color'        => '',
		'overlay_opacity'      => 0.5,
		'align'                => 'center',
		'width'                => 'default',
		'padding'              => 'lg',
		'heading_level'        => 2,
		'reveal_on_scroll'     => false,
		'class'                => '',
		'id'                   => '',
		'attributes'           => array(),
	);
}

/**
 * Builder-ready settings schema.
 *
 * @return array<string, array<string, mixed>>
 */
function get_builder_schema(): array {
	return array(
		'heading'          => array(
			'type'  => 'string',
			'label' => __( 'Heading', 'nodebrains' ),
		),
		'description'      => array(
			'type'  => 'richtext',
			'label' => __( 'Description', 'nodebrains' ),
		),
		'primary_button'   => array(
			'type'  => 'button',
			'label' => __( 'Primary Button', 'nodebrains' ),
		),
		'secondary_button' => array(
			'type'  => 'button',
			'label' => __( 'Secondary Button', 'nodebrains' ),
		),
		'background_color' => array(
			'type'   => 'color',
			'label'  => __( 'Background', 'nodebrains' ),
			'tokens' => true,
		),
		'background_image' => array(
			'type'  => 'image',
			'label' => __( 'Background Image', 'nodebrains' ),
		),
		'overlay'          => array(
			'type'    => 'boolean',
			'label'   => __( 'Enable Overlay', 'nodebrains' ),
			'default' => false,
		),
		'overlay_opacity'  => array(
			'type'  => 'range',
			'label' => __( 'Overlay Opacity', 'nodebrains' ),
			'min'   => 0,
			'max'   => 1,
			'step'  => 0.05,
		),
		'align'            => array(
			'type'    => 'select',
			'label'   => __( 'Alignment', 'nodebrains' ),
			'options' => array( 'left', 'center', 'right' ),
		),
		'width'            => array(
			'type'    => 'select',
			'label'   => __( 'Width', 'nodebrains' ),
			'options' => get_width_variants(),
		),
		'padding'          => array(
			'type'    => 'select',
			'label'   => __( 'Padding', 'nodebrains' ),
			'options' => get_padding_variants(),
		),
		'reveal_on_scroll' => array(
			'type'  => 'boolean',
			'label' => __( 'Reveal on Scroll', 'nodebrains' ),
		),
	);
}

/**
 * Build CTA CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$align   = sanitize_html_class( (string) ( $args['align'] ?? 'center' ) );
	$width   = sanitize_html_class( (string) ( $args['width'] ?? 'default' ) );
	$padding = sanitize_html_class( (string) ( $args['padding'] ?? 'lg' ) );

	if ( ! in_array( $align, array( 'left', 'center', 'right' ), true ) ) {
		$align = 'center';
	}

	if ( ! in_array( $width, get_width_variants(), true ) ) {
		$width = 'default';
	}

	if ( ! in_array( $padding, get_padding_variants(), true ) ) {
		$padding = 'lg';
	}

	return Support\block_class(
		'cta',
		$args,
		array(
			'align'     => $align,
			'width'     => $width,
			'padding'   => $padding,
			'overlay'   => ! empty( $args['overlay'] ) && ( has_background_image( $args ) || has_background_color( $args ) ),
			'has-image' => has_background_image( $args ),
			'reveal'    => ! empty( $args['reveal_on_scroll'] ),
		)
	);
}

/**
 * Whether the CTA has renderable content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_content( array $args ): bool {
	if ( has_text( $args, 'heading' ) || has_text( $args, 'description' ) ) {
		return true;
	}

	return has_button( $args, 'primary_button' ) || has_button( $args, 'secondary_button' );
}

/**
 * Whether a text field has content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @param string               $key  Field key.
 * @return bool
 */
function has_text( array $args, string $key ): bool {
	$value = $args[ $key ] ?? '';

	return is_string( $value ) && '' !== trim( $value );
}

/**
 * Whether a button is configured.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @param string               $key  Button key.
 * @return bool
 */
function has_button( array $args, string $key ): bool {
	$button = normalize_button( $args[ $key ] ?? array() );

	return '' !== $button['text'] && '' !== $button['url'];
}

/**
 * Whether a background image is set.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_background_image( array $args ): bool {
	return '' !== trim( (string) ( $args['background_image'] ?? '' ) );
}

/**
 * Whether a background color is set.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_background_color( array $args ): bool {
	return '' !== trim( (string) ( $args['background_color'] ?? '' ) );
}

/**
 * Normalize button configuration.
 *
 * @param mixed $button Button configuration.
 * @return array<string, mixed>
 */
function normalize_button( $button ): array {
	if ( ! is_array( $button ) ) {
		return array(
			'text' => '',
			'url'  => '',
		);
	}

	return array(
		'text'       => (string) ( $button['text'] ?? '' ),
		'url'        => (string) ( $button['url'] ?? '' ),
		'attributes' => is_array( $button['attributes'] ?? null ) ? $button['attributes'] : array(),
	);
}

/**
 * Resolve a color token slug or literal value to CSS.
 *
 * @param string $value Color slug or CSS color.
 * @return string
 */
function resolve_color_value( string $value ): string {
	$value = trim( $value );

	if ( '' === $value ) {
		return '';
	}

	$token = Colors\get_css_var_name( $value );

	if ( '' !== $token ) {
		return 'var(' . $token . ')';
	}

	$hex = sanitize_hex_color( $value );

	if ( $hex ) {
		return $hex;
	}

	return '';
}

/**
 * Build CSS custom properties for the CTA block.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, string>
 */
function get_css_variables( array $args ): array {
	$variables = array();

	$bg_color = resolve_color_value( (string) ( $args['background_color'] ?? '' ) );

	if ( '' !== $bg_color ) {
		$variables['--nb-c-cta-bg-color'] = $bg_color;
	}

	if ( has_background_image( $args ) ) {
		$variables['--nb-c-cta-bg-image'] = 'url("' . esc_url( (string) $args['background_image'] ) . '")';
	}

	if ( ! empty( $args['overlay'] ) ) {
		$overlay_color = resolve_color_value( (string) ( $args['overlay_color'] ?? '' ) );

		if ( '' === $overlay_color ) {
			$overlay_color = 'var(--nb-color-black)';
		}

		$opacity = (float) ( $args['overlay_opacity'] ?? 0.5 );
		$opacity = max( 0, min( 1, $opacity ) );

		$variables['--nb-c-cta-overlay-color']   = $overlay_color;
		$variables['--nb-c-cta-overlay-opacity'] = (string) $opacity;
	}

	return $variables;
}

/**
 * Build inline style attribute string.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_inline_style( array $args ): string {
	$styles = array();

	foreach ( get_css_variables( $args ) as $property => $value ) {
		$styles[] = $property . ':' . $value;
	}

	return implode( ';', $styles );
}

/**
 * Get semantic heading tag.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_heading_tag( array $args ): string {
	$level = max( 1, min( 6, (int) ( $args['heading_level'] ?? 2 ) ) );

	return 'h' . $level;
}

/**
 * Get inner container class for width control.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_inner_class( array $args ): string {
	$width = (string) ( $args['width'] ?? 'default' );

	$container_variant = 'default';

	if ( in_array( $width, array( 'narrow', 'wide' ), true ) ) {
		$container_variant = $width;
	}

	return Layout\container_class(
		array(
			'variant' => $container_variant,
			'class'   => Support\element_class( 'cta', 'inner' ),
		)
	);
}

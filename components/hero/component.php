<?php
/**
 * Hero component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Hero;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Colors;
use NodeBrains\Framework\Layout;
use NodeBrains\Framework\Tokens;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default hero arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'title'                => '',
		'subtitle'             => '',
		'description'          => '',
		'primary_button'       => array(),
		'secondary_button'     => array(),
		'background_image'     => '',
		'background_image_alt' => '',
		'background_color'     => '',
		'overlay'              => true,
		'overlay_color'        => '',
		'overlay_opacity'      => 0.55,
		'align'                => 'left',
		'height'               => 'md',
		'container_width'      => 'default',
		'breadcrumb'           => '',
		'breadcrumb_items'     => array(),
		'breadcrumb_label'     => '',
		'heading_level'        => 1,
		'class'                => '',
		'id'                   => '',
		'attributes'           => array(),
	);
}

/**
 * Builder-ready settings schema (future widget mapping).
 *
 * @return array<string, array<string, mixed>>
 */
function get_builder_schema(): array {
	return array(
		'title'            => array(
			'type'     => 'string',
			'label'    => __( 'Title', 'nodebrains' ),
			'required' => false,
		),
		'subtitle'         => array(
			'type'  => 'string',
			'label' => __( 'Subtitle', 'nodebrains' ),
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
		'background_image' => array(
			'type'  => 'image',
			'label' => __( 'Background Image', 'nodebrains' ),
		),
		'background_color' => array(
			'type'   => 'color',
			'label'  => __( 'Background Color', 'nodebrains' ),
			'tokens' => true,
		),
		'overlay'          => array(
			'type'    => 'boolean',
			'label'   => __( 'Enable Overlay', 'nodebrains' ),
			'default' => true,
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
			'label'   => __( 'Content Alignment', 'nodebrains' ),
			'options' => array( 'left', 'center', 'right' ),
		),
		'height'           => array(
			'type'    => 'select',
			'label'   => __( 'Height', 'nodebrains' ),
			'options' => array( 'sm', 'md', 'lg', 'full' ),
		),
		'container_width'  => array(
			'type'    => 'select',
			'label'   => __( 'Container Width', 'nodebrains' ),
			'options' => Layout\get_container_variants(),
		),
		'breadcrumb_items' => array(
			'type'   => 'repeater',
			'label'  => __( 'Breadcrumb', 'nodebrains' ),
			'fields' => array(
				'label' => array( 'type' => 'string' ),
				'url'   => array( 'type' => 'url' ),
			),
		),
	);
}

/**
 * Build hero block CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$align  = sanitize_html_class( (string) ( $args['align'] ?? 'left' ) );
	$height = sanitize_html_class( (string) ( $args['height'] ?? 'md' ) );

	if ( ! in_array( $align, array( 'left', 'center', 'right' ), true ) ) {
		$align = 'left';
	}

	if ( ! in_array( $height, array( 'sm', 'md', 'lg', 'full' ), true ) ) {
		$height = 'md';
	}

	return Support\block_class(
		'hero',
		$args,
		array(
			'align'          => $align,
			'height'         => $height,
			'overlay'        => ! empty( $args['overlay'] ) && ( has_background_image( $args ) || has_background_color( $args ) ),
			'has-image'      => has_background_image( $args ),
			'has-breadcrumb' => has_breadcrumb( $args ),
		)
	);
}

/**
 * Whether the hero has renderable foreground content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_content( array $args ): bool {
	if ( has_text( $args, 'title' ) || has_text( $args, 'subtitle' ) || has_text( $args, 'description' ) ) {
		return true;
	}

	return has_button( $args, 'primary_button' ) || has_button( $args, 'secondary_button' );
}

/**
 * Whether a text field has content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @param string               $key  Argument key.
 * @return bool
 */
function has_text( array $args, string $key ): bool {
	$value = $args[ $key ] ?? '';

	return is_string( $value ) && '' !== trim( $value );
}

/**
 * Whether a button config has content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @param string               $key  Button argument key.
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
 * Whether breadcrumb content exists.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_breadcrumb( array $args ): bool {
	$slot = $args['breadcrumb'] ?? '';

	if ( is_callable( $slot ) ) {
		return true;
	}

	if ( is_string( $slot ) && '' !== trim( $slot ) ) {
		return true;
	}

	$items = $args['breadcrumb_items'] ?? array();

	return is_array( $items ) && ! empty( $items );
}

/**
 * Normalize button argument array.
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
 * Build inline CSS custom properties for the hero block.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, string>
 */
function get_css_variables( array $args ): array {
	$variables = array();

	$bg_color = resolve_color_value( (string) ( $args['background_color'] ?? '' ) );

	if ( '' !== $bg_color ) {
		$variables['--nb-c-hero-bg-color'] = $bg_color;
	}

	if ( has_background_image( $args ) ) {
		$variables['--nb-c-hero-bg-image'] = 'url("' . esc_url( (string) $args['background_image'] ) . '")';
	}

	if ( ! empty( $args['overlay'] ) ) {
		$overlay_color = resolve_color_value( (string) ( $args['overlay_color'] ?? '' ) );

		if ( '' === $overlay_color ) {
			$overlay_color = 'var(--nb-color-black)';
		}

		$opacity = (float) ( $args['overlay_opacity'] ?? 0.55 );
		$opacity = max( 0, min( 1, $opacity ) );

		$variables['--nb-c-hero-overlay-color']   = $overlay_color;
		$variables['--nb-c-hero-overlay-opacity'] = (string) $opacity;
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
 * Get container class string for inner wrapper.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_container_class( array $args ): string {
	$variant = (string) ( $args['container_width'] ?? 'default' );

	if ( ! in_array( $variant, Layout\get_container_variants(), true ) ) {
		$variant = 'default';
	}

	return Layout\container_class(
		array(
			'variant' => $variant,
			'class'   => Support\element_class( 'hero', 'container' ),
		)
	);
}

/**
 * Get semantic heading tag.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_heading_tag( array $args ): string {
	$level = max( 1, min( 6, (int) ( $args['heading_level'] ?? 1 ) ) );

	return 'h' . $level;
}

/**
 * Get breadcrumb navigation label.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_breadcrumb_label( array $args ): string {
	$label = (string) ( $args['breadcrumb_label'] ?? '' );

	return '' !== $label ? $label : __( 'Breadcrumb', 'nodebrains' );
}

/**
 * Normalize breadcrumb items for structured rendering.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<int, array<string, string>>
 */
function get_breadcrumb_items( array $args ): array {
	$items  = array();
	$source = $args['breadcrumb_items'] ?? array();

	if ( ! is_array( $source ) ) {
		return $items;
	}

	foreach ( $source as $item ) {
		if ( ! is_array( $item ) ) {
			continue;
		}

		$label = trim( (string) ( $item['label'] ?? $item['text'] ?? '' ) );

		if ( '' === $label ) {
			continue;
		}

		$items[] = array(
			'label' => $label,
			'url'   => (string) ( $item['url'] ?? '' ),
		);
	}

	return $items;
}

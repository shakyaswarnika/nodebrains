<?php
/**
 * Banner component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Banner;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Colors;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default banner arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'heading'              => '',
		'description'          => '',
		'cta_button'           => array(),
		'background_image'     => '',
		'background_image_alt' => '',
		'background_color'     => '',
		'overlay'              => true,
		'overlay_color'        => '',
		'overlay_opacity'      => 0.45,
		'align'                => 'left',
		'height'               => 'md',
		'container_width'      => 'default',
		'breadcrumb'           => '',
		'breadcrumb_items'     => array(),
		'breadcrumb_label'     => '',
		'heading_level'        => 2,
		'dismissible'          => false,
		'dismiss_id'           => '',
		'dismiss_label'        => '',
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
		'cta_button'       => array(
			'type'  => 'button',
			'label' => __( 'CTA Button', 'nodebrains' ),
		),
		'background_image' => array(
			'type'  => 'image',
			'label' => __( 'Background Image', 'nodebrains' ),
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
			'label'   => __( 'Alignment', 'nodebrains' ),
			'options' => array( 'left', 'center', 'right' ),
		),
		'height'           => array(
			'type'    => 'select',
			'label'   => __( 'Height', 'nodebrains' ),
			'options' => array( 'sm', 'md', 'lg' ),
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
		'dismissible'      => array(
			'type'  => 'boolean',
			'label' => __( 'Dismissible', 'nodebrains' ),
		),
	);
}

/**
 * Build banner CSS classes.
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

	if ( ! in_array( $height, array( 'sm', 'md', 'lg' ), true ) ) {
		$height = 'md';
	}

	return Support\block_class(
		'banner',
		$args,
		array(
			'align'          => $align,
			'height'         => $height,
			'overlay'        => ! empty( $args['overlay'] ) && ( has_background_image( $args ) || has_background_color( $args ) ),
			'has-image'      => has_background_image( $args ),
			'has-breadcrumb' => has_breadcrumb( $args ),
			'dismissible'    => ! empty( $args['dismissible'] ),
		)
	);
}

/**
 * Whether the banner has renderable content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_content( array $args ): bool {
	return has_text( $args, 'heading' )
		|| has_text( $args, 'description' )
		|| has_cta_button( $args );
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
 * Whether the CTA button is configured.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_cta_button( array $args ): bool {
	$button = normalize_button( $args['cta_button'] ?? array() );

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
 * Normalize CTA button configuration.
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
 * Build CSS custom properties for the banner block.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, string>
 */
function get_css_variables( array $args ): array {
	$variables = array();

	$bg_color = resolve_color_value( (string) ( $args['background_color'] ?? '' ) );

	if ( '' !== $bg_color ) {
		$variables['--nb-c-banner-bg-color'] = $bg_color;
	}

	if ( has_background_image( $args ) ) {
		$variables['--nb-c-banner-bg-image'] = 'url("' . esc_url( (string) $args['background_image'] ) . '")';
	}

	if ( ! empty( $args['overlay'] ) ) {
		$overlay_color = resolve_color_value( (string) ( $args['overlay_color'] ?? '' ) );

		if ( '' === $overlay_color ) {
			$overlay_color = 'var(--nb-color-black)';
		}

		$opacity = (float) ( $args['overlay_opacity'] ?? 0.45 );
		$opacity = max( 0, min( 1, $opacity ) );

		$variables['--nb-c-banner-overlay-color']   = $overlay_color;
		$variables['--nb-c-banner-overlay-opacity'] = (string) $opacity;
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
 * Get container class string.
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
			'class'   => Support\element_class( 'banner', 'container' ),
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
	$level = max( 1, min( 6, (int) ( $args['heading_level'] ?? 2 ) ) );

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
 * Get dismiss button label.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_dismiss_label( array $args ): string {
	$label = (string) ( $args['dismiss_label'] ?? '' );

	return '' !== $label ? $label : __( 'Dismiss banner', 'nodebrains' );
}

/**
 * Get dismiss storage key for client script.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_dismiss_id( array $args ): string {
	$dismiss_id = sanitize_key( (string) ( $args['dismiss_id'] ?? '' ) );

	if ( '' !== $dismiss_id ) {
		return $dismiss_id;
	}

	return 'nb-banner-default';
}

/**
 * Normalize breadcrumb items.
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

<?php
/**
 * Contact component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Contact;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default contact info item structure.
 *
 * @return array<string, mixed>
 */
function get_contact_info_item_defaults(): array {
	return array(
		'label' => '',
		'value' => '',
		'type'  => 'text',
		'url'   => '',
	);
}

/**
 * Default contact component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'heading'         => '',
		'description'     => '',
		'heading_level'   => 2,
		'contact_info'    => array(),
		'form'            => array(
			'content'     => '',
			'title'       => '',
			'placeholder' => '',
		),
		'map'             => array(
			'embed_url'   => '',
			'title'       => '',
			'placeholder' => '',
			'lazy'        => true,
		),
		'social_links'    => array(),
		'show_form'       => true,
		'show_map'        => true,
		'layout'          => 'split',
		'variant'         => 'default',
		'container_width' => 'default',
		'class'           => '',
		'id'              => '',
		'attributes'      => array(),
	);
}

/**
 * Builder-ready settings schema.
 *
 * @return array<string, array<string, mixed>>
 */
function get_builder_schema(): array {
	return array(
		'heading'      => array(
			'type'  => 'string',
			'label' => __( 'Heading', 'nodebrains' ),
		),
		'description'  => array(
			'type'  => 'richtext',
			'label' => __( 'Description', 'nodebrains' ),
		),
		'contact_info' => array(
			'type'   => 'repeater',
			'label'  => __( 'Contact Information', 'nodebrains' ),
			'fields' => array(
				'label' => array( 'type' => 'string' ),
				'value' => array( 'type' => 'string' ),
				'type'  => array(
					'type'    => 'select',
					'options' => array( 'text', 'email', 'phone', 'address' ),
				),
				'url'   => array( 'type' => 'url' ),
			),
		),
		'form'         => array(
			'type'   => 'group',
			'label'  => __( 'Contact Form', 'nodebrains' ),
			'fields' => array(
				'content'     => array( 'type' => 'shortcode' ),
				'title'       => array( 'type' => 'string' ),
				'placeholder' => array( 'type' => 'string' ),
			),
		),
		'map'          => array(
			'type'   => 'group',
			'label'  => __( 'Google Map', 'nodebrains' ),
			'fields' => array(
				'embed_url'   => array( 'type' => 'url' ),
				'title'       => array( 'type' => 'string' ),
				'placeholder' => array( 'type' => 'string' ),
				'lazy'        => array( 'type' => 'boolean' ),
			),
		),
		'social_links' => array(
			'type'   => 'repeater',
			'label'  => __( 'Social Links', 'nodebrains' ),
			'fields' => array(
				'label'    => array( 'type' => 'string' ),
				'url'      => array( 'type' => 'url' ),
				'external' => array( 'type' => 'boolean' ),
			),
		),
		'show_form'    => array(
			'type'  => 'boolean',
			'label' => __( 'Show Form Area', 'nodebrains' ),
		),
		'show_map'     => array(
			'type'  => 'boolean',
			'label' => __( 'Show Map Area', 'nodebrains' ),
		),
		'layout'       => array(
			'type'    => 'select',
			'label'   => __( 'Layout', 'nodebrains' ),
			'options' => array( 'split', 'stacked' ),
		),
		'variant'      => array(
			'type'    => 'select',
			'label'   => __( 'Contact Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered' ),
		),
	);
}

/**
 * Build contact section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered' ), true ) ) {
		$variant = 'default';
	}

	$layout = sanitize_html_class( (string) ( $args['layout'] ?? 'split' ) );

	if ( ! in_array( $layout, array( 'split', 'stacked' ), true ) ) {
		$layout = 'split';
	}

	return Support\block_class(
		'contact',
		$args,
		array(
			'variant' => $variant,
			'layout'  => $layout,
		)
	);
}

/**
 * Get container class for the section.
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
			'class'   => Support\element_class( 'contact', 'container' ),
		)
	);
}

/**
 * Whether the component has renderable content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_content( array $args ): bool {
	if ( has_text( $args, 'heading' ) || has_text( $args, 'description' ) ) {
		return true;
	}

	if ( has_contact_info( $args ) || has_social_links( $args ) ) {
		return true;
	}

	if ( show( $args, 'show_form' ) ) {
		return true;
	}

	return show( $args, 'show_map' );
}

/**
 * Whether a text field has content.
 *
 * @param array<string, mixed> $data Data array.
 * @param string               $key  Field key.
 * @return bool
 */
function has_text( array $data, string $key ): bool {
	$value = $data[ $key ] ?? '';

	return is_string( $value ) && '' !== trim( $value );
}

/**
 * Whether a display option is enabled.
 *
 * @param array<string, mixed> $args Component arguments.
 * @param string               $key  Option key.
 * @return bool
 */
function show( array $args, string $key ): bool {
	return ! isset( $args[ $key ] ) || ! empty( $args[ $key ] );
}

/**
 * Normalize contact info items.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_contact_info( array $args ): array {
	$items = $args['contact_info'] ?? array();

	if ( ! is_array( $items ) ) {
		return array();
	}

	$normalized = array();

	foreach ( $items as $item ) {
		if ( ! is_array( $item ) ) {
			continue;
		}

		$entry = wp_parse_args( $item, get_contact_info_item_defaults() );
		$type  = sanitize_key( (string) ( $entry['type'] ?? 'text' ) );

		if ( ! in_array( $type, array( 'text', 'email', 'phone', 'address' ), true ) ) {
			$type = 'text';
		}

		$entry['type']  = $type;
		$entry['label'] = trim( (string) ( $entry['label'] ?? '' ) );
		$entry['value'] = trim( (string) ( $entry['value'] ?? '' ) );
		$entry['url']   = trim( (string) ( $entry['url'] ?? '' ) );

		if ( '' === $entry['url'] && '' !== $entry['value'] ) {
			$entry['url'] = get_default_info_url( $entry );
		}

		if ( '' === $entry['value'] && '' === $entry['label'] ) {
			continue;
		}

		$normalized[] = $entry;
	}

	return $normalized;
}

/**
 * Build default URL for a contact info item.
 *
 * @param array<string, mixed> $item Contact info item.
 * @return string
 */
function get_default_info_url( array $item ): string {
	$value = (string) ( $item['value'] ?? '' );
	$type  = (string) ( $item['type'] ?? 'text' );

	if ( 'email' === $type ) {
		return 'mailto:' . antispambot( $value );
	}

	if ( 'phone' === $type ) {
		return 'tel:' . preg_replace( '/[^0-9+]/', '', $value );
	}

	return '';
}

/**
 * Whether contact info items exist.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_contact_info( array $args ): bool {
	return ! empty( get_normalized_contact_info( $args ) );
}

/**
 * Normalize social link items.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_social_links( array $args ): array {
	$links = $args['social_links'] ?? array();

	if ( ! is_array( $links ) ) {
		return array();
	}

	$items = array();

	foreach ( $links as $link ) {
		if ( ! is_array( $link ) ) {
			continue;
		}

		$label = trim( (string) ( $link['label'] ?? $link['text'] ?? '' ) );
		$url   = trim( (string) ( $link['url'] ?? '' ) );

		if ( '' === $label || '' === $url ) {
			continue;
		}

		$items[] = array(
			'label'      => $label,
			'url'        => $url,
			'external'   => ! empty( $link['external'] ),
			'attributes' => is_array( $link['attributes'] ?? null ) ? $link['attributes'] : array(),
		);
	}

	return $items;
}

/**
 * Whether social links exist.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_social_links( array $args ): bool {
	return ! empty( get_normalized_social_links( $args ) );
}

/**
 * Normalize form configuration.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_form_config( array $args ): array {
	$form = $args['form'] ?? array();

	if ( ! is_array( $form ) ) {
		$form = array();
	}

	$title = trim( (string) ( $form['title'] ?? '' ) );

	if ( '' === $title ) {
		$title = __( 'Contact form', 'nodebrains' );
	}

	$placeholder = trim( (string) ( $form['placeholder'] ?? '' ) );

	if ( '' === $placeholder ) {
		$placeholder = __( 'Contact form placeholder — add a form shortcode or plugin output.', 'nodebrains' );
	}

	return array(
		'content'     => $form['content'] ?? '',
		'title'       => $title,
		'placeholder' => $placeholder,
	);
}

/**
 * Whether form slot has content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_form_content( array $args ): bool {
	$form    = get_form_config( $args );
	$content = $form['content'] ?? '';

	if ( is_callable( $content ) ) {
		return true;
	}

	return is_string( $content ) && '' !== trim( $content );
}

/**
 * Render form slot content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function render_form_content( array $args ): string {
	$form    = get_form_config( $args );
	$content = $form['content'] ?? '';

	if ( is_callable( $content ) ) {
		return Support\render_slot( $content );
	}

	if ( ! is_string( $content ) || '' === trim( $content ) ) {
		return '';
	}

	$trimmed = trim( $content );

	if ( '' !== $trimmed && '[' === $trimmed[0] ) {
		return (string) do_shortcode( $trimmed );
	}

	return $trimmed;
}

/**
 * Normalize map configuration.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_map_config( array $args ): array {
	$map = $args['map'] ?? array();

	if ( ! is_array( $map ) ) {
		$map = array();
	}

	$title = trim( (string) ( $map['title'] ?? '' ) );

	if ( '' === $title ) {
		$title = __( 'Office location', 'nodebrains' );
	}

	$placeholder = trim( (string) ( $map['placeholder'] ?? '' ) );

	if ( '' === $placeholder ) {
		$placeholder = __( 'Google Maps placeholder — add an embed URL to display a map.', 'nodebrains' );
	}

	return array(
		'embed_url'   => sanitize_map_embed_url( (string) ( $map['embed_url'] ?? '' ) ),
		'title'       => $title,
		'placeholder' => $placeholder,
		'lazy'        => ! isset( $map['lazy'] ) || ! empty( $map['lazy'] ),
	);
}

/**
 * Sanitize Google Maps embed URL.
 *
 * @param string $url Raw embed URL.
 * @return string
 */
function sanitize_map_embed_url( string $url ): string {
	$url = trim( $url );

	if ( '' === $url ) {
		return '';
	}

	$allowed_hosts = array(
		'www.google.com',
		'google.com',
		'maps.google.com',
		'www.openstreetmap.org',
	);

	$parsed = wp_parse_url( $url );

	if ( false === $parsed || empty( $parsed['host'] ) ) {
		return '';
	}

	$host = strtolower( (string) $parsed['host'] );

	if ( ! in_array( $host, $allowed_hosts, true ) ) {
		return '';
	}

	return esc_url_raw( $url );
}

/**
 * Whether a map embed URL is configured.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_map_embed( array $args ): bool {
	$map = get_map_config( $args );

	return '' !== (string) ( $map['embed_url'] ?? '' );
}

/**
 * Get semantic heading tag for section header.
 *
 * @param array<string, mixed> $args Component arguments.
 * @return string
 */
function get_heading_tag( array $args ): string {
	$level = max( 2, min( 6, (int) ( $args['heading_level'] ?? 2 ) ) );

	return 'h' . $level;
}

/**
 * Get path to the contact form partial.
 *
 * @return string
 */
function get_form_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/contact/contact-form.php';
}

/**
 * Get path to the contact map partial.
 *
 * @return string
 */
function get_map_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/contact/contact-map.php';
}

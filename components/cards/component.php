<?php
/**
 * Cards component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Cards;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single card item structure.
 *
 * @return array<string, mixed>
 */
function get_card_item_defaults(): array {
	return array(
		'icon'          => '',
		'image'         => array(),
		'title'         => '',
		'description'   => '',
		'button'        => array(),
		'link'          => array(),
		'badge'         => array(),
		'heading_level' => 3,
		'variant'       => '',
		'class'         => '',
		'attributes'    => array(),
	);
}

/**
 * Default cards component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'cards'           => array(),
		'heading'         => '',
		'description'     => '',
		'heading_level'   => 2,
		'columns'         => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'gap'             => 'md',
		'card_variant'    => 'default',
		'container_width' => 'default',
		'equal_height'    => true,
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
			'label' => __( 'Section Heading', 'nodebrains' ),
		),
		'description'  => array(
			'type'  => 'richtext',
			'label' => __( 'Section Description', 'nodebrains' ),
		),
		'cards'        => array(
			'type'   => 'repeater',
			'label'  => __( 'Cards', 'nodebrains' ),
			'fields' => array(
				'icon'        => array( 'type' => 'html' ),
				'image'       => array( 'type' => 'image' ),
				'title'       => array( 'type' => 'string' ),
				'description' => array( 'type' => 'richtext' ),
				'button'      => array( 'type' => 'button' ),
				'link'        => array( 'type' => 'link' ),
				'badge'       => array( 'type' => 'badge' ),
			),
		),
		'columns'      => array(
			'type'  => 'responsive-columns',
			'label' => __( 'Grid Columns', 'nodebrains' ),
		),
		'gap'          => array(
			'type'    => 'select',
			'label'   => __( 'Grid Gap', 'nodebrains' ),
			'options' => array( 'sm', 'md', 'lg' ),
		),
		'card_variant' => array(
			'type'    => 'select',
			'label'   => __( 'Card Style', 'nodebrains' ),
			'options' => array( 'default', 'elevated', 'bordered' ),
		),
		'equal_height' => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Cards', 'nodebrains' ),
		),
	);
}

/**
 * Build cards section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'cards',
		$args,
		array(
			'equal-height' => ! empty( $args['equal_height'] ),
		)
	);
}

/**
 * Build grid CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_grid_classes( array $args ): string {
	$columns = $args['columns'] ?? array(
		'sm' => 1,
		'md' => 2,
		'lg' => 3,
	);

	if ( ! is_array( $columns ) ) {
		$columns = array(
			'sm' => max( 1, min( 4, (int) $columns ) ),
		);
	}

	$sanitized = array();

	foreach ( $columns as $breakpoint => $count ) {
		$sanitized[ sanitize_html_class( (string) $breakpoint ) ] = max( 1, min( 4, (int) $count ) );
	}

	return Layout\grid_class(
		array(
			'columns' => $sanitized,
			'gap'     => (string) ( $args['gap'] ?? 'md' ),
			'class'   => Support\element_class( 'cards', 'grid' ),
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
			'class'   => Support\element_class( 'cards', 'container' ),
		)
	);
}

/**
 * Normalize and validate card items.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_cards( array $args ): array {
	$cards   = $args['cards'] ?? array();
	$items   = array();
	$variant = (string) ( $args['card_variant'] ?? 'default' );

	if ( ! is_array( $cards ) ) {
		return $items;
	}

	foreach ( $cards as $card ) {
		if ( ! is_array( $card ) ) {
			continue;
		}

		$normalized = normalize_card_item( $card, $variant );

		if ( card_item_has_content( $normalized ) ) {
			$items[] = $normalized;
		}
	}

	return $items;
}

/**
 * Normalize a single card item.
 *
 * @param array<string, mixed> $card          Raw card data.
 * @param string               $parent_variant Default card variant.
 * @return array<string, mixed>
 */
function normalize_card_item( array $card, string $parent_variant = 'default' ): array {
	$defaults = get_card_item_defaults();
	$item     = wp_parse_args( $card, $defaults );

	$item['image']  = normalize_image( $item['image'] ?? array() );
	$item['button'] = normalize_button( $item['button'] ?? array() );
	$item['link']   = normalize_link( $item['link'] ?? array() );
	$item['badge']  = normalize_badge( $item['badge'] ?? array() );

	$item_variant = (string) ( $item['variant'] ?? '' );

	if ( '' === $item_variant ) {
		$item['variant'] = $parent_variant;
	}

	return $item;
}

/**
 * Normalize image configuration.
 *
 * @param mixed $image Image configuration.
 * @return array<string, string>
 */
function normalize_image( $image ): array {
	if ( ! is_array( $image ) ) {
		return array(
			'src' => '',
			'alt' => '',
		);
	}

	return array(
		'src' => (string) ( $image['src'] ?? $image['url'] ?? '' ),
		'alt' => (string) ( $image['alt'] ?? '' ),
	);
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
 * Normalize link configuration.
 *
 * @param mixed $link Link configuration.
 * @return array<string, mixed>
 */
function normalize_link( $link ): array {
	if ( ! is_array( $link ) ) {
		return array(
			'text'     => '',
			'url'      => '',
			'external' => false,
		);
	}

	return array(
		'text'       => (string) ( $link['text'] ?? '' ),
		'url'        => (string) ( $link['url'] ?? '' ),
		'external'   => ! empty( $link['external'] ),
		'attributes' => is_array( $link['attributes'] ?? null ) ? $link['attributes'] : array(),
	);
}

/**
 * Normalize badge configuration.
 *
 * @param mixed $badge Badge configuration.
 * @return array<string, string>
 */
function normalize_badge( $badge ): array {
	if ( ! is_array( $badge ) ) {
		return array(
			'text'    => '',
			'variant' => 'neutral',
		);
	}

	return array(
		'text'    => (string) ( $badge['text'] ?? '' ),
		'variant' => (string) ( $badge['variant'] ?? 'neutral' ),
	);
}

/**
 * Whether a card item has renderable content.
 *
 * @param array<string, mixed> $item Normalized card item.
 * @return bool
 */
function card_item_has_content( array $item ): bool {
	if ( has_text( $item, 'title' ) || has_text( $item, 'description' ) ) {
		return true;
	}

	if ( has_icon( $item ) || has_image( $item ) ) {
		return true;
	}

	return has_button( $item ) || has_link( $item ) || has_badge( $item );
}

/**
 * Whether a text field has content.
 *
 * @param array<string, mixed> $item Card item.
 * @param string               $key  Field key.
 * @return bool
 */
function has_text( array $item, string $key ): bool {
	$value = $item[ $key ] ?? '';

	return is_string( $value ) && '' !== trim( $value );
}

/**
 * Whether an icon slot has content.
 *
 * @param array<string, mixed> $item Card item.
 * @return bool
 */
function has_icon( array $item ): bool {
	$icon = $item['icon'] ?? '';

	if ( is_callable( $icon ) ) {
		return true;
	}

	return is_string( $icon ) && '' !== trim( $icon );
}

/**
 * Whether an image is configured.
 *
 * @param array<string, mixed> $item Card item.
 * @return bool
 */
function has_image( array $item ): bool {
	$image = $item['image'] ?? array();

	return is_array( $image ) && '' !== trim( (string) ( $image['src'] ?? '' ) );
}

/**
 * Whether a button is configured.
 *
 * @param array<string, mixed> $item Card item.
 * @return bool
 */
function has_button( array $item ): bool {
	$button = $item['button'] ?? array();

	return is_array( $button )
		&& '' !== (string) ( $button['text'] ?? '' )
		&& '' !== (string) ( $button['url'] ?? '' );
}

/**
 * Whether a link is configured.
 *
 * @param array<string, mixed> $item Card item.
 * @return bool
 */
function has_link( array $item ): bool {
	$link = $item['link'] ?? array();

	return is_array( $link )
		&& '' !== (string) ( $link['text'] ?? '' )
		&& '' !== (string) ( $link['url'] ?? '' );
}

/**
 * Whether a badge is configured.
 *
 * @param array<string, mixed> $item Card item.
 * @return bool
 */
function has_badge( array $item ): bool {
	$badge = $item['badge'] ?? array();

	return is_array( $badge ) && '' !== trim( (string) ( $badge['text'] ?? '' ) );
}

/**
 * Build CSS classes for a card item.
 *
 * @param array<string, mixed> $item Normalized card item.
 * @return string
 */
function get_item_classes( array $item ): string {
	$variant = sanitize_html_class( (string) ( $item['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'elevated', 'bordered' ), true ) ) {
		$variant = 'default';
	}

	$modifiers = array(
		'variant'   => $variant,
		'has-icon'  => has_icon( $item ),
		'has-image' => has_image( $item ),
		'has-badge' => has_badge( $item ),
	);

	$extra = array( 'class' => $item['class'] ?? '' );

	return Support\block_class( 'cards-item', $extra, $modifiers );
}

/**
 * Get semantic heading tag for a card item.
 *
 * @param array<string, mixed> $item Card item.
 * @return string
 */
function get_item_heading_tag( array $item ): string {
	$level = max( 2, min( 6, (int) ( $item['heading_level'] ?? 3 ) ) );

	return 'h' . $level;
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
 * Get path to the card item partial.
 *
 * @return string
 */
function get_card_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/cards/card-item.php';
}

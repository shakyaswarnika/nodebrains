<?php
/**
 * FAQ component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Faq;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single FAQ item structure.
 *
 * @return array<string, mixed>
 */
function get_faq_item_defaults(): array {
	return array(
		'question'      => '',
		'answer'        => '',
		'open'          => false,
		'heading_level' => 0,
		'class'         => '',
		'attributes'    => array(),
	);
}

/**
 * Default FAQ component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'faqs'            => array(),
		'heading'         => '',
		'description'     => '',
		'heading_level'   => 2,
		'question_level'  => 3,
		'variant'         => 'default',
		'allow_multiple'  => true,
		'open_first'      => false,
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
		'heading'        => array(
			'type'  => 'string',
			'label' => __( 'Section Heading', 'nodebrains' ),
		),
		'description'    => array(
			'type'  => 'richtext',
			'label' => __( 'Section Description', 'nodebrains' ),
		),
		'faqs'           => array(
			'type'   => 'repeater',
			'label'  => __( 'FAQs', 'nodebrains' ),
			'fields' => array(
				'question' => array( 'type' => 'string' ),
				'answer'   => array( 'type' => 'richtext' ),
				'open'     => array( 'type' => 'boolean' ),
			),
		),
		'variant'        => array(
			'type'    => 'select',
			'label'   => __( 'FAQ Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'separated' ),
		),
		'allow_multiple' => array(
			'type'  => 'boolean',
			'label' => __( 'Allow Multiple Open', 'nodebrains' ),
		),
		'open_first'     => array(
			'type'  => 'boolean',
			'label' => __( 'Open First Item', 'nodebrains' ),
		),
		'question_level' => array(
			'type'  => 'number',
			'label' => __( 'Question Heading Level', 'nodebrains' ),
		),
	);
}

/**
 * Build FAQ section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'separated' ), true ) ) {
		$variant = 'default';
	}

	return Support\block_class(
		'faq',
		$args,
		array(
			'variant' => $variant,
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
			'class'   => Support\element_class( 'faq', 'container' ),
		)
	);
}

/**
 * Normalize and validate FAQ items.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_faqs( array $args ): array {
	$faqs  = $args['faqs'] ?? array();
	$items = array();

	if ( ! is_array( $faqs ) ) {
		return $items;
	}

	$question_level = max( 2, min( 6, (int) ( $args['question_level'] ?? 3 ) ) );
	$open_first     = ! empty( $args['open_first'] );
	$allow_multiple = ! empty( $args['allow_multiple'] );
	$has_open_item  = false;

	foreach ( $faqs as $index => $faq ) {
		if ( ! is_array( $faq ) ) {
			continue;
		}

		$normalized = normalize_faq_item( $faq, $question_level );

		if ( ! faq_item_has_content( $normalized ) ) {
			continue;
		}

		$should_open = ! empty( $normalized['open'] );

		if ( ! $should_open && $open_first && ! $has_open_item ) {
			$should_open = true;
		}

		if ( $should_open && ( $allow_multiple || ! $has_open_item ) ) {
			$normalized['open'] = true;
			$has_open_item      = true;
		} else {
			$normalized['open'] = false;
		}

		$items[] = $normalized;
	}

	return $items;
}

/**
 * Normalize a single FAQ item.
 *
 * @param array<string, mixed> $faq            Raw FAQ data.
 * @param int                  $question_level Default question heading level.
 * @return array<string, mixed>
 */
function normalize_faq_item( array $faq, int $question_level = 3 ): array {
	$item = wp_parse_args( $faq, get_faq_item_defaults() );

	$item_level = (int) ( $item['heading_level'] ?? 0 );

	if ( $item_level < 2 || $item_level > 6 ) {
		$item['heading_level'] = $question_level;
	}

	$item['open'] = ! empty( $item['open'] );

	return $item;
}

/**
 * Whether a FAQ item has renderable content.
 *
 * @param array<string, mixed> $item Normalized FAQ item.
 * @return bool
 */
function faq_item_has_content( array $item ): bool {
	return has_text( $item, 'question' ) || has_text( $item, 'answer' );
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
 * Build CSS classes for a FAQ item.
 *
 * @param array<string, mixed> $item FAQ item.
 * @return string
 */
function get_item_classes( array $item ): string {
	return Support\block_class(
		'faq-item',
		array( 'class' => $item['class'] ?? '' ),
		array(
			'is-open' => ! empty( $item['open'] ),
		)
	);
}

/**
 * Get semantic heading tag for a FAQ question.
 *
 * @param array<string, mixed> $item FAQ item.
 * @return string
 */
function get_question_heading_tag( array $item ): string {
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
 * Get path to the FAQ item partial.
 *
 * @return string
 */
function get_faq_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/faq/faq-item.php';
}

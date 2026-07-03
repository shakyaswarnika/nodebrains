<?php
/**
 * Pricing component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Pricing;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single pricing plan structure.
 *
 * @return array<string, mixed>
 */
function get_plan_item_defaults(): array {
	return array(
		'plan_name'     => '',
		'price'         => '',
		'billing_cycle' => '',
		'features'      => array(),
		'button'        => array(),
		'featured'      => false,
		'badge'         => array(),
		'heading_level' => 3,
		'class'         => '',
		'attributes'    => array(),
	);
}

/**
 * Default pricing component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'plans'           => array(),
		'heading'         => '',
		'description'     => '',
		'heading_level'   => 2,
		'columns'         => array(
			'sm' => 1,
			'md' => 2,
			'lg' => 3,
		),
		'gap'             => 'md',
		'variant'         => 'default',
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
		'plans'        => array(
			'type'   => 'repeater',
			'label'  => __( 'Pricing Plans', 'nodebrains' ),
			'fields' => array(
				'plan_name'     => array( 'type' => 'string' ),
				'price'         => array( 'type' => 'string' ),
				'billing_cycle' => array( 'type' => 'string' ),
				'features'      => array(
					'type'   => 'repeater',
					'fields' => array( 'text' => array( 'type' => 'string' ) ),
				),
				'button'        => array( 'type' => 'button' ),
				'featured'      => array( 'type' => 'boolean' ),
				'badge'         => array( 'type' => 'badge' ),
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
		'variant'      => array(
			'type'    => 'select',
			'label'   => __( 'Pricing Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'elevated' ),
		),
		'equal_height' => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Plans', 'nodebrains' ),
		),
	);
}

/**
 * Build pricing section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'elevated' ), true ) ) {
		$variant = 'default';
	}

	return Support\block_class(
		'pricing',
		$args,
		array(
			'variant'      => $variant,
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
			'class'   => Support\element_class( 'pricing', 'grid' ),
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
			'class'   => Support\element_class( 'pricing', 'container' ),
		)
	);
}

/**
 * Normalize and validate pricing plans.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_plans( array $args ): array {
	$plans = $args['plans'] ?? array();
	$items = array();

	if ( ! is_array( $plans ) ) {
		return $items;
	}

	foreach ( $plans as $plan ) {
		if ( ! is_array( $plan ) ) {
			continue;
		}

		$normalized = normalize_plan_item( $plan );

		if ( plan_item_has_content( $normalized ) ) {
			$items[] = $normalized;
		}
	}

	return $items;
}

/**
 * Normalize a single pricing plan.
 *
 * @param array<string, mixed> $plan Raw plan data.
 * @return array<string, mixed>
 */
function normalize_plan_item( array $plan ): array {
	$item = wp_parse_args( $plan, get_plan_item_defaults() );

	$item['features'] = normalize_features( $item['features'] ?? array() );
	$item['button']   = normalize_button( $item['button'] ?? array() );
	$item['badge']    = normalize_badge( $item['badge'] ?? array(), ! empty( $item['featured'] ) );
	$item['featured'] = ! empty( $item['featured'] );

	return $item;
}

/**
 * Normalize feature list items.
 *
 * @param mixed $features Raw features data.
 * @return array<int, string>
 */
function normalize_features( $features ): array {
	if ( ! is_array( $features ) ) {
		return array();
	}

	$items = array();

	foreach ( $features as $feature ) {
		if ( is_string( $feature ) && '' !== trim( $feature ) ) {
			$items[] = trim( $feature );
			continue;
		}

		if ( is_array( $feature ) ) {
			$text = trim( (string) ( $feature['text'] ?? '' ) );

			if ( '' !== $text ) {
				$items[] = $text;
			}
		}
	}

	return $items;
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
 * Normalize badge configuration.
 *
 * @param mixed $badge    Badge configuration.
 * @param bool  $featured Whether the plan is featured.
 * @return array<string, string>
 */
function normalize_badge( $badge, bool $featured = false ): array {
	if ( ! is_array( $badge ) ) {
		$badge = array();
	}

	$text = trim( (string) ( $badge['text'] ?? '' ) );

	if ( '' === $text && $featured ) {
		$text = __( 'Most Popular', 'nodebrains' );
	}

	return array(
		'text'    => $text,
		'variant' => (string) ( $badge['variant'] ?? 'accent' ),
	);
}

/**
 * Whether a plan has renderable content.
 *
 * @param array<string, mixed> $item Normalized plan item.
 * @return bool
 */
function plan_item_has_content( array $item ): bool {
	if ( has_text( $item, 'plan_name' ) || has_text( $item, 'price' ) || has_text( $item, 'billing_cycle' ) ) {
		return true;
	}

	return has_features( $item ) || has_button( $item ) || has_badge( $item );
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
 * Whether a plan has features.
 *
 * @param array<string, mixed> $item Plan item.
 * @return bool
 */
function has_features( array $item ): bool {
	$features = $item['features'] ?? array();

	return is_array( $features ) && ! empty( $features );
}

/**
 * Whether a button is configured.
 *
 * @param array<string, mixed> $item Plan item.
 * @return bool
 */
function has_button( array $item ): bool {
	$button = $item['button'] ?? array();

	return is_array( $button )
		&& '' !== (string) ( $button['text'] ?? '' )
		&& '' !== (string) ( $button['url'] ?? '' );
}

/**
 * Whether a badge should be shown.
 *
 * @param array<string, mixed> $item Plan item.
 * @return bool
 */
function has_badge( array $item ): bool {
	$badge = $item['badge'] ?? array();

	return is_array( $badge ) && '' !== trim( (string) ( $badge['text'] ?? '' ) );
}

/**
 * Build accessible price label.
 *
 * @param array<string, mixed> $item Plan item.
 * @return string
 */
function get_price_label( array $item ): string {
	$price  = trim( (string) ( $item['price'] ?? '' ) );
	$cycle  = trim( (string) ( $item['billing_cycle'] ?? '' ) );
	$plan   = trim( (string) ( $item['plan_name'] ?? '' ) );
	$parts  = array();
	$prefix = '' !== $plan ? $plan . ': ' : '';

	if ( '' !== $price && '' !== $cycle ) {
		/* translators: 1: price amount, 2: billing cycle */
		return $prefix . sprintf( __( '%1$s %2$s', 'nodebrains' ), $price, $cycle );
	}

	if ( '' !== $price ) {
		$parts[] = $price;
	}

	if ( '' !== $cycle ) {
		$parts[] = $cycle;
	}

	return $prefix . implode( ' ', $parts );
}

/**
 * Build CSS classes for a pricing plan.
 *
 * @param array<string, mixed> $item Plan item.
 * @return string
 */
function get_item_classes( array $item ): string {
	return Support\block_class(
		'pricing-plan',
		array( 'class' => $item['class'] ?? '' ),
		array(
			'featured'   => ! empty( $item['featured'] ),
			'has-badge'  => has_badge( $item ),
			'has-button' => has_button( $item ),
		)
	);
}

/**
 * Get semantic heading tag for a plan name.
 *
 * @param array<string, mixed> $item Plan item.
 * @return string
 */
function get_plan_heading_tag( array $item ): string {
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
 * Get path to the pricing plan partial.
 *
 * @return string
 */
function get_plan_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/pricing/pricing-plan.php';
}

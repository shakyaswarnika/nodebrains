<?php
/**
 * Team component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Team;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default single team member structure.
 *
 * @return array<string, mixed>
 */
function get_member_item_defaults(): array {
	return array(
		'photo'         => array(),
		'name'          => '',
		'position'      => '',
		'bio'           => '',
		'social_links'  => array(),
		'heading_level' => 3,
		'class'         => '',
		'attributes'    => array(),
	);
}

/**
 * Default team component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'members'         => array(),
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
		'members'      => array(
			'type'   => 'repeater',
			'label'  => __( 'Team Members', 'nodebrains' ),
			'fields' => array(
				'photo'        => array( 'type' => 'image' ),
				'name'         => array( 'type' => 'string' ),
				'position'     => array( 'type' => 'string' ),
				'bio'          => array( 'type' => 'richtext' ),
				'social_links' => array(
					'type'   => 'repeater',
					'label'  => __( 'Social Links', 'nodebrains' ),
					'fields' => array(
						'label'    => array( 'type' => 'string' ),
						'url'      => array( 'type' => 'url' ),
						'external' => array( 'type' => 'boolean' ),
					),
				),
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
			'label'   => __( 'Team Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'centered' ),
		),
		'equal_height' => array(
			'type'  => 'boolean',
			'label' => __( 'Equal Height Cards', 'nodebrains' ),
		),
	);
}

/**
 * Build team section CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'centered' ), true ) ) {
		$variant = 'default';
	}

	return Support\block_class(
		'team',
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
			'class'   => Support\element_class( 'team', 'grid' ),
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
			'class'   => Support\element_class( 'team', 'container' ),
		)
	);
}

/**
 * Normalize and validate team members.
 *
 * @param array<string, mixed> $args Parsed component arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_members( array $args ): array {
	$members = $args['members'] ?? array();
	$items   = array();

	if ( ! is_array( $members ) ) {
		return $items;
	}

	foreach ( $members as $member ) {
		if ( ! is_array( $member ) ) {
			continue;
		}

		$normalized = normalize_member_item( $member );

		if ( member_item_has_content( $normalized ) ) {
			$items[] = $normalized;
		}
	}

	return $items;
}

/**
 * Normalize a single team member.
 *
 * @param array<string, mixed> $member Raw member data.
 * @return array<string, mixed>
 */
function normalize_member_item( array $member ): array {
	$item = wp_parse_args( $member, get_member_item_defaults() );

	$item['photo']        = normalize_photo( $item['photo'] ?? array(), (string) ( $item['name'] ?? '' ) );
	$item['social_links'] = normalize_social_links( $item['social_links'] ?? array() );

	return $item;
}

/**
 * Normalize photo configuration.
 *
 * @param mixed  $photo Image configuration.
 * @param string $name  Member name for fallback alt text.
 * @return array<string, string>
 */
function normalize_photo( $photo, string $name = '' ): array {
	if ( ! is_array( $photo ) ) {
		return array(
			'src' => '',
			'alt' => '',
		);
	}

	$alt = trim( (string) ( $photo['alt'] ?? '' ) );

	if ( '' === $alt && '' !== trim( $name ) ) {
		/* translators: %s: person name */
		$alt = sprintf( __( 'Photo of %s', 'nodebrains' ), $name );
	}

	return array(
		'src' => (string) ( $photo['src'] ?? $photo['url'] ?? '' ),
		'alt' => $alt,
	);
}

/**
 * Normalize social link items.
 *
 * @param mixed $links Raw social links data.
 * @return array<int, array<string, mixed>>
 */
function normalize_social_links( $links ): array {
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
 * Whether a team member has renderable content.
 *
 * @param array<string, mixed> $item Normalized member item.
 * @return bool
 */
function member_item_has_content( array $item ): bool {
	if ( has_text( $item, 'name' ) || has_text( $item, 'position' ) || has_text( $item, 'bio' ) ) {
		return true;
	}

	return has_photo( $item ) || has_social_links( $item );
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
 * Whether a photo is configured.
 *
 * @param array<string, mixed> $item Member item.
 * @return bool
 */
function has_photo( array $item ): bool {
	$photo = $item['photo'] ?? array();

	return is_array( $photo ) && '' !== trim( (string) ( $photo['src'] ?? '' ) );
}

/**
 * Whether social links are configured.
 *
 * @param array<string, mixed> $item Member item.
 * @return bool
 */
function has_social_links( array $item ): bool {
	$links = $item['social_links'] ?? array();

	return is_array( $links ) && ! empty( $links );
}

/**
 * Build accessible social nav label.
 *
 * @param array<string, mixed> $item Member item.
 * @return string
 */
function get_social_nav_label( array $item ): string {
	$name = trim( (string) ( $item['name'] ?? '' ) );

	if ( '' !== $name ) {
		/* translators: %s: team member name */
		return sprintf( __( '%s social profiles', 'nodebrains' ), $name );
	}

	return __( 'Social profiles', 'nodebrains' );
}

/**
 * Build CSS classes for a team member card.
 *
 * @param array<string, mixed> $item Member item.
 * @return string
 */
function get_item_classes( array $item ): string {
	return Support\block_class(
		'team-member',
		array( 'class' => $item['class'] ?? '' ),
		array(
			'has-photo'  => has_photo( $item ),
			'has-social' => has_social_links( $item ),
		)
	);
}

/**
 * Get semantic heading tag for a member name.
 *
 * @param array<string, mixed> $item Member item.
 * @return string
 */
function get_member_heading_tag( array $item ): string {
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
 * Get path to the team member partial.
 *
 * @return string
 */
function get_member_item_template(): string {
	return NODEBRAINS_COMPONENTS_PATH . '/team/team-member.php';
}

<?php
/**
 * Footer component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Footer;

use NodeBrains\Components\Support;
use NodeBrains\Framework\Layout;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default footer component arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'columns'         => 4,
		'variant'         => 'default',
		'container_width' => 'default',
		'logo'            => array(
			'show'          => true,
			'use_site_logo' => true,
			'image'         => array(),
			'url'           => '',
			'tagline'       => '',
		),
		'navigation'      => array(
			'show'      => true,
			'label'     => '',
			'menu_args' => array(
				'theme_location' => 'footer',
				'menu_id'        => 'footer-menu',
			),
			'menu_html' => '',
		),
		'widget_areas'    => array(
			'show'  => true,
			'areas' => array(),
		),
		'newsletter'      => array(
			'show'        => true,
			'title'       => '',
			'description' => '',
			'content'     => '',
			'placeholder' => '',
		),
		'copyright'       => array(
			'show' => true,
			'text' => '',
		),
		'social'          => array(
			'show'  => true,
			'label' => '',
			'links' => array(),
		),
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
		'columns'      => array(
			'type'    => 'select',
			'label'   => __( 'Footer Columns', 'nodebrains' ),
			'options' => array( 1, 2, 3, 4 ),
		),
		'variant'      => array(
			'type'    => 'select',
			'label'   => __( 'Footer Style', 'nodebrains' ),
			'options' => array( 'default', 'bordered', 'surface' ),
		),
		'logo'         => array(
			'type'   => 'group',
			'label'  => __( 'Logo', 'nodebrains' ),
			'fields' => array(
				'show'          => array( 'type' => 'boolean' ),
				'use_site_logo' => array( 'type' => 'boolean' ),
				'image'         => array( 'type' => 'image' ),
				'url'           => array( 'type' => 'url' ),
				'tagline'       => array( 'type' => 'string' ),
			),
		),
		'navigation'   => array(
			'type'   => 'group',
			'label'  => __( 'Navigation', 'nodebrains' ),
			'fields' => array(
				'show'      => array( 'type' => 'boolean' ),
				'label'     => array( 'type' => 'string' ),
				'menu_args' => array( 'type' => 'menu' ),
			),
		),
		'widget_areas' => array(
			'type'   => 'group',
			'label'  => __( 'Widget Areas', 'nodebrains' ),
			'fields' => array(
				'show'  => array( 'type' => 'boolean' ),
				'areas' => array( 'type' => 'sidebar-list' ),
			),
		),
		'newsletter'   => array(
			'type'   => 'group',
			'label'  => __( 'Newsletter', 'nodebrains' ),
			'fields' => array(
				'show'        => array( 'type' => 'boolean' ),
				'title'       => array( 'type' => 'string' ),
				'description' => array( 'type' => 'richtext' ),
				'content'     => array( 'type' => 'shortcode' ),
				'placeholder' => array( 'type' => 'string' ),
			),
		),
		'copyright'    => array(
			'type'   => 'group',
			'label'  => __( 'Copyright', 'nodebrains' ),
			'fields' => array(
				'show' => array( 'type' => 'boolean' ),
				'text' => array( 'type' => 'string' ),
			),
		),
		'social'       => array(
			'type'   => 'group',
			'label'  => __( 'Social Icons', 'nodebrains' ),
			'fields' => array(
				'show'  => array( 'type' => 'boolean' ),
				'label' => array( 'type' => 'string' ),
				'links' => array(
					'type'   => 'repeater',
					'fields' => array(
						'label'    => array( 'type' => 'string' ),
						'url'      => array( 'type' => 'url' ),
						'icon'     => array( 'type' => 'html' ),
						'external' => array( 'type' => 'boolean' ),
					),
				),
			),
		),
	);
}

/**
 * Build footer CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$variant = sanitize_html_class( (string) ( $args['variant'] ?? 'default' ) );

	if ( ! in_array( $variant, array( 'default', 'bordered', 'surface' ), true ) ) {
		$variant = 'default';
	}

	$columns = max( 1, min( 4, (int) ( $args['columns'] ?? 4 ) ) );

	return Support\block_class(
		'footer',
		$args,
		array(
			'variant' => $variant,
			'columns' => (string) $columns,
		)
	);
}

/**
 * Get container class for the footer.
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
			'class'   => Support\element_class( 'footer', 'container' ),
		)
	);
}

/**
 * Get normalized column count.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return int
 */
function get_column_count( array $args ): int {
	return max( 1, min( 4, (int) ( $args['columns'] ?? 4 ) ) );
}

/**
 * Get the block layout plan per column count.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<int, array<int, string>>
 */
function get_column_plan( array $args ): array {
	$count = get_column_count( $args );

	$plans = array(
		1 => array(
			array( 'logo', 'navigation', 'widgets', 'newsletter', 'social' ),
		),
		2 => array(
			array( 'logo', 'social', 'newsletter' ),
			array( 'navigation', 'widgets' ),
		),
		3 => array(
			array( 'logo', 'social' ),
			array( 'navigation', 'widgets' ),
			array( 'newsletter' ),
		),
		4 => array(
			array( 'logo' ),
			array( 'navigation' ),
			array( 'widgets' ),
			array( 'newsletter', 'social' ),
		),
	);

	return $plans[ $count ] ?? $plans[4];
}

/**
 * Whether a footer block should render.
 *
 * @param array<string, mixed> $args  Parsed arguments.
 * @param string               $block Block key.
 * @return bool
 */
function show_block( array $args, string $block ): bool {
	$key_map = array(
		'logo'       => 'logo',
		'navigation' => 'navigation',
		'widgets'    => 'widget_areas',
		'newsletter' => 'newsletter',
		'social'     => 'social',
		'copyright'  => 'copyright',
	);

	$config_key = $key_map[ $block ] ?? $block;
	$config     = $args[ $config_key ] ?? array();

	if ( ! is_array( $config ) ) {
		return true;
	}

	return ! isset( $config['show'] ) || ! empty( $config['show'] );
}

/**
 * Whether the footer has renderable content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_content( array $args ): bool {
	foreach ( get_column_plan( $args ) as $blocks ) {
		foreach ( $blocks as $block ) {
			if ( show_block( $args, $block ) && block_has_output( $args, $block ) ) {
				return true;
			}
		}
	}

	return show_block( $args, 'copyright' ) && '' !== get_copyright_text( $args );
}

/**
 * Whether a block has output to render.
 *
 * @param array<string, mixed> $args  Parsed arguments.
 * @param string               $block Block key.
 * @return bool
 */
function block_has_output( array $args, string $block ): bool {
	switch ( $block ) {
		case 'logo':
			return has_logo_output( $args );
		case 'navigation':
			return '' !== get_navigation_html( $args );
		case 'widgets':
			return has_active_widget_areas( $args );
		case 'newsletter':
			return true;
		case 'social':
			return ! empty( get_normalized_social_links( $args ) );
		default:
			return false;
	}
}

/**
 * Whether logo block has output.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_logo_output( array $args ): bool {
	$logo = get_logo_config( $args );

	if ( ! empty( $logo['use_site_logo'] ) && has_custom_logo() ) {
		return true;
	}

	if ( '' !== (string) ( $logo['image']['src'] ?? '' ) ) {
		return true;
	}

	return '' !== get_bloginfo( 'name' );
}

/**
 * Normalize logo configuration.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_logo_config( array $args ): array {
	$logo = $args['logo'] ?? array();

	if ( ! is_array( $logo ) ) {
		$logo = array();
	}

	$image = $logo['image'] ?? array();

	if ( ! is_array( $image ) ) {
		$image = array();
	}

	$url = trim( (string) ( $logo['url'] ?? '' ) );

	if ( '' === $url ) {
		$url = home_url( '/' );
	}

	$tagline = trim( (string) ( $logo['tagline'] ?? '' ) );

	if ( '' === $tagline ) {
		$tagline = (string) get_bloginfo( 'description', 'display' );
	}

	return array(
		'show'          => ! isset( $logo['show'] ) || ! empty( $logo['show'] ),
		'use_site_logo' => ! isset( $logo['use_site_logo'] ) || ! empty( $logo['use_site_logo'] ),
		'image'         => array(
			'src' => (string) ( $image['src'] ?? $image['url'] ?? '' ),
			'alt' => (string) ( $image['alt'] ?? get_bloginfo( 'name' ) ),
		),
		'url'           => $url,
		'tagline'       => $tagline,
	);
}

/**
 * Normalize navigation configuration.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_navigation_config( array $args ): array {
	$navigation = $args['navigation'] ?? array();

	if ( ! is_array( $navigation ) ) {
		$navigation = array();
	}

	$label = trim( (string) ( $navigation['label'] ?? '' ) );

	if ( '' === $label ) {
		$label = __( 'Footer navigation', 'nodebrains' );
	}

	return array(
		'show'      => ! isset( $navigation['show'] ) || ! empty( $navigation['show'] ),
		'label'     => $label,
		'menu_args' => is_array( $navigation['menu_args'] ?? null ) ? $navigation['menu_args'] : array(),
		'menu_html' => $navigation['menu_html'] ?? '',
	);
}

/**
 * Get footer navigation markup.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_navigation_html( array $args ): string {
	$navigation = get_navigation_config( $args );
	$menu_html  = Support\render_slot( $navigation['menu_html'] ?? '' );

	if ( '' !== $menu_html ) {
		return $menu_html;
	}

	$menu_args = $navigation['menu_args'];

	if ( empty( $menu_args ) && has_nav_menu( 'footer' ) ) {
		$menu_args = array(
			'theme_location' => 'footer',
			'menu_id'        => 'footer-menu',
		);
	}

	if ( ! is_array( $menu_args ) || empty( $menu_args ) ) {
		return '';
	}

	$menu_args = wp_parse_args(
		$menu_args,
		array(
			'container'   => false,
			'menu_class'  => Support\element_class( 'footer', 'menu' ),
			'fallback_cb' => false,
			'depth'       => 1,
			'echo'        => false,
		)
	);

	return (string) wp_nav_menu( $menu_args );
}

/**
 * Get configured widget area IDs.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<int, string>
 */
function get_widget_area_ids( array $args ): array {
	$widget_areas = $args['widget_areas'] ?? array();
	$areas        = is_array( $widget_areas['areas'] ?? null ) ? $widget_areas['areas'] : array();
	$ids          = array();

	foreach ( $areas as $area ) {
		if ( is_string( $area ) && '' !== $area ) {
			$ids[] = $area;
			continue;
		}

		if ( is_array( $area ) && '' !== (string) ( $area['id'] ?? '' ) ) {
			$ids[] = (string) $area['id'];
		}
	}

	if ( ! empty( $ids ) ) {
		return $ids;
	}

	$count = get_column_count( $args );

	if ( 1 === $count ) {
		$defaults = array( 'footer-1', 'footer-2', 'footer-3', 'footer-4', 'footer-widgets' );
	} else {
		$defaults = array( 'footer-1', 'footer-2', 'footer-3', 'footer-4' );
		$defaults = array_slice( $defaults, 0, $count );
	}

	/**
	 * Filter default footer widget area IDs.
	 *
	 * @since 1.0.0
	 *
	 * @param array<int, string>   $defaults Sidebar IDs.
	 * @param array<string, mixed> $args     Footer arguments.
	 */
	return (array) apply_filters( 'nodebrains_footer_widget_area_ids', $defaults, $args );
}

/**
 * Get widget area ID for a specific column.
 *
 * @param array<string, mixed> $args         Parsed arguments.
 * @param int                  $column_index Zero-based column index.
 * @return string
 */
function get_widget_area_id_for_column( array $args, int $column_index ): string {
	$ids = get_widget_area_ids( $args );

	if ( 1 === get_column_count( $args ) ) {
		return $ids[0] ?? 'footer-widgets';
	}

	return $ids[ $column_index ] ?? ( 'footer-' . ( $column_index + 1 ) );
}

/**
 * Whether any configured widget areas are active.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return bool
 */
function has_active_widget_areas( array $args ): bool {
	foreach ( get_widget_area_ids( $args ) as $sidebar_id ) {
		if ( is_active_sidebar( $sidebar_id ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Normalize newsletter configuration.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<string, mixed>
 */
function get_newsletter_config( array $args ): array {
	$newsletter = $args['newsletter'] ?? array();

	if ( ! is_array( $newsletter ) ) {
		$newsletter = array();
	}

	$title = trim( (string) ( $newsletter['title'] ?? '' ) );

	if ( '' === $title ) {
		$title = __( 'Newsletter', 'nodebrains' );
	}

	$placeholder = trim( (string) ( $newsletter['placeholder'] ?? '' ) );

	if ( '' === $placeholder ) {
		$placeholder = __( 'Newsletter signup placeholder — connect a form plugin or mailing service.', 'nodebrains' );
	}

	return array(
		'show'        => ! isset( $newsletter['show'] ) || ! empty( $newsletter['show'] ),
		'title'       => $title,
		'description' => (string) ( $newsletter['description'] ?? '' ),
		'content'     => $newsletter['content'] ?? '',
		'placeholder' => $placeholder,
	);
}

/**
 * Render newsletter slot content.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function render_newsletter_content( array $args ): string {
	$newsletter = get_newsletter_config( $args );
	$content    = $newsletter['content'] ?? '';

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
 * Get copyright text.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_copyright_text( array $args ): string {
	$copyright = $args['copyright'] ?? array();

	if ( ! is_array( $copyright ) ) {
		$copyright = array();
	}

	$text = trim( (string) ( $copyright['text'] ?? '' ) );

	if ( '' !== $text ) {
		return $text;
	}

	return (string) get_theme_mod(
		'nodebrains_copyright_text',
		\NodeBrains\Customizer\get_default_copyright_text()
	);
}

/**
 * Normalize social links.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return array<int, array<string, mixed>>
 */
function get_normalized_social_links( array $args ): array {
	$social = $args['social'] ?? array();
	$links  = is_array( $social['links'] ?? null ) ? $social['links'] : array();
	$items  = array();

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
			'icon'       => (string) ( $link['icon'] ?? '' ),
			'external'   => ! empty( $link['external'] ),
			'attributes' => is_array( $link['attributes'] ?? null ) ? $link['attributes'] : array(),
		);
	}

	return $items;
}

/**
 * Get social navigation label.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_social_label( array $args ): string {
	$social = $args['social'] ?? array();
	$label  = trim( (string) ( is_array( $social ) ? ( $social['label'] ?? '' ) : '' ) );

	if ( '' !== $label ) {
		return $label;
	}

	return __( 'Social media', 'nodebrains' );
}

/**
 * Get path to a footer block partial.
 *
 * @param string $block Block slug.
 * @return string
 */
function get_block_template( string $block ): string {
	return NODEBRAINS_COMPONENTS_PATH . '/footer/blocks/' . sanitize_file_name( $block ) . '.php';
}

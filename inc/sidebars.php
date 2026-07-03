<?php
/**
 * Widget areas.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Sidebars;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register widget areas.
 *
 * @return void
 */
function register_widget_areas(): void {
	add_action( 'widgets_init', __NAMESPACE__ . '\\register_sidebars' );
}

/**
 * Register theme sidebars.
 *
 * @return void
 */
function register_sidebars(): void {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Main Sidebar', 'nodebrains' ),
			'id'            => 'main-sidebar',
			'description'   => esc_html__( 'Widgets displayed on blog and archive pages.', 'nodebrains' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Widget Area', 'nodebrains' ),
			'id'            => 'footer-widgets',
			'description'   => esc_html__( 'Widgets displayed in the site footer.', 'nodebrains' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	$footer_columns = array(
		'footer-1' => esc_html__( 'Footer Column 1', 'nodebrains' ),
		'footer-2' => esc_html__( 'Footer Column 2', 'nodebrains' ),
		'footer-3' => esc_html__( 'Footer Column 3', 'nodebrains' ),
		'footer-4' => esc_html__( 'Footer Column 4', 'nodebrains' ),
	);

	foreach ( $footer_columns as $sidebar_id => $sidebar_name ) {
		register_sidebar(
			array(
				'name'          => $sidebar_name,
				'id'            => $sidebar_id,
				'description'   => esc_html__( 'Widgets displayed in a footer column.', 'nodebrains' ),
				'before_widget' => '<section id="%1$s" class="widget %2$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			)
		);
	}
}

register_widget_areas();

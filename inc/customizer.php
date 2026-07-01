<?php
/**
 * Theme Customizer settings.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Customizer;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Customizer hooks.
 *
 * @return void
 */
function register_customizer(): void {
	add_action( 'customize_register', __NAMESPACE__ . '\\customize_register' );
	add_action( 'customize_preview_init', __NAMESPACE__ . '\\preview_scripts' );
}

/**
 * Default copyright text.
 *
 * @return string
 */
function get_default_copyright_text(): string {
	return sprintf(
		/* translators: %s: current year */
		__( '© %s NodeBrains. All rights reserved.', 'nodebrains' ),
		gmdate( 'Y' )
	);
}

/**
 * Sanitize copyright text from the Customizer.
 *
 * @param mixed $value Submitted copyright text.
 * @return string
 */
function sanitize_copyright_text( $value ): string {
	return sanitize_text_field( (string) $value );
}

/**
 * Add theme Customizer settings and controls.
 *
 * @param \WP_Customize_Manager $wp_customize Customizer manager instance.
 * @return void
 */
function customize_register( \WP_Customize_Manager $wp_customize ): void {
	$wp_customize->add_section(
		'nodebrains_footer',
		array(
			'title'    => esc_html__( 'Footer', 'nodebrains' ),
			'priority' => 160,
		)
	);

	$wp_customize->add_setting(
		'nodebrains_copyright_text',
		array(
			'default'           => get_default_copyright_text(),
			'sanitize_callback' => __NAMESPACE__ . '\\sanitize_copyright_text',
			'transport'         => 'postMessage',
		)
	);

	$wp_customize->add_control(
		'nodebrains_copyright_text',
		array(
			'label'   => esc_html__( 'Copyright Text', 'nodebrains' ),
			'section' => 'nodebrains_footer',
			'type'    => 'text',
		)
	);

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'nodebrains_copyright_text',
			array(
				'selector'            => '.copyright-text',
				'container_inclusive' => false,
				'render_callback'     => __NAMESPACE__ . '\\render_copyright_partial',
			)
		);
	}
}

/**
 * Render the copyright partial for selective refresh.
 *
 * @return void
 */
function render_copyright_partial(): void {
	$copyright = get_theme_mod( 'nodebrains_copyright_text', get_default_copyright_text() );
	echo esc_html( $copyright );
}

/**
 * Enqueue Customizer preview scripts.
 *
 * @return void
 */
function preview_scripts(): void {
	$preview_js = NODEBRAINS_PATH . '/assets/js/customizer-preview.js';

	if ( ! file_exists( $preview_js ) ) {
		return;
	}

	wp_enqueue_script(
		'nodebrains-customizer-preview',
		NODEBRAINS_URI . '/assets/js/customizer-preview.js',
		array( 'customize-preview' ),
		\NodeBrains\Helpers\get_asset_version( 'assets/js/customizer-preview.js' ),
		array(
			'in_footer' => true,
		)
	);
}

register_customizer();

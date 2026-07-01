<?php
/**
 * Design token definitions.
 *
 * Single source of truth for theme design tokens. Values are exposed as CSS
 * custom properties and consumed by framework utilities and theme.json sync.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Tokens;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the default design token definitions.
 *
 * @return array<string, mixed>
 */
function get_default_definitions(): array {
	return array(
		'colors'        => array(
			'text'         => array(
				'value'   => '#1a1a1a',
				'css_var' => '--nb-color-text',
				'label'   => __( 'Text', 'nodebrains' ),
			),
			'text-muted'   => array(
				'value'   => '#5c5c5c',
				'css_var' => '--nb-color-text-muted',
				'label'   => __( 'Muted Text', 'nodebrains' ),
			),
			'background'   => array(
				'value'   => '#ffffff',
				'css_var' => '--nb-color-background',
				'label'   => __( 'Background', 'nodebrains' ),
			),
			'surface'      => array(
				'value'   => '#f5f5f5',
				'css_var' => '--nb-color-surface',
				'label'   => __( 'Surface', 'nodebrains' ),
			),
			'border'       => array(
				'value'   => '#e2e2e2',
				'css_var' => '--nb-color-border',
				'label'   => __( 'Border', 'nodebrains' ),
			),
			'accent'       => array(
				'value'   => '#2563eb',
				'css_var' => '--nb-color-accent',
				'label'   => __( 'Accent', 'nodebrains' ),
			),
			'accent-hover' => array(
				'value'   => '#1d4ed8',
				'css_var' => '--nb-color-accent-hover',
				'label'   => __( 'Accent Hover', 'nodebrains' ),
			),
			'white'        => array(
				'value'   => '#ffffff',
				'css_var' => '--nb-color-white',
				'label'   => __( 'White', 'nodebrains' ),
			),
			'black'        => array(
				'value'   => '#000000',
				'css_var' => '--nb-color-black',
				'label'   => __( 'Black', 'nodebrains' ),
			),
		),
		'typography'    => array(
			'font_families' => array(
				'sans' => array(
					'value'   => 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
					'css_var' => '--nb-font-sans',
					'label'   => __( 'Sans Serif', 'nodebrains' ),
				),
				'mono' => array(
					'value'   => 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
					'css_var' => '--nb-font-mono',
					'label'   => __( 'Monospace', 'nodebrains' ),
				),
			),
			'font_sizes'    => array(
				'xs'   => array(
					'value'   => '0.75rem',
					'css_var' => '--nb-font-size-xs',
					'label'   => __( 'Extra Small', 'nodebrains' ),
				),
				'sm'   => array(
					'value'   => '0.875rem',
					'css_var' => '--nb-font-size-sm',
					'label'   => __( 'Small', 'nodebrains' ),
				),
				'base' => array(
					'value'   => '1rem',
					'css_var' => '--nb-font-size-base',
					'label'   => __( 'Base', 'nodebrains' ),
				),
				'md'   => array(
					'value'   => '1.125rem',
					'css_var' => '--nb-font-size-md',
					'label'   => __( 'Medium', 'nodebrains' ),
				),
				'lg'   => array(
					'value'   => '1.5rem',
					'css_var' => '--nb-font-size-lg',
					'label'   => __( 'Large', 'nodebrains' ),
				),
				'xl'   => array(
					'value'   => '2rem',
					'css_var' => '--nb-font-size-xl',
					'label'   => __( 'Extra Large', 'nodebrains' ),
				),
				'2xl'  => array(
					'value'   => '2.5rem',
					'css_var' => '--nb-font-size-2xl',
					'label'   => __( '2X Large', 'nodebrains' ),
				),
				'3xl'  => array(
					'value'   => '3rem',
					'css_var' => '--nb-font-size-3xl',
					'label'   => __( '3X Large', 'nodebrains' ),
				),
			),
			'line_heights'  => array(
				'tight'   => array(
					'value'   => '1.25',
					'css_var' => '--nb-line-height-tight',
					'label'   => __( 'Tight', 'nodebrains' ),
				),
				'normal'  => array(
					'value'   => '1.6',
					'css_var' => '--nb-line-height-normal',
					'label'   => __( 'Normal', 'nodebrains' ),
				),
				'relaxed' => array(
					'value'   => '1.75',
					'css_var' => '--nb-line-height-relaxed',
					'label'   => __( 'Relaxed', 'nodebrains' ),
				),
			),
			'font_weights'  => array(
				'normal'   => array(
					'value'   => '400',
					'css_var' => '--nb-font-weight-normal',
					'label'   => __( 'Normal', 'nodebrains' ),
				),
				'medium'   => array(
					'value'   => '500',
					'css_var' => '--nb-font-weight-medium',
					'label'   => __( 'Medium', 'nodebrains' ),
				),
				'semibold' => array(
					'value'   => '600',
					'css_var' => '--nb-font-weight-semibold',
					'label'   => __( 'Semibold', 'nodebrains' ),
				),
				'bold'     => array(
					'value'   => '700',
					'css_var' => '--nb-font-weight-bold',
					'label'   => __( 'Bold', 'nodebrains' ),
				),
			),
		),
		'spacing'       => array(
			'none' => array(
				'value'   => '0',
				'css_var' => '--nb-spacing-none',
				'label'   => __( 'None', 'nodebrains' ),
			),
			'xs'   => array(
				'value'   => '0.5rem',
				'css_var' => '--nb-spacing-xs',
				'label'   => __( 'Extra Small', 'nodebrains' ),
			),
			'sm'   => array(
				'value'   => '1rem',
				'css_var' => '--nb-spacing-sm',
				'label'   => __( 'Small', 'nodebrains' ),
			),
			'md'   => array(
				'value'   => '1.5rem',
				'css_var' => '--nb-spacing-md',
				'label'   => __( 'Medium', 'nodebrains' ),
			),
			'lg'   => array(
				'value'   => '2.5rem',
				'css_var' => '--nb-spacing-lg',
				'label'   => __( 'Large', 'nodebrains' ),
			),
			'xl'   => array(
				'value'   => '4rem',
				'css_var' => '--nb-spacing-xl',
				'label'   => __( 'Extra Large', 'nodebrains' ),
			),
			'2xl'  => array(
				'value'   => '6rem',
				'css_var' => '--nb-spacing-2xl',
				'label'   => __( '2X Large', 'nodebrains' ),
			),
		),
		'layout'        => array(
			'container_width'        => array(
				'value'   => '72rem',
				'css_var' => '--nb-container-width',
				'label'   => __( 'Container Width', 'nodebrains' ),
			),
			'container_width_narrow' => array(
				'value'   => '48rem',
				'css_var' => '--nb-container-width-narrow',
				'label'   => __( 'Narrow Container', 'nodebrains' ),
			),
			'container_width_wide'   => array(
				'value'   => '90rem',
				'css_var' => '--nb-container-width-wide',
				'label'   => __( 'Wide Container', 'nodebrains' ),
			),
			'container_padding'      => array(
				'value'   => '1rem',
				'css_var' => '--nb-container-padding',
				'label'   => __( 'Container Padding', 'nodebrains' ),
			),
			'content_width'          => array(
				'value'   => 1200,
				'css_var' => null,
				'label'   => __( 'Content Width (px)', 'nodebrains' ),
			),
			'section_spacing'        => array(
				'value'   => 'var(--nb-spacing-lg)',
				'css_var' => '--nb-section-spacing',
				'label'   => __( 'Section Spacing', 'nodebrains' ),
			),
		),
		'grid'          => array(
			'columns' => array(
				'value'   => 12,
				'css_var' => '--nb-grid-columns',
				'label'   => __( 'Grid Columns', 'nodebrains' ),
			),
			'gap'     => array(
				'value'   => 'var(--nb-spacing-md)',
				'css_var' => '--nb-grid-gap',
				'label'   => __( 'Grid Gap', 'nodebrains' ),
			),
			'gap_sm'  => array(
				'value'   => 'var(--nb-spacing-sm)',
				'css_var' => '--nb-grid-gap-sm',
				'label'   => __( 'Small Grid Gap', 'nodebrains' ),
			),
			'gap_lg'  => array(
				'value'   => 'var(--nb-spacing-lg)',
				'css_var' => '--nb-grid-gap-lg',
				'label'   => __( 'Large Grid Gap', 'nodebrains' ),
			),
		),
		'breakpoints'   => array(
			'sm' => array(
				'value'   => '36rem',
				'css_var' => '--nb-breakpoint-sm',
				'label'   => __( 'Small', 'nodebrains' ),
			),
			'md' => array(
				'value'   => '48rem',
				'css_var' => '--nb-breakpoint-md',
				'label'   => __( 'Medium', 'nodebrains' ),
			),
			'lg' => array(
				'value'   => '62rem',
				'css_var' => '--nb-breakpoint-lg',
				'label'   => __( 'Large', 'nodebrains' ),
			),
			'xl' => array(
				'value'   => '75rem',
				'css_var' => '--nb-breakpoint-xl',
				'label'   => __( 'Extra Large', 'nodebrains' ),
			),
		),
		'border_radius' => array(
			'none' => array(
				'value'   => '0',
				'css_var' => '--nb-radius-none',
				'label'   => __( 'None', 'nodebrains' ),
			),
			'sm'   => array(
				'value'   => '0.25rem',
				'css_var' => '--nb-radius-sm',
				'label'   => __( 'Small', 'nodebrains' ),
			),
			'md'   => array(
				'value'   => '0.375rem',
				'css_var' => '--nb-radius-md',
				'label'   => __( 'Medium', 'nodebrains' ),
			),
			'lg'   => array(
				'value'   => '0.5rem',
				'css_var' => '--nb-radius-lg',
				'label'   => __( 'Large', 'nodebrains' ),
			),
			'full' => array(
				'value'   => '9999px',
				'css_var' => '--nb-radius-full',
				'label'   => __( 'Full', 'nodebrains' ),
			),
		),
	);
}

/**
 * Get merged design token definitions.
 *
 * @return array<string, mixed>
 */
function get_definitions(): array {
	static $definitions = null;

	if ( null !== $definitions ) {
		return $definitions;
	}

	/**
	 * Filter the theme design token definitions.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, mixed> $definitions Design token definitions.
	 */
	$definitions = (array) apply_filters( 'nodebrains_design_tokens', get_default_definitions() );

	return $definitions;
}

/**
 * Get tokens from a specific group.
 *
 * @param string $group Token group key.
 * @return array<string, mixed>
 */
function get_group( string $group ): array {
	$definitions = get_definitions();

	return isset( $definitions[ $group ] ) && is_array( $definitions[ $group ] )
		? $definitions[ $group ]
		: array();
}

/**
 * Get a single token value.
 *
 * @param string      $group Token group key.
 * @param string      $slug  Token slug within the group.
 * @param string|null $key   Optional nested key (value, css_var, label).
 * @return mixed|null
 */
function get( string $group, string $slug, ?string $key = 'value' ) {
	$group_tokens = get_group( $group );

	if ( ! isset( $group_tokens[ $slug ] ) || ! is_array( $group_tokens[ $slug ] ) ) {
		return null;
	}

	if ( null === $key ) {
		return $group_tokens[ $slug ];
	}

	return $group_tokens[ $slug ][ $key ] ?? null;
}

/**
 * Flatten token definitions into CSS custom property pairs.
 *
 * @return array<string, string|int|float>
 */
function get_css_variables(): array {
	$variables = array();

	foreach ( get_definitions() as $group_tokens ) {
		if ( ! is_array( $group_tokens ) ) {
			continue;
		}

		foreach ( $group_tokens as $token ) {
			if ( ! is_array( $token ) ) {
				continue;
			}

			$css_var = $token['css_var'] ?? null;
			$value   = $token['value'] ?? null;

			if ( ! is_string( $css_var ) || '' === $css_var || null === $value ) {
				continue;
			}

			$variables[ $css_var ] = $value;
		}
	}

	/**
	 * Filter CSS custom properties generated from design tokens.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, string|int|float> $variables CSS variable map.
	 */
	return (array) apply_filters( 'nodebrains_design_token_css_variables', $variables );
}

/**
 * Resolve a token reference or return the raw value.
 *
 * Accepts a slug (e.g. "accent") for color tokens or a literal CSS value.
 *
 * @param string $group Token group.
 * @param string $value Token slug or literal value.
 * @return string
 */
function resolve( string $group, string $value ): string {
	$resolved = get( $group, $value, 'value' );

	if ( null !== $resolved ) {
		return (string) $resolved;
	}

	return $value;
}

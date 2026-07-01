<?php
/**
 * Theme Settings API.
 *
 * Centralized access to theme configuration with defaults from design tokens,
 * Customizer overrides, and extensibility filters.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Framework\Settings;

use NodeBrains\Framework\Tokens;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get default theme settings derived from design tokens.
 *
 * @return array<string, mixed>
 */
function get_default_settings(): array {
	return array(
		'content_width'     => (int) Tokens\get( 'layout', 'content_width', 'value' ),
		'container_width'   => (string) Tokens\get( 'layout', 'container_width', 'value' ),
		'container_padding' => (string) Tokens\get( 'layout', 'container_padding', 'value' ),
		'section_spacing'   => (string) Tokens\get( 'layout', 'section_spacing', 'value' ),
		'grid_columns'      => (int) Tokens\get( 'grid', 'columns', 'value' ),
		'grid_gap'          => (string) Tokens\get( 'grid', 'gap', 'value' ),
		'font_family_base'  => 'sans',
		'font_size_base'    => 'base',
		'line_height_base'  => 'normal',
		'color_text'        => 'text',
		'color_background'  => 'background',
		'color_accent'      => 'accent',
	);
}

/**
 * Get registered theme setting keys and their storage configuration.
 *
 * @return array<string, array<string, mixed>>
 */
function get_registry(): array {
	static $registry = null;

	if ( null !== $registry ) {
		return $registry;
	}

	$defaults = get_default_settings();

	$registry = array(
		'content_width'     => array(
			'default'  => $defaults['content_width'],
			'type'     => 'integer',
			'source'   => 'setting',
			'mod_name' => 'nodebrains_content_width',
		),
		'container_width'   => array(
			'default'  => $defaults['container_width'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_container_width',
		),
		'container_padding' => array(
			'default'  => $defaults['container_padding'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_container_padding',
		),
		'section_spacing'   => array(
			'default'  => $defaults['section_spacing'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_section_spacing',
		),
		'grid_columns'      => array(
			'default'  => $defaults['grid_columns'],
			'type'     => 'integer',
			'source'   => 'token',
			'mod_name' => 'nodebrains_grid_columns',
		),
		'grid_gap'          => array(
			'default'  => $defaults['grid_gap'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_grid_gap',
		),
		'font_family_base'  => array(
			'default'  => $defaults['font_family_base'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_font_family_base',
		),
		'font_size_base'    => array(
			'default'  => $defaults['font_size_base'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_font_size_base',
		),
		'line_height_base'  => array(
			'default'  => $defaults['line_height_base'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_line_height_base',
		),
		'color_text'        => array(
			'default'  => $defaults['color_text'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_color_text',
		),
		'color_background'  => array(
			'default'  => $defaults['color_background'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_color_background',
		),
		'color_accent'      => array(
			'default'  => $defaults['color_accent'],
			'type'     => 'string',
			'source'   => 'token',
			'mod_name' => 'nodebrains_color_accent',
		),
	);

	/**
	 * Filter the theme settings registry.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, array<string, mixed>> $registry Setting registry.
	 */
	$registry = (array) apply_filters( 'nodebrains_theme_settings_registry', $registry );

	return $registry;
}

/**
 * Register additional theme settings.
 *
 * @param array<string, array<string, mixed>> $settings Settings to merge into the registry.
 * @return void
 */
function register( array $settings ): void {
	add_filter(
		'nodebrains_theme_settings_registry',
		static function ( array $registry ) use ( $settings ): array {
			return array_merge( $registry, $settings );
		}
	);
}

/**
 * Cast a setting value to its declared type.
 *
 * @param mixed  $value Raw value.
 * @param string $type  Expected type (string, integer, boolean, float, array).
 * @return mixed
 */
function cast_value( $value, string $type ) {
	switch ( $type ) {
		case 'integer':
			return (int) $value;
		case 'boolean':
			return (bool) $value;
		case 'float':
			return (float) $value;
		case 'array':
			return is_array( $value ) ? $value : array();
		default:
			return (string) $value;
	}
}

/**
 * Get a theme setting value.
 *
 * @param string $key     Setting key.
 * @param mixed  $fallback Optional default when the key is not registered.
 * @return mixed
 */
function get( string $key, $fallback = null ) {
	$registry = get_registry();

	if ( ! isset( $registry[ $key ] ) ) {
		return $fallback;
	}

	$config          = $registry[ $key ];
	$setting_default = $config['default'] ?? $fallback;
	$mod_name        = $config['mod_name'] ?? '';

	$value = '' !== $mod_name
		? get_theme_mod( $mod_name, $setting_default )
		: $setting_default;

	$type  = $config['type'] ?? 'string';
	$value = cast_value( $value, $type );

	/**
	 * Filter an individual theme setting value.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed  $value Setting value.
	 * @param string $key   Setting key.
	 */
	return apply_filters( "nodebrains_theme_setting_{$key}", $value, $key );
}

/**
 * Get all theme settings as a key-value map.
 *
 * @return array<string, mixed>
 */
function get_all(): array {
	$settings = array();

	foreach ( array_keys( get_registry() ) as $key ) {
		$settings[ $key ] = get( $key );
	}

	/**
	 * Filter all theme settings.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, mixed> $settings Theme settings.
	 */
	return (array) apply_filters( 'nodebrains_theme_settings', $settings );
}

/**
 * Get settings for a logical group (colors, typography, layout, grid).
 *
 * @param string $group Group name.
 * @return array<string, mixed>
 */
function get_group( string $group ): array {
	$groups = array(
		'colors'     => array( 'color_text', 'color_background', 'color_accent' ),
		'typography' => array( 'font_family_base', 'font_size_base', 'line_height_base' ),
		'layout'     => array( 'content_width', 'container_width', 'container_padding', 'section_spacing' ),
		'grid'       => array( 'grid_columns', 'grid_gap' ),
	);

	if ( ! isset( $groups[ $group ] ) ) {
		return array();
	}

	$result = array();

	foreach ( $groups[ $group ] as $key ) {
		$result[ $key ] = get( $key );
	}

	return $result;
}

/**
 * Apply the content width global from theme settings.
 *
 * @return void
 */
function apply_content_width(): void {
	$GLOBALS['content_width'] = (int) get( 'content_width', 1200 );
}

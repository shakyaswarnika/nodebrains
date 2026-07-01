<?php
/**
 * Component registry.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Registry;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registered components.
 *
 * @var array<string, array<string, mixed>>|null
 */
$registered_components = null;

/**
 * Get the default component registry map.
 *
 * @return array<string, array<string, mixed>>
 */
function get_default_registry(): array {
	return array(
		'button'      => array(
			'script' => null,
		),
		'heading'     => array(
			'script' => null,
		),
		'link'        => array(
			'script' => null,
		),
		'badge'       => array(
			'script' => null,
		),
		'card'        => array(
			'script' => null,
		),
		'media'       => array(
			'script' => null,
		),
		'alert'       => array(
			'script' => 'alert.js',
		),
		'nav'         => array(
			'script' => 'nav.js',
		),
		'skip-link'   => array(
			'script' => null,
		),
		'search-form' => array(
			'script' => null,
		),
		'hero'        => array(
			'style'  => 'style.css',
			'script' => null,
		),
		'banner'      => array(
			'style'  => 'style.css',
			'script' => 'script.js',
		),
		'cta'         => array(
			'style'  => 'style.css',
			'script' => 'script.js',
		),
		'cards'       => array(
			'style'  => 'style.css',
			'script' => 'script.js',
		),
		'services'    => array(
			'style'  => 'style.css',
			'script' => 'script.js',
		),
	);
}

/**
 * Register all theme components.
 *
 * @return void
 */
function register_all(): void {
	global $registered_components;

	if ( null !== $registered_components ) {
		return;
	}

	$registered_components = array();

	foreach ( get_default_registry() as $slug => $config ) {
		register( $slug, $config );
	}

	/**
	 * Fires after default components are registered.
	 *
	 * @since 1.0.0
	 *
	 * @param array<string, array<string, mixed>> $registered_components Component registry.
	 */
	do_action( 'nodebrains_register_components', $registered_components );
}

/**
 * Register a single component.
 *
 * @param string               $slug   Component slug (directory name).
 * @param array<string, mixed> $config Component configuration.
 * @return void
 */
function register( string $slug, array $config = array() ): void {
	global $registered_components;

	if ( null === $registered_components ) {
		$registered_components = array();
	}

	$slug = sanitize_key( $slug );

	$config['slug'] = $slug;
	$config['path'] = NODEBRAINS_COMPONENTS_PATH . '/' . $slug;
	$config['uri']  = NODEBRAINS_COMPONENTS_URI . '/' . $slug;

	$component_file = $config['path'] . '/component.php';

	if ( is_readable( $component_file ) ) {
		require_once $component_file;
	}

	$registered_components[ $slug ] = $config;
}

/**
 * Get a registered component.
 *
 * @param string $slug Component slug.
 * @return array<string, mixed>|null
 */
function get( string $slug ): ?array {
	global $registered_components;

	if ( null === $registered_components ) {
		register_all();
	}

	$slug = sanitize_key( $slug );

	return $registered_components[ $slug ] ?? null;
}

/**
 * Get all registered components.
 *
 * @return array<string, array<string, mixed>>
 */
function get_all(): array {
	global $registered_components;

	if ( null === $registered_components ) {
		register_all();
	}

	return $registered_components;
}

/**
 * Resolve a component slug to its PHP namespace.
 *
 * @param string $slug Component slug.
 * @return string
 */
function get_namespace( string $slug ): string {
	$parts = explode( '-', $slug );
	$parts = array_map(
		static function ( string $part ): string {
			return ucfirst( $part );
		},
		$parts
	);

	return 'NodeBrains\\Components\\' . implode( '', $parts );
}

/**
 * Get the defaults callback for a component.
 *
 * @param string $slug Component slug.
 * @return callable|null
 */
function get_defaults_callback( string $slug ): ?callable {
	$class = get_namespace( $slug ) . '\\get_defaults';

	if ( is_callable( $class ) ) {
		return $class;
	}

	return null;
}

/**
 * Get the class builder callback for a component.
 *
 * @param string $slug Component slug.
 * @return callable|null
 */
function get_classes_callback( string $slug ): ?callable {
	$class = get_namespace( $slug ) . '\\get_classes';

	if ( is_callable( $class ) ) {
		return $class;
	}

	return null;
}

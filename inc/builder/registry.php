<?php
/**
 * Builder module registry (placeholder).
 *
 * Future builder widgets and elements will register here.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Module registry for the visual page builder.
 */
final class Module_Registry {

	/**
	 * Registered builder modules.
	 *
	 * @var array<string, array<string, mixed>>
	 */
	private static array $modules = array();

	/**
	 * Register a builder module.
	 *
	 * @param string               $id   Unique module identifier.
	 * @param array<string, mixed> $args Module configuration.
	 * @return void
	 */
	public static function register( string $id, array $args ): void {
		self::$modules[ $id ] = $args;
	}

	/**
	 * Get all registered modules.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public static function all(): array {
		return self::$modules;
	}
}

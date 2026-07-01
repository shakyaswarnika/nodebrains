<?php
/**
 * Alert component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Alert;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default alert arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'title'         => '',
		'message'       => '',
		'variant'       => 'info',
		'dismissible'   => false,
		'dismiss_label' => '',
		'role'          => 'status',
		'class'         => '',
		'id'            => '',
		'attributes'    => array(),
	);
}

/**
 * Build alert CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'alert',
		$args,
		array(
			'variant'     => $args['variant'] ?? 'info',
			'dismissible' => ! empty( $args['dismissible'] ),
		)
	);
}

/**
 * Resolve ARIA role.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_role( array $args ): string {
	$role = (string) ( $args['role'] ?? 'status' );

	return in_array( $role, array( 'alert', 'status' ), true ) ? $role : 'status';
}

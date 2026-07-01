<?php
/**
 * Badge component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Badge;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default badge arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'text'       => '',
		'variant'    => 'neutral',
		'size'       => 'md',
		'class'      => '',
		'id'         => '',
		'attributes' => array(),
	);
}

/**
 * Build badge CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class(
		'badge',
		$args,
		array(
			'variant' => $args['variant'] ?? 'neutral',
			'size'    => $args['size'] ?? 'md',
		)
	);
}

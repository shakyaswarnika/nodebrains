<?php
/**
 * Heading component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\Heading;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default heading arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'text'       => '',
		'level'      => 2,
		'visual'     => '',
		'class'      => '',
		'id'         => '',
		'attributes' => array(),
	);
}

/**
 * Build heading CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	$visual = '' !== (string) ( $args['visual'] ?? '' )
		? (string) $args['visual']
		: 'h' . max( 1, min( 6, (int) ( $args['level'] ?? 2 ) ) );

	return Support\block_class(
		'heading',
		$args,
		array(
			$visual => true,
		)
	);
}

/**
 * Resolve the semantic heading tag.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_tag( array $args ): string {
	$level = max( 1, min( 6, (int) ( $args['level'] ?? 2 ) ) );

	return 'h' . $level;
}

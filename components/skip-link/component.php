<?php
/**
 * Skip link component definition.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\Components\SkipLink;

use NodeBrains\Components\Support;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default skip link arguments.
 *
 * @return array<string, mixed>
 */
function get_defaults(): array {
	return array(
		'text'       => '',
		'target'     => '#primary',
		'class'      => '',
		'id'         => '',
		'attributes' => array(),
	);
}

/**
 * Build skip link CSS classes.
 *
 * @param array<string, mixed> $args Parsed arguments.
 * @return string
 */
function get_classes( array $args ): string {
	return Support\block_class( 'skip-link', $args );
}

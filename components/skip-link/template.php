<?php
/**
 * Skip link component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\SkipLink;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$text   = (string) ( $args['text'] ?? '' );
$target = (string) ( $args['target'] ?? '#primary' );

if ( '' === $text ) {
	$text = __( 'Skip to content', 'nodebrains' );
}

$attributes = Support\merge_attributes(
	$args,
	array(
		'class' => SkipLink\get_classes( $args ),
		'href'  => esc_url( $target ),
	)
);
?>
<a <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo esc_html( $text ); ?>
</a>

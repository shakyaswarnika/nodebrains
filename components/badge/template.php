<?php
/**
 * Badge component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Badge;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$text = (string) ( $args['text'] ?? '' );

if ( '' === $text ) {
	return;
}

$attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Badge\get_classes( $args ),
	)
);
?>
<span <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo esc_html( $text ); ?>
</span>

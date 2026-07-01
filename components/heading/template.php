<?php
/**
 * Heading component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Heading;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$text = (string) ( $args['text'] ?? '' );

if ( '' === $text ) {
	return;
}

$html_tag   = Heading\get_tag( $args );
$attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Heading\get_classes( $args ),
	)
);
?>
<<?php echo tag_escape( $html_tag ); ?> <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo esc_html( $text ); ?>
</<?php echo tag_escape( $html_tag ); ?>>

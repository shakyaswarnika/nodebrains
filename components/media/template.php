<?php
/**
 * Media component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Media;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$src = (string) ( $args['src'] ?? '' );

if ( '' === $src ) {
	return;
}

$attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Media\get_classes( $args ),
	)
);

$image_attributes = Media\get_image_attributes( $args );
$caption          = (string) ( $args['caption'] ?? '' );
?>
<figure <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<img <?php echo FrameworkHelpers\attribute_string( $image_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> />
	<?php if ( '' !== $caption ) : ?>
		<figcaption class="<?php echo esc_attr( Support\element_class( 'media', 'caption' ) ); ?>">
			<?php echo esc_html( $caption ); ?>
		</figcaption>
	<?php endif; ?>
</figure>

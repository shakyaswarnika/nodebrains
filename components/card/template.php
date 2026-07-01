<?php
/**
 * Card component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Card;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if (
	! Card\has_slot( $args, 'header' )
	&& ! Card\has_slot( $args, 'body' )
	&& ! Card\has_slot( $args, 'footer' )
	&& ! Card\has_slot( $args, 'media' )
) {
	return;
}

$html_tag   = tag_escape( (string) ( $args['tag'] ?? 'article' ) );
$attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Card\get_classes( $args ),
	)
);
?>
<<?php echo $html_tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Card\has_slot( $args, 'media' ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'card', 'media' ) ); ?>">
			<?php Support\the_slot( $args['media'] ); ?>
		</div>
	<?php endif; ?>

	<?php if ( Card\has_slot( $args, 'header' ) ) : ?>
		<header class="<?php echo esc_attr( Support\element_class( 'card', 'header' ) ); ?>">
			<?php Support\the_slot( $args['header'] ); ?>
		</header>
	<?php endif; ?>

	<?php if ( Card\has_slot( $args, 'body' ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'card', 'body' ) ); ?>">
			<?php Support\the_slot( $args['body'] ); ?>
		</div>
	<?php endif; ?>

	<?php if ( Card\has_slot( $args, 'footer' ) ) : ?>
		<footer class="<?php echo esc_attr( Support\element_class( 'card', 'footer' ) ); ?>">
			<?php Support\the_slot( $args['footer'] ); ?>
		</footer>
	<?php endif; ?>
</<?php echo $html_tag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

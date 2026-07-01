<?php
/**
 * Alert component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Alert;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$alert_title = (string) ( $args['title'] ?? '' );
$message     = (string) ( $args['message'] ?? '' );

if ( '' === $alert_title && '' === $message ) {
	return;
}

$alert_id   = Support\unique_id( 'alert' );
$attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Alert\get_classes( $args ),
		'role'  => Alert\get_role( $args ),
		'id'    => $alert_id,
	)
);

if ( ! empty( $args['dismissible'] ) ) {
	$attributes['data-nb-dismissible'] = 'true';
}

$dismiss_label = (string) ( $args['dismiss_label'] ?? '' );

if ( '' === $dismiss_label ) {
	$dismiss_label = __( 'Dismiss notice', 'nodebrains' );
}
?>
<div <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Support\element_class( 'alert', 'content' ) ); ?>">
		<?php if ( '' !== $alert_title ) : ?>
			<p class="<?php echo esc_attr( Support\element_class( 'alert', 'title' ) ); ?>"><?php echo esc_html( $alert_title ); ?></p>
		<?php endif; ?>
		<?php if ( '' !== $message ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'alert', 'message' ) ); ?>"><?php echo wp_kses_post( $message ); ?></div>
		<?php endif; ?>
	</div>
	<?php if ( ! empty( $args['dismissible'] ) ) : ?>
		<button
			type="button"
			class="<?php echo esc_attr( Support\element_class( 'alert', 'dismiss' ) ); ?>"
			aria-label="<?php echo esc_attr( $dismiss_label ); ?>"
			data-nb-alert-dismiss
		>
			<span aria-hidden="true">&times;</span>
		</button>
	<?php endif; ?>
</div>

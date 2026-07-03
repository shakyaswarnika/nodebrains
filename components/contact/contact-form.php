<?php
/**
 * Contact form slot partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Contact;
use NodeBrains\Components\Support;

$form_config  = Contact\get_form_config( $args );
$form_title   = (string) ( $form_config['title'] ?? '' );
$form_content = Contact\render_form_content( $args );
$region_id    = Support\unique_id( 'contact-form', 'region' );
?>
<div
	class="<?php echo esc_attr( Support\element_class( 'contact', 'form' ) ); ?>"
	role="region"
	aria-labelledby="<?php echo esc_attr( $region_id ); ?>"
>
	<h3 id="<?php echo esc_attr( $region_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'contact', 'form-title' ) ); ?>">
		<?php echo esc_html( $form_title ); ?>
	</h3>

	<?php if ( '' !== $form_content ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'contact', 'form-content' ) ); ?>">
			<?php echo $form_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- shortcode/plugin output. ?>
		</div>
	<?php else : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'contact', 'form-placeholder' ) ); ?>" role="note">
			<p class="<?php echo esc_attr( Support\element_class( 'contact', 'form-placeholder-text' ) ); ?>">
				<?php echo esc_html( (string) ( $form_config['placeholder'] ?? '' ) ); ?>
			</p>
		</div>
	<?php endif; ?>
</div>

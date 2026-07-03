<?php
/**
 * Footer newsletter block.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args            Component arguments.
 * @var int                  $column_context  Column index.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Footer;
use NodeBrains\Components\Support;

$newsletter = Footer\get_newsletter_config( $args );
$content    = Footer\render_newsletter_content( $args );
$region_id  = Support\unique_id( 'footer-newsletter', 'region' );
?>
<div
	class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter' ) ); ?>"
	role="region"
	aria-labelledby="<?php echo esc_attr( $region_id ); ?>"
>
	<h2 id="<?php echo esc_attr( $region_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-title' ) ); ?>">
		<?php echo esc_html( (string) $newsletter['title'] ); ?>
	</h2>

	<?php if ( '' !== trim( (string) ( $newsletter['description'] ?? '' ) ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-description' ) ); ?>">
			<?php echo wp_kses_post( (string) $newsletter['description'] ); ?>
		</div>
	<?php endif; ?>

	<?php if ( '' !== $content ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-content' ) ); ?>">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- shortcode/plugin output. ?>
		</div>
	<?php else : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-placeholder' ) ); ?>" data-nb-footer-newsletter-placeholder role="note">
			<form class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-form' ) ); ?>" data-nb-footer-newsletter-form action="#" method="post" novalidate>
				<label class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-label' ) ); ?>" for="<?php echo esc_attr( $region_id . '-email' ); ?>">
					<span class="nb-sr-only"><?php esc_html_e( 'Email address', 'nodebrains' ); ?></span>
					<input
						id="<?php echo esc_attr( $region_id . '-email' ); ?>"
						class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-input' ) ); ?>"
						type="email"
						name="email"
						placeholder="<?php esc_attr_e( 'you@example.com', 'nodebrains' ); ?>"
						autocomplete="email"
						disabled
					>
				</label>
				<button type="submit" class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-submit' ) ); ?>" disabled>
					<?php esc_html_e( 'Subscribe', 'nodebrains' ); ?>
				</button>
			</form>
			<p class="<?php echo esc_attr( Support\element_class( 'footer', 'newsletter-placeholder-text' ) ); ?>">
				<?php echo esc_html( (string) $newsletter['placeholder'] ); ?>
			</p>
		</div>
	<?php endif; ?>
</div>

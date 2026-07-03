<?php
/**
 * Contact map slot partial.
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

$map_config = Contact\get_map_config( $args );
$map_title  = (string) ( $map_config['title'] ?? '' );
$embed_url  = (string) ( $map_config['embed_url'] ?? '' );
$region_id  = Support\unique_id( 'contact-map', 'region' );
$map_id     = Support\unique_id( 'contact-map', 'frame' );
$is_lazy    = ! empty( $map_config['lazy'] );
?>
<div
	class="<?php echo esc_attr( Support\element_class( 'contact', 'map' ) ); ?>"
	role="region"
	aria-labelledby="<?php echo esc_attr( $region_id ); ?>"
	<?php if ( '' !== $embed_url && $is_lazy ) : ?>
		data-nb-contact-map="true"
		data-nb-contact-map-url="<?php echo esc_url( $embed_url ); ?>"
		data-nb-contact-map-title="<?php echo esc_attr( $map_title ); ?>"
		data-nb-contact-map-target="<?php echo esc_attr( $map_id ); ?>"
	<?php endif; ?>
>
	<h3 id="<?php echo esc_attr( $region_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'contact', 'map-title' ) ); ?>">
		<?php echo esc_html( $map_title ); ?>
	</h3>

	<?php if ( '' !== $embed_url ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'contact', 'map-frame-wrap' ) ); ?>">
			<?php if ( $is_lazy ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'contact', 'map-placeholder' ) ); ?>" data-nb-contact-map-placeholder>
					<p class="<?php echo esc_attr( Support\element_class( 'contact', 'map-placeholder-text' ) ); ?>">
						<?php esc_html_e( 'Map preview is disabled until loaded.', 'nodebrains' ); ?>
					</p>
					<button
						type="button"
						class="<?php echo esc_attr( Support\element_class( 'contact', 'map-load' ) ); ?>"
						data-nb-contact-map-load
					>
						<?php esc_html_e( 'Load map', 'nodebrains' ); ?>
					</button>
				</div>
				<div id="<?php echo esc_attr( $map_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'contact', 'map-embed' ) ); ?>" hidden></div>
			<?php else : ?>
				<iframe
					id="<?php echo esc_attr( $map_id ); ?>"
					class="<?php echo esc_attr( Support\element_class( 'contact', 'map-embed' ) ); ?>"
					title="<?php echo esc_attr( $map_title ); ?>"
					src="<?php echo esc_url( $embed_url ); ?>"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					allowfullscreen
				></iframe>
			<?php endif; ?>
		</div>
	<?php else : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'contact', 'map-placeholder' ) ); ?>" role="note">
			<p class="<?php echo esc_attr( Support\element_class( 'contact', 'map-placeholder-text' ) ); ?>">
				<?php echo esc_html( (string) ( $map_config['placeholder'] ?? '' ) ); ?>
			</p>
		</div>
	<?php endif; ?>
</div>

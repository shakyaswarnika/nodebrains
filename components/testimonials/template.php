<?php
/**
 * Testimonials component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Support;
use NodeBrains\Components\Testimonials;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$testimonial_items = Testimonials\get_normalized_testimonials( $args );

if ( empty( $testimonial_items ) ) {
	return;
}

$is_slider           = Testimonials\is_slider_layout( $args );
$has_section_heading = Testimonials\has_text( $args, 'heading' ) || Testimonials\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'testimonials', 'heading' );
$heading_tag         = 'h' . max( 2, min( 6, (int) ( $args['heading_level'] ?? 2 ) ) );
$slider_id           = Support\unique_id( 'testimonials', 'slider' );
$item_count          = count( $testimonial_items );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Testimonials\get_classes( $args ),
	)
);

$section_attributes['data-nb-testimonials'] = 'true';

if ( $has_section_heading && Testimonials\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Testimonials', 'nodebrains' );
}

if ( $is_slider ) {
	$section_attributes['data-nb-testimonials-slider']   = 'true';
	$section_attributes['data-nb-testimonials-autoplay'] = ! empty( $args['slider_autoplay'] ) ? 'true' : 'false';
	$section_attributes['data-nb-testimonials-interval'] = max( 1000, (int) ( $args['slider_interval'] ?? 5000 ) );
}

if ( ! $is_slider && ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-testimonials-equal-height'] = 'true';
	$section_attributes['data-nb-testimonials-columns']      = wp_json_encode( $args['columns'] ?? array() );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Testimonials\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'testimonials', 'header' ) ); ?>">
				<?php if ( Testimonials\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'testimonials', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Testimonials\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'testimonials', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<?php if ( $is_slider ) : ?>
			<div
				id="<?php echo esc_attr( $slider_id ); ?>"
				class="<?php echo esc_attr( Support\element_class( 'testimonials', 'slider' ) ); ?>"
				role="region"
				aria-roledescription="<?php esc_attr_e( 'carousel', 'nodebrains' ); ?>"
				aria-label="<?php esc_attr_e( 'Testimonials carousel', 'nodebrains' ); ?>"
				data-nb-testimonials-track-wrap
			>
				<div class="<?php echo esc_attr( Support\element_class( 'testimonials', 'viewport' ) ); ?>" aria-live="polite">
					<div class="<?php echo esc_attr( Support\element_class( 'testimonials', 'track' ) ); ?>" data-nb-testimonials-track>
						<?php
						$item_template = Testimonials\get_testimonial_item_template();

						foreach ( $testimonial_items as $index => $testimonial_item ) {
							if ( ! is_readable( $item_template ) ) {
								continue;
							}

							$testimonial            = $testimonial_item;
							$testimonial['context'] = 'slider';
							$testimonial['index']   = $index;
							$testimonial['total']   = $item_count;
							include $item_template;
						}
						?>
					</div>
				</div>

				<?php if ( $item_count > 1 && ( ! empty( $args['slider_controls'] ) || ! empty( $args['slider_dots'] ) ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'testimonials', 'controls' ) ); ?>">
						<?php if ( ! empty( $args['slider_controls'] ) ) : ?>
							<button
								type="button"
								class="<?php echo esc_attr( Support\element_class( 'testimonials', 'prev' ) ); ?>"
								data-nb-testimonials-prev
								aria-controls="<?php echo esc_attr( $slider_id ); ?>"
								aria-label="<?php esc_attr_e( 'Previous testimonial', 'nodebrains' ); ?>"
							>
								<span aria-hidden="true">&larr;</span>
							</button>
						<?php endif; ?>

						<?php if ( ! empty( $args['slider_dots'] ) && $item_count > 1 ) : ?>
							<div class="<?php echo esc_attr( Support\element_class( 'testimonials', 'dots' ) ); ?>" role="tablist" aria-label="<?php esc_attr_e( 'Testimonial slides', 'nodebrains' ); ?>">
								<?php for ( $dot_index = 0; $dot_index < $item_count; $dot_index++ ) : ?>
									<button
										type="button"
										class="<?php echo esc_attr( Support\element_class( 'testimonials', 'dot' ) ); ?>"
										role="tab"
										data-nb-testimonials-dot
										data-index="<?php echo esc_attr( (string) $dot_index ); ?>"
										aria-controls="<?php echo esc_attr( $slider_id ); ?>"
										aria-selected="<?php echo 0 === $dot_index ? 'true' : 'false'; ?>"
										aria-label="<?php echo esc_attr( sprintf( /* translators: 1: slide number, 2: total slides */ __( 'Go to testimonial %1$d of %2$d', 'nodebrains' ), $dot_index + 1, $item_count ) ); ?>"
									>
										<span class="<?php echo esc_attr( Support\element_class( 'testimonials', 'dot-label' ) ); ?>" aria-hidden="true"></span>
									</button>
								<?php endfor; ?>
							</div>
						<?php endif; ?>

						<?php if ( ! empty( $args['slider_controls'] ) ) : ?>
							<button
								type="button"
								class="<?php echo esc_attr( Support\element_class( 'testimonials', 'next' ) ); ?>"
								data-nb-testimonials-next
								aria-controls="<?php echo esc_attr( $slider_id ); ?>"
								aria-label="<?php esc_attr_e( 'Next testimonial', 'nodebrains' ); ?>"
							>
								<span aria-hidden="true">&rarr;</span>
							</button>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
		<?php else : ?>
			<div class="<?php echo esc_attr( Testimonials\get_grid_classes( $args ) ); ?>" role="list">
				<?php
				$item_template = Testimonials\get_testimonial_item_template();

				foreach ( $testimonial_items as $testimonial_item ) {
					if ( ! is_readable( $item_template ) ) {
						continue;
					}

					$testimonial            = $testimonial_item;
					$testimonial['context'] = 'grid';
					include $item_template;
				}
				?>
			</div>
		<?php endif; ?>
	</div>
</section>

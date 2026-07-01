<?php
/**
 * CTA component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Cta;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! Cta\has_content( $args ) ) {
	return;
}

$cta_heading_id   = Support\unique_id( 'cta', 'heading' );
$heading_tag      = Cta\get_heading_tag( $args );
$has_heading      = Cta\has_text( $args, 'heading' );
$has_description  = Cta\has_text( $args, 'description' );
$primary_button   = Cta\normalize_button( $args['primary_button'] ?? array() );
$secondary_button = Cta\normalize_button( $args['secondary_button'] ?? array() );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Cta\get_classes( $args ),
		'style' => Cta\get_inline_style( $args ),
	)
);

if ( $has_heading ) {
	$section_attributes['aria-labelledby'] = $cta_heading_id;
} else {
	$section_attributes['role']       = 'region';
	$section_attributes['aria-label'] = __( 'Call to action', 'nodebrains' );
}

if ( ! empty( $args['reveal_on_scroll'] ) ) {
	$section_attributes['data-nb-cta']        = 'true';
	$section_attributes['data-nb-cta-reveal'] = 'true';
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Cta\has_background_image( $args ) || Cta\has_background_color( $args ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'cta', 'media' ) ); ?>" aria-hidden="<?php echo Cta\has_background_image( $args ) && '' === trim( (string) ( $args['background_image_alt'] ?? '' ) ) ? 'true' : 'false'; ?>">
			<?php if ( Cta\has_background_image( $args ) && '' !== trim( (string) ( $args['background_image_alt'] ?? '' ) ) ) : ?>
				<img
					class="<?php echo esc_attr( Support\element_class( 'cta', 'image' ) ); ?>"
					src="<?php echo esc_url( (string) $args['background_image'] ); ?>"
					alt="<?php echo esc_attr( (string) $args['background_image_alt'] ); ?>"
					decoding="async"
					loading="lazy"
				>
			<?php endif; ?>
			<?php if ( ! empty( $args['overlay'] ) ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'cta', 'overlay' ) ); ?>"></div>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( Cta\get_inner_class( $args ) ); ?>">
		<div class="<?php echo esc_attr( Support\element_class( 'cta', 'content' ) ); ?>">
			<?php if ( $has_heading ) : ?>
				<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $cta_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'cta', 'heading' ) ); ?>">
					<?php echo esc_html( (string) $args['heading'] ); ?>
				</<?php echo tag_escape( $heading_tag ); ?>>
			<?php endif; ?>

			<?php if ( $has_description ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'cta', 'description' ) ); ?>">
					<?php echo wp_kses_post( (string) $args['description'] ); ?>
				</div>
			<?php endif; ?>

			<?php if ( Cta\has_button( $args, 'primary_button' ) || Cta\has_button( $args, 'secondary_button' ) ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'cta', 'actions' ) ); ?>">
					<?php if ( Cta\has_button( $args, 'primary_button' ) ) : ?>
						<?php
						nodebrains_component(
							'button',
							array(
								'text'       => $primary_button['text'],
								'url'        => $primary_button['url'],
								'variant'    => 'primary',
								'size'       => 'md',
								'class'      => Support\element_class( 'cta', 'button' ),
								'attributes' => $primary_button['attributes'],
							)
						);
						?>
					<?php endif; ?>
					<?php if ( Cta\has_button( $args, 'secondary_button' ) ) : ?>
						<?php
						nodebrains_component(
							'button',
							array(
								'text'       => $secondary_button['text'],
								'url'        => $secondary_button['url'],
								'variant'    => 'secondary',
								'size'       => 'md',
								'class'      => Support\element_class( 'cta', 'button' ),
								'attributes' => $secondary_button['attributes'],
							)
						);
						?>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php
/**
 * Banner component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Banner;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! Banner\has_content( $args ) && ! Banner\has_background_image( $args ) && ! Banner\has_background_color( $args ) ) {
	return;
}

$banner_heading_id = Support\unique_id( 'banner', 'heading' );
$heading_tag       = Banner\get_heading_tag( $args );
$has_heading       = Banner\has_text( $args, 'heading' );
$has_description   = Banner\has_text( $args, 'description' );
$cta_button        = Banner\normalize_button( $args['cta_button'] ?? array() );
$breadcrumb_items  = Banner\get_breadcrumb_items( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Banner\get_classes( $args ),
		'style' => Banner\get_inline_style( $args ),
	)
);

if ( $has_heading ) {
	$section_attributes['aria-labelledby'] = $banner_heading_id;
} else {
	$section_attributes['role']       = 'region';
	$section_attributes['aria-label'] = __( 'Banner', 'nodebrains' );
}

if ( ! empty( $args['dismissible'] ) ) {
	$section_attributes['data-nb-banner']         = 'true';
	$section_attributes['data-nb-banner-dismiss'] = Banner\get_dismiss_id( $args );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Support\element_class( 'banner', 'media' ) ); ?>" aria-hidden="<?php echo Banner\has_background_image( $args ) && '' === trim( (string) ( $args['background_image_alt'] ?? '' ) ) ? 'true' : 'false'; ?>">
		<?php if ( Banner\has_background_image( $args ) && '' !== trim( (string) ( $args['background_image_alt'] ?? '' ) ) ) : ?>
			<img
				class="<?php echo esc_attr( Support\element_class( 'banner', 'image' ) ); ?>"
				src="<?php echo esc_url( (string) $args['background_image'] ); ?>"
				alt="<?php echo esc_attr( (string) $args['background_image_alt'] ); ?>"
				decoding="async"
				loading="lazy"
			>
		<?php endif; ?>
		<?php if ( ! empty( $args['overlay'] ) && ( Banner\has_background_image( $args ) || Banner\has_background_color( $args ) ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'banner', 'overlay' ) ); ?>"></div>
		<?php endif; ?>
	</div>

	<div class="<?php echo esc_attr( Banner\get_container_class( $args ) ); ?>">
		<div class="<?php echo esc_attr( Support\element_class( 'banner', 'content' ) ); ?>">
			<?php if ( Banner\has_breadcrumb( $args ) ) : ?>
				<?php if ( ! empty( $breadcrumb_items ) ) : ?>
					<nav class="<?php echo esc_attr( Support\element_class( 'banner', 'breadcrumb' ) ); ?>" aria-label="<?php echo esc_attr( Banner\get_breadcrumb_label( $args ) ); ?>">
						<ol class="<?php echo esc_attr( Support\element_class( 'banner', 'breadcrumb-list' ) ); ?>">
							<?php foreach ( $breadcrumb_items as $index => $crumb ) : ?>
								<?php
								$is_last = ( array_key_last( $breadcrumb_items ) === $index );
								$label   = $crumb['label'];
								$url     = $crumb['url'];
								?>
								<li class="<?php echo esc_attr( Support\element_class( 'banner', 'breadcrumb-item' ) ); ?>">
									<?php if ( ! $is_last && '' !== $url ) : ?>
										<a class="<?php echo esc_attr( Support\element_class( 'banner', 'breadcrumb-link' ) ); ?>" href="<?php echo esc_url( $url ); ?>">
											<?php echo esc_html( $label ); ?>
										</a>
									<?php else : ?>
										<span class="<?php echo esc_attr( Support\element_class( 'banner', 'breadcrumb-current' ) ); ?>" <?php echo $is_last ? 'aria-current="page"' : ''; ?>>
											<?php echo esc_html( $label ); ?>
										</span>
									<?php endif; ?>
								</li>
							<?php endforeach; ?>
						</ol>
					</nav>
				<?php else : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'banner', 'breadcrumb' ) ); ?>">
						<?php Support\the_slot( $args['breadcrumb'] ); ?>
					</div>
				<?php endif; ?>
			<?php endif; ?>

			<?php if ( $has_heading ) : ?>
				<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $banner_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'banner', 'heading' ) ); ?>">
					<?php echo esc_html( (string) $args['heading'] ); ?>
				</<?php echo tag_escape( $heading_tag ); ?>>
			<?php endif; ?>

			<?php if ( $has_description ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'banner', 'description' ) ); ?>">
					<?php echo wp_kses_post( (string) $args['description'] ); ?>
				</div>
			<?php endif; ?>

			<?php if ( Banner\has_cta_button( $args ) ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'banner', 'actions' ) ); ?>">
					<?php
					nodebrains_component(
						'button',
						array(
							'text'       => $cta_button['text'],
							'url'        => $cta_button['url'],
							'variant'    => 'primary',
							'size'       => 'md',
							'class'      => Support\element_class( 'banner', 'cta' ),
							'attributes' => $cta_button['attributes'],
						)
					);
					?>
				</div>
			<?php endif; ?>
		</div>
	</div>

	<?php if ( ! empty( $args['dismissible'] ) ) : ?>
		<button
			type="button"
			class="<?php echo esc_attr( Support\element_class( 'banner', 'dismiss' ) ); ?>"
			aria-label="<?php echo esc_attr( Banner\get_dismiss_label( $args ) ); ?>"
			data-nb-banner-close
		>
			<span aria-hidden="true">&times;</span>
		</button>
	<?php endif; ?>
</section>

<?php
/**
 * Hero component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Hero;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! Hero\has_content( $args ) && ! Hero\has_background_image( $args ) && ! Hero\has_background_color( $args ) ) {
	return;
}

$hero_title_id    = Support\unique_id( 'hero', 'title' );
$heading_tag      = Hero\get_heading_tag( $args );
$has_title        = Hero\has_text( $args, 'title' );
$has_subtitle     = Hero\has_text( $args, 'subtitle' );
$has_description  = Hero\has_text( $args, 'description' );
$primary_button   = Hero\normalize_button( $args['primary_button'] ?? array() );
$secondary_button = Hero\normalize_button( $args['secondary_button'] ?? array() );
$breadcrumb_items = Hero\get_breadcrumb_items( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Hero\get_classes( $args ),
		'style' => Hero\get_inline_style( $args ),
	)
);

if ( $has_title ) {
	$section_attributes['aria-labelledby'] = $hero_title_id;
} else {
	$section_attributes['role']       = 'region';
	$section_attributes['aria-label'] = Hero\has_text( $args, 'subtitle' )
		? (string) $args['subtitle']
		: __( 'Hero section', 'nodebrains' );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Support\element_class( 'hero', 'media' ) ); ?>" aria-hidden="<?php echo Hero\has_background_image( $args ) && '' === trim( (string) ( $args['background_image_alt'] ?? '' ) ) ? 'true' : 'false'; ?>">
		<?php if ( Hero\has_background_image( $args ) && '' !== trim( (string) ( $args['background_image_alt'] ?? '' ) ) ) : ?>
			<img
				class="<?php echo esc_attr( Support\element_class( 'hero', 'image' ) ); ?>"
				src="<?php echo esc_url( (string) $args['background_image'] ); ?>"
				alt="<?php echo esc_attr( (string) $args['background_image_alt'] ); ?>"
				decoding="async"
				loading="eager"
			>
		<?php endif; ?>
		<?php if ( ! empty( $args['overlay'] ) && ( Hero\has_background_image( $args ) || Hero\has_background_color( $args ) ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'hero', 'overlay' ) ); ?>"></div>
		<?php endif; ?>
	</div>

	<div class="<?php echo esc_attr( Hero\get_container_class( $args ) ); ?>">
		<div class="<?php echo esc_attr( Support\element_class( 'hero', 'content' ) ); ?>">
			<?php if ( Hero\has_breadcrumb( $args ) ) : ?>
				<?php if ( ! empty( $breadcrumb_items ) ) : ?>
					<nav class="<?php echo esc_attr( Support\element_class( 'hero', 'breadcrumb' ) ); ?>" aria-label="<?php echo esc_attr( Hero\get_breadcrumb_label( $args ) ); ?>">
						<ol class="<?php echo esc_attr( Support\element_class( 'hero', 'breadcrumb-list' ) ); ?>">
							<?php foreach ( $breadcrumb_items as $index => $crumb ) : ?>
								<?php
								$is_last = ( array_key_last( $breadcrumb_items ) === $index );
								$label   = $crumb['label'];
								$url     = $crumb['url'];
								?>
								<li class="<?php echo esc_attr( Support\element_class( 'hero', 'breadcrumb-item' ) ); ?>">
									<?php if ( ! $is_last && '' !== $url ) : ?>
										<a class="<?php echo esc_attr( Support\element_class( 'hero', 'breadcrumb-link' ) ); ?>" href="<?php echo esc_url( $url ); ?>">
											<?php echo esc_html( $label ); ?>
										</a>
									<?php else : ?>
										<span class="<?php echo esc_attr( Support\element_class( 'hero', 'breadcrumb-current' ) ); ?>" <?php echo $is_last ? 'aria-current="page"' : ''; ?>>
											<?php echo esc_html( $label ); ?>
										</span>
									<?php endif; ?>
								</li>
							<?php endforeach; ?>
						</ol>
					</nav>
				<?php else : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'hero', 'breadcrumb' ) ); ?>">
						<?php Support\the_slot( $args['breadcrumb'] ); ?>
					</div>
				<?php endif; ?>
			<?php endif; ?>

			<?php if ( $has_subtitle ) : ?>
				<p class="<?php echo esc_attr( Support\element_class( 'hero', 'subtitle' ) ); ?>">
					<?php echo esc_html( (string) $args['subtitle'] ); ?>
				</p>
			<?php endif; ?>

			<?php if ( $has_title ) : ?>
				<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $hero_title_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'hero', 'title' ) ); ?>">
					<?php echo esc_html( (string) $args['title'] ); ?>
				</<?php echo tag_escape( $heading_tag ); ?>>
			<?php endif; ?>

			<?php if ( $has_description ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'hero', 'description' ) ); ?>">
					<?php echo wp_kses_post( (string) $args['description'] ); ?>
				</div>
			<?php endif; ?>

			<?php if ( Hero\has_button( $args, 'primary_button' ) || Hero\has_button( $args, 'secondary_button' ) ) : ?>
				<div class="<?php echo esc_attr( Support\element_class( 'hero', 'actions' ) ); ?>">
					<?php if ( Hero\has_button( $args, 'primary_button' ) ) : ?>
						<?php
						nodebrains_component(
							'button',
							array(
								'text'       => $primary_button['text'],
								'url'        => $primary_button['url'],
								'variant'    => 'primary',
								'size'       => 'lg',
								'class'      => Support\element_class( 'hero', 'button' ),
								'attributes' => $primary_button['attributes'],
							)
						);
						?>
					<?php endif; ?>
					<?php if ( Hero\has_button( $args, 'secondary_button' ) ) : ?>
						<?php
						nodebrains_component(
							'button',
							array(
								'text'       => $secondary_button['text'],
								'url'        => $secondary_button['url'],
								'variant'    => 'secondary',
								'size'       => 'lg',
								'class'      => Support\element_class( 'hero', 'button' ),
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

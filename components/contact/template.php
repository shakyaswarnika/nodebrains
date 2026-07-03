<?php
/**
 * Contact component template.
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
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! Contact\has_content( $args ) ) {
	return;
}

$contact_info    = Contact\get_normalized_contact_info( $args );
$social_links    = Contact\get_normalized_social_links( $args );
$has_heading     = Contact\has_text( $args, 'heading' );
$has_description = Contact\has_text( $args, 'description' );
$section_id      = Support\unique_id( 'contact', 'section' );
$heading_tag     = Contact\get_heading_tag( $args );
$show_form       = Contact\show( $args, 'show_form' );
$show_map        = Contact\show( $args, 'show_map' );
$has_aside       = ! empty( $contact_info ) || ! empty( $social_links );
$has_main        = $show_form || $show_map;

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Contact\get_classes( $args ),
		'id'    => ! empty( $args['id'] ) ? (string) $args['id'] : $section_id,
	)
);

$section_attributes['data-nb-contact'] = 'true';

if ( $has_heading ) {
	$section_attributes['aria-labelledby'] = $section_id . '-heading';
} else {
	$section_attributes['aria-label'] = __( 'Contact', 'nodebrains' );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Contact\get_container_class( $args ) ); ?>">
		<?php if ( $has_heading || $has_description ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'contact', 'header' ) ); ?>">
				<?php if ( $has_heading ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_id . '-heading' ); ?>" class="<?php echo esc_attr( Support\element_class( 'contact', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( $has_description ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'contact', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<?php if ( $has_aside || $has_main ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'contact', 'layout' ) ); ?>">
				<?php if ( $has_aside ) : ?>
					<aside class="<?php echo esc_attr( Support\element_class( 'contact', 'aside' ) ); ?>" aria-label="<?php esc_attr_e( 'Contact information', 'nodebrains' ); ?>">
						<?php if ( ! empty( $contact_info ) ) : ?>
							<dl class="<?php echo esc_attr( Support\element_class( 'contact', 'info' ) ); ?>">
								<?php foreach ( $contact_info as $info_item ) : ?>
									<?php
									$info_label = (string) ( $info_item['label'] ?? '' );
									$info_value = (string) ( $info_item['value'] ?? '' );
									$info_url   = (string) ( $info_item['url'] ?? '' );
									$info_type  = (string) ( $info_item['type'] ?? 'text' );
									?>
									<div class="<?php echo esc_attr( Support\element_class( 'contact', 'info-item' ) ); ?>">
										<?php if ( '' !== $info_label ) : ?>
											<dt class="<?php echo esc_attr( Support\element_class( 'contact', 'info-label' ) ); ?>">
												<?php echo esc_html( $info_label ); ?>
											</dt>
										<?php endif; ?>
										<dd class="<?php echo esc_attr( Support\element_class( 'contact', 'info-value' ) ); ?>">
											<?php if ( 'address' === $info_type ) : ?>
												<address class="<?php echo esc_attr( Support\element_class( 'contact', 'info-address' ) ); ?>">
													<?php echo esc_html( $info_value ); ?>
												</address>
											<?php elseif ( '' !== $info_url ) : ?>
												<a class="<?php echo esc_attr( Support\element_class( 'contact', 'info-link' ) ); ?>" href="<?php echo esc_url( $info_url ); ?>">
													<?php echo esc_html( $info_value ); ?>
												</a>
											<?php else : ?>
												<?php echo esc_html( $info_value ); ?>
											<?php endif; ?>
										</dd>
									</div>
								<?php endforeach; ?>
							</dl>
						<?php endif; ?>

						<?php if ( ! empty( $social_links ) ) : ?>
							<nav class="<?php echo esc_attr( Support\element_class( 'contact', 'social' ) ); ?>" aria-label="<?php esc_attr_e( 'Social profiles', 'nodebrains' ); ?>">
								<ul class="<?php echo esc_attr( Support\element_class( 'contact', 'social-list' ) ); ?>">
									<?php foreach ( $social_links as $social_link ) : ?>
										<li class="<?php echo esc_attr( Support\element_class( 'contact', 'social-item' ) ); ?>">
											<?php
											nodebrains_component(
												'link',
												array(
													'text' => (string) ( $social_link['label'] ?? '' ),
													'url'  => (string) ( $social_link['url'] ?? '' ),
													'external' => ! empty( $social_link['external'] ),
													'variant' => 'plain',
													'class' => Support\element_class( 'contact', 'social-link' ),
													'attributes' => is_array( $social_link['attributes'] ?? null ) ? $social_link['attributes'] : array(),
												)
											);
											?>
										</li>
									<?php endforeach; ?>
								</ul>
							</nav>
						<?php endif; ?>
					</aside>
				<?php endif; ?>

				<?php if ( $has_main ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'contact', 'main' ) ); ?>">
						<?php if ( $show_form ) : ?>
							<?php
							$form_template = Contact\get_form_template();

							if ( is_readable( $form_template ) ) {
								include $form_template;
							}
							?>
						<?php endif; ?>

						<?php if ( $show_map ) : ?>
							<?php
							$map_template = Contact\get_map_template();

							if ( is_readable( $map_template ) ) {
								include $map_template;
							}
							?>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
</section>

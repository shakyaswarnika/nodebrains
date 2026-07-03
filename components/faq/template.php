<?php
/**
 * FAQ component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Faq;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$faq_items = Faq\get_normalized_faqs( $args );

if ( empty( $faq_items ) ) {
	return;
}

$has_section_heading = Faq\has_text( $args, 'heading' ) || Faq\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'faq', 'heading' );
$heading_tag         = Faq\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Faq\get_classes( $args ),
	)
);

$section_attributes['data-nb-faq']                = 'true';
$section_attributes['data-nb-faq-allow-multiple'] = ! empty( $args['allow_multiple'] ) ? 'true' : 'false';

if ( $has_section_heading && Faq\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Frequently asked questions', 'nodebrains' );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Faq\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'faq', 'header' ) ); ?>">
				<?php if ( Faq\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'faq', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Faq\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'faq', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( Support\element_class( 'faq', 'list' ) ); ?>">
			<?php
			$item_template = Faq\get_faq_item_template();

			foreach ( $faq_items as $faq_item ) {
				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$faq = $faq_item;
				include $item_template;
			}
			?>
		</div>
	</div>
</section>

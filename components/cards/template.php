<?php
/**
 * Cards component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Cards;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$card_items = Cards\get_normalized_cards( $args );

if ( empty( $card_items ) ) {
	return;
}

$has_section_heading = Cards\has_text( $args, 'heading' ) || Cards\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'cards', 'heading' );
$heading_tag         = Cards\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Cards\get_classes( $args ),
	)
);

if ( $has_section_heading && Cards\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Cards', 'nodebrains' );
}

if ( ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-cards']              = 'true';
	$section_attributes['data-nb-cards-equal-height'] = 'true';
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Cards\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'cards', 'header' ) ); ?>">
				<?php if ( Cards\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'cards', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Cards\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'cards', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( Cards\get_grid_classes( $args ) ); ?>">
			<?php
			$item_template = Cards\get_card_item_template();

			foreach ( $card_items as $card_item ) {
				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$card = $card_item;
				include $item_template;
			}
			?>
		</div>
	</div>
</section>

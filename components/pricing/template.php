<?php
/**
 * Pricing component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Pricing;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$plan_items = Pricing\get_normalized_plans( $args );

if ( empty( $plan_items ) ) {
	return;
}

$has_section_heading = Pricing\has_text( $args, 'heading' ) || Pricing\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'pricing', 'heading' );
$heading_tag         = Pricing\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Pricing\get_classes( $args ),
	)
);

$section_attributes['data-nb-pricing'] = 'true';

if ( $has_section_heading && Pricing\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Pricing plans', 'nodebrains' );
}

if ( ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-pricing-equal-height'] = 'true';
	$section_attributes['data-nb-pricing-columns']      = wp_json_encode( $args['columns'] ?? array() );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Pricing\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'pricing', 'header' ) ); ?>">
				<?php if ( Pricing\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'pricing', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Pricing\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'pricing', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( Pricing\get_grid_classes( $args ) ); ?>" role="list">
			<?php
			$item_template = Pricing\get_plan_item_template();

			foreach ( $plan_items as $plan_item ) {
				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$plan = $plan_item;
				include $item_template;
			}
			?>
		</div>
	</div>
</section>

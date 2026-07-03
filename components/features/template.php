<?php
/**
 * Features component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Features;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$feature_items = Features\get_normalized_features( $args );

if ( empty( $feature_items ) ) {
	return;
}

$has_section_heading = Features\has_text( $args, 'heading' ) || Features\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'features', 'heading' );
$heading_tag         = Features\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Features\get_classes( $args ),
	)
);

if ( $has_section_heading && Features\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Features', 'nodebrains' );
}

if ( ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-features']              = 'true';
	$section_attributes['data-nb-features-equal-height'] = 'true';
	$section_attributes['data-nb-features-columns']      = wp_json_encode( $args['columns'] ?? array() );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Features\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'features', 'header' ) ); ?>">
				<?php if ( Features\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'features', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Features\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'features', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( Features\get_grid_classes( $args ) ); ?>" role="list">
			<?php
			$item_template = Features\get_feature_item_template();

			foreach ( $feature_items as $feature_item ) {
				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$feature = $feature_item;
				include $item_template;
			}
			?>
		</div>
	</div>
</section>

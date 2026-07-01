<?php
/**
 * Services component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Services;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$service_items = Services\get_normalized_services( $args );

if ( empty( $service_items ) ) {
	return;
}

$has_section_heading = Services\has_text( $args, 'heading' ) || Services\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'services', 'heading' );
$heading_tag         = Services\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Services\get_classes( $args ),
	)
);

if ( $has_section_heading && Services\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Services', 'nodebrains' );
}

if ( ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-services']              = 'true';
	$section_attributes['data-nb-services-equal-height'] = 'true';
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Services\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'services', 'header' ) ); ?>">
				<?php if ( Services\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'services', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Services\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'services', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( Services\get_grid_classes( $args ) ); ?>">
			<?php
			$item_template = Services\get_service_item_template();

			foreach ( $service_items as $service_item ) {
				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$service = $service_item;
				include $item_template;
			}
			?>
		</div>
	</div>
</section>

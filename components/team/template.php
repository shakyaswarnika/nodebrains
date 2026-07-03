<?php
/**
 * Team component template.
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
use NodeBrains\Components\Team;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$member_items = Team\get_normalized_members( $args );

if ( empty( $member_items ) ) {
	return;
}

$has_section_heading = Team\has_text( $args, 'heading' ) || Team\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'team', 'heading' );
$heading_tag         = Team\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Team\get_classes( $args ),
	)
);

$section_attributes['data-nb-team'] = 'true';

if ( $has_section_heading && Team\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Team members', 'nodebrains' );
}

if ( ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-team-equal-height'] = 'true';
	$section_attributes['data-nb-team-columns']      = wp_json_encode( $args['columns'] ?? array() );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Team\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'team', 'header' ) ); ?>">
				<?php if ( Team\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'team', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( Team\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'team', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( Team\get_grid_classes( $args ) ); ?>" role="list">
			<?php
			$item_template = Team\get_member_item_template();

			foreach ( $member_items as $member_item ) {
				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$member = $member_item;
				include $item_template;
			}
			?>
		</div>
	</div>
</section>

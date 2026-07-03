<?php
/**
 * Blog Card component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\BlogCard;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$query = BlogCard\run_query( $args );

if ( ! $query->have_posts() ) {
	wp_reset_postdata();
	return;
}

$has_section_heading = BlogCard\has_text( $args, 'heading' ) || BlogCard\has_text( $args, 'description' );
$section_heading_id  = Support\unique_id( 'blog-card', 'heading' );
$heading_tag         = BlogCard\get_heading_tag( $args );

$section_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => BlogCard\get_classes( $args ),
	)
);

$section_attributes['data-nb-blog-card'] = 'true';

if ( $has_section_heading && BlogCard\has_text( $args, 'heading' ) ) {
	$section_attributes['aria-labelledby'] = $section_heading_id;
} else {
	$section_attributes['aria-label'] = __( 'Blog posts', 'nodebrains' );
}

if ( ! empty( $args['equal_height'] ) ) {
	$section_attributes['data-nb-blog-card-equal-height'] = 'true';
	$section_attributes['data-nb-blog-card-columns']      = wp_json_encode( $args['columns'] ?? array() );
}
?>
<section <?php echo FrameworkHelpers\attribute_string( $section_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( BlogCard\get_container_class( $args ) ); ?>">
		<?php if ( $has_section_heading ) : ?>
			<header class="<?php echo esc_attr( Support\element_class( 'blog-card', 'header' ) ); ?>">
				<?php if ( BlogCard\has_text( $args, 'heading' ) ) : ?>
					<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $section_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'blog-card', 'title' ) ); ?>">
						<?php echo esc_html( (string) $args['heading'] ); ?>
					</<?php echo tag_escape( $heading_tag ); ?>>
				<?php endif; ?>
				<?php if ( BlogCard\has_text( $args, 'description' ) ) : ?>
					<div class="<?php echo esc_attr( Support\element_class( 'blog-card', 'description' ) ); ?>">
						<?php echo wp_kses_post( (string) $args['description'] ); ?>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>

		<div class="<?php echo esc_attr( BlogCard\get_grid_classes( $args ) ); ?>" role="list">
			<?php
			$item_template = BlogCard\get_card_item_template();

			while ( $query->have_posts() ) :
				$query->the_post();

				if ( ! is_readable( $item_template ) ) {
					continue;
				}

				$card_args = $args;
				include $item_template;
			endwhile;

			wp_reset_postdata();
			?>
		</div>
	</div>
</section>

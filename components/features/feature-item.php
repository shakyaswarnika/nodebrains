<?php
/**
 * Single feature item partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $feature Normalized feature item.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Features;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $feature ) || ! is_array( $feature ) ) {
	return;
}

$item_heading_id = Support\unique_id( 'features-item', 'heading' );
$heading_tag     = Features\get_item_heading_tag( $feature );
$item_attributes = Support\merge_attributes(
	$feature,
	array(
		'class' => Features\get_item_classes( $feature ),
		'role'  => 'listitem',
	)
);

if ( Features\has_text( $feature, 'heading' ) ) {
	$item_attributes['aria-labelledby'] = $item_heading_id;
}
?>
<article <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Features\has_icon( $feature ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'features-item', 'icon' ) ); ?>" aria-hidden="true">
			<?php echo wp_kses_post( Support\render_slot( $feature['icon'] ) ); ?>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( Support\element_class( 'features-item', 'body' ) ); ?>">
		<?php if ( Features\has_text( $feature, 'heading' ) ) : ?>
			<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $item_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'features-item', 'heading' ) ); ?>">
				<?php echo esc_html( (string) $feature['heading'] ); ?>
			</<?php echo tag_escape( $heading_tag ); ?>>
		<?php endif; ?>

		<?php if ( Features\has_text( $feature, 'description' ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'features-item', 'description' ) ); ?>">
				<?php echo wp_kses_post( (string) $feature['description'] ); ?>
			</div>
		<?php endif; ?>
	</div>
</article>

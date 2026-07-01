<?php
/**
 * Single service item partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $service Normalized service item.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Services;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $service ) || ! is_array( $service ) ) {
	return;
}

$item_heading_id = Support\unique_id( 'services-item', 'title' );
$heading_tag     = Services\get_item_heading_tag( $service );
$item_attributes = Support\merge_attributes(
	$service,
	array(
		'class' => Services\get_item_classes( $service ),
	)
);

if ( Services\has_text( $service, 'title' ) ) {
	$item_attributes['aria-labelledby'] = $item_heading_id;
}
?>
<article <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Services\has_icon( $service ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'services-item', 'icon' ) ); ?>" aria-hidden="true">
			<?php echo wp_kses_post( Support\render_slot( $service['icon'] ) ); ?>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( Support\element_class( 'services-item', 'body' ) ); ?>">
		<?php if ( Services\has_text( $service, 'title' ) ) : ?>
			<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $item_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'services-item', 'title' ) ); ?>">
				<?php echo esc_html( (string) $service['title'] ); ?>
			</<?php echo tag_escape( $heading_tag ); ?>>
		<?php endif; ?>

		<?php if ( Services\has_text( $service, 'description' ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'services-item', 'description' ) ); ?>">
				<?php echo wp_kses_post( (string) $service['description'] ); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ( Services\has_link( $service ) ) : ?>
		<footer class="<?php echo esc_attr( Support\element_class( 'services-item', 'footer' ) ); ?>">
			<?php
			$service_link = $service['link'] ?? array();
			nodebrains_component(
				'link',
				array(
					'text'       => (string) ( $service_link['text'] ?? '' ),
					'url'        => (string) ( $service_link['url'] ?? '' ),
					'external'   => ! empty( $service_link['external'] ),
					'variant'    => 'plain',
					'class'      => Support\element_class( 'services-item', 'link' ),
					'attributes' => is_array( $service_link['attributes'] ?? null ) ? $service_link['attributes'] : array(),
				)
			);
			?>
		</footer>
	<?php endif; ?>
</article>

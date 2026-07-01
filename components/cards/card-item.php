<?php
/**
 * Single card item partial for the Cards component.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $card Normalized card item.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Cards;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $card ) || ! is_array( $card ) ) {
	return;
}

$item_heading_id = Support\unique_id( 'cards-item', 'title' );
$heading_tag     = Cards\get_item_heading_tag( $card );
$image           = $card['image'] ?? array();
$item_attributes = Support\merge_attributes(
	$card,
	array(
		'class' => Cards\get_item_classes( $card ),
	)
);

if ( Cards\has_text( $card, 'title' ) ) {
	$item_attributes['aria-labelledby'] = $item_heading_id;
}
?>
<article <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Cards\has_image( $card ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'cards-item', 'media' ) ); ?>">
			<img
				class="<?php echo esc_attr( Support\element_class( 'cards-item', 'image' ) ); ?>"
				src="<?php echo esc_url( (string) ( $image['src'] ?? '' ) ); ?>"
				alt="<?php echo esc_attr( (string) ( $image['alt'] ?? '' ) ); ?>"
				loading="lazy"
				decoding="async"
			>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( Support\element_class( 'cards-item', 'body' ) ); ?>">
		<?php if ( Cards\has_badge( $card ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'cards-item', 'badge-wrap' ) ); ?>">
				<?php
				$badge = $card['badge'] ?? array();
				nodebrains_component(
					'badge',
					array(
						'text'    => (string) ( $badge['text'] ?? '' ),
						'variant' => (string) ( $badge['variant'] ?? 'neutral' ),
						'class'   => Support\element_class( 'cards-item', 'badge' ),
					)
				);
				?>
			</div>
		<?php endif; ?>

		<?php if ( Cards\has_icon( $card ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'cards-item', 'icon' ) ); ?>" aria-hidden="true">
				<?php echo wp_kses_post( Support\render_slot( $card['icon'] ) ); ?>
			</div>
		<?php endif; ?>

		<?php if ( Cards\has_text( $card, 'title' ) ) : ?>
			<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $item_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'cards-item', 'title' ) ); ?>">
				<?php echo esc_html( (string) $card['title'] ); ?>
			</<?php echo tag_escape( $heading_tag ); ?>>
		<?php endif; ?>

		<?php if ( Cards\has_text( $card, 'description' ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'cards-item', 'description' ) ); ?>">
				<?php echo wp_kses_post( (string) $card['description'] ); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ( Cards\has_button( $card ) || Cards\has_link( $card ) ) : ?>
		<footer class="<?php echo esc_attr( Support\element_class( 'cards-item', 'footer' ) ); ?>">
			<?php if ( Cards\has_button( $card ) ) : ?>
				<?php
				$button = $card['button'] ?? array();
				nodebrains_component(
					'button',
					array(
						'text'       => (string) ( $button['text'] ?? '' ),
						'url'        => (string) ( $button['url'] ?? '' ),
						'variant'    => 'primary',
						'size'       => 'sm',
						'class'      => Support\element_class( 'cards-item', 'button' ),
						'attributes' => is_array( $button['attributes'] ?? null ) ? $button['attributes'] : array(),
					)
				);
				?>
			<?php endif; ?>
			<?php if ( Cards\has_link( $card ) ) : ?>
				<?php
				$card_link = $card['link'] ?? array();
				nodebrains_component(
					'link',
					array(
						'text'       => (string) ( $card_link['text'] ?? '' ),
						'url'        => (string) ( $card_link['url'] ?? '' ),
						'external'   => ! empty( $card_link['external'] ),
						'variant'    => 'plain',
						'class'      => Support\element_class( 'cards-item', 'link' ),
						'attributes' => is_array( $card_link['attributes'] ?? null ) ? $card_link['attributes'] : array(),
					)
				);
				?>
			<?php endif; ?>
		</footer>
	<?php endif; ?>
</article>

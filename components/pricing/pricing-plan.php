<?php
/**
 * Single pricing plan partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $plan Normalized pricing plan.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Pricing;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $plan ) || ! is_array( $plan ) ) {
	return;
}

$plan_heading_id = Support\unique_id( 'pricing-plan', 'name' );
$heading_tag     = Pricing\get_plan_heading_tag( $plan );
$features        = $plan['features'] ?? array();
$features_id     = Support\unique_id( 'pricing-plan', 'features' );
$item_attributes = Support\merge_attributes(
	$plan,
	array(
		'class' => Pricing\get_item_classes( $plan ),
		'role'  => 'listitem',
	)
);

if ( Pricing\has_text( $plan, 'plan_name' ) ) {
	$item_attributes['aria-labelledby'] = $plan_heading_id;
}
?>
<article <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Pricing\has_badge( $plan ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'badge-wrap' ) ); ?>">
			<?php
			$badge = $plan['badge'] ?? array();
			nodebrains_component(
				'badge',
				array(
					'text'    => (string) ( $badge['text'] ?? '' ),
					'variant' => (string) ( $badge['variant'] ?? 'accent' ),
					'class'   => Support\element_class( 'pricing-plan', 'badge' ),
				)
			);
			?>
		</div>
	<?php endif; ?>

	<header class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'header' ) ); ?>">
		<?php if ( Pricing\has_text( $plan, 'plan_name' ) ) : ?>
			<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $plan_heading_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'name' ) ); ?>">
				<?php echo esc_html( (string) $plan['plan_name'] ); ?>
			</<?php echo tag_escape( $heading_tag ); ?>>
		<?php endif; ?>

		<?php if ( Pricing\has_text( $plan, 'price' ) || Pricing\has_text( $plan, 'billing_cycle' ) ) : ?>
			<p class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'price' ) ); ?>" aria-label="<?php echo esc_attr( Pricing\get_price_label( $plan ) ); ?>">
				<?php if ( Pricing\has_text( $plan, 'price' ) ) : ?>
					<span class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'amount' ) ); ?>" aria-hidden="true">
						<?php echo esc_html( (string) $plan['price'] ); ?>
					</span>
				<?php endif; ?>
				<?php if ( Pricing\has_text( $plan, 'billing_cycle' ) ) : ?>
					<span class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'cycle' ) ); ?>" aria-hidden="true">
						<?php echo esc_html( (string) $plan['billing_cycle'] ); ?>
					</span>
				<?php endif; ?>
			</p>
		<?php endif; ?>
	</header>

	<?php if ( Pricing\has_features( $plan ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'body' ) ); ?>">
			<ul
				id="<?php echo esc_attr( $features_id ); ?>"
				class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'features' ) ); ?>"
				aria-label="<?php esc_attr_e( 'Plan features', 'nodebrains' ); ?>"
			>
				<?php foreach ( $features as $feature_text ) : ?>
					<li class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'feature' ) ); ?>">
						<span class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'feature-icon' ) ); ?>" aria-hidden="true">✓</span>
						<span class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'feature-text' ) ); ?>">
							<?php echo esc_html( (string) $feature_text ); ?>
						</span>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	<?php endif; ?>

	<?php if ( Pricing\has_button( $plan ) ) : ?>
		<footer class="<?php echo esc_attr( Support\element_class( 'pricing-plan', 'footer' ) ); ?>">
			<?php
			$button = $plan['button'] ?? array();
			nodebrains_component(
				'button',
				array(
					'text'       => (string) ( $button['text'] ?? '' ),
					'url'        => (string) ( $button['url'] ?? '' ),
					'variant'    => ! empty( $plan['featured'] ) ? 'primary' : 'secondary',
					'size'       => 'md',
					'full_width' => true,
					'class'      => Support\element_class( 'pricing-plan', 'button' ),
					'attributes' => is_array( $button['attributes'] ?? null ) ? $button['attributes'] : array(),
				)
			);
			?>
		</footer>
	<?php endif; ?>
</article>

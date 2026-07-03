<?php
/**
 * Single testimonial item partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $testimonial Normalized testimonial item.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Support;
use NodeBrains\Components\Testimonials;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $testimonial ) || ! is_array( $testimonial ) ) {
	return;
}

$context     = (string) ( $testimonial['context'] ?? 'grid' );
$index       = (int) ( $testimonial['index'] ?? 0 );
$total       = (int) ( $testimonial['total'] ?? 0 );
$image       = $testimonial['image'] ?? array();
$rating      = Testimonials\normalize_rating( $testimonial['rating'] ?? 0 );
$attribution = Testimonials\get_attribution_line( $testimonial );

$item_attributes = Support\merge_attributes(
	$testimonial,
	array(
		'class' => Testimonials\get_item_classes( $testimonial ),
	)
);

if ( 'slider' === $context ) {
	$item_attributes['role']                 = 'group';
	$item_attributes['aria-roledescription'] = __( 'slide', 'nodebrains' );
	$item_attributes['aria-label']           = sprintf(
		/* translators: 1: slide number, 2: total slides */
		__( 'Testimonial %1$d of %2$d', 'nodebrains' ),
		$index + 1,
		max( 1, $total )
	);
	$item_attributes['data-nb-testimonials-slide'] = 'true';
	$item_attributes['data-index']                 = (string) $index;

	if ( 0 !== $index ) {
		$item_attributes['hidden'] = 'hidden';
	}
} else {
	$item_attributes['role'] = 'listitem';
}
?>
<figure <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Testimonials\has_rating( $testimonial ) ) : ?>
		<div
			class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'rating' ) ); ?>"
			role="img"
			aria-label="<?php echo esc_attr( Testimonials\get_rating_label( $rating ) ); ?>"
		>
			<span class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'stars' ) ); ?>" aria-hidden="true">
				<?php
				for ( $star = 1; $star <= 5; $star++ ) {
					$modifier = $star <= $rating ? 'is-filled' : 'is-empty';
					$classes  = Support\element_class( 'testimonials-item', 'star' ) . ' nb-c-testimonials-item__star--' . sanitize_html_class( $modifier );
					echo '<span class="' . esc_attr( $classes ) . '">★</span>';
				}
				?>
			</span>
		</div>
	<?php endif; ?>

	<?php if ( Testimonials\has_text( $testimonial, 'quote' ) ) : ?>
		<blockquote class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'quote' ) ); ?>">
			<?php echo wp_kses_post( (string) $testimonial['quote'] ); ?>
		</blockquote>
	<?php endif; ?>

	<figcaption class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'meta' ) ); ?>">
		<?php if ( Testimonials\has_image( $testimonial ) ) : ?>
			<img
				class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'image' ) ); ?>"
				src="<?php echo esc_url( (string) ( $image['src'] ?? '' ) ); ?>"
				alt="<?php echo esc_attr( (string) ( $image['alt'] ?? '' ) ); ?>"
				loading="lazy"
				decoding="async"
				width="64"
				height="64"
			>
		<?php endif; ?>

		<span class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'author' ) ); ?>">
			<?php if ( Testimonials\has_text( $testimonial, 'name' ) ) : ?>
				<cite class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'name' ) ); ?>">
					<?php echo esc_html( (string) $testimonial['name'] ); ?>
				</cite>
			<?php endif; ?>

			<?php if ( '' !== $attribution ) : ?>
				<span class="<?php echo esc_attr( Support\element_class( 'testimonials-item', 'attribution' ) ); ?>">
					<?php echo esc_html( $attribution ); ?>
				</span>
			<?php endif; ?>
		</span>
	</figcaption>
</figure>

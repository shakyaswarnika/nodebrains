<?php
/**
 * Single blog card item partial.
 *
 * Rendered inside the WordPress loop.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $card_args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\BlogCard;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $card_args ) || ! is_array( $card_args ) ) {
	return;
}

$permalink        = get_permalink();
$card_title       = get_the_title();
$title_id         = Support\unique_id( 'blog-card-item', 'title' );
$heading_tag      = BlogCard\get_card_heading_tag( $card_args );
$image_size       = (string) ( $card_args['image_size'] ?? 'medium_large' );
$primary_category = BlogCard\get_primary_category();
$item_attributes  = array(
	'class' => BlogCard\get_item_classes( $card_args ),
	'role'  => 'listitem',
);

if ( '' !== $card_title ) {
	$item_attributes['aria-labelledby'] = $title_id;
}
?>
<article <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> id="post-<?php the_ID(); ?>">
	<?php if ( BlogCard\show( $card_args, 'show_image' ) && has_post_thumbnail() ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'media' ) ); ?>">
			<a
				class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'image-link' ) ); ?>"
				href="<?php echo esc_url( $permalink ); ?>"
				aria-hidden="true"
				tabindex="-1"
			>
				<?php
				the_post_thumbnail(
					$image_size,
					array(
						'class' => Support\element_class( 'blog-card-item', 'image' ),
						'alt'   => the_title_attribute(
							array(
								'echo' => false,
							)
						),
					)
				);
				?>
			</a>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'body' ) ); ?>">
		<?php if ( BlogCard\show( $card_args, 'show_category' ) && $primary_category instanceof \WP_Term ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'category' ) ); ?>">
				<a
					class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'category-link' ) ); ?>"
					href="<?php echo esc_url( get_category_link( $primary_category->term_id ) ); ?>"
					rel="category tag"
				>
					<?php
					nodebrains_component(
						'badge',
						array(
							'text'    => $primary_category->name,
							'variant' => 'neutral',
							'size'    => 'sm',
							'class'   => Support\element_class( 'blog-card-item', 'category-badge' ),
						)
					);
					?>
				</a>
			</div>
		<?php endif; ?>

		<?php if ( '' !== $card_title ) : ?>
			<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $title_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'title' ) ); ?>">
				<a class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'title-link' ) ); ?>" href="<?php echo esc_url( $permalink ); ?>" rel="bookmark">
					<?php echo esc_html( $card_title ); ?>
				</a>
			</<?php echo tag_escape( $heading_tag ); ?>>
		<?php endif; ?>

		<?php if ( BlogCard\show( $card_args, 'show_excerpt' ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'excerpt' ) ); ?>">
				<?php echo wp_kses_post( BlogCard\get_card_excerpt( $card_args ) ); ?>
			</div>
		<?php endif; ?>

		<?php if ( BlogCard\show( $card_args, 'show_author' ) || BlogCard\show( $card_args, 'show_date' ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'meta' ) ); ?>">
				<?php if ( BlogCard\show( $card_args, 'show_author' ) ) : ?>
					<span class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'author' ) ); ?>">
						<?php
						printf(
							/* translators: %s: post author name */
							esc_html__( 'By %s', 'nodebrains' ),
							sprintf(
								'<a class="%s" href="%s" rel="author">%s</a>',
								esc_attr( Support\element_class( 'blog-card-item', 'author-link' ) ),
								esc_url( get_author_posts_url( (int) get_the_author_meta( 'ID' ) ) ),
								esc_html( get_the_author() )
							)
						);
						?>
					</span>
				<?php endif; ?>

				<?php if ( BlogCard\show( $card_args, 'show_date' ) ) : ?>
					<time
						class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'date' ) ); ?>"
						datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"
					>
						<?php echo esc_html( get_the_date() ); ?>
					</time>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ( BlogCard\show( $card_args, 'show_button' ) ) : ?>
		<footer class="<?php echo esc_attr( Support\element_class( 'blog-card-item', 'footer' ) ); ?>">
			<?php
			nodebrains_component(
				'button',
				array(
					'text'       => BlogCard\get_read_more_text( $card_args ),
					'url'        => $permalink,
					'variant'    => 'secondary',
					'size'       => 'sm',
					'class'      => Support\element_class( 'blog-card-item', 'button' ),
					'attributes' => array(
						'aria-label' => sprintf(
							/* translators: %s: post title */
							__( 'Read more about %s', 'nodebrains' ),
							$card_title
						),
					),
				)
			);
			?>
		</footer>
	<?php endif; ?>
</article>

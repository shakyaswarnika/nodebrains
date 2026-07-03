<?php
/**
 * Single team member partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $member Normalized team member.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Support;
use NodeBrains\Components\Team;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $member ) || ! is_array( $member ) ) {
	return;
}

$photo           = $member['photo'] ?? array();
$member_name_id  = Support\unique_id( 'team-member', 'name' );
$heading_tag     = Team\get_member_heading_tag( $member );
$social_links    = $member['social_links'] ?? array();
$item_attributes = Support\merge_attributes(
	$member,
	array(
		'class' => Team\get_item_classes( $member ),
		'role'  => 'listitem',
	)
);

if ( Team\has_text( $member, 'name' ) ) {
	$item_attributes['aria-labelledby'] = $member_name_id;
}
?>
<article <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( Team\has_photo( $member ) ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'team-member', 'media' ) ); ?>">
			<img
				class="<?php echo esc_attr( Support\element_class( 'team-member', 'photo' ) ); ?>"
				src="<?php echo esc_url( (string) ( $photo['src'] ?? '' ) ); ?>"
				alt="<?php echo esc_attr( (string) ( $photo['alt'] ?? '' ) ); ?>"
				loading="lazy"
				decoding="async"
				width="240"
				height="240"
			>
		</div>
	<?php endif; ?>

	<div class="<?php echo esc_attr( Support\element_class( 'team-member', 'body' ) ); ?>">
		<?php if ( Team\has_text( $member, 'name' ) ) : ?>
			<<?php echo tag_escape( $heading_tag ); ?> id="<?php echo esc_attr( $member_name_id ); ?>" class="<?php echo esc_attr( Support\element_class( 'team-member', 'name' ) ); ?>">
				<?php echo esc_html( (string) $member['name'] ); ?>
			</<?php echo tag_escape( $heading_tag ); ?>>
		<?php endif; ?>

		<?php if ( Team\has_text( $member, 'position' ) ) : ?>
			<p class="<?php echo esc_attr( Support\element_class( 'team-member', 'position' ) ); ?>">
				<?php echo esc_html( (string) $member['position'] ); ?>
			</p>
		<?php endif; ?>

		<?php if ( Team\has_text( $member, 'bio' ) ) : ?>
			<div class="<?php echo esc_attr( Support\element_class( 'team-member', 'bio' ) ); ?>">
				<?php echo wp_kses_post( (string) $member['bio'] ); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ( Team\has_social_links( $member ) ) : ?>
		<nav class="<?php echo esc_attr( Support\element_class( 'team-member', 'social' ) ); ?>" aria-label="<?php echo esc_attr( Team\get_social_nav_label( $member ) ); ?>">
			<ul class="<?php echo esc_attr( Support\element_class( 'team-member', 'social-list' ) ); ?>">
				<?php foreach ( $social_links as $social_link ) : ?>
					<?php if ( ! is_array( $social_link ) ) : ?>
						<?php continue; ?>
					<?php endif; ?>
					<li class="<?php echo esc_attr( Support\element_class( 'team-member', 'social-item' ) ); ?>">
						<?php
						nodebrains_component(
							'link',
							array(
								'text'       => (string) ( $social_link['label'] ?? '' ),
								'url'        => (string) ( $social_link['url'] ?? '' ),
								'external'   => ! empty( $social_link['external'] ),
								'variant'    => 'plain',
								'class'      => Support\element_class( 'team-member', 'social-link' ),
								'attributes' => is_array( $social_link['attributes'] ?? null ) ? $social_link['attributes'] : array(),
							)
						);
						?>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>
	<?php endif; ?>
</article>

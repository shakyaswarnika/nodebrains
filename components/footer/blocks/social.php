<?php
/**
 * Footer social icons block.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args            Component arguments.
 * @var int                  $column_context  Column index.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Footer;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$social_links = Footer\get_normalized_social_links( $args );

if ( empty( $social_links ) ) {
	return;
}
?>
<nav class="<?php echo esc_attr( Support\element_class( 'footer', 'social' ) ); ?>" aria-label="<?php echo esc_attr( Footer\get_social_label( $args ) ); ?>">
	<ul class="<?php echo esc_attr( Support\element_class( 'footer', 'social-list' ) ); ?>">
		<?php foreach ( $social_links as $social_link ) : ?>
			<?php
			$label      = (string) ( $social_link['label'] ?? '' );
			$url        = (string) ( $social_link['url'] ?? '' );
			$icon       = (string) ( $social_link['icon'] ?? '' );
			$attributes = array(
				'class'      => Support\element_class( 'footer', 'social-link' ),
				'href'       => esc_url( $url ),
				'aria-label' => $label,
			);

			if ( ! empty( $social_link['external'] ) ) {
				$attributes['target'] = '_blank';
				$attributes['rel']    = 'noopener noreferrer';
			}

			$user_attributes = is_array( $social_link['attributes'] ?? null ) ? $social_link['attributes'] : array();
			$attributes      = array_merge( $attributes, $user_attributes );
			?>
			<li class="<?php echo esc_attr( Support\element_class( 'footer', 'social-item' ) ); ?>">
				<a <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php if ( '' !== trim( $icon ) ) : ?>
						<span class="<?php echo esc_attr( Support\element_class( 'footer', 'social-icon' ) ); ?>" aria-hidden="true">
							<?php echo wp_kses_post( $icon ); ?>
						</span>
					<?php endif; ?>
					<span class="<?php echo esc_attr( Support\element_class( 'footer', 'social-label' ) . ( '' !== trim( $icon ) ? ' nb-sr-only' : '' ) ); ?>">
						<?php echo esc_html( $label ); ?>
					</span>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>

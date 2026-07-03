<?php
/**
 * Footer logo block.
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

$logo = Footer\get_logo_config( $args );
?>
<div class="<?php echo esc_attr( Support\element_class( 'footer', 'logo' ) ); ?>">
	<?php if ( ! empty( $logo['use_site_logo'] ) && has_custom_logo() ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'footer', 'logo-custom' ) ); ?>">
			<?php the_custom_logo(); ?>
		</div>
	<?php else : ?>
		<a class="<?php echo esc_attr( Support\element_class( 'footer', 'logo-link' ) ); ?>" href="<?php echo esc_url( (string) $logo['url'] ); ?>" rel="home">
			<?php if ( '' !== (string) ( $logo['image']['src'] ?? '' ) ) : ?>
				<img
					class="<?php echo esc_attr( Support\element_class( 'footer', 'logo-image' ) ); ?>"
					src="<?php echo esc_url( (string) $logo['image']['src'] ); ?>"
					alt="<?php echo esc_attr( (string) $logo['image']['alt'] ); ?>"
					loading="lazy"
					decoding="async"
				>
			<?php else : ?>
				<span class="<?php echo esc_attr( Support\element_class( 'footer', 'logo-text' ) ); ?>">
					<?php echo esc_html( get_bloginfo( 'name' ) ); ?>
				</span>
			<?php endif; ?>
		</a>
	<?php endif; ?>

	<?php if ( '' !== trim( (string) ( $logo['tagline'] ?? '' ) ) ) : ?>
		<p class="<?php echo esc_attr( Support\element_class( 'footer', 'tagline' ) ); ?>">
			<?php echo esc_html( (string) $logo['tagline'] ); ?>
		</p>
	<?php endif; ?>
</div>

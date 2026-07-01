<?php
/**
 * Button component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Button;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$text     = (string) ( $args['text'] ?? '' );
$icon     = Support\render_slot( $args['icon'] ?? '' );
$icon_pos = (string) ( $args['icon_position'] ?? 'left' );

if ( '' === $text && '' === $icon ) {
	$user_attributes = $args['attributes'] ?? array();
	if ( ! is_array( $user_attributes ) || empty( $user_attributes['aria-label'] ) ) {
		return;
	}
}

$attributes = Button\get_attributes( $args );
$html_tag   = isset( $attributes['href'] ) ? 'a' : 'button';
?>
<<?php echo tag_escape( $html_tag ); ?> <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( '' !== $icon && 'left' === $icon_pos ) : ?>
		<span class="<?php echo esc_attr( Support\element_class( 'button', 'icon' ) ); ?>" aria-hidden="true"><?php echo wp_kses_post( $icon ); ?></span>
	<?php endif; ?>
	<?php if ( '' !== $text ) : ?>
		<span class="<?php echo esc_attr( Support\element_class( 'button', 'label' ) ); ?>"><?php echo esc_html( $text ); ?></span>
	<?php endif; ?>
	<?php if ( '' !== $icon && 'right' === $icon_pos ) : ?>
		<span class="<?php echo esc_attr( Support\element_class( 'button', 'icon' ) ); ?>" aria-hidden="true"><?php echo wp_kses_post( $icon ); ?></span>
	<?php endif; ?>
</<?php echo tag_escape( $html_tag ); ?>>

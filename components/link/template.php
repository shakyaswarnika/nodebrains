<?php
/**
 * Link component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Link;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$text = (string) ( $args['text'] ?? '' );
$url  = (string) ( $args['url'] ?? '' );

if ( '' === $text || '' === $url ) {
	return;
}

$attributes = Link\get_attributes( $args );

if ( ! empty( $args['external'] ) && empty( $attributes['aria-label'] ) ) {
	/* translators: %s: link text */
	$attributes['aria-label'] = sprintf( __( '%s (opens in a new tab)', 'nodebrains' ), $text );
}
?>
<a <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<span class="<?php echo esc_attr( Support\element_class( 'link', 'text' ) ); ?>"><?php echo esc_html( $text ); ?></span>
	<?php if ( ! empty( $args['external'] ) ) : ?>
		<span class="<?php echo esc_attr( Support\element_class( 'link', 'icon' ) ); ?>" aria-hidden="true">&#8599;</span>
	<?php endif; ?>
</a>

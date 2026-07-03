<?php
/**
 * Footer copyright block.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Footer;
use NodeBrains\Components\Support;

$copyright_text = Footer\get_copyright_text( $args );

if ( '' === $copyright_text ) {
	return;
}
?>
<div class="<?php echo esc_attr( Support\element_class( 'footer', 'bar' ) ); ?>">
	<p class="<?php echo esc_attr( Support\element_class( 'footer', 'copyright' ) ); ?>">
		<?php echo esc_html( $copyright_text ); ?>
	</p>
</div>

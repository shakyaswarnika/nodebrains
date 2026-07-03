<?php
/**
 * Footer navigation block.
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

$navigation = Footer\get_navigation_config( $args );
$menu_html  = Footer\get_navigation_html( $args );

if ( '' === $menu_html ) {
	return;
}
?>
<nav class="<?php echo esc_attr( Support\element_class( 'footer', 'navigation' ) ); ?>" aria-label="<?php echo esc_attr( (string) $navigation['label'] ); ?>">
	<?php echo wp_kses_post( $menu_html ); ?>
</nav>

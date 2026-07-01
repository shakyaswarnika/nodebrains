<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! \NodeBrains\Helpers\has_visible_sidebar() ) {
	return;
}
?>

<aside id="secondary" class="widget-area sidebar" role="complementary" aria-label="<?php esc_attr_e( 'Blog sidebar', 'nodebrains' ); ?>">
	<?php dynamic_sidebar( 'main-sidebar' ); ?>
</aside>

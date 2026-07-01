<?php
/**
 * Search form template.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$unique_id = wp_unique_id( 'search-form-' );
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="<?php echo esc_attr( $unique_id ); ?>">
		<?php esc_html_e( 'Search for:', 'nodebrains' ); ?>
	</label>
	<input
		type="search"
		id="<?php echo esc_attr( $unique_id ); ?>"
		class="search-field"
		placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'nodebrains' ); ?>"
		value="<?php echo esc_attr( get_search_query() ); ?>"
		name="s"
	>
	<button type="submit" class="search-submit">
		<span class="screen-reader-text"><?php esc_html_e( 'Search', 'nodebrains' ); ?></span>
		<?php esc_html_e( 'Search', 'nodebrains' ); ?>
	</button>
</form>

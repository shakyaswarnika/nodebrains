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

nodebrains_component(
	'search-form',
	array(
		'label'          => __( 'Search for:', 'nodebrains' ),
		'label_hidden'   => true,
		'placeholder'    => esc_attr_x( 'Search &hellip;', 'placeholder', 'nodebrains' ),
		'button_text'    => __( 'Search', 'nodebrains' ),
		'button_sr_text' => __( 'Search', 'nodebrains' ),
		'value'          => get_search_query(),
	)
);

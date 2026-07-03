<?php
/**
 * Footer widget areas block.
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

$column_count = Footer\get_column_count( $args );
$sidebar_ids  = array();

if ( 1 === $column_count ) {
	$sidebar_ids = Footer\get_widget_area_ids( $args );
} else {
	$sidebar_ids = array( Footer\get_widget_area_id_for_column( $args, (int) $column_context ) );
}

	$sidebar_ids = array_values(
		array_filter(
			$sidebar_ids,
			'is_active_sidebar'
		)
	);

	if ( empty( $sidebar_ids ) ) {
		return;
	}
	?>
<div class="<?php echo esc_attr( Support\element_class( 'footer', 'widgets' ) ); ?>" role="complementary" aria-label="<?php esc_attr_e( 'Footer widgets', 'nodebrains' ); ?>">
	<?php foreach ( $sidebar_ids as $sidebar_id ) : ?>
		<div class="<?php echo esc_attr( Support\element_class( 'footer', 'widget-area' ) ); ?>" data-sidebar="<?php echo esc_attr( $sidebar_id ); ?>">
			<?php dynamic_sidebar( $sidebar_id ); ?>
		</div>
	<?php endforeach; ?>
</div>

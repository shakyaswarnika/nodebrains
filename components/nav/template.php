<?php
/**
 * Nav component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Nav;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$menu_html = Nav\get_menu_html( $args );

if ( '' === $menu_html ) {
	return;
}

$nav_id       = ! empty( $args['id'] ) ? (string) $args['id'] : Support\unique_id( 'nav' );
$panel_id     = $nav_id . '-panel';
$toggle_id    = $nav_id . '-toggle';
$label        = Nav\get_label( $args );
$toggle_label = Nav\get_toggle_label( $args );
$toggle_close = Nav\get_toggle_close_label( $args );
$attributes   = Support\merge_attributes(
	$args,
	array(
		'class' => Nav\get_classes( $args ),
		'id'    => $nav_id,
	)
);
?>
<nav <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> aria-label="<?php echo esc_attr( $label ); ?>" data-nb-nav>
	<button
		type="button"
		class="<?php echo esc_attr( Support\element_class( 'nav', 'toggle' ) ); ?>"
		id="<?php echo esc_attr( $toggle_id ); ?>"
		aria-expanded="false"
		aria-controls="<?php echo esc_attr( $panel_id ); ?>"
		data-nb-nav-toggle
		data-label-open="<?php echo esc_attr( $toggle_label ); ?>"
		data-label-close="<?php echo esc_attr( $toggle_close ); ?>"
	>
		<span class="<?php echo esc_attr( Support\element_class( 'nav', 'toggle-label' ) ); ?>"><?php echo esc_html( $toggle_label ); ?></span>
	</button>
	<div
		class="<?php echo esc_attr( Support\element_class( 'nav', 'panel' ) ); ?>"
		id="<?php echo esc_attr( $panel_id ); ?>"
		data-nb-nav-panel
	>
		<?php echo wp_kses_post( $menu_html ); ?>
	</div>
</nav>

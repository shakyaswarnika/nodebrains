<?php
/**
 * Single FAQ accordion item partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $faq Normalized FAQ item.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\Faq;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( empty( $faq ) || ! is_array( $faq ) ) {
	return;
}

$is_open            = ! empty( $faq['open'] );
$trigger_id         = Support\unique_id( 'faq-item', 'trigger' );
$panel_id           = Support\unique_id( 'faq-item', 'panel' );
$heading_tag        = Faq\get_question_heading_tag( $faq );
$item_attributes    = Support\merge_attributes(
	$faq,
	array(
		'class' => Faq\get_item_classes( $faq ),
	)
);
$trigger_attributes = array(
	'type'          => 'button',
	'class'         => Support\element_class( 'faq-item', 'trigger' ),
	'id'            => $trigger_id,
	'aria-expanded' => $is_open ? 'true' : 'false',
	'aria-controls' => $panel_id,
);
$panel_attributes   = array(
	'class'           => Support\element_class( 'faq-item', 'panel' ),
	'id'              => $panel_id,
	'role'            => 'region',
	'aria-labelledby' => $trigger_id,
);

if ( ! $is_open ) {
	$panel_attributes['hidden'] = 'hidden';
}
?>
<div <?php echo FrameworkHelpers\attribute_string( $item_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-nb-faq-item>
	<<?php echo tag_escape( $heading_tag ); ?> class="<?php echo esc_attr( Support\element_class( 'faq-item', 'heading' ) ); ?>">
		<button <?php echo FrameworkHelpers\attribute_string( $trigger_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-nb-faq-trigger>
			<span class="<?php echo esc_attr( Support\element_class( 'faq-item', 'question' ) ); ?>">
				<?php echo esc_html( (string) ( $faq['question'] ?? '' ) ); ?>
			</span>
			<span class="<?php echo esc_attr( Support\element_class( 'faq-item', 'icon' ) ); ?>" aria-hidden="true"></span>
		</button>
	</<?php echo tag_escape( $heading_tag ); ?>>

	<div <?php echo FrameworkHelpers\attribute_string( $panel_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-nb-faq-panel>
		<div class="<?php echo esc_attr( Support\element_class( 'faq-item', 'answer' ) ); ?>">
			<?php echo wp_kses_post( (string) ( $faq['answer'] ?? '' ) ); ?>
		</div>
	</div>
</div>

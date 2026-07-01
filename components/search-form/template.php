<?php
/**
 * Search form component template.
 *
 * @package NodeBrains
 * @since   1.0.0
 *
 * @var array<string, mixed> $args Component arguments.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use NodeBrains\Components\SearchForm;
use NodeBrains\Components\Support;
use NodeBrains\Framework\Helpers as FrameworkHelpers;

$label          = (string) ( $args['label'] ?? '' );
$placeholder    = (string) ( $args['placeholder'] ?? '' );
$button_text    = (string) ( $args['button_text'] ?? '' );
$button_sr_text = (string) ( $args['button_sr_text'] ?? '' );
$field_id       = SearchForm\get_field_id( $args );

$attributes = Support\merge_attributes(
	$args,
	array(
		'class'  => SearchForm\get_classes( $args ),
		'role'   => 'search',
		'method' => 'get',
		'action' => esc_url( SearchForm\get_action( $args ) ),
	)
);
?>
<form <?php echo FrameworkHelpers\attribute_string( $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( '' !== $label ) : ?>
		<label class="<?php echo esc_attr( Support\element_class( 'search-form', 'label' ) . ( ! empty( $args['label_hidden'] ) ? ' nb-sr-only' : '' ) ); ?>" for="<?php echo esc_attr( $field_id ); ?>">
			<?php echo esc_html( $label ); ?>
		</label>
	<?php endif; ?>
	<div class="<?php echo esc_attr( Support\element_class( 'search-form', 'fields' ) ); ?>">
		<input
			type="search"
			class="<?php echo esc_attr( Support\element_class( 'search-form', 'input' ) ); ?>"
			id="<?php echo esc_attr( $field_id ); ?>"
			name="<?php echo esc_attr( (string) ( $args['input_name'] ?? 's' ) ); ?>"
			<?php if ( '' !== $placeholder ) : ?>
				placeholder="<?php echo esc_attr( $placeholder ); ?>"
			<?php endif; ?>
			value="<?php echo esc_attr( (string) ( $args['value'] ?? '' ) ); ?>"
		>
		<?php
		nodebrains_component(
			'button',
			array(
				'text'       => $button_text,
				'type'       => 'submit',
				'variant'    => 'primary',
				'size'       => 'md',
				'class'      => Support\element_class( 'search-form', 'submit' ),
				'attributes' => array(
					'aria-label' => '' !== $button_sr_text ? $button_sr_text : null,
				),
			)
		);
		?>
	</div>
</form>

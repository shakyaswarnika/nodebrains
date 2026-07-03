<?php
/**
 * Footer component template.
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
use NodeBrains\Framework\Helpers as FrameworkHelpers;

if ( ! Footer\has_content( $args ) ) {
	return;
}

$column_plan = Footer\get_column_plan( $args );
$footer_id   = ! empty( $args['id'] ) ? (string) $args['id'] : 'colophon';

$footer_attributes = Support\merge_attributes(
	$args,
	array(
		'class' => Footer\get_classes( $args ),
		'id'    => $footer_id,
		'role'  => 'contentinfo',
	)
);

$footer_attributes['data-nb-footer'] = 'true';
?>
<footer <?php echo FrameworkHelpers\attribute_string( $footer_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="<?php echo esc_attr( Footer\get_container_class( $args ) ); ?>">
		<div class="<?php echo esc_attr( Support\element_class( 'footer', 'columns' ) ); ?>">
			<?php foreach ( $column_plan as $column_index => $blocks ) : ?>
				<?php
				$visible_blocks = array();

				foreach ( $blocks as $block ) {
					if ( Footer\show_block( $args, $block ) && Footer\block_has_output( $args, $block ) ) {
						$visible_blocks[] = $block;
					}
				}

				if ( empty( $visible_blocks ) ) {
					continue;
				}
				?>
				<div class="<?php echo esc_attr( Support\element_class( 'footer', 'column' ) ); ?>" data-nb-footer-column>
					<?php
					foreach ( $visible_blocks as $block ) {
						$block_template = Footer\get_block_template( $block );

						if ( ! is_readable( $block_template ) ) {
							continue;
						}

						$column_context = $column_index;
						include $block_template;
					}
					?>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( Footer\show_block( $args, 'copyright' ) && '' !== Footer\get_copyright_text( $args ) ) : ?>
			<?php
			$copyright_template = Footer\get_block_template( 'copyright' );

			if ( is_readable( $copyright_template ) ) {
				include $copyright_template;
			}
			?>
		<?php endif; ?>
	</div>
</footer>

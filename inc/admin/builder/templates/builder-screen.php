<?php
/**
 * Node Builder full-screen application template.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo esc_html( get_bloginfo( 'name' ) . ' — ' . __( 'Node Builder', 'nodebrains' ) ); ?></title>
	<?php wp_head(); ?>
</head>
<body class="node-builder">
<?php wp_body_open(); ?>
<div id="node-builder-root"></div>
<?php wp_footer(); ?>
</body>
</html>

<?php
/**
 * Site footer partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="site-footer__inner container">
		<?php \NodeBrains\TemplateFunctions\the_footer_widgets(); ?>
		<?php \NodeBrains\TemplateFunctions\the_footer_navigation(); ?>
		<?php \NodeBrains\TemplateFunctions\the_copyright_text(); ?>
	</div>
</footer>

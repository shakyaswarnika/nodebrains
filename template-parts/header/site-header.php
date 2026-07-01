<?php
/**
 * Site header partial.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

\NodeBrains\TemplateFunctions\the_header_banner();
?>
<header id="masthead" class="site-header" role="banner">
	<div class="site-header__inner container">
		<?php \NodeBrains\TemplateFunctions\the_site_branding(); ?>
		<?php \NodeBrains\TemplateFunctions\the_primary_navigation(); ?>
	</div>
</header>

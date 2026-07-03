<?php
/**
 * Front page template.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main id="primary" class="site-main container">

	<?php
	while ( have_posts() ) :
		the_post();
		get_template_part( 'template-parts/content/content', 'page' );
	endwhile;
	?>

</main>

<?php
\NodeBrains\Helpers\load_sidebar();
get_footer();

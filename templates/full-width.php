<?php
/**
 * Full-width page template.
 *
 * Template Name: Full Width
 * Template Post Type: page
 *
 * @package NodeBrains
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main id="primary" class="site-main site-main--full-width container">

	<?php
	while ( have_posts() ) :
		the_post();
		get_template_part( 'template-parts/content/content', 'page' );

		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}
	endwhile;
	?>

</main>

<?php
get_footer();

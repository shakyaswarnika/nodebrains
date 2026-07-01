<?php
/**
 * Main template file.
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

	<?php if ( have_posts() ) : ?>

		<?php if ( is_home() && ! is_front_page() ) : ?>
			<header class="page-header">
				<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
			</header>
		<?php endif; ?>

		<?php
		while ( have_posts() ) :
			the_post();
			get_template_part( 'template-parts/content/content' );
		endwhile;

		\NodeBrains\Helpers\the_posts_pagination_markup();
		?>

	<?php else : ?>

		<?php get_template_part( 'template-parts/content/content', 'none' ); ?>

	<?php endif; ?>

</main>

<?php
\NodeBrains\Helpers\load_sidebar();
get_footer();

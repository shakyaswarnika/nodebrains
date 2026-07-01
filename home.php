<?php
/**
 * Blog posts index template.
 *
 * Used when a static front page is set and the posts page is assigned.
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

		<header class="page-header">
			<h1 class="page-title"><?php single_post_title(); ?></h1>
		</header>

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

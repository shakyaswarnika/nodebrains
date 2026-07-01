<?php
/**
 * Template functions.
 *
 * @package NodeBrains
 * @since   1.0.0
 */

declare( strict_types=1 );

namespace NodeBrains\TemplateFunctions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Display site branding (logo or title).
 *
 * @return void
 */
function the_site_branding(): void {
	?>
	<div class="site-branding">
		<?php
		if ( has_custom_logo() ) {
			the_custom_logo();
		} else {
			?>
			<p class="site-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<?php echo esc_html( get_bloginfo( 'name' ) ); ?>
				</a>
			</p>
			<?php
			$description = get_bloginfo( 'description', 'display' );
			if ( $description || is_customize_preview() ) {
				?>
				<p class="site-description"><?php echo esc_html( $description ); ?></p>
				<?php
			}
		}
		?>
	</div>
	<?php
}

/**
 * Display optional custom header image markup.
 *
 * @return void
 */
function the_header_banner(): void {
	if ( ! \get_header_image() ) {
		return;
	}

	if ( \function_exists( 'the_custom_header_markup' ) ) {
		\the_custom_header_markup();
		return;
	}

	$header = \get_custom_header();
	?>
	<div class="custom-header">
		<img
			src="<?php echo esc_url( \get_header_image() ); ?>"
			width="<?php echo esc_attr( (string) $header->width ); ?>"
			height="<?php echo esc_attr( (string) $header->height ); ?>"
			alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
		>
	</div>
	<?php
}

/**
 * Display the primary navigation menu.
 *
 * @return void
 */
function the_primary_navigation(): void {
	if ( ! has_nav_menu( 'primary' ) ) {
		return;
	}

	wp_nav_menu(
		array(
			'theme_location'       => 'primary',
			'menu_id'              => 'primary-menu',
			'menu_class'           => 'primary-menu',
			'container'            => 'nav',
			'container_class'      => 'primary-navigation',
			'container_aria_label' => esc_attr__( 'Primary', 'nodebrains' ),
			'fallback_cb'          => false,
		)
	);
}

/**
 * Display the footer navigation menu.
 *
 * @return void
 */
function the_footer_navigation(): void {
	if ( ! has_nav_menu( 'footer' ) ) {
		return;
	}

	wp_nav_menu(
		array(
			'theme_location'       => 'footer',
			'menu_id'              => 'footer-menu',
			'menu_class'           => 'footer-menu',
			'container'            => 'nav',
			'container_class'      => 'footer-navigation',
			'container_aria_label' => esc_attr__( 'Footer', 'nodebrains' ),
			'fallback_cb'          => false,
			'depth'                => 1,
		)
	);
}

/**
 * Display footer widget area.
 *
 * @return void
 */
function the_footer_widgets(): void {
	if ( ! is_active_sidebar( 'footer-widgets' ) ) {
		return;
	}
	?>
	<div class="footer-widgets" role="complementary" aria-label="<?php esc_attr_e( 'Footer widgets', 'nodebrains' ); ?>">
		<?php dynamic_sidebar( 'footer-widgets' ); ?>
	</div>
	<?php
}

/**
 * Display copyright text from the Customizer.
 *
 * @return void
 */
function the_copyright_text(): void {
	$copyright = get_theme_mod( 'nodebrains_copyright_text', \NodeBrains\Customizer\get_default_copyright_text() );
	?>
	<div class="site-info">
		<p class="copyright-text"><?php echo esc_html( $copyright ); ?></p>
	</div>
	<?php
}

/**
 * Print HTML with meta information for the current post date.
 *
 * @return void
 */
function posted_on(): void {
	$time_string = sprintf(
		'<time class="entry-date published" datetime="%1$s">%2$s</time>',
		esc_attr( get_the_date( DATE_W3C ) ),
		esc_html( get_the_date() )
	);

	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string .= sprintf(
			'<time class="updated" datetime="%1$s">%2$s</time>',
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);
	}

	printf(
		'<span class="posted-on">%1$s <a href="%2$s" rel="bookmark">%3$s</a></span>',
		esc_html__( 'Posted on', 'nodebrains' ),
		esc_url( get_permalink() ),
		wp_kses_post( $time_string )
	);
}

/**
 * Print HTML with meta information for the current author.
 *
 * @return void
 */
function posted_by(): void {
	printf(
		'<span class="byline">%1$s <span class="author vcard"><a class="url fn n" href="%2$s">%3$s</a></span></span>',
		esc_html__( 'by', 'nodebrains' ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_html( get_the_author() )
	);
}

/**
 * Print a comments link for archive views.
 *
 * @return void
 */
function comments_link(): void {
	if ( is_single() || post_password_required() || ( ! comments_open() && ! get_comments_number() ) ) {
		return;
	}

	$comment_count = (int) get_comments_number();

	if ( 0 === $comment_count ) {
		$label = esc_html__( 'Leave a comment', 'nodebrains' );
	} elseif ( 1 === $comment_count ) {
		$label = esc_html__( '1 Comment', 'nodebrains' );
	} else {
		$label = sprintf(
			/* translators: %s: comment count */
			esc_html__( '%s Comments', 'nodebrains' ),
			number_format_i18n( $comment_count )
		);
	}

	printf(
		'<span class="comments-link"><a href="%1$s">%2$s</a></span>',
		esc_url( get_comments_link() ),
		esc_html( $label )
	);
}

/**
 * Print entry footer meta for posts.
 *
 * @return void
 */
function entry_footer(): void {
	if ( 'post' !== get_post_type() ) {
		return;
	}

	$categories_list = get_the_category_list( esc_html__( ', ', 'nodebrains' ) );
	$tags_list       = get_the_tag_list( '', esc_html__( ', ', 'nodebrains' ) );

	if ( $categories_list ) {
		printf(
			'<span class="cat-links">%1$s %2$s</span>',
			esc_html__( 'Posted in', 'nodebrains' ),
			wp_kses_post( $categories_list )
		);
	}

	if ( $tags_list ) {
		printf(
			'<span class="tags-links">%1$s %2$s</span>',
			esc_html__( 'Tagged', 'nodebrains' ),
			wp_kses_post( $tags_list )
		);
	}

	comments_link();
}

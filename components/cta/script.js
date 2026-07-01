/**
 * CTA component interactions.
 *
 * Optional scroll-reveal animation with reduced-motion support.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	function prefersReducedMotion() {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function revealElement(element) {
		element.classList.add('is-visible');
	}

	function initReveal(root) {
		if (prefersReducedMotion()) {
			revealElement(root);
			return;
		}

		if (!('IntersectionObserver' in window)) {
			revealElement(root);
			return;
		}

		var observer = new IntersectionObserver(
			function (entries, obs) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) {
						return;
					}

					revealElement(entry.target);
					obs.unobserve(entry.target);
				});
			},
			{
				root: null,
				rootMargin: '0px 0px -10% 0px',
				threshold: 0.15,
			}
		);

		observer.observe(root);
	}

	function init() {
		document.querySelectorAll('[data-nb-cta-reveal="true"]').forEach(initReveal);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

/**
 * Testimonials component interactions.
 *
 * Optional slider and equal-height grid support.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	var BREAKPOINTS = [
		{ minWidth: 62, key: 'lg' },
		{ minWidth: 48, key: 'md' },
		{ minWidth: 0, key: 'sm' },
	];

	function parseColumns(root) {
		var raw = root.getAttribute('data-nb-testimonials-columns');

		if (!raw) {
			return { sm: 1, md: 2, lg: 3 };
		}

		try {
			var parsed = JSON.parse(raw);

			if (parsed && typeof parsed === 'object') {
				return parsed;
			}
		} catch (error) {
			return { sm: 1, md: 2, lg: 3 };
		}

		return { sm: 1, md: 2, lg: 3 };
	}

	function getActiveColumns(columns) {
		var widthRem =
			window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize);

		for (var i = 0; i < BREAKPOINTS.length; i += 1) {
			if (widthRem >= BREAKPOINTS[i].minWidth) {
				var count = parseInt(columns[BREAKPOINTS[i].key], 10);

				return count > 0 ? count : 1;
			}
		}

		return 1;
	}

	function equalizeRow(items) {
		var maxHeight = 0;

		items.forEach(function (item) {
			item.style.minHeight = '';
		});

		items.forEach(function (item) {
			maxHeight = Math.max(maxHeight, item.offsetHeight);
		});

		if (maxHeight <= 0) {
			return;
		}

		items.forEach(function (item) {
			item.style.minHeight = maxHeight + 'px';
		});
	}

	function equalizeTestimonials(root) {
		var items = Array.prototype.slice.call(root.querySelectorAll('.nb-c-testimonials-item'));

		if (items.length < 2) {
			return;
		}

		var columns = getActiveColumns(parseColumns(root));

		for (var i = 0; i < items.length; i += columns) {
			equalizeRow(items.slice(i, i + columns));
		}
	}

	function initEqualHeight(root) {
		if (root.getAttribute('data-nb-testimonials-equal-height') !== 'true') {
			return;
		}

		equalizeTestimonials(root);

		var resizeTimer;

		window.addEventListener('resize', function () {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(function () {
				equalizeTestimonials(root);
			}, 150);
		});
	}

	function getSlides(root) {
		return Array.prototype.slice.call(root.querySelectorAll('[data-nb-testimonials-slide]'));
	}

	function getDots(root) {
		return Array.prototype.slice.call(root.querySelectorAll('[data-nb-testimonials-dot]'));
	}

	function showSlide(root, index) {
		var slides = getSlides(root);
		var dots = getDots(root);

		if (!slides.length) {
			return;
		}

		var target = ((index % slides.length) + slides.length) % slides.length;

		slides.forEach(function (slide, slideIndex) {
			if (slideIndex === target) {
				slide.removeAttribute('hidden');
			} else {
				slide.setAttribute('hidden', 'hidden');
			}
		});

		dots.forEach(function (dot, dotIndex) {
			dot.setAttribute('aria-selected', dotIndex === target ? 'true' : 'false');
		});

		root.setAttribute('data-nb-testimonials-active', String(target));
	}

	function getActiveIndex(root) {
		var value = parseInt(root.getAttribute('data-nb-testimonials-active'), 10);

		return Number.isNaN(value) ? 0 : value;
	}

	function initSlider(root) {
		var slider = root.querySelector('[data-nb-testimonials-track-wrap]');

		if (!slider) {
			return;
		}

		var slides = getSlides(slider);

		if (slides.length < 2) {
			return;
		}

		var autoplay = root.getAttribute('data-nb-testimonials-autoplay') === 'true';
		var interval = parseInt(root.getAttribute('data-nb-testimonials-interval'), 10) || 5000;
		var timer = null;

		function goTo(index) {
			showSlide(slider, index);
		}

		function goNext() {
			goTo(getActiveIndex(slider) + 1);
		}

		function goPrev() {
			goTo(getActiveIndex(slider) - 1);
		}

		function stopAutoplay() {
			if (timer) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function startAutoplay() {
			stopAutoplay();

			if (!autoplay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				return;
			}

			timer = window.setInterval(goNext, interval);
		}

		showSlide(slider, 0);

		root.addEventListener('click', function (event) {
			if (event.target.closest('[data-nb-testimonials-next]')) {
				event.preventDefault();
				goNext();
				startAutoplay();
			}

			if (event.target.closest('[data-nb-testimonials-prev]')) {
				event.preventDefault();
				goPrev();
				startAutoplay();
			}

			var dot = event.target.closest('[data-nb-testimonials-dot]');

			if (dot) {
				event.preventDefault();
				goTo(parseInt(dot.getAttribute('data-index'), 10) || 0);
				startAutoplay();
			}
		});

		root.addEventListener('keydown', function (event) {
			if (!root.contains(event.target)) {
				return;
			}

			switch (event.key) {
				case 'ArrowRight':
					event.preventDefault();
					goNext();
					startAutoplay();
					break;

				case 'ArrowLeft':
					event.preventDefault();
					goPrev();
					startAutoplay();
					break;

				case 'Home':
					event.preventDefault();
					goTo(0);
					startAutoplay();
					break;

				case 'End':
					event.preventDefault();
					goTo(slides.length - 1);
					startAutoplay();
					break;

				default:
					break;
			}
		});

		slider.addEventListener('mouseenter', stopAutoplay);
		slider.addEventListener('mouseleave', startAutoplay);
		slider.addEventListener('focusin', stopAutoplay);
		slider.addEventListener('focusout', startAutoplay);

		startAutoplay();
	}

	function initTestimonials(root) {
		if (root.getAttribute('data-nb-testimonials-slider') === 'true') {
			initSlider(root);
		} else {
			initEqualHeight(root);
		}
	}

	function init() {
		document.querySelectorAll('[data-nb-testimonials="true"]').forEach(initTestimonials);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

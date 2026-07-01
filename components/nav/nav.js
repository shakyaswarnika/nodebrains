/**
 * Nav component interactions.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	function initNav(root) {
		const toggle = root.querySelector('[data-nb-nav-toggle]');
		const panel = root.querySelector('[data-nb-nav-panel]');

		if (!toggle || !panel) {
			return;
		}

		const labelOpen = toggle.getAttribute('data-label-open') || '';
		const labelClose = toggle.getAttribute('data-label-close') || '';
		const labelEl = toggle.querySelector('.nb-c-nav__toggle-label');

		function setOpen(isOpen) {
			root.classList.toggle('is-open', isOpen);
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

			if (labelEl) {
				labelEl.textContent = isOpen ? labelClose : labelOpen;
			}
		}

		toggle.addEventListener('click', function () {
			const isOpen = root.classList.contains('is-open');
			setOpen(!isOpen);
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && root.classList.contains('is-open')) {
				setOpen(false);
				toggle.focus();
			}
		});

		window.addEventListener('resize', function () {
			if (window.matchMedia('(min-width: 62rem)').matches) {
				setOpen(false);
			}
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-nav]').forEach(initNav);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

/**
 * Footer component interactions.
 *
 * Prevents placeholder newsletter submission and supports optional column toggles.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	function initNewsletterPlaceholder(root) {
		var forms = root.querySelectorAll('[data-nb-footer-newsletter-form]');

		forms.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				event.preventDefault();
			});
		});
	}

	function initFooter(root) {
		initNewsletterPlaceholder(root);
	}

	function init() {
		document.querySelectorAll('[data-nb-footer="true"]').forEach(initFooter);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

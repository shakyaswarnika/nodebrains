/**
 * Alert component interactions.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	function initAlert(root) {
		const dismiss = root.querySelector('[data-nb-alert-dismiss]');

		if (!dismiss) {
			return;
		}

		dismiss.addEventListener('click', function () {
			root.classList.add('is-dismissed');
			root.setAttribute('aria-hidden', 'true');
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-dismissible="true"]').forEach(initAlert);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

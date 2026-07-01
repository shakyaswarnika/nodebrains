/**
 * Banner component interactions.
 *
 * Handles optional dismissible banners with session persistence.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	var STORAGE_PREFIX = 'nb-banner-dismissed-';

	function isDismissed(storageKey) {
		try {
			return window.sessionStorage.getItem(STORAGE_PREFIX + storageKey) === '1';
		} catch (error) {
			return false;
		}
	}

	function setDismissed(storageKey) {
		try {
			window.sessionStorage.setItem(STORAGE_PREFIX + storageKey, '1');
		} catch (error) {
			// Storage unavailable; banner still hides for current view.
		}
	}

	function initBanner(root) {
		var storageKey = root.getAttribute('data-nb-banner-dismiss') || 'nb-banner-default';
		var closeButton = root.querySelector('[data-nb-banner-close]');

		if (isDismissed(storageKey)) {
			root.classList.add('is-dismissed');
			root.setAttribute('aria-hidden', 'true');
			return;
		}

		if (!closeButton) {
			return;
		}

		closeButton.addEventListener('click', function () {
			root.classList.add('is-dismissed');
			root.setAttribute('aria-hidden', 'true');
			setDismissed(storageKey);
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-banner="true"]').forEach(initBanner);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

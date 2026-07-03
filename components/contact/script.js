/**
 * Contact component interactions.
 *
 * Lazy-loads Google Maps embed on user request.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	function loadMap(root) {
		var url = root.getAttribute('data-nb-contact-map-url');
		var title = root.getAttribute('data-nb-contact-map-title') || 'Map';
		var targetId = root.getAttribute('data-nb-contact-map-target');
		var placeholder = root.querySelector('[data-nb-contact-map-placeholder]');
		var target = targetId ? document.getElementById(targetId) : null;

		if (!url || !target) {
			return;
		}

		var iframe = document.createElement('iframe');

		iframe.className = 'nb-c-contact__map-embed';
		iframe.title = title;
		iframe.src = url;
		iframe.loading = 'lazy';
		iframe.referrerPolicy = 'no-referrer-when-downgrade';
		iframe.setAttribute('allowfullscreen', '');

		target.innerHTML = '';
		target.appendChild(iframe);
		target.removeAttribute('hidden');

		if (placeholder) {
			placeholder.setAttribute('hidden', 'hidden');
		}

		root.setAttribute('data-nb-contact-map-loaded', 'true');
	}

	function initContactMap(root) {
		if (root.getAttribute('data-nb-contact-map-loaded') === 'true') {
			return;
		}

		var loadButton = root.querySelector('[data-nb-contact-map-load]');

		if (loadButton) {
			loadButton.addEventListener('click', function () {
				loadMap(root);
				loadButton.blur();
			});
		}
	}

	function init() {
		document.querySelectorAll('[data-nb-contact-map="true"]').forEach(initContactMap);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

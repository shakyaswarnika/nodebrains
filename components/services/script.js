/**
 * Services component interactions.
 *
 * Equalizes service item heights per grid row when enabled.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

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

	function equalizeServices(root) {
		var items = Array.prototype.slice.call(root.querySelectorAll('.nb-c-services-item'));

		if (items.length < 2) {
			return;
		}

		var columns = 1;

		if (window.matchMedia('(min-width: 62rem)').matches) {
			columns = 3;
		} else if (window.matchMedia('(min-width: 48rem)').matches) {
			columns = 2;
		}

		for (var i = 0; i < items.length; i += columns) {
			equalizeRow(items.slice(i, i + columns));
		}
	}

	function initServices(root) {
		if (root.getAttribute('data-nb-services-equal-height') !== 'true') {
			return;
		}

		equalizeServices(root);

		var resizeTimer;

		window.addEventListener('resize', function () {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(function () {
				equalizeServices(root);
			}, 150);
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-services="true"]').forEach(initServices);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

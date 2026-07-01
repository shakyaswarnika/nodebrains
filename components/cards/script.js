/**
 * Cards component interactions.
 *
 * Equalizes card body heights within each row when enabled.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	function equalizeRow(items, bodySelector) {
		var maxHeight = 0;

		items.forEach(function (item) {
			var body = item.querySelector(bodySelector);

			if (!body) {
				return;
			}

			body.style.minHeight = '';
		});

		items.forEach(function (item) {
			var body = item.querySelector(bodySelector);

			if (!body) {
				return;
			}

			maxHeight = Math.max(maxHeight, body.offsetHeight);
		});

		if (maxHeight <= 0) {
			return;
		}

		items.forEach(function (item) {
			var body = item.querySelector(bodySelector);

			if (!body) {
				return;
			}

			body.style.minHeight = maxHeight + 'px';
		});
	}

	function equalizeCards(root) {
		var items = Array.prototype.slice.call(root.querySelectorAll('.nb-c-cards-item'));

		if (items.length < 2) {
			return;
		}

		var bodySelector = '.nb-c-cards-item__body';
		var columns = 1;

		if (window.matchMedia('(min-width: 62rem)').matches) {
			columns = 3;
		} else if (window.matchMedia('(min-width: 48rem)').matches) {
			columns = 2;
		}

		for (var i = 0; i < items.length; i += columns) {
			equalizeRow(items.slice(i, i + columns), bodySelector);
		}
	}

	function initCards(root) {
		if (root.getAttribute('data-nb-cards-equal-height') !== 'true') {
			return;
		}

		equalizeCards(root);

		var resizeTimer;

		window.addEventListener('resize', function () {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(function () {
				equalizeCards(root);
			}, 150);
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-cards="true"]').forEach(initCards);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

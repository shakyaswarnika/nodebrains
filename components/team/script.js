/**
 * Team component interactions.
 *
 * Equalizes team member card heights per grid row when enabled.
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
		var raw = root.getAttribute('data-nb-team-columns');

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

	function equalizeTeam(root) {
		var items = Array.prototype.slice.call(root.querySelectorAll('.nb-c-team-member'));

		if (items.length < 2) {
			return;
		}

		var columns = getActiveColumns(parseColumns(root));

		for (var i = 0; i < items.length; i += columns) {
			equalizeRow(items.slice(i, i + columns));
		}
	}

	function initTeam(root) {
		if (root.getAttribute('data-nb-team-equal-height') !== 'true') {
			return;
		}

		equalizeTeam(root);

		var resizeTimer;

		window.addEventListener('resize', function () {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(function () {
				equalizeTeam(root);
			}, 150);
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-team="true"]').forEach(initTeam);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

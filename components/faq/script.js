/**
 * FAQ component accordion interactions.
 *
 * Implements WAI-ARIA accordion keyboard navigation.
 *
 * @package NodeBrains
 */

(function () {
	'use strict';

	var KEYS = {
		ARROW_DOWN: 'ArrowDown',
		ARROW_UP: 'ArrowUp',
		END: 'End',
		HOME: 'Home',
		ENTER: 'Enter',
		SPACE: ' ',
	};

	function getTriggers(root) {
		return Array.prototype.slice.call(root.querySelectorAll('[data-nb-faq-trigger]'));
	}

	function getItem(trigger) {
		return trigger.closest('[data-nb-faq-item]');
	}

	function getPanel(trigger) {
		var panelId = trigger.getAttribute('aria-controls');

		if (!panelId) {
			return null;
		}

		return document.getElementById(panelId);
	}

	function isOpen(trigger) {
		return trigger.getAttribute('aria-expanded') === 'true';
	}

	function setOpen(trigger, open) {
		var item = getItem(trigger);
		var panel = getPanel(trigger);

		if (!item || !panel) {
			return;
		}

		trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
		item.classList.toggle('nb-c-faq-item--is-open', open);

		if (open) {
			panel.removeAttribute('hidden');
		} else {
			panel.setAttribute('hidden', 'hidden');
		}
	}

	function closeOthers(root, activeTrigger) {
		getTriggers(root).forEach(function (trigger) {
			if (trigger !== activeTrigger) {
				setOpen(trigger, false);
			}
		});
	}

	function toggleTrigger(root, trigger, allowMultiple) {
		var willOpen = !isOpen(trigger);

		if (willOpen && !allowMultiple) {
			closeOthers(root, trigger);
		}

		setOpen(trigger, willOpen);
	}

	function focusTrigger(triggers, index) {
		if (!triggers.length) {
			return;
		}

		var target = triggers[index];

		if (target) {
			target.focus();
		}
	}

	function handleKeydown(root, allowMultiple, event) {
		var trigger = event.target;

		if (!trigger.matches('[data-nb-faq-trigger]')) {
			return;
		}

		var triggers = getTriggers(root);
		var index = triggers.indexOf(trigger);

		if (index < 0) {
			return;
		}

		switch (event.key) {
			case KEYS.ARROW_DOWN:
				event.preventDefault();
				focusTrigger(triggers, (index + 1) % triggers.length);
				break;

			case KEYS.ARROW_UP:
				event.preventDefault();
				focusTrigger(triggers, (index - 1 + triggers.length) % triggers.length);
				break;

			case KEYS.HOME:
				event.preventDefault();
				focusTrigger(triggers, 0);
				break;

			case KEYS.END:
				event.preventDefault();
				focusTrigger(triggers, triggers.length - 1);
				break;

			case KEYS.ENTER:
			case KEYS.SPACE:
				event.preventDefault();
				toggleTrigger(root, trigger, allowMultiple);
				break;

			default:
				break;
		}
	}

	function enforceSingleOpen(root) {
		var triggers = getTriggers(root);
		var openTrigger = null;

		triggers.forEach(function (trigger) {
			if (isOpen(trigger) && !openTrigger) {
				openTrigger = trigger;
				return;
			}

			if (isOpen(trigger)) {
				setOpen(trigger, false);
			}
		});
	}

	function initFaq(root) {
		var allowMultiple = root.getAttribute('data-nb-faq-allow-multiple') === 'true';

		if (!allowMultiple) {
			enforceSingleOpen(root);
		}

		root.addEventListener('click', function (event) {
			var trigger = event.target.closest('[data-nb-faq-trigger]');

			if (!trigger || !root.contains(trigger)) {
				return;
			}

			toggleTrigger(root, trigger, allowMultiple);
		});

		root.addEventListener('keydown', function (event) {
			handleKeydown(root, allowMultiple, event);
		});
	}

	function init() {
		document.querySelectorAll('[data-nb-faq="true"]').forEach(initFaq);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

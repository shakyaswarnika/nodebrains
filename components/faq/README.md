# FAQ Component

Accessible accordion FAQ section with question/answer pairs. Builder-ready via `Faq\get_builder_schema()`.

## Files

| File            | Purpose                                 |
| --------------- | --------------------------------------- |
| `component.php` | Defaults, normalization, builder schema |
| `template.php`  | Section wrapper and accordion list      |
| `faq-item.php`  | Single FAQ accordion partial            |
| `style.css`     | Token-based responsive styles           |
| `script.js`     | Accordion toggle and keyboard nav       |
| `README.md`     | Documentation                           |

## Usage

```php
nodebrains_component(
	'faq',
	array(
		'heading'        => __( 'Frequently Asked Questions', 'nodebrains' ),
		'description'    => $section_intro,
		'variant'        => 'bordered',
		'allow_multiple' => true,
		'open_first'     => true,
		'faqs'           => array(
			array(
				'question' => __( 'What is NodeBrains?', 'nodebrains' ),
				'answer'   => $answer_one,
			),
			array(
				'question' => __( 'How do I get started?', 'nodebrains' ),
				'answer'   => $answer_two,
				'open'     => true,
			),
		),
	)
);
```

## Section arguments

| Key               | Type   | Default   | Description                        |
| ----------------- | ------ | --------- | ---------------------------------- |
| `faqs`            | array  | `[]`      | List of FAQ items                  |
| `heading`         | string | `''`      | Section heading                    |
| `description`     | string | `''`      | Section description                |
| `heading_level`   | int    | `2`       | Section heading level              |
| `question_level`  | int    | `3`       | Default question heading level     |
| `variant`         | string | `default` | `default`, `bordered`, `separated` |
| `allow_multiple`  | bool   | `true`    | Allow multiple panels open at once |
| `open_first`      | bool   | `false`   | Open the first item on load        |
| `container_width` | string | `default` | Container variant                  |
| `class`           | string | `''`      | Extra classes                      |
| `id`              | string | `''`      | HTML `id`                          |
| `attributes`      | array  | `[]`      | Extra attributes                   |

## FAQ item fields

| Key             | Type   | Description                         |
| --------------- | ------ | ----------------------------------- |
| `question`      | string | Accordion trigger text              |
| `answer`        | string | Panel content (rich text supported) |
| `open`          | bool   | Open this item on load              |
| `heading_level` | int    | Override question heading level     |
| `class`         | string | Extra item classes                  |
| `attributes`    | array  | Extra item attributes               |

## Accessibility

- Follows the [WAI-ARIA accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).
- Each question is a `<button>` inside a semantic heading with `aria-expanded` and `aria-controls`.
- Answer panels use `role="region"` and `aria-labelledby` linked to the trigger.
- Closed panels use the native `hidden` attribute.
- Section uses `aria-labelledby` or `aria-label` when no heading is provided.
- Decorative expand/collapse icon is `aria-hidden`.

## Keyboard navigation

| Key         | Action                  |
| ----------- | ----------------------- |
| `Enter`     | Toggle focused question |
| `Space`     | Toggle focused question |
| `ArrowDown` | Focus next question     |
| `ArrowUp`   | Focus previous question |
| `Home`      | Focus first question    |
| `End`       | Focus last question     |

When `allow_multiple` is `false`, opening one panel closes the others (classic accordion).

## Filters

- `nodebrains_component_faq_args`
- `nodebrains_component_faq_html`

## BEM

```
nb-c-faq
nb-c-faq__list
nb-c-faq-item
nb-c-faq-item__trigger
nb-c-faq-item__panel
nb-c-faq-item__answer
```

## Builder compatibility

`get_builder_schema()` exposes a `faqs` repeater with question, answer, and per-item open state, plus layout and behavior controls.

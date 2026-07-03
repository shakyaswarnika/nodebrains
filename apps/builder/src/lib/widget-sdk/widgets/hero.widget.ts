import { defineWidget, asWidgetTypeId } from '../core/define-widget';
import { escapeHtml, readBoolean, readString } from '../rendering/widget-renderer-registry';
import type {
	AlignmentValue,
	BorderValue,
	PropertyFieldMap,
	ShadowValue,
	SpacingValue,
	TypographyValue,
	VisibilityValue,
} from '@theme/builder/property-system/types';

const heroSchema = {
	title: {
		type: 'string',
		label: 'Title',
		default: 'Build with NodeBrains',
		required: true,
		maxLength: 120,
		group: 'content',
		order: 1,
	},
	subtitle: {
		type: 'string',
		label: 'Subtitle',
		default: 'A lightweight WordPress theme with a proprietary visual builder.',
		maxLength: 240,
		group: 'content',
		order: 2,
	},
	showCta: {
		type: 'boolean',
		label: 'Show CTA',
		default: true,
		group: 'content',
		order: 3,
	},
	ctaLabel: {
		type: 'string',
		label: 'CTA Label',
		default: 'Get Started',
		group: 'content',
		order: 4,
		visibleWhen: { field: 'showCta', equals: true },
	},
	contentAlignment: {
		type: 'alignment',
		label: 'Content alignment',
		group: 'layout',
		order: 1,
		responsive: true,
		default: { horizontal: 'left', vertical: 'center' },
	},
	columns: {
		type: 'responsive-columns',
		label: 'Columns',
		default: 1,
		min: 1,
		max: 2,
		group: 'layout',
		order: 2,
		responsive: true,
	},
	padding: {
		type: 'spacing',
		label: 'Padding',
		group: 'spacing',
		order: 1,
		responsive: true,
		default: { top: 48, right: 24, bottom: 48, left: 24, linked: false },
	},
	typography: {
		type: 'typography',
		label: 'Title typography',
		group: 'typography',
		order: 1,
		responsive: true,
		default: {
			fontFamily: 'Inter',
			fontSize: '3rem',
			fontWeight: '700',
			lineHeight: '1.1',
			letterSpacing: '-0.02em',
			textTransform: 'none',
		},
	},
	accentColor: {
		type: 'color',
		label: 'Accent color',
		group: 'style',
		order: 1,
		tokens: true,
		default: '#6366f1',
	},
	overlayOpacity: {
		type: 'slider',
		label: 'Overlay opacity',
		min: 0,
		max: 100,
		step: 1,
		unit: '%',
		group: 'style',
		order: 2,
		default: 60,
	},
	border: {
		type: 'border',
		label: 'Container border',
		group: 'border',
		order: 1,
		default: { width: 0, style: 'solid', color: '#334155', radius: 16 },
	},
	shadow: {
		type: 'shadow',
		label: 'Drop shadow',
		group: 'effects',
		order: 1,
		default: { x: 0, y: 12, blur: 32, spread: -8, color: 'rgba(15, 23, 42, 0.35)' },
	},
	visibility: {
		type: 'visibility',
		label: 'Visibility',
		group: 'visibility',
		order: 1,
		responsive: true,
		default: { visible: true, display: 'block', opacity: 100 },
	},
} satisfies PropertyFieldMap;

function readAlignment(value: unknown, fallback: AlignmentValue['horizontal'] = 'left'): string {
	if (typeof value === 'string') {
		return value;
	}

	if (typeof value === 'object' && value !== null && 'horizontal' in value) {
		return String((value as AlignmentValue).horizontal ?? fallback);
	}

	return fallback;
}

function spacingToCss(value: unknown): string {
	const spacing = (typeof value === 'object' && value !== null ? value : {}) as SpacingValue;

	return `${spacing.top ?? 0}px ${spacing.right ?? 0}px ${spacing.bottom ?? 0}px ${spacing.left ?? 0}px`;
}

function typographyToCss(value: unknown): string {
	const typography = (typeof value === 'object' && value !== null ? value : {}) as TypographyValue;
	const parts = [
		typography.fontWeight ? `font-weight:${typography.fontWeight}` : '',
		typography.fontSize ? `font-size:${typography.fontSize}` : '',
		typography.lineHeight ? `line-height:${typography.lineHeight}` : '',
		typography.letterSpacing ? `letter-spacing:${typography.letterSpacing}` : '',
		typography.textTransform ? `text-transform:${typography.textTransform}` : '',
		typography.fontFamily ? `font-family:${typography.fontFamily}` : '',
	].filter(Boolean);

	return parts.join(';');
}

function borderToCss(value: unknown): string {
	const border = (typeof value === 'object' && value !== null ? value : {}) as BorderValue;
	const width = border.width ?? 0;
	const style = border.style ?? 'solid';
	const color = border.color ?? 'transparent';
	const radius = border.radius ?? 0;

	return `border:${width}px ${style} ${color};border-radius:${radius}px;`;
}

function shadowToCss(value: unknown): string {
	const shadow = (typeof value === 'object' && value !== null ? value : {}) as ShadowValue;
	const inset = shadow.inset ? 'inset ' : '';

	return `box-shadow:${inset}${shadow.x ?? 0}px ${shadow.y ?? 0}px ${shadow.blur ?? 0}px ${shadow.spread ?? 0}px ${shadow.color ?? 'transparent'};`;
}

function visibilityToCss(value: unknown): string {
	const visibility = (typeof value === 'object' && value !== null ? value : {}) as VisibilityValue;
	const opacity = (visibility.opacity ?? 100) / 100;

	return `opacity:${opacity};display:${visibility.visible === false ? 'none' : visibility.display ?? 'block'};`;
}

export const heroWidget = defineWidget({
	metadata: {
		type: asWidgetTypeId('content.hero'),
		name: 'Hero',
		description: 'Hero banner content block',
		icon: 'H',
		version: '1.0.0',
		kind: 'template',
		category: 'content',
		paletteGroup: 'content',
		keywords: ['banner', 'header', 'hero'],
		componentSlug: 'hero' as never,
	},
	defaults: {
		title: 'Build with NodeBrains',
		subtitle: 'A lightweight WordPress theme with a proprietary visual builder.',
		showCta: true,
		ctaLabel: 'Get Started',
		contentAlignment: { horizontal: 'left', vertical: 'center' },
		columns: 1,
		padding: { top: 48, right: 24, bottom: 48, left: 24, linked: false },
		typography: {
			fontFamily: 'Inter',
			fontSize: '3rem',
			fontWeight: '700',
			lineHeight: '1.1',
			letterSpacing: '-0.02em',
			textTransform: 'none',
		},
		accentColor: '#6366f1',
		overlayOpacity: 60,
		border: { width: 0, style: 'solid', color: '#334155', radius: 16 },
		shadow: { x: 0, y: 12, blur: 32, spread: -8, color: 'rgba(15, 23, 42, 0.35)' },
		visibility: { visible: true, display: 'block', opacity: 100 },
	},
	schema: heroSchema,
	responsive: {
		fields: ['contentAlignment', 'columns', 'padding', 'typography', 'visibility'],
	},
	renderer: {
		mode: 'client',
		render({ props, context }) {
			const title = readString(props, 'title', 'Hero');
			const subtitle = readString(props, 'subtitle');
			const alignment = readAlignment(props.contentAlignment, 'left');
			const showCta = readBoolean(props, 'showCta', true);
			const ctaLabel = readString(props, 'ctaLabel', 'Get Started');
			const accentColor = readString(props, 'accentColor', '#6366f1');
			const modeLabel = context.isEditor ? 'Editor Preview' : 'Preview';

			return {
				className: 'nb-widget nb-widget-hero',
				html: `
					<div
						class="nb-widget-hero__inner"
						style="
							text-align:${escapeHtml(alignment)};
							padding:${escapeHtml(spacingToCss(props.padding))};
							${escapeHtml(borderToCss(props.border))}
							${escapeHtml(shadowToCss(props.shadow))}
							${escapeHtml(visibilityToCss(props.visibility))}
						"
					>
						<p class="nb-widget-hero__eyebrow">${escapeHtml(modeLabel)} · ${escapeHtml(String(context.breakpoint))}</p>
						<h2 class="nb-widget-hero__title" style="${escapeHtml(typographyToCss(props.typography))}">${escapeHtml(title)}</h2>
						${subtitle ? `<p class="nb-widget-hero__subtitle">${escapeHtml(subtitle)}</p>` : ''}
						${showCta ? `<span class="nb-widget-hero__cta" style="background:${escapeHtml(accentColor)}">${escapeHtml(ctaLabel)}</span>` : ''}
					</div>
				`.trim(),
			};
		},
	},
});

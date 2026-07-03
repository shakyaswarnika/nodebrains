/**
 * Responsive inheritance and editor breakpoint tests.
 */

import {
	clearResponsiveOverride,
	countResponsiveOverrides,
	getEditorBreakpoint,
	getPreviewWidth,
	getResponsiveInheritance,
	getTechnicalBreakpoint,
	writeResponsiveOverride,
} from '../apps/builder/src/lib/responsive-engine/index.ts';

function assert(condition: unknown, message: string): void {
	if (!condition) {
		throw new Error(message);
	}
}

function testEditorBreakpoints(): void {
	assert(getTechnicalBreakpoint('mobile') === 'base', 'Mobile maps to base slug');
	assert(getTechnicalBreakpoint('tablet') === 'md', 'Tablet maps to md slug');
	assert(getTechnicalBreakpoint('desktop') === 'lg', 'Desktop maps to lg slug');
	assert(getPreviewWidth('mobile') === 390, 'Mobile preview width should be 390');
	assert(getEditorBreakpoint('desktop').label === 'Desktop', 'Desktop label should resolve');
}

function testInheritanceCascade(): void {
	const value = writeResponsiveOverride('Hello', 'base', 'Hello');
	const tabletValue = writeResponsiveOverride(value, 'md', 'Tablet title');

	const mobileInfo = getResponsiveInheritance(tabletValue, 'base');
	assert(mobileInfo.resolved === 'Hello', 'Base should resolve mobile/base value');
	assert(!mobileInfo.inherited, 'Base value should not be inherited');

	const tabletInfo = getResponsiveInheritance(tabletValue, 'md');
	assert(tabletInfo.resolved === 'Tablet title', 'Tablet should resolve override');
	assert(tabletInfo.hasOverride, 'Tablet should have direct override');

	const desktopInfo = getResponsiveInheritance(tabletValue, 'lg');
	assert(desktopInfo.resolved === 'Tablet title', 'Desktop should inherit tablet override');
	assert(desktopInfo.inherited, 'Desktop should mark inherited state');
	assert(desktopInfo.sourceLabel === 'Tablet', 'Desktop should inherit from tablet label');
}

function testClearOverride(): void {
	const value = {
		base: 'Base',
		md: 'Tablet',
		lg: 'Desktop',
	};

	const clearedTablet = clearResponsiveOverride(value, 'md');
	const tabletInfo = getResponsiveInheritance(clearedTablet, 'md');
	assert(tabletInfo.resolved === 'Base', 'Cleared tablet override should fall back to base');
	assert(!tabletInfo.hasOverride, 'Tablet should no longer have override after clear');

	const collapsed = clearResponsiveOverride({ base: 'Only base' }, 'md');
	assert(collapsed === 'Only base', 'Single base entry should collapse to scalar');
}

function testOverrideCount(): void {
	const props = {
		title: 'Plain',
		padding: { base: { top: 8 }, md: { top: 16 } },
		alignment: { base: { horizontal: 'left' }, lg: { horizontal: 'center' } },
	};

	assert(countResponsiveOverrides(props) === 2, 'Should count fields with breakpoint overrides');
}

const tests = [
	['editor breakpoints', testEditorBreakpoints],
	['inheritance cascade', testInheritanceCascade],
	['clear override', testClearOverride],
	['override count', testOverrideCount],
] as const;

let passed = 0;

for (const [name, run] of tests) {
	run();
	passed += 1;
	console.log(`✓ ${name}`);
}

console.log(`\n${passed}/${tests.length} responsive inheritance tests passed`);

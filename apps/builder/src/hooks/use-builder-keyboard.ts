'use client';

import { useEffect } from 'react';

import type { EditorDeviceSlug } from '@builder/lib/responsive-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';

const DEVICE_SHORTCUTS: Record<string, EditorDeviceSlug> = {
	'1': 'mobile',
	'2': 'tablet',
	'3': 'desktop',
};

function isEditableTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	const tag = target.tagName.toLowerCase();

	return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
}

export function useBuilderKeyboard(): void {
	const canvasMode = useBuilderStore((state) => state.canvasMode);
	const deleteSelectedNode = useBuilderStore((state) => state.deleteSelectedNode);
	const duplicateSelectedNode = useBuilderStore((state) => state.duplicateSelectedNode);
	const copySelectedNode = useBuilderStore((state) => state.copySelectedNode);
	const pasteClipboard = useBuilderStore((state) => state.pasteClipboard);
	const clearDragState = useBuilderStore((state) => state.clearDragState);
	const setEditorDevice = useBuilderStore((state) => state.setEditorDevice);
	const toggleResponsivePreview = useBuilderStore((state) => state.toggleResponsivePreview);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent): void {
			if (canvasMode !== 'edit' || isEditableTarget(event.target)) {
				return;
			}

			const mod = event.metaKey || event.ctrlKey;
			const device = DEVICE_SHORTCUTS[event.key];

			if (mod && event.shiftKey && device) {
				event.preventDefault();
				setEditorDevice(device);
				return;
			}

			if (mod && event.shiftKey && event.key.toLowerCase() === 'p') {
				event.preventDefault();
				toggleResponsivePreview();
				return;
			}

			if (event.key === 'Escape') {
				clearDragState();
				return;
			}

			if (event.key === 'Delete' || event.key === 'Backspace') {
				event.preventDefault();
				deleteSelectedNode();
				return;
			}

			if (mod && event.key.toLowerCase() === 'd') {
				event.preventDefault();
				duplicateSelectedNode();
				return;
			}

			if (mod && event.key.toLowerCase() === 'c') {
				event.preventDefault();
				copySelectedNode();
				return;
			}

			if (mod && event.key.toLowerCase() === 'v') {
				event.preventDefault();
				pasteClipboard();
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [
		canvasMode,
		clearDragState,
		copySelectedNode,
		deleteSelectedNode,
		duplicateSelectedNode,
		pasteClipboard,
		setEditorDevice,
		toggleResponsivePreview,
	]);
}

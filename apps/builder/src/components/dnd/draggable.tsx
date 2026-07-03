'use client';

import type { DragEvent, ReactElement, ReactNode } from 'react';

import { BUILDER_DRAG_MIME, parseDragPayload, serializeDragPayload } from '@builder/lib/dnd/payload';
import type { DragSource } from '@builder/lib/layout-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';
import type { LayoutNodeId, WidgetTypeId } from '@theme/builder/core/primitives';

interface PaletteDraggableProps {
	widgetType: WidgetTypeId;
	children: ReactNode;
	className?: string;
}

export function PaletteDraggable({
	widgetType,
	children,
	className,
}: PaletteDraggableProps): ReactElement {
	const canvasMode = useBuilderStore((state) => state.canvasMode);
	const setDragSource = useBuilderStore((state) => state.setDragSource);
	const clearDragState = useBuilderStore((state) => state.clearDragState);
	const disabled = canvasMode === 'preview';

	function handleDragStart(event: DragEvent<HTMLDivElement>): void {
		if (disabled) {
			event.preventDefault();
			return;
		}

		const source: DragSource = { kind: 'palette', widgetType };
		setDragSource(source);
		event.dataTransfer.effectAllowed = 'copyMove';
		event.dataTransfer.setData(BUILDER_DRAG_MIME, serializeDragPayload(source));
	}

	function handleDragEnd(): void {
		clearDragState();
	}

	return (
		<div
			draggable={!disabled}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			className={className}
		>
			{children}
		</div>
	);
}

interface CanvasDraggableProps {
	nodeId: LayoutNodeId;
	children: ReactNode;
	className?: string;
	disabled?: boolean;
}

export function CanvasDraggable({
	nodeId,
	children,
	className,
	disabled = false,
}: CanvasDraggableProps): ReactElement {
	const setDragSource = useBuilderStore((state) => state.setDragSource);
	const clearDragState = useBuilderStore((state) => state.clearDragState);
	const dragSource = useBuilderStore((state) => state.dragSource);
	const isDragging = dragSource?.kind === 'canvas' && dragSource.nodeId === nodeId;

	function handleDragStart(event: DragEvent<HTMLDivElement>): void {
		if (disabled) {
			event.preventDefault();
			return;
		}

		const source: DragSource = { kind: 'canvas', nodeId };
		setDragSource(source);
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData(BUILDER_DRAG_MIME, serializeDragPayload(source));
	}

	function handleDragEnd(): void {
		clearDragState();
	}

	return (
		<div
			draggable={!disabled}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			className={`${className ?? ''} ${isDragging ? 'opacity-40' : ''}`.trim()}
		>
			{children}
		</div>
	);
}

export function restoreDragSourceFromEvent(event: DragEvent): DragSource | null {
	const raw = event.dataTransfer.getData(BUILDER_DRAG_MIME);

	if (!raw) {
		return null;
	}

	return parseDragPayload<DragSource>(raw);
}

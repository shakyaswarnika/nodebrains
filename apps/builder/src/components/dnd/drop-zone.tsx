'use client';

import type { DragEvent, ReactElement } from 'react';

import { canDropAt, isSameDropTarget } from '@builder/lib/layout-engine';
import type { DropTarget } from '@builder/lib/layout-engine';
import { useBuilderStore } from '@builder/store/use-builder-store';

interface DropZoneProps {
	target: DropTarget;
	orientation?: 'horizontal' | 'vertical';
	className?: string;
}

export function DropZone({
	target,
	orientation = 'horizontal',
	className = '',
}: DropZoneProps): ReactElement {
	const graph = useBuilderStore((state) => state.graph);
	const dragSource = useBuilderStore((state) => state.dragSource);
	const dropTarget = useBuilderStore((state) => state.dropTarget);
	const setDropTarget = useBuilderStore((state) => state.setDropTarget);
	const handleDrop = useBuilderStore((state) => state.handleDrop);
	const clearDragState = useBuilderStore((state) => state.clearDragState);

	const isActive = isSameDropTarget(dropTarget, target);
	const canDrop = canDropAt(graph, dragSource, target);
	const isVisible = dragSource !== null && canDrop;

	function handleDragOver(event: DragEvent<HTMLDivElement>): void {
		if (!dragSource || !canDropAt(graph, dragSource, target)) {
			return;
		}

		event.preventDefault();
		event.dataTransfer.dropEffect = dragSource.kind === 'palette' ? 'copy' : 'move';
		setDropTarget(target);
	}

	function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			if (isSameDropTarget(dropTarget, target)) {
				setDropTarget(null);
			}
		}
	}

	function handleDropEvent(event: DragEvent<HTMLDivElement>): void {
		event.preventDefault();
		event.stopPropagation();

		if (!canDropAt(graph, dragSource, target)) {
			clearDragState();
			return;
		}

		handleDrop(target);
	}

	const lineClass =
		orientation === 'horizontal'
			? 'h-1 w-full rounded-full'
			: 'w-1 self-stretch rounded-full';

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDropEvent}
			className={`relative transition-all ${className} ${
				isVisible ? 'py-1 opacity-100' : 'h-0 overflow-hidden py-0 opacity-0'
			}`}
			aria-hidden={!isVisible}
		>
			<div
				className={`${lineClass} ${
					isActive ? 'bg-accent shadow-[0_0_12px_rgba(37,99,235,0.8)]' : 'bg-slate-600/60'
				}`}
			/>
		</div>
	);
}

interface InsideDropZoneProps {
	target: DropTarget;
	active: boolean;
	children: React.ReactNode;
	className?: string;
}

export function InsideDropZone({
	target,
	active,
	children,
	className = '',
}: InsideDropZoneProps): ReactElement {
	const graph = useBuilderStore((state) => state.graph);
	const dragSource = useBuilderStore((state) => state.dragSource);
	const dropTarget = useBuilderStore((state) => state.dropTarget);
	const setDropTarget = useBuilderStore((state) => state.setDropTarget);
	const handleDrop = useBuilderStore((state) => state.handleDrop);
	const clearDragState = useBuilderStore((state) => state.clearDragState);

	const isActive = active && isSameDropTarget(dropTarget, target);
	const canDrop = canDropAt(graph, dragSource, target);

	function handleDragOver(event: DragEvent<HTMLDivElement>): void {
		if (!dragSource || !canDrop) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		event.dataTransfer.dropEffect = dragSource.kind === 'palette' ? 'copy' : 'move';
		setDropTarget(target);
	}

	function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			if (isSameDropTarget(dropTarget, target)) {
				setDropTarget(null);
			}
		}
	}

	function handleDropEvent(event: DragEvent<HTMLDivElement>): void {
		event.preventDefault();
		event.stopPropagation();

		if (!canDrop) {
			clearDragState();
			return;
		}

		handleDrop(target);
	}

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDropEvent}
			className={`${className} ${
				isActive ? 'ring-2 ring-accent ring-offset-2 ring-offset-slate-950' : ''
			}`}
		>
			{children}
		</div>
	);
}

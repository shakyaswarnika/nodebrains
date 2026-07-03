'use client';

import { useCallback, useRef, type ReactElement, type PointerEvent as ReactPointerEvent } from 'react';

import { useBuilderStore } from '@builder/store/use-builder-store';
import type { LayoutNodeId } from '@theme/builder/core/primitives';

interface ColumnResizeHandleProps {
	readonly leftColumnId: LayoutNodeId;
	readonly rightColumnId: LayoutNodeId;
}

export function ColumnResizeHandle({
	leftColumnId,
	rightColumnId,
}: ColumnResizeHandleProps): ReactElement {
	const resizeColumn = useBuilderStore((state) => state.resizeColumn);
	const startXRef = useRef(0);
	const accumulatedDeltaRef = useRef(0);

	const handlePointerDown = useCallback(
		(event: ReactPointerEvent<HTMLButtonElement>) => {
			event.preventDefault();
			event.stopPropagation();

			startXRef.current = event.clientX;
			accumulatedDeltaRef.current = 0;
			event.currentTarget.setPointerCapture(event.pointerId);

			const handlePointerMove = (moveEvent: PointerEvent) => {
				const deltaPx = moveEvent.clientX - startXRef.current;
				const spanDelta = Math.round(deltaPx / 24);

				if (spanDelta === accumulatedDeltaRef.current) {
					return;
				}

				const step = spanDelta - accumulatedDeltaRef.current;
				resizeColumn(leftColumnId, rightColumnId, step);
				accumulatedDeltaRef.current = spanDelta;
			};

			const handlePointerUp = () => {
				window.removeEventListener('pointermove', handlePointerMove);
				window.removeEventListener('pointerup', handlePointerUp);
				accumulatedDeltaRef.current = 0;
			};

			window.addEventListener('pointermove', handlePointerMove);
			window.addEventListener('pointerup', handlePointerUp);
		},
		[leftColumnId, resizeColumn, rightColumnId],
	);

	return (
		<button
			type="button"
			aria-label="Resize columns"
			onPointerDown={handlePointerDown}
			className="absolute right-0 top-0 z-20 h-full w-2 -translate-x-1/2 cursor-col-resize bg-transparent hover:bg-accent/40"
		/>
	);
}

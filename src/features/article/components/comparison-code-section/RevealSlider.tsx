'use client';

import { type PointerEvent, type ReactNode, useRef, useState } from 'react';

import type { RevealStyle } from '@/types/style.types';

const initialRevealPercent = 50;
const minRevealPercent = 0;
const maxRevealPercent = 100;

type Props = { before: ReactNode; after: ReactNode };

export function RevealSlider({ before, after }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealPercent, setRevealPercent] = useState(initialRevealPercent);
  const revealStyle: RevealStyle = { '--reveal': `${String(revealPercent)}%` };

  const revealAtPointer = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const percent = ((event.clientX - left) / width) * maxRevealPercent;
    setRevealPercent(
      Math.round(
        Math.min(maxRevealPercent, Math.max(minRevealPercent, percent)),
      ),
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative grid select-none"
      style={revealStyle}
    >
      {before}
      {after}
      <input
        type="range"
        min={minRevealPercent}
        max={maxRevealPercent}
        value={revealPercent}
        aria-label="Reveal the code before or after the change"
        aria-valuetext={`${String(revealPercent)}% before`}
        onChange={event => {
          setRevealPercent(Number(event.target.value));
        }}
        className="peer pointer-events-none absolute inset-0 size-full opacity-0"
      />
      <div
        onPointerDown={event => {
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            revealAtPointer(event);
          }
        }}
        className="absolute inset-y-0 left-(--reveal) w-6 -translate-x-1/2 cursor-ew-resize touch-none peer-focus-visible:*:ring-3 peer-focus-visible:*:ring-ring"
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-foreground/50" />
        <span className="absolute top-1/2 left-1/2 h-8 w-1.5 -translate-1/2 rounded-full bg-foreground" />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useResizableFrame, ResizeHandle } from "@/hooks/useResizableFrame";

export interface HeroPortraitProps {
  /** Source path of the portrait image */
  src?: string;
  /** Alt text for screen readers */
  alt?: string;
  /** Figma layer name tag (e.g. "maya-portrait.webp") */
  layerName?: string;
  /** Helper caption displayed beside/below dimensions badge */
  helperText?: string;
  /** Optional class override for outer slot container */
  className?: string;
}

const HANDLES: Array<{
  id: ResizeHandle;
  cursor: string;
  positionClasses: string;
  label: string;
}> = [
  {
    id: "tl",
    cursor: "cursor-nwse-resize",
    positionClasses: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    label: "Top-left resize handle",
  },
  {
    id: "tc",
    cursor: "cursor-ns-resize",
    positionClasses: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    label: "Top-center resize handle",
  },
  {
    id: "tr",
    cursor: "cursor-nesw-resize",
    positionClasses: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    label: "Top-right resize handle",
  },
  {
    id: "ml",
    cursor: "cursor-ew-resize",
    positionClasses: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    label: "Middle-left resize handle",
  },
  {
    id: "mr",
    cursor: "cursor-ew-resize",
    positionClasses: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    label: "Middle-right resize handle",
  },
  {
    id: "bl",
    cursor: "cursor-nesw-resize",
    positionClasses: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    label: "Bottom-left resize handle",
  },
  {
    id: "bc",
    cursor: "cursor-ns-resize",
    positionClasses: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    label: "Bottom-center resize handle",
  },
  {
    id: "br",
    cursor: "cursor-nwse-resize",
    positionClasses: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    label: "Bottom-right resize handle",
  },
];

const SAM_WAYPOINTS: Array<{ x: number; y: number }> = [
  { x: 0.44, y: 0.54 },
  { x: 0.62, y: 0.42 },
  { x: 0.48, y: 0.34 },
  { x: 0.68, y: 0.72 },
  { x: 0.32, y: 0.46 },
  { x: 0.56, y: 0.64 },
];

const SAM_COMMENTS = [
  "Love this crop",
  "Can we test this with users?",
  "Add it to the design system?",
  "Pixel perfect",
];

interface SamDevCursorProps {
  frameWidth: number;
  frameHeight: number;
}

/**
 * Autonomous collaborator cursor ("Sam · Dev") with spring comment bubble
 * operating inside the hero portrait artboard bounds (matching Snapline).
 */
function SamDevCursor({ frameWidth, frameHeight }: SamDevCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ w: frameWidth, h: frameHeight });
  const [commentIndex, setCommentIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);

  useEffect(() => {
    sizeRef.current = { w: frameWidth, h: frameHeight };
  }, [frameWidth, frameHeight]);

  // Smooth RAF waypoint gliding mapped proportionally to active portrait dimensions
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let waypointIdx = 0;
    const current = {
      x: sizeRef.current.w * SAM_WAYPOINTS[0].x,
      y: sizeRef.current.h * SAM_WAYPOINTS[0].y,
    };
    let rafId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const { w, h } = sizeRef.current;
      const elapsed = (now - startTime) / 1000;
      const wp = SAM_WAYPOINTS[waypointIdx];

      const driftX = reducedMotion ? 0 : Math.sin(elapsed * 0.9) * 10;
      const driftY = reducedMotion ? 0 : Math.cos(elapsed * 0.7) * 8;

      const targetX = Math.max(28, Math.min(w - 96, w * wp.x + driftX));
      const targetY = Math.max(48, Math.min(h - 48, h * wp.y + driftY));

      if (reducedMotion) {
        current.x = targetX;
        current.y = targetY;
      } else {
        current.x += (targetX - current.x) * 0.032;
        current.y += (targetY - current.y) * 0.032;
      }

      el.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
      rafId = requestAnimationFrame(step);
    };

    const waypointTimer = setInterval(() => {
      if (!document.hidden && !reducedMotion) {
        waypointIdx = (waypointIdx + 1) % SAM_WAYPOINTS.length;
      }
    }, 3400);

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(waypointTimer);
    };
  }, []);

  // Periodic spring-popping comment bubble cycle
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let active = true;
    const timers: NodeJS.Timeout[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => active && fn(), ms));
    };

    const runCycle = (idx: number) => {
      setCommentIndex(idx);
      setCommentOpen(true);

      schedule(() => {
        setCommentOpen(false);
        schedule(() => {
          runCycle((idx + 1) % SAM_COMMENTS.length);
        }, 2800);
      }, 3000);
    };

    schedule(() => runCycle(0), 1600);

    return () => {
      active = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-testid="portrait-sam-cursor"
      className="pointer-events-none absolute top-0 left-0 z-[25] select-none will-change-transform"
      style={{ transform: `translate3d(${Math.round(frameWidth * 0.44)}px, ${Math.round(frameHeight * 0.54)}px, 0)` }}
    >
      {/* Spring Comment Bubble (.snp-cmt) */}
      <div
        data-testid="portrait-sam-comment"
        data-open={commentOpen ? "1" : "0"}
        className="pointer-events-none absolute bottom-[calc(100%+4px)] left-[18px] min-w-[148px] max-w-[230px] border border-black/[0.08] bg-white px-3.5 py-2.5 select-none"
        style={{
          borderRadius: "14px 14px 14px 4px",
          boxShadow: "0 16px 34px -18px rgba(0, 0, 0, 0.4)",
          transformOrigin: "0% 100%",
          transform: commentOpen ? "scale(1)" : "scale(0.3)",
          opacity: commentOpen ? 1 : 0,
          transition:
            "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
        }}
      >
        <span className="block font-sans text-[11px] font-medium leading-tight text-[#8A8A8A]">
          Sam · Dev
        </span>
        <span className="mt-0.5 block font-sans text-[12.5px] font-medium leading-snug text-[#0A0A0A] whitespace-nowrap">
          {SAM_COMMENTS[commentIndex]}
        </span>
      </div>

      {/* Cursor Arrow SVG */}
      <svg
        viewBox="0 0 20 24"
        className="block h-[24px] w-[20px] shrink-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
      >
        <path
          d="M2 1.5v18l5-4.7 3.4 7.4 3.2-1.4-3.4-7.2 6.8-.2z"
          fill="#0A0A0A"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Dark Pill Name Badge ("Sam · Dev") */}
      <b
        className="absolute left-[16px] top-[18px] inline-flex items-center gap-[5px] rounded-[7px_7px_7px_2px] bg-[#0A0A0A] px-[10px] py-[4px] font-sans text-[12px] font-semibold leading-[1.2] text-[#FFFFFF] whitespace-nowrap tracking-normal antialiased select-none shadow-[0_2px_8px_rgba(0,0,0,0.22)]"
        style={{ letterSpacing: "0em" }}
      >
        <span>Sam</span>
        <span
          aria-hidden="true"
          className="inline-block h-[3px] w-[3px] rounded-full bg-white/75 shrink-0"
        />
        <span>Dev</span>
      </b>
    </div>
  );
}

/**
 * HeroPortrait
 *
 * Interactive homepage hero portrait matching Snapline (`https://snapline.framer.website/`):
 *   - Fixed outer layout slot ensures 0.000px sibling/footer layout shift during resize
 *   - 8 handles (12×12px, 1.5px border, -14px hit inset, 0.35s cubic-bezier overshoot)
 *   - Simultaneous 1.35x scaling across all 8 handles while dragging
 *   - Free 2-axis corner resize + single-axis edge resize
 *   - Underdamped harmonic spring return upon handle release
 *   - Sharp 0px image corners flush inside 1.5px black border
 *   - Attached live dimension badge + right-aligned fading desktop hint
 *   - Autonomous "Sam · Dev" collaborator cursor + comment bubbles inside portrait
 */
export function HeroPortrait({
  src = "/images/hero-portrait.webp",
  alt = "Maya Ortiz — Product Designer in Lisbon",
  layerName = "maya-portrait.webp",
  helperText = "Drag a handle to resize me",
  className = "",
}: HeroPortraitProps) {
  const slotRef = useRef<HTMLDivElement>(null);

  const {
    width,
    height,
    restingSize,
    isNarrow,
    position,
    isResizing,
    isTouched,
    activeHandle,
    dimensions,
    handlePointerDown,
  } = useResizableFrame({
    defaultWidth: 420,
    defaultHeight: 525,
    minWidth: 140,
    minHeight: 170,
    stiffness: 160,
    damping: 13,
    slotRef,
  });

  const formattedLayer = layerName.startsWith("#")
    ? layerName
    : `# ${layerName}`;

  const metadataBandHeight = isNarrow ? 54 : 34;

  return (
    <div
      ref={slotRef}
      data-testid="hero-portrait-container"
      data-drag={isResizing ? "1" : "0"}
      data-touched={isTouched ? "1" : "0"}
      data-narrow={isNarrow ? "1" : "0"}
      className={[
        "relative select-none shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: `${restingSize.width}px`,
        height: `${restingSize.height + metadataBandHeight}px`,
      }}
    >
      {/* Active Out-of-Flow Resizable Artboard Layer */}
      <div
        data-testid="hero-portrait-frame"
        className="absolute top-0 left-0 z-20 select-none touch-pan-y"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        }}
      >
        {/* Sharp Flush Image Frame (0px radius matching Reference) */}
        <div className="relative h-full w-full overflow-hidden rounded-none bg-[#ECECEC] pointer-events-none">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            draggable={false}
            className="object-cover object-[50%_30%] select-none pointer-events-none"
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 460px"
          />
        </div>

        {/* Autonomous Portrait Collaborator ("Sam · Dev") + Spring Comments */}
        <SamDevCursor frameWidth={width} frameHeight={height} />

        {/* Outer Hairline Selection Border (1.5px solid #0A0A0A) */}
        <div
          data-testid="figma-selection-frame"
          className="pointer-events-none absolute inset-0 border-[1.5px] border-[#0A0A0A] z-20"
        />

        {/* Top Monospace Layer Tag */}
        <div
          data-testid="figma-layer-tag"
          className="pointer-events-none absolute -top-5 left-0 z-20 font-mono text-[11px] font-normal tracking-tight text-[#0A0A0A] select-none whitespace-nowrap"
        >
          {formattedLayer}
        </div>

        {/* 8 Interactive Resize Handles (12×12px, -14px hitbox, all scale 1.35x on drag) */}
        <div data-testid="figma-handles-container" className="z-30">
          {HANDLES.map(({ id, cursor, positionClasses, label }) => {
            const isActiveHandle = activeHandle === id;

            return (
              <span
                key={id}
                data-handle={id}
                data-testid={`figma-handle-${id}`}
                role="button"
                aria-label={label}
                tabIndex={0}
                onPointerDown={handlePointerDown(id)}
                className={[
                  "absolute w-3 h-3 border-[1.5px] border-[#0A0A0A] select-none touch-none z-30",
                  "before:absolute before:-inset-[14px] before:content-['']",
                  "hover:scale-[1.35] hover:bg-[#D6FF3F]",
                  isResizing ? "scale-[1.35]" : "",
                  isActiveHandle ? "bg-[#D6FF3F]" : "bg-[#FFFFFF]",
                  cursor,
                  positionClasses,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  transition:
                    "scale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease",
                }}
              />
            );
          })}
        </div>

        {/* Attached Neon Lime Live Dimension Pill */}
        <span
          data-testid="figma-dimension-badge"
          className="pointer-events-none absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-30 inline-flex items-center justify-center rounded bg-[#D6FF3F] px-2 py-0.5 font-mono text-[10px] font-bold tracking-tight text-[#0A0A0A] shadow-[0_2px_6px_rgba(0,0,0,0.12)] select-none whitespace-nowrap"
        >
          {dimensions}
        </span>
      </div>

      {/* Helper Text anchored in fixed slot (inline right on desktop, centered below on narrow) */}
      {helperText && (
        <span
          data-testid="figma-helper-text"
          className={[
            "pointer-events-none absolute z-20 font-sans text-[11px] font-normal leading-tight text-[#0A0A0A]/50 select-none whitespace-nowrap transition-opacity duration-[400ms] ease-out",
            isNarrow
              ? "bottom-0 left-1/2 -translate-x-1/2"
              : "bottom-[2px] right-0",
            isTouched ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}

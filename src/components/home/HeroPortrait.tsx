"use client";

import { useRef } from "react";
import Image from "next/image";
import { useResizableFrame, ResizeHandle } from "@/hooks/useResizableFrame";
import { PortraitCollaboratorCursor } from "./CollaboratorCursors";

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
        <PortraitCollaboratorCursor frameWidth={width} frameHeight={height} />

        {/* Outer Hairline Selection Border (1.5px solid #2A2926) */}
        <div
          data-testid="figma-selection-frame"
          className="pointer-events-none absolute inset-0 border-[1.5px] border-[#2A2926] z-20"
        />

        {/* Top Monospace Layer Tag */}
        <div
          data-testid="figma-layer-tag"
          className="pointer-events-none absolute -top-5 left-0 z-20 font-mono text-[11px] font-normal tracking-tight text-[#2A2926] select-none whitespace-nowrap"
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
                  "absolute w-3 h-3 border-[1.5px] border-[#2A2926] select-none touch-none z-30",
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
          className="pointer-events-none absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-30 inline-flex items-center justify-center rounded bg-[#D6FF3F] px-2 py-0.5 font-mono text-[10px] font-bold tracking-tight text-[#2A2926] shadow-[0_2px_6px_rgba(0,0,0,0.12)] select-none whitespace-nowrap"
        >
          {dimensions}
        </span>
      </div>

      {/* Helper Text anchored in fixed slot (inline right on desktop, centered below on narrow) */}
      {helperText && (
        <span
          data-testid="figma-helper-text"
          className={[
            "pointer-events-none absolute z-20 font-sans text-[11px] font-normal leading-tight text-[#2A2926]/50 select-none whitespace-nowrap transition-opacity duration-[400ms] ease-out",
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

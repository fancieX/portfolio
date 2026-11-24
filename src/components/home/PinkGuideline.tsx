"use client";

export interface PinkGuidelineProps {
  className?: string;
  width?: number | string;
}

/**
 * PinkGuideline
 *
 * Architectural Figma alignment guide rendered beneath the hero display headline.
 * Exact 1:1 match for Snapline's signature #FF3B5C pink baseline guide with vertical tick mark
 * and drafting crosshair intersection.
 *
 * Visual geometry (measured 1:1 against Snapline reference):
 *   - Horizontal line: starts 22px-24px to the left of the vertical tick (left drafting overhang).
 *   - Vertical tick: positioned 7px-10px to the left of "Maya Ortiz,".
 *   - Tick intersection: extends 14px-18px below the horizontal baseline (matching font descenders)
 *     and 96px-110px above (reaching towards "Hello, I am").
 *   - Horizontal length: spans across Line 2 and Line 3, extending slightly past the longest role.
 */
export function PinkGuideline({ className = "", width }: PinkGuidelineProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute bottom-0 select-none z-0",
        // Position container so horizontal rule starts with left drafting overhang (-28px to -32px from text):
        "-left-7 sm:-left-8",
        // Fallback width before hydration if explicit width not provided:
        width === undefined ? "w-[calc(100%+380px)] xl:w-[calc(100%+420px)] min-w-[360px]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
    >
      {/* Vertical Alignment Tick: positioned 20px-22px from left edge, crossing baseline */}
      <span className="absolute left-[20px] sm:left-[22px] -bottom-3.5 sm:-bottom-4 lg:-bottom-[18px] w-px bg-[#FF3B5C] opacity-80 h-[64px] sm:h-[80px] md:h-[96px] lg:h-[114px] xl:h-[128px]" />

      {/* Horizontal Baseline Rule */}
      <span className="block h-px w-full bg-[#FF3B5C] opacity-80" />
    </div>
  );
}

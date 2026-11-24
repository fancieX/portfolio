"use client";

export interface PinkGuidelineProps {
  className?: string;
}

/**
 * PinkGuideline
 *
 * Architectural Figma alignment guide rendered beneath the hero display headline.
 * Exact match for Snapline's signature #FF3B5C pink baseline guide with vertical tick mark.
 */
export function PinkGuideline({ className = "" }: PinkGuidelineProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute bottom-0 left-0 w-[115%] select-none z-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Vertical Alignment Tick on Left Edge */}
      <span className="absolute -left-1 bottom-0 h-10 w-px bg-[#FF3B5C] opacity-80" />

      {/* Horizontal Baseline Rule */}
      <span className="block h-px w-full bg-[#FF3B5C] opacity-80" />
    </div>
  );
}

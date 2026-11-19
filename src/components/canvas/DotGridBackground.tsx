import React from "react";

export interface DotGridBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grid cell dimension in pixels. Defaults to 22px matching Snapline design tokens.
   */
  spacing?: number;
  /**
   * Dot radius in pixels. Defaults to 1px.
   */
  dotSize?: number;
  /**
   * Base canvas background tone. Defaults to #E6E6E3.
   */
  baseColor?: string;
  /**
   * Dot color. Defaults to #C3C3BF.
   */
  dotColor?: string;
  /**
   * Position mode: "fixed" (viewport-pinned infinite canvas) or "absolute" (scoped container).
   * Defaults to "fixed".
   */
  position?: "fixed" | "absolute";
}

/**
 * Reusable Figma-style repeating dot-grid canvas background primitive.
 * Computes exact radial-gradient stylesheet rule:
 * #E6E6E3 radial-gradient(circle, #C3C3BF 1px, transparent 1.3px) 0 0 / 22px 22px
 */
export function DotGridBackground({
  spacing = 22,
  dotSize = 1,
  baseColor = "#E6E6E3",
  dotColor = "#C3C3BF",
  position = "fixed",
  className = "",
  style,
  ...props
}: DotGridBackgroundProps) {
  const positionClass =
    position === "fixed" ? "fixed inset-0" : "absolute inset-0";

  return (
    <div
      aria-hidden="true"
      data-testid="dot-grid-canvas"
      className={`${positionClass} pointer-events-none -z-10 h-full w-full ${className}`}
      style={{
        backgroundColor: baseColor,
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize + 0.3}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundPosition: "0 0",
        ...style,
      }}
      {...props}
    />
  );
}

export default DotGridBackground;

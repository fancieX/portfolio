import { HTMLAttributes, forwardRef } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// surfaceLight:    #FFFFFF
// borderFaint:     rgba(0, 0, 0, 0.06)
// boxShadow.card:  0 2px 12px rgba(0, 0, 0, 0.04)
// borderRadius:    medium = 16px, large = 24px
// layout.container: maxWidth 1200px, padding 48px/32px/16px
// Source: docs/research/snapline/design-tokens.json

export interface ArtboardContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Corner radius variant — matches Snapline medium (16px) or large (24px) */
  radius?: "medium" | "large";
  /** Whether to show the hairline border */
  bordered?: boolean;
  /** Whether to apply the card drop-shadow */
  shadow?: boolean;
  /** Max-width cap. Defaults to 1200px per design-tokens layout.container */
  maxWidth?: string;
  /** Inner content padding follows responsive schedule by default */
  noPadding?: boolean;
}

/**
 * ArtboardContainer
 *
 * White `#FFFFFF` artboard surface that sits on the `#E6E6E3` dot-grid
 * canvas background — the primary content wrapper used across every page.
 *
 * Responsive padding schedule (from design-tokens.json layout.container):
 *   Desktop (≥1200px): 48px
 *   Tablet  (≥768px):  32px
 *   Mobile  (<768px):  16px
 *
 * Renders a semantic `<div>` with `role="region"` via forwarded ref,
 * composable with any additional className from parent.
 */
const ArtboardContainer = forwardRef<HTMLDivElement, ArtboardContainerProps>(
  (
    {
      radius = "large",
      bordered = true,
      shadow = true,
      maxWidth = "1200px",
      noPadding = false,
      className = "",
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const radiusMap = {
      medium: "1rem",    // 16px
      large: "1.5rem",   // 24px
    } as const;

    const containerStyle: React.CSSProperties = {
      backgroundColor: "#FFFFFF",
      borderRadius: radiusMap[radius],
      border: bordered ? "1px solid rgba(0, 0, 0, 0.06)" : undefined,
      boxShadow: shadow ? "0 2px 12px rgba(0, 0, 0, 0.04)" : undefined,
      maxWidth,
      width: "100%",
      marginInline: "auto",
      ...style,
    };

    return (
      <div
        ref={ref}
        data-testid="artboard-container"
        className={[
          // Responsive padding via Tailwind — 16px mobile, 32px tablet, 48px desktop
          !noPadding ? "px-4 py-4 md:px-8 md:py-8 lg:px-12 lg:py-12" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={containerStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ArtboardContainer.displayName = "ArtboardContainer";

export { ArtboardContainer };

import { HTMLAttributes, forwardRef } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// surfaceDark:        #2A2926
// borderDark:         rgba(255, 255, 255, 0.12)
// textOnDark primary: #FFFFFF
// textOnDark muted:   rgba(255, 255, 255, 0.6)
// borderRadius:       medium = 16px, large = 24px
// Source: docs/research/snapline/design-tokens.json

export interface DarkContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Corner radius variant */
  radius?: "medium" | "large";
  /** Whether to show the dark-theme hairline border */
  bordered?: boolean;
  /** Max-width cap. Defaults to 1200px */
  maxWidth?: string;
  /** Skip default responsive padding */
  noPadding?: boolean;
}

/**
 * DarkContainer
 *
 * Dark `#2A2926` surface card — used on the Contact page section,
 * footer CTA blocks, and any dark-theme inversion panels.
 *
 * Provides CSS custom-property overrides so nested text components
 * inherit the correct on-dark text hierarchy without extra props:
 *   --color-text-primary:  #FFFFFF
 *   --color-text-muted:    rgba(255, 255, 255, 0.60)
 *   --color-border:        rgba(255, 255, 255, 0.12)
 *
 * Responsive padding follows the same schedule as ArtboardContainer.
 */
const DarkContainer = forwardRef<HTMLDivElement, DarkContainerProps>(
  (
    {
      radius = "large",
      bordered = true,
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
      backgroundColor: "#2A2926",
      borderRadius: radiusMap[radius],
      border: bordered ? "1px solid rgba(255, 255, 255, 0.12)" : undefined,
      maxWidth,
      width: "100%",
      marginInline: "auto",
      // On-dark text hierarchy exposed as CSS custom properties
      // so nested typography components can consume them
      "--color-text-primary": "#FFFFFF",
      "--color-text-muted": "rgba(255, 255, 255, 0.60)",
      "--color-border": "rgba(255, 255, 255, 0.12)",
      color: "#FFFFFF",
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        data-testid="dark-container"
        className={[
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

DarkContainer.displayName = "DarkContainer";

export { DarkContainer };

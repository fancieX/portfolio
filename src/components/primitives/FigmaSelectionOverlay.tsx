import { HTMLAttributes, forwardRef, ReactNode } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// frameBorder:    1px solid #0A0A0A
// handleSize:     7px × 7px (6px–7px square)
// handleBg:       #FFFFFF with 1px solid #0A0A0A border
// handleShadow:   0 1px 3px rgba(0, 0, 0, 0.18)
// tagFont:        Geist Mono / SF Mono, text-[11px], color #0A0A0A
// dimensionBadge: #D6FF3F (neon lime), bold black text #0A0A0A
// helperText:     rgba(10, 10, 10, 0.45) text-xs
// Source: docs/research/snapline/design-tokens.json & reference screenshots

export interface FigmaSelectionOverlayProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Top layer name tag (e.g. "maya-portrait.webp" or "Project / Cover") */
  layerName?: string;
  /** Dimension badge string (e.g. "380 × 475" or "460 × 575") */
  dimensions?: string;
  /** Optional helper text below dimension badge (e.g. "Drag a handle to resize me") */
  helperText?: string;
  /** Whether the frame is active and visible */
  isActive?: boolean;
  /** Whether to show the 8 corner & midpoint resize handles */
  showHandles?: boolean;
  /** Whether to show the top layer tag */
  showLayerName?: boolean;
  /** Whether to show the bottom neon lime dimension tag */
  showDimensions?: boolean;
  /** Selection border tone */
  borderColor?: string;
  /** Optional child element to wrap and fit tightly around */
  children?: ReactNode;
}

/**
 * FigmaSelectionOverlay
 *
 * Signature Figma design canvas selection frame primitive.
 * Encloses active cards, interactive image artboards, and hero portrait.
 *
 * Visual Components:
 *   1. Outer selection hairline bounding frame (always tightly fitted to content)
 *   2. Top layer name tag ("# maya-portrait.webp") in monospace
 *   3. 8 square resize handles (4 corners + 4 edge midpoints)
 *   4. Signature neon lime dimension badge ("380 × 475")
 *   5. Optional helper caption ("Drag a handle to resize me")
 *
 * Usage:
 *   // Self-wrapping mode (guarantees frame tightly fits the child content):
 *   <FigmaSelectionOverlay layerName="maya-portrait.webp" dimensions="380 × 475">
 *     <Image ... />
 *   </FigmaSelectionOverlay>
 *
 *   // Direct overlay mode (placed inside an existing relative container):
 *   <div className="relative w-fit">
 *     <Image ... />
 *     <FigmaSelectionOverlay layerName="maya-portrait.webp" />
 *   </div>
 */
export const FigmaSelectionOverlay = forwardRef<
  HTMLDivElement,
  FigmaSelectionOverlayProps
>(
  (
    {
      layerName = "maya-portrait.webp",
      dimensions,
      helperText,
      isActive = true,
      showHandles = true,
      showLayerName = true,
      showDimensions = true,
      borderColor = "#0A0A0A",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    if (!isActive) {
      return children ? <>{children}</> : null;
    }

    // Format layer tag with leading hash
    const formattedLayer = layerName.startsWith("#")
      ? layerName
      : `# ${layerName}`;

    // Common handle style
    const handleBaseClasses =
      "absolute w-[7px] h-[7px] bg-[#FFFFFF] border shadow-[0_1px_3px_rgba(0,0,0,0.18)] pointer-events-none select-none z-30";
    const handleStyle: React.CSSProperties = {
      borderColor,
    };

    const frameContent = (
      <>
        {/* Outer Bounding Hairline Frame */}
        <div
          data-testid="figma-selection-frame"
          className="absolute inset-0 border pointer-events-none"
          style={{ borderColor }}
        />

        {/* Top Layer Name Tag */}
        {showLayerName && (
          <div
            data-testid="figma-layer-tag"
            className="absolute -top-5 left-0 font-mono text-[11px] font-normal tracking-tight text-[#0A0A0A] select-none whitespace-nowrap pointer-events-none"
          >
            {formattedLayer}
          </div>
        )}

        {/* 8 Square Handles */}
        {showHandles && (
          <div data-testid="figma-handles-container">
            {/* Top-Left */}
            <span
              data-testid="figma-handle-tl"
              style={handleStyle}
              className={`${handleBaseClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2`}
            />
            {/* Top-Center */}
            <span
              data-testid="figma-handle-tc"
              style={handleStyle}
              className={`${handleBaseClasses} top-0 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            />
            {/* Top-Right */}
            <span
              data-testid="figma-handle-tr"
              style={handleStyle}
              className={`${handleBaseClasses} top-0 right-0 translate-x-1/2 -translate-y-1/2`}
            />
            {/* Middle-Left */}
            <span
              data-testid="figma-handle-ml"
              style={handleStyle}
              className={`${handleBaseClasses} top-1/2 left-0 -translate-x-1/2 -translate-y-1/2`}
            />
            {/* Middle-Right */}
            <span
              data-testid="figma-handle-mr"
              style={handleStyle}
              className={`${handleBaseClasses} top-1/2 right-0 translate-x-1/2 -translate-y-1/2`}
            />
            {/* Bottom-Left */}
            <span
              data-testid="figma-handle-bl"
              style={handleStyle}
              className={`${handleBaseClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`}
            />
            {/* Bottom-Center */}
            <span
              data-testid="figma-handle-bc"
              style={handleStyle}
              className={`${handleBaseClasses} bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2`}
            />
            {/* Bottom-Right */}
            <span
              data-testid="figma-handle-br"
              style={handleStyle}
              className={`${handleBaseClasses} bottom-0 right-0 translate-x-1/2 translate-y-1/2`}
            />
          </div>
        )}
      </>
    );

    const bottomBadgeContent = ((showDimensions && dimensions) || helperText) && (
      <>
        {showDimensions && dimensions && (
          <span
            data-testid="figma-dimension-badge"
            className="inline-flex items-center justify-center rounded bg-[#D6FF3F] px-2 py-0.5 font-mono text-[10px] font-bold tracking-tight text-[#0A0A0A] shadow-[0_2px_6px_rgba(0,0,0,0.12)] select-none whitespace-nowrap"
          >
            {dimensions}
          </span>
        )}
        {helperText && (
          <span
            data-testid="figma-helper-text"
            className="font-sans text-[11px] font-normal leading-tight text-[#0A0A0A]/50 select-none whitespace-nowrap"
          >
            {helperText}
          </span>
        )}
      </>
    );

    // If children are provided, wrap them so the selection frame fits tightly around them automatically
    // and flows the dimension badge + helper text directly below the framed child
    if (children) {
      return (
        <div
          ref={ref}
          data-testid="figma-selection-wrapper"
          className={[
            "relative inline-flex flex-col items-center w-fit select-none",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {/* Framed Child Container with Hairline Border and Handles */}
          <div className="relative inline-flex w-fit select-none">
            {children}
            {frameContent}
          </div>

          {/* In-flow Dimension Badge and Helper Text */}
          {bottomBadgeContent && (
            <div
              data-testid="figma-dimension-badge-container"
              className="mt-2 flex flex-col items-center gap-1.5 z-30 pointer-events-none select-none"
            >
              {bottomBadgeContent}
            </div>
          )}
        </div>
      );
    }

    // Direct overlay mode: occupies inset-0 of parent container
    return (
      <div
        ref={ref}
        data-testid="figma-selection-overlay"
        aria-hidden="true"
        className={[
          "absolute inset-0 pointer-events-none select-none z-20",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {frameContent}
        {bottomBadgeContent && (
          <div
            data-testid="figma-dimension-badge-container"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+6px)] flex flex-col items-center gap-1.5 z-30 pointer-events-none"
          >
            {bottomBadgeContent}
          </div>
        )}
      </div>
    );
  }
);

FigmaSelectionOverlay.displayName = "FigmaSelectionOverlay";

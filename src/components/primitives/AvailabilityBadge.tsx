import { HTMLAttributes, forwardRef } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// liveGreen:         #22C55E (pulsating indicator dot)
// surfaceLight:      #FFFFFF
// borderLight:       rgba(10, 10, 10, 0.08)
// shadowPill:        0 2px 8px rgba(0, 0, 0, 0.06)
// radiusPill:        9999px
// Source: docs/research/snapline/design-tokens.json

export interface AvailabilityBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Text description of status (defaults to "Booking projects for January") */
  statusText?: string;
  /** Whether the green indicator should actively pulse with ping animation */
  pulse?: boolean;
  /** Visual variant of container: light surface (default), dark surface, or subtle */
  variant?: "light" | "dark" | "subtle";
  /** Optional custom dot color override */
  dotColor?: string;
}

/**
 * AvailabilityBadge
 *
 * Status indicator pill featuring the signature pulsating `#22C55E` green
 * indicator dot and clean hairline border, matching Snapline's availability tag.
 *
 * Appears in:
 *   - Global top header ("Available for projects")
 *   - Contact section / About section ("Booking projects for January")
 */
export const AvailabilityBadge = forwardRef<HTMLDivElement, AvailabilityBadgeProps>(
  (
    {
      statusText = "Booking projects for January",
      pulse = true,
      variant = "light",
      dotColor = "#22C55E",
      className = "",
      ...rest
    },
    ref
  ) => {
    const variantClasses = {
      light:
        "bg-[#FFFFFF] border-[rgba(10,10,10,0.08)] text-[#0A0A0A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
      dark:
        "bg-[#1C1C1C] border-[rgba(255,255,255,0.12)] text-[#FFFFFF] shadow-sm",
      subtle:
        "bg-transparent border-transparent text-[#0A0A0A] p-0 shadow-none",
    }[variant];

    return (
      <div
        ref={ref}
        data-testid="availability-badge"
        className={[
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-sans font-medium select-none transition-colors",
          variantClasses,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Pulsating Indicator Dot */}
        <span
          data-testid="availability-dot-wrapper"
          className="relative flex h-2 w-2 shrink-0 items-center justify-center"
        >
          {pulse && (
            <span
              data-testid="availability-pulse-ring"
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: dotColor }}
            />
          )}
          <span
            data-testid="availability-dot"
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        </span>

        {/* Status Text */}
        <span data-testid="availability-text" className="tracking-tight">
          {statusText}
        </span>
      </div>
    );
  }
);

AvailabilityBadge.displayName = "AvailabilityBadge";

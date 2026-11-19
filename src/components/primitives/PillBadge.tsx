import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// Active pill:     #0A0A0A bg, #FFFFFF text, rgba(255, 255, 255, 0.60) count
// Inactive pill:   #FFFFFF bg, rgba(10, 10, 10, 0.08) border, #0A0A0A text
// Count chip:      subtle muted tag next to label (e.g. "All 6", "Web app 2")
// Border radius:   9999px (pill)
// Source: docs/research/snapline/design-tokens.json & reference screenshots

export interface PillBadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The primary label text */
  label?: string;
  /** Optional count badge (e.g. 6 in "All 6") */
  count?: number | string;
  /** Whether the pill is currently in the active/selected state */
  isActive?: boolean;
  /** Size variant: sm (32px min-height) or md (36px min-height) */
  size?: "sm" | "md";
  /** Optional custom count chip styling */
  countClassName?: string;
  /** Child content if not using `label` prop directly */
  children?: ReactNode;
}

/**
 * PillBadge
 *
 * Interactive category tag / status pill primitive matching the Snapline
 * filter navigation ("All 6", "Web app 2", "Mobile app 2", etc.).
 *
 * States:
 *   - Active:   Solid `#0A0A0A` dark fill with crisp white text.
 *   - Inactive: Crisp white `#FFFFFF` surface with hairline 1px border.
 */
export const PillBadge = forwardRef<HTMLButtonElement, PillBadgeProps>(
  (
    {
      label,
      count,
      isActive = false,
      size = "md",
      countClassName = "",
      className = "",
      children,
      disabled = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // Size tokens
    const sizeClasses =
      size === "sm"
        ? "text-xs px-3 py-1 min-h-[32px] gap-1.5"
        : "text-sm px-3.5 py-1.5 min-h-[36px] gap-2";

    // Active vs Inactive state tokens
    const stateClasses = isActive
      ? "bg-[#0A0A0A] text-[#FFFFFF] border-transparent shadow-sm"
      : "bg-[#FFFFFF] text-[#0A0A0A] border-[rgba(10,10,10,0.08)] hover:bg-[#F9F9F8] hover:border-[rgba(10,10,10,0.16)]";

    const countColor = isActive
      ? "text-white/60"
      : "text-[#0A0A0A]/45";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-testid="pill-badge"
        data-active={isActive ? "true" : "false"}
        className={[
          "inline-flex items-center justify-center rounded-full border font-sans font-medium select-none transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses,
          stateClasses,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span>{label ?? children}</span>
        {count !== undefined && count !== null && (
          <span
            data-testid="pill-badge-count"
            className={[
              "text-[0.8em] font-normal tabular-nums leading-none",
              countColor,
              countClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {count}
          </span>
        )}
      </button>
    );
  }
);

PillBadge.displayName = "PillBadge";

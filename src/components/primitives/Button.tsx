import Link from "next/link";
import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// primary:       #2A2926 background, #FFFFFF text, active:scale-98
// lime:          #D6FF3F signature neon lime, #2A2926 bold text, active:scale-98
// secondary:     #FFFFFF surface, rgba(42,41,38,0.08) border, #2A2926 text
// dark:          #2A2926 surface, rgba(255,255,255,0.12) border, #FFFFFF text
// radius:        9999px (rounded-pill)
// height:        44px desktop / tablet, 48px touch-target mobile
// Source: docs/research/snapline/design-tokens.json & interaction-matrix.md

export type ButtonVariant = "primary" | "lime" | "secondary" | "dark" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant controlling height, padding, and font size */
  size?: ButtonSize;
  /** Expand to 100% container width */
  fullWidth?: boolean;
  /** Optional icon rendered before the label */
  leftIcon?: ReactNode;
  /** Optional icon rendered after the label */
  rightIcon?: ReactNode;
  /** Optional href — if provided, renders Next.js Link instead of button */
  href?: string;
  /** Next.js Link prefetch behavior */
  prefetch?: boolean;
  /** Target attribute for external links */
  target?: string;
  /** Rel attribute for external links */
  rel?: string;
}

export type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

/**
 * Button
 *
 * Universal interactive button and link primitive supporting the Snapline
 * visual system (Primary black, Signature neon lime `#D6FF3F`, and secondary white pill).
 *
 * Micro-interactions:
 *   - Active tap/click compression (`scale: 0.98`)
 *   - Smooth 150ms ease-out color transitions
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      leftIcon,
      rightIcon,
      href,
      prefetch,
      target,
      rel,
      className = "",
      children,
      disabled = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // Variant styles
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        "bg-[#2A2926] text-[#FFFFFF] border border-transparent hover:bg-[#3A3935] shadow-sm",
      lime:
        "bg-[#D6FF3F] text-[#2A2926] border border-transparent font-bold hover:bg-[#c9f530] shadow-[0_2px_10px_rgba(214,255,63,0.25)]",
      secondary:
        "bg-[#FFFFFF] text-[#2A2926] border border-[rgba(42,41,38,0.08)] hover:bg-[#F9F9F8] hover:border-[rgba(42,41,38,0.16)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
      dark:
        "bg-[#2A2926] text-[#FFFFFF] border border-[rgba(255,255,255,0.12)] hover:bg-[#3A3935] shadow-sm",
      ghost:
        "bg-transparent text-[#2A2926] border border-transparent hover:bg-black/5",
    };

    // Size schedule (desktop: 44px standard, mobile submit: 48px min)
    const sizeClasses: Record<ButtonSize, string> = {
      sm: "h-9 px-4 text-xs font-medium gap-1.5",
      md: "h-11 px-5 text-sm font-semibold gap-2",
      lg: "h-12 px-6 text-base font-semibold gap-2.5",
    };

    const combinedClassName = [
      "inline-flex items-center justify-center rounded-full font-sans select-none cursor-pointer",
      "transition-all duration-150 ease-out active:scale-[0.98]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF3F] focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "w-auto",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    // If href is provided, render Next.js Link
    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          prefetch={prefetch}
          target={target}
          rel={rel}
          data-testid="button"
          data-variant={variant}
          className={combinedClassName}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    // Default: native button element
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        data-testid="button"
        data-variant={variant}
        className={combinedClassName}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

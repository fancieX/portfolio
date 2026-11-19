import Link from "next/link";
import { AnchorHTMLAttributes, forwardRef, ReactNode } from "react";

// ─── Token Reference ───────────────────────────────────────────────────────
// arrow translation: -4px (-translate-x-1) on hover
// text color:        text-text-muted (#605F5F) -> text-text-primary (#0A0A0A)
// Source: docs/research/snapline/interaction-matrix.md & design-tokens.json

export interface BackLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target URL (e.g. "/work", "/journal", "/") */
  href: string;
  /** Label text (defaults to "All works") */
  label?: string;
  /** Custom arrow or icon element */
  arrow?: ReactNode;
  /** Link prefetch behavior */
  prefetch?: boolean;
}

/**
 * BackLink
 *
 * Navigational return link used on Project Case Studies and Journal Article pages
 * ("← All works", "← Journal").
 *
 * Micro-interaction:
 *   - Hover translates the left arrow 4px to the left (`-translate-x-1`)
 *   - Text transitions smoothly to primary text tone
 */
export const BackLink = forwardRef<HTMLAnchorElement, BackLinkProps>(
  (
    {
      href,
      label = "All works",
      arrow,
      prefetch,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        prefetch={prefetch}
        data-testid="back-link"
        className={[
          "group inline-flex items-center gap-2 font-sans text-sm font-medium text-[#605F5F] hover:text-[#0A0A0A] select-none transition-colors duration-150",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Animated Left Arrow (translates 4px left on group-hover) */}
        <span
          data-testid="back-link-arrow"
          className="inline-flex shrink-0 transform transition-transform duration-200 ease-out group-hover:-translate-x-1"
          aria-hidden="true"
        >
          {arrow ?? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 stroke-current stroke-[1.75]"
            >
              <path
                d="M10 12L6 8L10 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {/* Link Label */}
        <span data-testid="back-link-label">{children ?? label}</span>
      </Link>
    );
  }
);

BackLink.displayName = "BackLink";

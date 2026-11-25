"use client";

import Link from "next/link";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Button, ButtonVariant } from "@/components/primitives";
import { headerNav } from "@/data/navigation";
import { useCanvasPan } from "@/hooks/useCanvasPan";

// ─── Token Reference ───────────────────────────────────────────────────────
// height:            56px (h-14)
// background:        Transparent (no glassmorphism, no backdrop-filter, no borders)
// brandFont:         Inter / Geist Heading, font-bold, text-xl (20px) — changed from text-lg per user preference
// brandColor:        #0A0A0A (text-text-primary)
// ctaVariant:        primary (#0A0A0A background, #FFFFFF text, rounded-full)
// ctaSize:           sm (height: 36px, px-4)
// ctaSize:           md (height: 44px, px-5) — changed from sm per user preference
// containerMaxWidth: 100% of parent artboard / container
// Source: docs/research/snapline/PAGE_TOPOLOGY.md & reference screenshots
// (home-desktop-nav-extracted.png, contact-desktop-initial.png)

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Brand text label (defaults to "Maya.") */
  brandLabel?: string;
  /** Brand link URL destination (defaults to "/") */
  brandHref?: string;
  /** CTA button text (defaults to "Get in touch") */
  ctaLabel?: string;
  /** CTA button URL destination (defaults to "/contact") */
  ctaHref?: string;
  /** CTA button visual variant (defaults to "primary") */
  ctaVariant?: ButtonVariant;
  /** Optional sticky positioning (defaults to false) */
  sticky?: boolean;
  /** Optional additional elements placed alongside CTA */
  children?: ReactNode;
}

/**
 * Header
 *
 * Persistent top header component for the Snapline developer portfolio.
 * Anchors the top of the page artboard across all 19 application routes.
 *
 * Visual Layout:
 *   - Clean, transparent container with ZERO glassmorphism, blur, or borders.
 *   - Left: Brand mark ("Maya.") linking to root "/"
 *   - Right: Primary CTA button ("Get in touch") linking to "/contact"
 *   - Universal Structure: Retains identical 2-item layout across desktop,
 *     tablet, and mobile with ZERO hamburger menu drawers.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      brandLabel = headerNav.brand.label,
      brandHref = headerNav.brand.href,
      ctaLabel = headerNav.cta.label,
      ctaHref = headerNav.cta.href,
      ctaVariant = "primary",
      sticky = false,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const { panTo } = useCanvasPan();

    return (
      <header
        ref={ref}
        role="banner"
        data-testid="top-header"
        className={[
          "w-full bg-transparent select-none",
          sticky ? "sticky top-0 z-[400]" : "relative z-30",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <div className="flex h-14 w-full items-center justify-between">
          {/* Brand Mark (Left Slot) */}
          <Link
            href={brandHref}
            data-testid="header-brand-link"
            aria-label={`${brandLabel} homepage`}
            onClick={(e) => {
              e.preventDefault();
              panTo(brandHref);
            }}
            className="group inline-flex items-center"
          >
            <span className="font-heading text-xl font-bold tracking-tight text-text-primary transition-opacity duration-150 group-hover:opacity-75">
              {brandLabel}
            </span>
          </Link>

          {/* Right Action Slot (CTA Button + Optional Children) */}
          <div className="flex items-center gap-3">
            {children}
            <Button
              href={ctaHref}
              variant={ctaVariant}
              size="md"
              data-testid="header-cta-button"
              aria-label={ctaLabel}
              onClick={(e) => {
                e.preventDefault();
                panTo(ctaHref);
              }}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

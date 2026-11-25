"use client";

import Link from "next/link";
import { useCallback } from "react";
import { footerSitemap } from "@/data/navigation";
import { Button } from "@/components/primitives";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { useLisbonTime } from "@/hooks/useLisbonTime";

export interface FooterProps {
  /** Optional class name override for outer container */
  className?: string;
  /** Whether to display the top "Let's work together." call-to-action block. Defaults to true. */
  showCta?: boolean;
  /** Custom headline override for the CTA block */
  ctaHeadline?: string;
  /** Custom subhead override for the CTA block */
  ctaSubhead?: string;
}

/**
 * Footer
 *
 * Universal dark container footer matching Snapline's exact design tokens.
 *
 * Features:
 *   - Dark surface container card (#2A2926, border rgba(255,255,255,0.12), rounded-2xl sm:rounded-3xl)
 *   - Optional "Let's work together." CTA section with pink accent guideline (#FF3B5C)
 *   - 3-column sitemap navigation (Pages, Info, Social) consuming navigation metadata
 *   - Internal navigation powered by 2D spatial canvas transitions (useCanvasPan)
 *   - Real-time Europe/Lisbon clock ("HH:MM in Lisbon")
 *   - Smooth "Back to top ↑" scroll trigger
 *   - Oversized decorative watermark brand mark ("Maya Ortiz" with neon lime "M")
 */
export function Footer({
  className = "",
  showCta = true,
  ctaHeadline = "Let's work together.",
  ctaSubhead = "Have a product that needs to feel simpler? Tell me about it and I'll reply within two working days.",
}: FooterProps) {
  const { panTo } = useCanvasPan();
  const lisbonTime = useLisbonTime();
  const currentYear = 2026;

  const handleScrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <footer
      data-testid="global-footer"
      className={["w-full mt-12 sm:mt-16 lg:mt-20", className].filter(Boolean).join(" ")}
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#2A2926] p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Optional Call to Action Section */}
        {showCta && (
          <div data-testid="footer-cta-block" className="relative mb-12 sm:mb-16">
            {/* Signature Hot-Pink Guideline Accent */}
            <div
              aria-hidden="true"
              className="h-px w-full max-w-[120px] bg-[#FF3B5C] opacity-80 mb-6"
            />

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {ctaHeadline}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#A0A0A0] sm:text-lg">
              {ctaSubhead}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="lime"
                size="md"
                data-testid="footer-cta-start-project"
                onClick={(e) => {
                  e.preventDefault();
                  panTo("/contact");
                }}
              >
                Start a project
              </Button>
              <Button
                variant="dark"
                size="md"
                href="mailto:hello@mayaortiz.design"
                data-testid="footer-cta-email"
              >
                hello@mayaortiz.design
              </Button>
            </div>
          </div>
        )}

        {/* 3-Column Sitemap Navigation Grid */}
        <div
          data-testid="footer-sitemap-grid"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12"
        >
          {footerSitemap.map((section) => (
            <div key={section.title} className="flex flex-col">
              <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                {section.title}
              </span>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium text-white/70 transition-colors duration-150 hover:text-white"
                        aria-label={`${link.label} (opens in new tab)`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          panTo(link.href);
                        }}
                        className="inline-block text-sm font-medium text-white/70 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sub-Footer Divider and Metadata Row */}
        <div className="mt-12 border-t border-white/10 pt-6 sm:mt-16">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#888888] sm:flex-row sm:text-sm">
            {/* Copyright */}
            <span data-testid="footer-copyright">© {currentYear} Maya Ortiz</span>

            {/* Live Lisbon Local Clock */}
            <span
              data-testid="footer-lisbon-clock"
              suppressHydrationWarning
              className="font-medium text-white/80"
            >
              {lisbonTime}
            </span>

            {/* Back to Top Trigger */}
            <button
              type="button"
              onClick={handleScrollToTop}
              data-testid="footer-back-to-top"
              aria-label="Back to top of page"
              className="group inline-flex items-center gap-1.5 font-medium text-[#888888] transition-colors duration-150 hover:text-white cursor-pointer"
            >
              <span>Back to top</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                ↑
              </span>
            </button>
          </div>
        </div>

        {/* Giant Oversized Brand Watermark Typography */}
        <div
          aria-hidden="true"
          className="pointer-events-none -mb-3 mt-8 select-none overflow-hidden leading-none tracking-tight sm:-mb-6 sm:mt-12 lg:-mb-8"
        >
          <div className="flex items-baseline font-heading text-5xl font-extrabold sm:text-7xl md:text-8xl lg:text-[130px]">
            <span className="text-[#D6FF3F]">M</span>
            <span className="text-white/[0.07]">aya Ortiz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

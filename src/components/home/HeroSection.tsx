"use client";

import { useState, useEffect, useRef } from "react";
import { AvailabilityBadge, Button } from "@/components/primitives";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { RoleRotator } from "./RoleRotator";
import { PinkGuideline } from "./PinkGuideline";
import { HeroPortrait } from "./HeroPortrait";

export interface HeroSectionProps {
  className?: string;
}

/**
 * HeroSection
 *
 * Core homepage hero section matching the Snapline reference topology.
 *
 * Features:
 *   - Asymmetric 2-column layout (60% typography copy, 40% portrait frame)
 *   - Live availability status pill ("Booking projects for January")
 *   - 3-line composite display heading ("Hello, I am" + "Maya Ortiz," + "a [Role]")
 *   - Signature #FF3B5C pink baseline guideline rule
 *   - Animated role rotator cycling with "Lena · PM" cursor
 *   - Verified subhead description copy
 *   - Dual action buttons ("View my work" -> /work, "Say hello" -> /contact)
 *   - Interactive portrait image inside Figma selection frame
 */
export function HeroSection({ className = "" }: HeroSectionProps) {
  const { panTo } = useCanvasPan();
  const longestRoleRef = useRef<HTMLSpanElement>(null);
  const [guidelineWidth, setGuidelineWidth] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (longestRoleRef.current) {
        const textWidth = longestRoleRef.current.offsetWidth;
        // 32px left overhang + textWidth + 36px right extension past longest role
        setGuidelineWidth(textWidth + 68);
      }
    };

    const rafId = requestAnimationFrame(measure);

    window.addEventListener("resize", measure);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      data-testid="homepage-hero"
      className={[
        "relative w-full pt-6 pb-8 sm:pb-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-10 xl:gap-14 w-full">
        {/* Left Column: Headline, Copy, Action Buttons */}
        <div className="flex flex-col items-start lg:flex-1 max-w-full lg:max-w-[840px] xl:max-w-[900px]">
          {/* Availability Status Badge */}
          <AvailabilityBadge statusText="Booking projects for January" />

          {/* Composite Display Headline */}
          <div className="relative mt-4 sm:mt-5 w-full">
            <h1 className="font-heading tracking-[-0.045em] leading-[1.08] text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px]">
              <span className="block font-medium text-[#8A8A8A]">
                Hello, I am
              </span>
              <span className="relative inline-block font-bold text-[#2A2926] pr-4">
                Maya Ortiz,
                <PinkGuideline width={guidelineWidth ?? undefined} />
              </span>
              <span className="mt-1 flex flex-nowrap items-baseline gap-x-2 font-bold text-[#2A2926] whitespace-nowrap">
                <span>a</span>
                <RoleRotator />
              </span>
            </h1>

            {/* Hidden reference measurement element for the longest role ("a Product Designer") */}
            <span
              ref={longestRoleRef}
              aria-hidden="true"
              className="invisible pointer-events-none absolute left-0 top-0 flex flex-nowrap items-baseline gap-x-2 whitespace-nowrap font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] tracking-[-0.045em] leading-[1.08] select-none"
            >
              <span>a</span>
              <span>Product Designer</span>
            </span>
          </div>

          {/* Subhead Description */}
          <p className="mt-4 sm:mt-5 max-w-[530px] font-sans text-base leading-relaxed text-[#605F5F] sm:text-[18.5px] sm:leading-[1.65]">
            I design digital products that feel simple to use and easy to trust,
            helping teams turn complex ideas into clear, calm interfaces.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
            <Button
              variant="primary"
              size="md"
              data-testid="hero-view-work-button"
              onClick={(e) => {
                e.preventDefault();
                panTo("/work");
              }}
            >
              View my work
            </Button>
            <Button
              variant="secondary"
              size="md"
              data-testid="hero-say-hello-button"
              onClick={(e) => {
                e.preventDefault();
                panTo("/contact");
              }}
            >
              Say hello
            </Button>
          </div>
        </div>

        {/* Right Column: Interactive Draggable & Resizable Hero Portrait Frame */}
        <div className="flex justify-center lg:justify-end shrink-0">
          <HeroPortrait
            src="/images/hero-portrait.webp"
            alt="Maya Ortiz — Product Designer in Lisbon"
            layerName="maya-portrait.webp"
            helperText="Drag a handle to resize me"
          />
        </div>
      </div>
    </section>
  );
}

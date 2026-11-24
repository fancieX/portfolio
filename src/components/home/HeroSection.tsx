"use client";

import Image from "next/image";
import { AvailabilityBadge, Button, FigmaSelectionOverlay } from "@/components/primitives";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { RoleRotator } from "./RoleRotator";
import { PinkGuideline } from "./PinkGuideline";

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

  return (
    <section
      data-testid="homepage-hero"
      className={[
        "relative w-full pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 xl:gap-16 w-full">
        {/* Left Column: Headline, Copy, Action Buttons */}
        <div className="flex flex-col items-start lg:flex-1 max-w-full lg:max-w-[760px] xl:max-w-[820px]">
          {/* Availability Status Badge */}
          <AvailabilityBadge statusText="Booking projects for January" />

          {/* Composite Display Headline */}
          <div className="relative mt-6 sm:mt-8 w-full">
            <h1 className="font-heading tracking-[-0.045em] leading-[1.08] text-4xl sm:text-5xl md:text-6xl lg:text-[65px] xl:text-[72px]">
              <span className="block font-medium text-[#8A8A8A]">
                Hello, I am
              </span>
              <span className="relative inline-block font-bold text-[#0A0A0A] pr-4">
                Maya Ortiz,
                <PinkGuideline />
              </span>
              <span className="mt-1 flex flex-nowrap items-baseline gap-x-3 sm:gap-x-4 font-bold text-[#0A0A0A] whitespace-nowrap">
                <span>a</span>
                <RoleRotator />
              </span>
            </h1>
          </div>

          {/* Subhead Description */}
          <p className="mt-6 sm:mt-8 max-w-[480px] font-sans text-base leading-relaxed text-[#605F5F] sm:text-[17px] sm:leading-[1.6]">
            I design digital products that feel simple to use and easy to trust,
            helping teams turn complex ideas into clear, calm interfaces.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
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

        {/* Right Column: Hero Portrait Frame with Figma Selection Overlay */}
        <div className="flex justify-center lg:justify-end shrink-0">
          <FigmaSelectionOverlay
            layerName="maya-portrait.webp"
            dimensions="380 × 475"
            helperText="Drag a handle to resize me"
          >
            <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] lg:w-[380px] lg:h-[475px] max-w-full aspect-[0.8] overflow-hidden rounded-medium border border-border-light bg-surface-muted shadow-card">
              <Image
                src="/images/hero-portrait.webp"
                alt="Maya Ortiz — Product Designer in Lisbon"
                fill
                priority
                className="object-cover object-[50%_30%]"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
              />
            </div>
          </FigmaSelectionOverlay>
        </div>
      </div>
    </section>
  );
}

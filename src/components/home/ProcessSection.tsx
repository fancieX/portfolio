"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { PrototypeFlowOverlay } from "./PrototypeFlowOverlay";

export interface ProcessStepItem {
  /** Stable identifier */
  id: string;
  /** Zero-padded monospace index ("01".."04") */
  stepNumber: string;
  /** Uppercase methodology stage name ("RESEARCH".."HANDOFF") */
  label: string;
  /** Card title */
  title: string;
  /** Concise stage description */
  description: string;
  /** Local image asset path */
  image: string;
  /** Descriptive image alt text */
  imageAlt: string;
}

export interface ProcessSectionProps {
  /** Main section headline */
  title?: string;
  /** Section explanatory subtitle */
  subtitle?: string;
  /** Ordered methodology step cards */
  steps?: readonly ProcessStepItem[];
  /** Optional wrapper class name */
  className?: string;
}

export const DEFAULT_PROCESS_STEPS: readonly ProcessStepItem[] = [
  {
    id: "research",
    stepNumber: "01",
    label: "RESEARCH",
    title: "Understand the problem before solutions",
    description:
      "We interview users, audit what exists and agree what success looks like.",
    image: "/images/process/step-01-research.webp",
    imageAlt: "Design research discovery artifacts and problem mapping",
  },
  {
    id: "design",
    stepNumber: "02",
    label: "DESIGN",
    title: "Shape clear, considered product experiences",
    description:
      "Concepts turn into flows, then into polished screens with a shared visual language.",
    image: "/images/process/step-02-design.webp",
    imageAlt: "Interactive user flows and interface system explorations",
  },
  {
    id: "develop",
    stepNumber: "03",
    label: "DEVELOP",
    title: "Build with craft, clarity and precision",
    description:
      "I stay close to engineering so what ships matches what was designed.",
    image: "/images/process/step-03-develop.webp",
    imageAlt: "Collaborative engineering implementation and UI fidelity",
  },
  {
    id: "handoff",
    stepNumber: "04",
    label: "HANDOFF",
    title: "Ready for confident next steps",
    description:
      "Specs, assets and documentation packaged so your team can keep moving fast.",
    image: "/images/process/step-04-handoff.webp",
    imageAlt: "Design tokens, component specs, and delivery package",
  },
];

/**
 * ProcessSection
 *
 * Reproduces Snapline's homepage Process section (`framer-histfi`), presenting
 * the 4 alternating prototype-wired methodology cards ("01 / RESEARCH" through
 * "04 / HANDOFF") connected by interactive scroll-scrubbed prototype noodles.
 */
export function ProcessSection({
  title = "How I shape every design project",
  subtitle = "A clear path from the first conversation to a product that is ready to ship, wired up like a prototype.",
  steps = DEFAULT_PROCESS_STEPS,
  className = "",
}: ProcessSectionProps) {
  const headingId = useId();
  const headerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [headerRevealed, setHeaderRevealed] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const raf = requestAnimationFrame(() => setHeaderRevealed(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const headingWords = title.trim().split(/\s+/);

  return (
    <section
      aria-labelledby={headingId}
      data-testid="process-section"
      className={[
        "relative flex w-full flex-col items-start gap-12 sm:gap-[56px] py-[70px] md:py-[72px] lg:py-[108px] xl:py-[130px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        data-testid="process-header"
        className="flex w-full flex-col items-start gap-[14px]"
      >
        <div className="relative w-full">
          <h2
            id={headingId}
            className="relative z-[1] w-full font-heading text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#2A2926] lg:text-[43px] xl:text-[52px]"
          >
            {headingWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-block"
                style={{
                  opacity: headerRevealed ? 1 : 0.001,
                  transform: headerRevealed
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 30px, 0)",
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${50 + index * 40}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${50 + index * 40}ms`,
                }}
              >
                {word}
                {index < headingWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h2>

          {/* Signature Hot-Pink Baseline Guideline & Drafting Tick */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-5 sm:-left-6 bottom-[2px] lg:bottom-[3px] xl:bottom-[4px] z-0 w-[calc(100%+20px)] sm:w-[calc(100%+24px)] select-none"
          >
            <span className="absolute left-[18px] sm:left-[22px] -bottom-3 sm:-bottom-3.5 h-[52px] lg:h-[64px] xl:h-[78px] w-px bg-[#FF3B5C] opacity-80" />
            <span className="block h-px w-full bg-[#FF3B5C] opacity-80" />
          </div>
        </div>

        <p
          data-testid="process-subtitle"
          className="w-full max-w-[600px] font-sans text-[15px] font-normal leading-[1.55] text-[#605F5F]"
          style={{
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
            transition:
              "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 80ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 80ms",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Alternating Prototype-Wired 4-Step Flow */}
      <div
        ref={flowRef}
        data-testid="process-flow"
        className="relative flex w-full flex-col items-start gap-[70px] min-[861px]:gap-[46px] xl:gap-[70px] overflow-visible"
      >
        {steps.map((step, index) => {
          const isRightAligned = index % 2 === 1;
          return (
            <div
              key={step.id}
              data-testid={`process-row-${step.stepNumber}`}
              className={[
                "relative z-[2] flex w-full items-start",
                isRightAligned
                  ? "justify-start min-[861px]:justify-end"
                  : "justify-start",
              ].join(" ")}
            >
              <article
                data-process-step="true"
                data-testid={`process-card-${step.id}`}
                tabIndex={0}
                className="group relative flex w-full cursor-pointer select-none flex-col overflow-hidden rounded-none bg-[#FFFFFF] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF3F] focus-visible:ring-offset-2 min-[861px]:w-[44%] min-[861px]:min-h-[250px] min-[861px]:flex-row"
              >
                {/* Text Copy Pane */}
                <div className="flex w-full flex-col items-start justify-between gap-6 p-6 min-[861px]:w-auto min-[861px]:flex-1 min-[861px]:self-stretch">
                  <span
                    data-testid={`process-step-label-${step.stepNumber}`}
                    className="w-full font-sans text-[11px] font-normal uppercase leading-[1.2] tracking-[0.14em] text-[#8A8A8A]"
                  >
                    <span className="font-mono font-medium">{step.stepNumber}</span>
                    {` / ${step.label}`}
                  </span>

                  <div className="flex w-full flex-col items-start gap-[10px]">
                    <h3 className="w-full font-heading text-[19px] font-semibold leading-[1.25] tracking-[-0.03em] text-[#2A2926] xl:text-[20px]">
                      {step.title}
                    </h3>
                    <p className="w-full font-sans text-[13px] font-normal leading-[1.5] text-[#605F5F]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Illustration Artwork Pane */}
                <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[#ECECEC] min-[861px]:h-auto min-[861px]:w-auto min-[861px]:flex-1 min-[861px]:self-stretch">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 860px) calc(100vw - 48px), (max-width: 1439px) 22vw, 380px"
                    className="object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </article>
            </div>
          );
        })}

        {/* Scroll-Scrubbed Prototype Connector Overlay (.snp-pf) */}
        <PrototypeFlowOverlay containerRef={flowRef} />
      </div>
    </section>
  );
}

export default ProcessSection;

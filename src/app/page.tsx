import Image from "next/image";
import { ArtboardContainer, DarkContainer } from "@/components/primitives";

export default function Home() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-8 sm:px-8 lg:px-12">
      {/* Top Header Placeholder (Persistent Header in M4) */}
      <header className="flex h-14 w-full items-center justify-between">
        <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
          Maya.
        </span>
        <div className="inline-flex items-center gap-2 rounded-pill border border-border-light bg-surface-light px-4 py-2 text-xs font-medium text-text-primary shadow-pill">
          <span className="inline-block h-2 w-2 rounded-full bg-live-green" />
          <span>Available for projects</span>
        </div>
      </header>

      {/* Artboard Surface Container Primitive (Task 3.2) */}
      <ArtboardContainer className="mt-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-pill bg-neon-lime px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-primary">
              <span>Product Designer · Lisbon</span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Maya Ortiz
            </h1>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Crafting thoughtful digital interfaces, enterprise design systems, and web
              applications with meticulous attention to typography, interaction, and visual craft.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-text-muted">
              <span className="rounded-small border border-border-light bg-surface-muted px-2.5 py-1">
                Figma Dot Grid Canvas (#E6E6E3 · 22px)
              </span>
              <span className="rounded-small border border-border-light bg-surface-muted px-2.5 py-1">
                Geist &amp; Inter Typography
              </span>
              <span className="rounded-small border border-border-light bg-surface-muted px-2.5 py-1">
                Next.js 16 App Router
              </span>
            </div>
          </div>

          <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-medium border border-border-light bg-surface-muted shadow-card sm:h-72 sm:w-56">
            <Image
              src="/images/hero-portrait.webp"
              alt="Maya Ortiz — Product Designer in Lisbon"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, 224px"
              priority
            />
          </div>
        </div>
      </ArtboardContainer>

      {/* Dark Container Primitive Showcase (Task 3.2) */}
      <DarkContainer className="mt-8 mb-12">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <span>Dark Container Primitive · #161616</span>
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Contact &amp; CTA Surface Preview
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            This container provides the #161616 dark surface with rgba(255,255,255,0.12) border
            and cascading on-dark text tokens, matching the Snapline Contact section and footer blocks.
          </p>
        </div>
      </DarkContainer>
    </main>
  );
}

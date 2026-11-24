import type { Metadata } from "next";
import { Header } from "@/components/navigation";
import { ArtboardContainer, PillBadge, BackLink } from "@/components/primitives";

export const metadata: Metadata = {
  title: "About",
  description: "About Maya Ortiz — Product Designer in Lisbon.",
};

export default function AboutPage() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-8 sm:px-8 lg:px-12">
      <ArtboardContainer className="mt-4 sm:mt-6">
        <Header />

        <div className="mt-8 mb-6 flex flex-wrap items-center justify-between gap-4">
          <BackLink to="home" />
          <PillBadge label="About" count={1} isActive />
        </div>

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-pill bg-neon-lime px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-primary">
            <span>Product Designer · Lisbon</span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            About Maya
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            Senior Product Designer based in Lisbon with over eight years of experience shaping
            complex digital platforms, design tokens, and user interfaces for high-growth tech companies.
          </p>
        </div>

        <div className="mt-8 rounded-medium border border-border-light bg-surface-muted p-8 text-center sm:p-12">
          <span className="font-sans text-sm font-medium text-text-muted">
            Full biographical story, experience timeline &amp; toolstack (Milestone 8)
          </span>
        </div>
      </ArtboardContainer>
    </main>
  );
}

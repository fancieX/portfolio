import type { Metadata } from "next";
import { Header, Footer } from "@/components/navigation";
import { ArtboardContainer, PillBadge, BackLink } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected design works, case studies, and systems by Maya Ortiz.",
};

export default function WorkPage() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-8 sm:px-8 lg:px-12">
      <ArtboardContainer className="mt-4 sm:mt-6">
        <Header />

        <div className="mt-8 mb-6 flex flex-wrap items-center justify-between gap-4">
          <BackLink to="home" />
          <div className="flex flex-wrap items-center gap-2">
            <PillBadge label="All" count={6} isActive />
            <PillBadge label="Web app" count={2} />
            <PillBadge label="Mobile app" count={2} />
            <PillBadge label="Design system" count={1} />
            <PillBadge label="Brand" count={1} />
          </div>
        </div>

        <div className="max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Selected Work
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            A curation of digital products, design systems, and web applications crafted with
            meticulous attention to typography, interaction, and visual craft.
          </p>
        </div>

        <div className="mt-8 rounded-medium border border-border-light bg-surface-muted p-8 text-center sm:p-12">
          <span className="font-sans text-sm font-medium text-text-muted">
            Work case studies gallery (Milestone 6)
          </span>
        </div>
      </ArtboardContainer>

      {/* Global Page Footer Component (Task 4.4) */}
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/navigation";
import { ArtboardContainer, PillBadge, BackLink } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Journal",
  description: "Thoughts, notes, and writings on design craft and engineering.",
};

export default function JournalPage() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-8 sm:px-8 lg:px-12">
      <ArtboardContainer className="mt-4 sm:mt-6">
        <Header />

        <div className="mt-8 mb-6 flex flex-wrap items-center justify-between gap-4">
          <BackLink to="home" />
          <PillBadge label="Journal" count={4} isActive />
        </div>

        <div className="max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Journal
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            Reflections, technical breakdowns, and observations on interface design systems,
            micro-interactions, and design engineering.
          </p>
        </div>

        <div className="mt-8 rounded-medium border border-border-light bg-surface-muted p-8 text-center sm:p-12">
          <span className="font-sans text-sm font-medium text-text-muted">
            Journal articles and long-form essays (Milestone 9)
          </span>
        </div>
      </ArtboardContainer>
    </main>
  );
}

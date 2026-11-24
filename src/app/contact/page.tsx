import type { Metadata } from "next";
import { Header } from "@/components/navigation";
import {
  ArtboardContainer,
  DarkContainer,
  AvailabilityBadge,
  BackLink,
  Button,
} from "@/components/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Maya Ortiz for design partnerships and collaborations.",
};

export default function ContactPage() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-8 sm:px-8 lg:px-12">
      <ArtboardContainer className="mt-4 sm:mt-6">
        <Header />

        <div className="mt-8 mb-6 flex flex-wrap items-center justify-between gap-4">
          <BackLink to="home" />
          <AvailabilityBadge statusText="Available for Q1 projects" />
        </div>

        <div className="max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Get in touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            Have a project in mind, an upcoming product redesign, or want to discuss design systems?
            Reach out and let&apos;s build something exceptional together.
          </p>
        </div>

        <DarkContainer className="mt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Ready to collaborate?
              </h2>
              <p className="mt-1 text-sm text-[#A0A0A0]">
                Interactive contact form and email integration (Milestone 10)
              </p>
            </div>
            <Button
              href="mailto:hello@mayaortiz.design"
              variant="lime"
              size="md"
            >
              hello@mayaortiz.design
            </Button>
          </div>
        </DarkContainer>
      </ArtboardContainer>
    </main>
  );
}

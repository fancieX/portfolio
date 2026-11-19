import Image from "next/image";
import {
  ArtboardContainer,
  DarkContainer,
  PillBadge,
  AvailabilityBadge,
  Button,
  BackLink,
  TextInput,
  TextArea,
  CustomSelect,
} from "@/components/primitives";

export default function Home() {
  return (
    <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 py-8 sm:px-8 lg:px-12">
      {/* Top Header Placeholder with AvailabilityBadge & Header Button (Task 3.3 & 3.4) */}
      <header className="flex h-14 w-full items-center justify-between">
        <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
          Maya.
        </span>
        <div className="flex items-center gap-3">
          <AvailabilityBadge statusText="Available for projects" />
          <Button variant="primary" size="sm">
            Get in touch
          </Button>
        </div>
      </header>

      {/* Artboard Surface Container Primitive (Task 3.2) */}
      <ArtboardContainer className="mt-8">
        {/* BackLink Primitive Showcase (Task 3.4: "← All works" and "← Journal") */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <BackLink to="work" />
          <span className="text-xs text-[#605F5F]/40">|</span>
          <BackLink to="journal" />
        </div>

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

            {/* Action Buttons Primitive Showcase (Task 3.4) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary">View my work</Button>
              <Button variant="secondary">Say hello</Button>
              <Button variant="lime">Signature Lime</Button>
            </div>

            {/* Category Filter Pills (Task 3.3) */}
            <div className="mt-8">
              <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Category Filter Pills (Task 3.3)
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <PillBadge label="All" count={6} isActive />
                <PillBadge label="Web app" count={2} />
                <PillBadge label="Mobile app" count={2} />
                <PillBadge label="Design system" count={1} />
                <PillBadge label="Brand" count={1} />
              </div>
            </div>

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

      {/* Dark Container Primitive Showcase & Contact Form Controls (Task 3.2 & 3.5) */}
      <DarkContainer className="mt-8 mb-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              <span>Dark Form Controls (Task 3.5) · #161616</span>
            </div>
            {/* Dark Variant of AvailabilityBadge (Task 3.3) */}
            <AvailabilityBadge
              statusText="Booking projects for January"
              variant="dark"
            />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Contact Form Input Primitives
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/60">
              Interactive inputs, textareas, and custom select comboboxes with signature neon lime focus borders.
            </p>
          </div>

          {/* 2-Column Responsive Form Input Grid (Task 3.5) */}
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput
                label="Name"
                placeholder="Your name"
                required
              />
              <TextInput
                label="Email"
                type="email"
                placeholder="Your email address"
                required
              />
              <TextInput
                label="Company or website"
                placeholder="Company name or URL"
              />
              <CustomSelect
                label="Service needed"
                options={[
                  "Product Strategy",
                  "Design System",
                  "Web Application",
                  "Mobile App",
                ]}
                defaultValue="Product Strategy"
              />
              <CustomSelect
                label="Budget"
                options={["Under $10k", "$10k - $25k", "$25k - $50k", "$50k+"]}
                defaultValue="Under $10k"
              />
              <CustomSelect
                label="Timeline"
                options={[
                  "As soon as possible",
                  "Within 1-2 months",
                  "Flexible",
                ]}
                defaultValue="As soon as possible"
              />
            </div>

            <TextArea
              label="Project notes"
              placeholder="Tell me about the project, audience and goals"
              rows={4}
            />

            <div className="mt-2">
              <Button variant="lime" size="lg" fullWidth type="submit">
                Send enquiry
              </Button>
            </div>
          </form>
        </div>
      </DarkContainer>
    </main>
  );
}

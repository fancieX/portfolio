import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas p-8 text-text-primary">
      <div className="mx-auto max-w-lg rounded-medium border border-border-light bg-surface-light p-6 shadow-card">
        <div className="inline-flex items-center gap-2 rounded-pill bg-neon-lime px-3 py-1 text-xs font-medium text-text-primary">
          <span>Snapline Asset Pipeline</span>
        </div>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-text-primary">
          Static Asset Pipeline Verified
        </h1>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          All 28 assets (15 images, 4 WOFF2 fonts, 8 SVG icons, 1 dot pattern) staged locally.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-28 w-20 overflow-hidden rounded-small border border-border-light bg-surface-muted">
            <Image
              src="/images/hero-portrait.webp"
              alt="Hero portrait demonstration"
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-medium text-text-primary">Hero Portrait (1200×1800)</h2>
            <p className="mt-1 text-xs text-text-muted">Direct local staging via next/image</p>
          </div>
        </div>
      </div>
    </main>
  );
}

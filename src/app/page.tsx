export default function Home() {
  return (
    <main className="min-h-screen bg-canvas p-8 text-text-primary">
      <div className="mx-auto max-w-md rounded-medium border border-border-light bg-surface-light p-6 shadow-card">
        <div className="inline-flex items-center gap-2 rounded-pill bg-neon-lime px-3 py-1 text-xs font-medium text-text-primary">
          <span>Snapline Typography</span>
        </div>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-text-primary">
          Geist & Inter Fonts
        </h1>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          Local WOFF2 font variables loaded with zero CLS.
        </p>
      </div>
    </main>
  );
}

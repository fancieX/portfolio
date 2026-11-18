export default function Home() {
  return (
    <main className="min-h-screen bg-canvas p-8 text-text-primary">
      <div className="mx-auto max-w-md rounded-medium border border-border-light bg-surface-light p-6 shadow-card">
        <div className="inline-flex items-center gap-2 rounded-pill bg-neon-lime px-3 py-1 text-xs font-medium text-text-primary">
          <span>Snapline Tokens</span>
        </div>
        <h1 className="mt-4 text-xl font-medium text-text-primary">
          Design Token Verification
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Tailwind CSS v4 custom theme tokens compiled successfully.
        </p>
      </div>
    </main>
  );
}

export default function NightLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 pb-12 pt-6">
        <div className="mb-6 h-5 w-24 animate-pulse rounded bg-muted" />
        <div className="mb-6">
          <div className="mb-2 flex gap-2">
            <div className="h-12 w-16 animate-pulse rounded bg-primary/30" />
            <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <div className="mb-3 h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="mb-4 h-6 w-20 animate-pulse rounded bg-primary/30" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <div className="mb-3 h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 w-full animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

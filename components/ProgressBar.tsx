"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Progression
        </span>
        <span className="text-sm font-semibold text-primary">
          {completed}/{total} — {percentage}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

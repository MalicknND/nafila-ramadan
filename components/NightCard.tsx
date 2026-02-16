"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { NafilaNight } from "@/types";

interface NightCardProps {
  night: NafilaNight;
  isCompleted: boolean;
}

export default function NightCard({ night, isCompleted }: NightCardProps) {
  return (
    <Link
      href={`/night/${night.night}`}
      className="group relative block overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
      style={{ animationDelay: `${night.night * 30}ms` }}
    >
      {isCompleted && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
          <Check className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}

      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-amiri text-3xl font-bold text-primary">
          {night.night}
        </span>
        <span className="text-sm text-muted-foreground">
          Nuit
        </span>
      </div>

      <div className="mb-2 flex items-center gap-1.5">
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {night.rakaat} Rakaat
        </span>
        <span className="inline-flex items-center rounded-md bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-foreground">
          {night.surahs.length} Sourates
        </span>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {night.titleFrench}
      </p>
    </Link>
  );
}

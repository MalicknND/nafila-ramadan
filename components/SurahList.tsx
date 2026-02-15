"use client";

import type { Surah } from "@/types";
import type { Language } from "@/types";

interface SurahListProps {
  surahs: Surah[];
  lang: Language;
}

export default function SurahList({ surahs, lang }: SurahListProps) {
  return (
    <div className="space-y-2">
      {surahs.map((surah, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-2.5"
        >
          <span className="font-medium text-foreground">
            {lang === "wo" ? surah.nameWolof : surah.name}
          </span>
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary">
            ×{surah.count}
          </span>
        </div>
      ))}
    </div>
  );
}

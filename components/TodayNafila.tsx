"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/Providers";
import { useCompletedNights } from "@/components/Providers";
import { nafilaData } from "@/data/ramadan";
import type { NafilaNight } from "@/types";

interface TodayNafilaProps {
  night: NafilaNight;
}

export default function TodayNafila({ night }: TodayNafilaProps) {
  const { t } = useLanguage();
  const { isCompleted } = useCompletedNights();

  return (
    <Link
      href={`/night/${night.night}`}
      className="group block rounded-2xl border-2 border-primary/40 bg-card p-6 shadow-lg transition-all hover:border-primary hover:shadow-xl dark:bg-card/80"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary">
            {t("Nafila bu guddi", "Nafila du jour")}
          </p>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-amiri text-4xl font-bold text-primary">
              {night.night}
            </span>
            <span className="text-lg text-muted-foreground">
              {t("Guddi", "Nuit")}
            </span>
          </div>
          <h2 className="font-amiri text-xl font-bold text-foreground sm:text-2xl">
            {t(night.titleWolof, night.titleFrench)}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {night.rakaat} Rakaat · {night.surahs.length}{" "}
            {t("Surat", "Sourates")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isCompleted(night.night) && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              ✓ {t("Defna ko", "Terminé")}
            </span>
          )}
          <ChevronRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

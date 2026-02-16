"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useLanguage, useCompletedNights } from "@/components/Providers";
import { nafilaData } from "@/data/ramadan";
import Header from "@/components/Header";
import SurahList from "@/components/SurahList";
import ExportImageButton from "@/components/ExportImageButton";

export default function NightDetailPage() {
  const params = useParams();
  const { lang, t } = useLanguage();
  const { isCompleted, toggle } = useCompletedNights();

  const nightNum = Number(params.id);
  const night = nafilaData.find((n) => n.night === nightNum);

  if (!night) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          {t("Guddi gi amul.", "Cette nuit n'existe pas.")}
        </p>
      </div>
    );
  }

  const completed = isCompleted(night.night);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 pb-12 pt-6">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("Déllu ci biir", "Retour")}
        </Link>

        {/* Title */}
        <div className="mb-6">
          <div className="mb-1 flex items-baseline gap-2">
            <span className="font-amiri text-5xl font-bold text-primary">
              {night.night}
            </span>
            <span className="text-lg text-muted-foreground">
              {t("Guddi", "Nuit")}
            </span>
          </div>
          <h2 className="font-amiri text-2xl text-foreground">
            {t(night.titleWolof, night.titleFrench)}
          </h2>
        </div>

        {/* Rakaat */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 font-amiri text-lg font-bold text-foreground">
            {t("Ndimbal", "Instructions")}
          </h3>
          <p className="mb-4 text-lg font-semibold text-primary">
            {night.rakaat} Rakaat
          </p>

          <SurahList surahs={night.surahs} lang={lang} />

          {night.extraInstructions && (
            <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-3">
              <p className="text-sm leading-relaxed text-foreground">
                {t(night.extraInstructions.wo, night.extraInstructions.fr)}
              </p>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 font-amiri text-lg font-bold text-foreground">
            {t("Njariñ / Bienfaits", "Njariñ / Bienfaits")}
          </h3>
          <p className="whitespace-pre-line leading-relaxed text-foreground">
            {t(night.benefitsWolof, night.benefitsFrench)}
          </p>
        </div>

        {/* Actions - mobile: empilés, desktop: côte à côte, même largeur */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <button
            type="button"
            onClick={() => toggle(night.night)}
            className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 sm:px-6 ${
              completed
                ? "bg-primary text-primary-foreground"
                : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Check className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {completed
                ? t("Defna ko ✓", "Terminé ✓")
                : t("Tëral ne defna ko", "Marquer comme terminé")}
            </span>
          </button>

          <div className="flex min-w-0 flex-1">
            <ExportImageButton night={night} lang={lang} />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {night.night > 1 && (
            <Link
              href={`/night/${night.night - 1}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← {t("Guddi", "Nuit")} {night.night - 1}
            </Link>
          )}
          <div className="flex-1" />
          {night.night < 30 && (
            <Link
              href={`/night/${night.night + 1}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("Guddi", "Nuit")} {night.night + 1} →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

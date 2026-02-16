"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useLanguage, useCompletedNights, useRamadanStart } from "@/components/Providers";
import { nafilaData } from "@/data/ramadan";
import Header from "@/components/Header";
import SurahList from "@/components/SurahList";
import ExportImageButton from "@/components/ExportImageButton";

export default function NightDetailPage() {
  const params = useParams();
  const { lang, setLang } = useLanguage();
  const { isCompleted, toggle } = useCompletedNights();
  const { laylatulQadrNight } = useRamadanStart();

  const nightNum = Number(params.id);
  const night = nafilaData.find((n) => n.night === nightNum);

  if (!night) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Cette nuit n&apos;existe pas.
        </p>
      </div>
    );
  }

  const completed = isCompleted(night.night);
  const isLaylatulQadr = laylatulQadrNight === night.night;

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
          Retour
        </Link>

        {/* Badge Laylatul Qadr */}
        {isLaylatulQadr && (
          <div className="mb-6 rounded-xl border border-primary/40 bg-primary/10 p-4 text-center">
            <p className="font-amiri text-lg font-semibold text-primary">
              Nuit du Destin (Laylatul Qadr)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Selon le calendrier de Khadim Rassoul (Cheikh Ahmadou Bamba)
            </p>
          </div>
        )}

        {/* Title */}
        <div className="mb-6">
          <div className="mb-1 flex items-baseline gap-2">
            <span className="font-amiri text-5xl font-bold text-primary">
              {night.night}
            </span>
            <span className="text-lg text-muted-foreground">
              Nuit
            </span>
          </div>
          <h2 className="font-amiri text-2xl text-foreground">
            {night.titleFrench}
          </h2>
        </div>

        {/* Rakaat */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 font-amiri text-lg font-bold text-foreground">
            Instructions
          </h3>
          <p className="mb-4 text-lg font-semibold text-primary">
            {night.rakaat} Rakaat
          </p>

          <SurahList surahs={night.surahs} lang="fr" />

          {night.extraInstructions && (
            <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-3">
              <p className="text-sm leading-relaxed text-foreground">
                {night.extraInstructions.fr}
              </p>
            </div>
          )}
        </div>

        {/* Benefits - toggle langue uniquement ici */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-amiri text-lg font-bold text-foreground">
              Njariñ / Bienfaits
            </h3>
            <button
              type="button"
              onClick={() => setLang(lang === "wo" ? "fr" : "wo")}
              className="rounded-lg bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {lang === "wo" ? "FR" : "WO"}
            </button>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-foreground">
            {lang === "wo" ? night.benefitsWolof : night.benefitsFrench}
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
                ? "Terminé ✓"
                : "Marquer comme terminé"}
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
              ← Nuit {night.night - 1}
            </Link>
          )}
          <div className="flex-1" />
          {night.night < 30 && (
            <Link
              href={`/night/${night.night + 1}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Nuit {night.night + 1} →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/Providers";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <h2 className="mb-4 font-amiri text-2xl font-bold text-destructive">
          {t("Amul xët.", "Une erreur est survenue.")}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {t(
            "Téere rékk déggal ko.",
            "Veuillez réessayer.",
          )}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {t("Déggal", "Réessayer")}
          </button>
          <Link
            href="/"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t("Déllu ci kanam", "Retour à l'accueil")}
          </Link>
        </div>
      </div>
    </div>
  );
}

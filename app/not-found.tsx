"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Providers";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="mb-4 font-amiri text-4xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {t(
            "Guddi gi amul.",
            "Oops ! Cette page n'existe pas.",
          )}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary underline hover:text-primary/90"
        >
          {t("Déllu ci kanam", "Retour à l'accueil")}
        </Link>
      </div>
    </div>
  );
}

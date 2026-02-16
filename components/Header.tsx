"use client";

import { useState } from "react";
import { Moon, Sun, Globe, Calendar } from "lucide-react";
import { useDarkMode } from "@/components/Providers";
import { useLanguage } from "@/components/Providers";
import { useRamadanStart } from "@/components/Providers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RamadanSetup from "@/components/RamadanSetup";

export default function Header() {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { lang, setLang, t } = useLanguage();
  const { isSet, startDate } = useRamadanStart();
  const pathname = usePathname();
  const [showDateDialog, setShowDateDialog] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
          </Link>
          <div className="flex items-center gap-2">
            {isSet && (
              <button
                onClick={() => setShowDateDialog(true)}
                className="rounded-lg bg-secondary p-1.5 text-secondary-foreground transition-colors hover:bg-secondary/80"
                aria-label={t("Soppi daat", "Changer la date")}
                title={t("Soppi daat Wéérou Koor", "Changer la date de début du Ramadan")}
              >
                <Calendar className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setLang(lang === "wo" ? "fr" : "wo")}
              className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              {lang === "wo" ? "FR" : "WO"}
            </button>
            <button
              onClick={toggleDark}
              className="rounded-lg bg-secondary p-1.5 text-secondary-foreground transition-colors hover:bg-secondary/80"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dialog pour modifier la date */}
      {showDateDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowDateDialog(false)}
              className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
              aria-label={t("Tegg", "Fermer")}
            >
              ×
            </button>
            <RamadanSetup
              initialDate={startDate}
              compact
              onSuccess={() => setShowDateDialog(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { Moon, Sun, Globe } from "lucide-react";
import { useDarkMode } from "@/components/Providers";
import { useLanguage } from "@/components/Providers";
import Image from "next/image";

export default function Header() {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </div>
        <div className="flex items-center gap-2">
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
  );
}

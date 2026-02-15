"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Language } from "@/types";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (wo: string, fr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("wo");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        localStorage.getItem("nafila-lang")) as Language | null;
    if (stored === "wo" || stored === "fr") setLangState(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("nafila-lang", lang);
  }, [lang, mounted]);

  const setLang = useCallback((l: Language) => setLangState(l), []);
  const t = useCallback(
    (wo: string, fr: string) => (lang === "wo" ? wo : fr),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(true); // Dark par défaut
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== "undefined" && localStorage.getItem("nafila-dark");
    // null ou "true" = dark, "false" = light
    setIsDark(stored !== "false");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("nafila-dark", String(isDark));
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, mounted]);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggle };
}

const STORAGE_KEY = "nafila-completed";

export function useCompletedNights() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored =
        typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
      setCompleted(stored ? JSON.parse(stored) : []);
    } catch {
      setCompleted([]);
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed, mounted]);

  const toggle = useCallback((night: number) => {
    setCompleted((prev) =>
      prev.includes(night) ? prev.filter((n) => n !== night) : [...prev, night]
    );
  }, []);

  const isCompleted = useCallback(
    (night: number) => completed.includes(night),
    [completed]
  );

  return { completed, toggle, isCompleted, count: completed.length };
}

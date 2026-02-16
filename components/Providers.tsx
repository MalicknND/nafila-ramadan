"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { toLocalDateString } from "@/lib/utils";
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

const RAMADAN_STORAGE_KEY = "nafila-ramadan-start";

function getDaysSince(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
}

interface RamadanStartContextType {
  startDate: string | null;
  setStartDate: (date: Date) => void;
  clearStartDate: () => void;
  currentNight: number;
  isSet: boolean;
  daysSince: number;
  hasStarted: boolean;
  daysUntilFirstNight: number; // jours avant la 1ère nuit (0 = ce soir)
}

const RamadanStartContext = createContext<RamadanStartContextType | undefined>(
  undefined
);

export function RamadanStartProvider({ children }: { children: ReactNode }) {
  const [startDate, setStartDateState] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" &&
      localStorage.getItem(RAMADAN_STORAGE_KEY);
    setStartDateState(stored || null);
    setMounted(true);
  }, []);

  const setStartDate = useCallback((date: Date) => {
    const dateStr = toLocalDateString(date);
    setStartDateState(dateStr);
    if (typeof window !== "undefined") {
      localStorage.setItem(RAMADAN_STORAGE_KEY, dateStr);
    }
  }, []);

  useEffect(() => {
    if (mounted && startDate) {
      localStorage.setItem(RAMADAN_STORAGE_KEY, startDate);
    }
  }, [startDate, mounted]);

  const clearStartDate = useCallback(() => {
    setStartDateState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(RAMADAN_STORAGE_KEY);
    }
  }, []);

  const parsedDate = startDate ? new Date(startDate + "T12:00:00") : null;
  const daysSince = parsedDate ? getDaysSince(parsedDate) : 0;

  // Logique Nafila : Nuit 1 = veille du 1er jour de jeûne
  // Ex: Ramadan 17 fév → Nuit 1 = soir du 16 | Jour 17 = Nuit 2 | Jour 18 = Nuit 3
  // hasStarted dès la veille (daysSince >= -1)
  const hasStarted = daysSince >= -1;
  const currentNight = hasStarted
    ? Math.max(1, Math.min(30, daysSince + 2))
    : 1;
  const daysUntilFirstNight =
    daysSince < -1 ? -daysSince - 1 : 0;

  const value: RamadanStartContextType = {
    startDate,
    setStartDate,
    clearStartDate,
    currentNight,
    isSet: !!startDate,
    daysSince,
    hasStarted,
    daysUntilFirstNight,
  };

  return (
    <RamadanStartContext.Provider value={value}>
      {children}
    </RamadanStartContext.Provider>
  );
}

export function useRamadanStart() {
  const ctx = useContext(RamadanStartContext);
  if (!ctx) throw new Error("useRamadanStart must be used within RamadanStartProvider");
  return ctx;
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

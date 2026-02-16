"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/Providers";
import { useRamadanStart } from "@/components/Providers";
import { toLocalDateString } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";

interface RamadanSetupProps {
  initialDate?: string | null;
  compact?: boolean;
  onSuccess?: () => void;
}

export default function RamadanSetup({
  initialDate,
  compact = false,
  onSuccess,
}: RamadanSetupProps) {
  const { t } = useLanguage();
  const { setStartDate } = useRamadanStart();
  const [dateValue, setDateValue] = useState(initialDate || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialDate) setDateValue(initialDate);
  }, [initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateValue) {
      setError(true);
      return;
    }
    setError(false);
    setStartDate(new Date(dateValue + "T12:00:00"));
    onSuccess?.();
  };

  const handleDateChange = (date: Date) => {
    setDateValue(toLocalDateString(date));
    setError(false);
  };

  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-lg ${
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8"
      }`}
    >
      <div
        className={`flex items-center justify-center gap-3 ${
          compact ? "mb-4" : "mb-6"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
          <CalendarIcon className="h-7 w-7 text-primary" />
        </div>
        <h2
          className={`font-amiri font-bold text-foreground ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          {t(
            "Kañ la u njëkkëd Wéérou Koor ?",
            "Quand as-tu commencé le Ramadan ?",
          )}
        </h2>
      </div>
      <p className="mb-6 text-center text-muted-foreground">
        {t(
          "Téré ci bépp guddi sa Nafila.",
          "Tu verras la Nafila du jour chaque fois que tu viendras.",
        )}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="ramadan-start"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {t("Daat", "Date")}
          </label>
          <DatePicker
            value={dateValue}
            onChange={handleDateChange}
            placeholder="jj/mm/aaaa"
            error={error}
          />
          {error && (
            <p className="mt-2 text-sm text-destructive">
              {t("Téere téeree daat.", "Veuillez choisir une date.")}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("Taxawal", "Valider")}
        </button>
      </form>
    </div>
  );
}

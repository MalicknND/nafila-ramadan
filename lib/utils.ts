import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convertit une Date en YYYY-MM-DD en heure locale (évite le décalage UTC) */
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Calendrier perpétuel de Khadim Rassoul (Cheikh Ahmadou Bamba)
 * pour localiser la nuit du Laylatul Qadr selon le jour du 1er Ramadan.
 * Laylatul Qadr est toujours une nuit du jeudi au vendredi, jour impair.
 */
const LAYLATUL_QADR_BY_FIRST_DAY: Record<number, number> = {
  0: 27, // Dimanche → nuit 27
  1: 19, // Lundi → nuit 19
  2: 25, // Mardi → nuit 25
  3: 17, // Mercredi → nuit 17
  4: 23, // Jeudi → nuit 23
  5: 29, // Vendredi → nuit 29
  6: 21, // Samedi → nuit 21
};

export function getLaylatulQadrNight(ramadanFirstDay: string): number | null {
  const d = new Date(ramadanFirstDay + "T12:00:00");
  const dayOfWeek = d.getDay();
  return LAYLATUL_QADR_BY_FIRST_DAY[dayOfWeek] ?? null;
}

"use client";

import { Share2 } from "lucide-react";
import type { NafilaNight } from "@/types";
import type { Language } from "@/types";

interface ShareButtonProps {
  night: NafilaNight;
  lang: Language;
}

export default function ShareButton({ night, lang }: ShareButtonProps) {
  const handleShare = () => {
    const text =
      lang === "wo"
        ? `📿 Nafila Guddi ${night.night} - ${night.rakaat} Raka\n${night.titleWolof}\n\n${night.benefitsWolof}`
        : `📿 Nafila Nuit ${night.night} - ${night.rakaat} Raka\n${night.titleFrench}\n\n${night.benefitsFrench}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(142,70%,40%)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[hsl(142,70%,35%)]"
    >
      <Share2 className="h-4 w-4" />
      WhatsApp
    </button>
  );
}

"use client";

import { useRef, useState, useCallback } from "react";
import { Download, Share2, Copy } from "lucide-react";
import html2canvas from "html2canvas";
import type { NafilaNight } from "@/types";
import type { Language } from "@/types";

// Couleurs du thème sombre (style doré/élégant)
const COLORS = {
  background: "hsl(150, 30%, 8%)",
  card: "hsl(150, 25%, 12%)",
  foreground: "hsl(40, 25%, 90%)",
  primary: "hsl(38, 60%, 55%)",
  muted: "hsl(40, 15%, 60%)",
  border: "hsl(150, 15%, 20%)",
  secondary: "hsl(150, 20%, 18%)",
};

const EXPORT_WIDTH = 1080;
const SCALE = 2;

interface ExportImageButtonProps {
  night: NafilaNight;
  lang: Language;
}

export default function ExportImageButton({
  night,
  lang,
}: ExportImageButtonProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTitle = () => (lang === "wo" ? night.titleWolof : night.titleFrench);
  const getBenefits = () =>
    lang === "wo" ? night.benefitsWolof : night.benefitsFrench;
  const getSurahName = (surah: { name: string; nameWolof: string }) =>
    lang === "wo" ? surah.nameWolof : surah.name;

  const generateImage = useCallback(async (): Promise<Blob | null> => {
    const el = exportRef.current;
    if (!el) return null;

    try {
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(el, {
        scale: SCALE,
        useCORS: true,
        allowTaint: true,
        backgroundColor: COLORS.background,
        logging: false,
        width: EXPORT_WIDTH,
        windowWidth: EXPORT_WIDTH,
        imageTimeout: 8000,
        onclone: (_doc, clonedEl) => {
          clonedEl.style.opacity = "1";
        },
      });

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
          "image/png",
          1.0,
        );
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'export");
      return null;
    }
  }, []);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    const blob = await generateImage();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nafila-nuit-${night.night}-ramadan.png`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setIsLoading(false);
    setShowMenu(false);
  };

  const handleShare = async () => {
    setIsLoading(true);
    setError(null);
    const blob = await generateImage();
    if (blob && navigator.share) {
      try {
        const file = new File([blob], `nafila-nuit-${night.night}.png`, {
          type: "image/png",
        });
        const canShareFiles =
          !navigator.canShare || navigator.canShare({ files: [file] });
        if (canShareFiles) {
          await navigator.share({
            files: [file],
            title: `Nafila Nuit ${night.night}`,
            text: getTitle(),
          });
        } else {
          await navigator.share({
            title: `Nafila Nuit ${night.night}`,
            text: `${getTitle()}\n\nTéléchargez l'app: ${typeof window !== "undefined" ? window.location.origin : ""}`,
          });
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError")
          setError("Le partage n'est pas disponible");
      }
    } else {
      setError("Le partage n'est pas disponible");
    }
    setIsLoading(false);
    setShowMenu(false);
  };

  const handleCopy = async () => {
    setIsLoading(true);
    setError(null);
    const blob = await generateImage();
    if (blob && navigator.clipboard?.write) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      } catch {
        setError("Copie non supportée");
      }
    } else {
      setError("Copie non supportée");
    }
    setIsLoading(false);
    setShowMenu(false);
  };

  const canShare = typeof navigator !== "undefined" && !!navigator.share;
  const canCopy =
    typeof navigator !== "undefined" && !!navigator.clipboard?.write;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        disabled={isLoading}
        className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-60 sm:flex-initial"
      >
        <Download className="h-4 w-4 shrink-0" />
        <span className="truncate">
          {isLoading ? "..." : "Exporter en image"}
        </span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-border bg-card py-2 shadow-lg">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isLoading}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary/50 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </button>
            {canShare && (
              <button
                type="button"
                onClick={handleShare}
                disabled={isLoading}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary/50 disabled:opacity-50"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </button>
            )}
            {canCopy && (
              <button
                type="button"
                onClick={handleCopy}
                disabled={isLoading}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground hover:bg-secondary/50 disabled:opacity-50"
              >
                <Copy className="h-4 w-4" />
                Copier
              </button>
            )}
          </div>
        </>
      )}

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      {/* Template invisible mais dans le viewport pour un rendu correct par html2canvas */}
      <div
        ref={exportRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -9999,
          opacity: 0,
          pointerEvents: "none",
          width: EXPORT_WIDTH,
          padding: 60,
          backgroundColor: COLORS.background,
          fontFamily: "'Inter', 'Amiri', sans-serif",
        }}
        aria-hidden
      >
        {/* Titre */}
        <div style={{ marginBottom: 48 }}>
          {" "}
          {/* ✅ Augmenté de 40 → 48 */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16, // ✅ Augmenté de 12 → 16
              marginBottom: 16, // ✅ Augmenté de 12 → 16
            }}
          >
            <span
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: 110, // ✅ ÉNORME : 84 → 110
                fontWeight: 700,
                color: COLORS.primary,
              }}
            >
              {night.night}
            </span>
            <span
              style={{
                fontSize: 36, // ✅ Augmenté de 28 → 36
                color: COLORS.muted,
              }}
            >
              {lang === "wo" ? "Guddi" : "Nuit"}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: 52, // ✅ Augmenté de 42 → 52
              fontWeight: 700,
              color: COLORS.foreground,
            }}
          >
            {getTitle()}
          </h2>
        </div>

        {/* Instructions */}
        <div
          style={{
            marginBottom: 48, // ✅ Augmenté de 40 → 48
            padding: 48, // ✅ Augmenté de 40 → 48
            borderRadius: 16,
            border: `1px solid ${COLORS.border}`,
            backgroundColor: COLORS.card,
          }}
        >
          <h3
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: 32, // ✅ Augmenté de 26 → 32
              fontWeight: 700,
              color: COLORS.foreground,
              marginBottom: 24, // ✅ Augmenté de 20 → 24
            }}
          >
            {lang === "wo" ? "Ndimbal" : "Instructions"}
          </h3>
          <p
            style={{
              fontSize: 42, // ✅ Augmenté de 34 → 42
              fontWeight: 600,
              color: COLORS.primary,
              marginBottom: 32, // ✅ Augmenté de 28 → 32
            }}
          >
            {night.rakaat} Rakaat
          </p>

          {/* Liste des sourates */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {" "}
            {/* ✅ Augmenté de 10 → 14 */}
            {night.surahs.map((surah, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px", // ✅ Augmenté de 14px 20px → 18px 24px
                  borderRadius: 10, // ✅ Augmenté de 8 → 10
                  backgroundColor: "rgba(28, 41, 37, 0.5)",
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    color: COLORS.foreground,
                    fontSize: 28, // ✅ Augmenté de 22 → 28
                  }}
                >
                  {getSurahName(surah)}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 44, // ✅ Augmenté de 36 → 44
                    minWidth: 66, // ✅ Augmenté de 56 → 66
                    padding: "0 18px", // ✅ Augmenté de 14px → 18px
                    borderRadius: 8, // ✅ Augmenté de 6 → 8
                    backgroundColor: "rgba(201, 162, 39, 0.1)",
                    fontSize: 22, // ✅ Augmenté de 17 → 22
                    fontWeight: 600,
                    color: COLORS.primary,
                  }}
                >
                  ×{surah.count}
                </span>
              </div>
            ))}
          </div>

          {night.extraInstructions && (
            <div
              style={{
                marginTop: 28, // ✅ Augmenté de 24 → 28
                padding: 24, // ✅ Augmenté de 20 → 24
                borderRadius: 12, // ✅ Augmenté de 10 → 12
                border: `1px solid ${COLORS.primary}4D`,
                backgroundColor: "rgba(201, 162, 39, 0.08)",
              }}
            >
              <p
                style={{
                  fontSize: 20, // ✅ Augmenté de 16 → 20
                  lineHeight: 1.8,
                  color: COLORS.foreground,
                }}
              >
                {lang === "wo"
                  ? night.extraInstructions.wo
                  : night.extraInstructions.fr}
              </p>
            </div>
          )}
        </div>

        {/* Bienfaits */}
        <div
          style={{
            marginBottom: 48, // ✅ Augmenté de 40 → 48
            padding: 48, // ✅ Augmenté de 40 → 48
            borderRadius: 16,
            border: `1px solid ${COLORS.border}`,
            backgroundColor: COLORS.card,
          }}
        >
          <h3
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: 32, // ✅ Augmenté de 26 → 32
              fontWeight: 700,
              color: COLORS.foreground,
              marginBottom: 24, // ✅ Augmenté de 20 → 24
            }}
          >
            Njariñ / Bienfaits
          </h3>
          <p
            style={{
              fontSize: 24, // ✅ Augmenté de 19 → 24
              lineHeight: 2,
              color: COLORS.foreground,
              whiteSpace: "pre-line",
            }}
          >
            {getBenefits()}
          </p>
        </div>

        {/* Watermark avec logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20, // ✅ Augmenté de 16 → 20
            marginTop: 20, // ✅ Augmenté de 16 → 20
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Nafila Ramadan"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              height: 70, // ✅ Augmenté de 60 → 70
              width: "auto",
              objectFit: "contain",
              opacity: 0.7,
            }}
          />
          <p
            style={{
              fontSize: 18, // ✅ Augmenté de 15 → 18
              color: COLORS.muted,
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            Nafila Ramadan
          </p>
        </div>
      </div>
    </div>
  );
}

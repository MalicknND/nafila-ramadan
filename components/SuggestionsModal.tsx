"use client";

import { useState } from "react";
import { Mail, MessageCircleQuestion, X } from "lucide-react";

const SUGGESTIONS_EMAIL =
  process.env.NEXT_PUBLIC_SUGGESTIONS_EMAIL || "msndiayedev@gmail.com";

export default function SuggestionsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 shadow-lg transition-all hover:scale-105 hover:bg-primary/30 hover:shadow-xl dark:bg-primary/30 dark:hover:bg-primary/40 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label="Soumettre une suggestion"
      >
        <MessageCircleQuestion className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          {/* Contenu du modal */}
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl dark:bg-card">
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-primary/20 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Instructions */}
            <p className="mb-4 text-center text-foreground">
              Pour vos remarques et suggestions, veuillez envoyer un mail à :
            </p>

            {/* Email */}
            <a
              href={`mailto:${SUGGESTIONS_EMAIL}?subject=${encodeURIComponent(
                "Suggestion Nafila Ramadan",
              )}`}
              className="mb-6 flex items-center justify-center gap-2 text-primary underline hover:text-primary/90"
            >
              <Mail className="h-5 w-5 shrink-0" />
              <span className="font-medium">{SUGGESTIONS_EMAIL}</span>
            </a>

            {/* Copyright */}
            <p className="text-center text-sm text-muted-foreground">
              © 2026 Nafila Ramadan. Tous droits réservés.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

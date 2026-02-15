"use client";

import { useLanguage } from "@/components/Providers";
import { useCompletedNights } from "@/components/Providers";
import { nafilaData } from "@/data/ramadan";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import NightCard from "@/components/NightCard";

export default function HomePage() {
  const { t } = useLanguage();
  const { isCompleted, count } = useCompletedNights();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
          style={{ backgroundImage: "url(/hero-pattern.jpg)" }}
        />
        <div className="container relative mx-auto max-w-[1400px] px-4 py-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t("Khuratul Ayni", "Khuratul Ayni")}
          </p>
          <h2 className="font-amiri text-4xl font-bold text-foreground md:text-5xl">
            {t("Nafila Wéérou Koor", "Nafila du Ramadan")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            {t(
              "30 Nafila yi Serigne Souhaibou Mbacké bind, Serigne Ibra Ndoye yébbalu ko.",
              "Les 30 Nafila extraits du livre de Serigne Souhaibou Mbacké, compilés par Serigne Ibra Ndoye."
            )}
          </p>
        </div>
      </section>

      {/* Progress */}
      <main className="container mx-auto max-w-[1400px] px-4 pb-12">
        <div className="mb-6">
          <ProgressBar completed={count} total={30} />
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nafilaData.map((night) => (
            <NightCard
              key={night.night}
              night={night}
              isCompleted={isCompleted(night.night)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p className="font-amiri text-base">
            {t(
              "Yàlla nafi yàgg lool té ande ak wéer — Serigne Mountakha Bassirou Mbacké",
              "Qu'Allah dans sa générosité infinie accepte notre jeûne et nos nafila — Serigne Mountakha Bassirou Mbacké"
            )}
          </p>
        </footer>
      </main>
    </div>
  );
}

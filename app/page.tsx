"use client";

import Image from "next/image";
import { useCompletedNights } from "@/components/Providers";
import { useRamadanStart } from "@/components/Providers";
import { nafilaData } from "@/data/ramadan";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import NightCard from "@/components/NightCard";
import TodayNafila from "@/components/TodayNafila";
import RamadanSetup from "@/components/RamadanSetup";

export default function HomePage() {
  const { isCompleted, count } = useCompletedNights();
  const { isSet, currentNight, hasStarted, daysUntilFirstNight } =
    useRamadanStart();

  const todayNight =
    hasStarted ? nafilaData.find((n) => n.night === currentNight) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/hero.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 dark:opacity-10"
        />
        <div className="container relative mx-auto max-w-[1400px] px-4 py-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Khuratul Ayni
          </p>
          <h2 className="font-amiri text-4xl font-bold text-foreground md:text-5xl">
            Nafila du Ramadan
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Les 30 Nafila extraits du livre de Serigne Souhaibou Mbacké, compilés
            par Serigne Ibra Ndoye.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="container mx-auto max-w-[1400px] px-4 pb-12">
        {!isSet ? (
          <div className="mx-auto max-w-md pt-6">
            <RamadanSetup />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <ProgressBar completed={count} total={30} />
            </div>

            {/* Nafila du jour - prioritaire (dès la veille du Ramadan) */}
            {todayNight && (
              <section className="mb-8">
                <TodayNafila night={todayNight} />
              </section>
            )}

            {/* Pas encore le Ramadan : compte à rebours */}
            {isSet && !hasStarted && daysUntilFirstNight > 0 && (
              <section className="mb-8 rounded-2xl border border-primary/40 bg-card p-6 text-center">
                <p className="font-amiri text-xl font-bold text-primary">
                  {daysUntilFirstNight === 1
                    ? "Première nuit de Nafila dans 1 jour"
                    : `Première nuit de Nafila dans ${daysUntilFirstNight} jours`}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tu verras la Nafila du jour à l&apos;approche du Ramadan.
                </p>
              </section>
            )}

            {/* Toutes les nuits */}
            <div>
              <h3 className="mb-4 font-amiri text-lg font-semibold text-foreground">
                Toutes les 30 nuits
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nafilaData.map((night) => (
                  <NightCard
                    key={night.night}
                    night={night}
                    isCompleted={isCompleted(night.night)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p className="font-amiri text-base">
            Qu&apos;Allah dans sa générosité infinie accepte notre jeûne et nos
            nafila — Serigne Mountakha Bassirou Mbacké
          </p>
        </footer>
      </main>
    </div>
  );
}

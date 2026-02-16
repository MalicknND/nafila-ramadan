import type { Metadata } from "next";
import { nafilaData } from "@/data/ramadan";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const nightNum = Number(id);
  const night = nafilaData.find((n) => n.night === nightNum);

  if (!night) {
    return {
      title: "Nuit introuvable | Nafila Ramadan",
    };
  }

  const desc =
    night.benefitsFrench.length > 150
      ? `${night.benefitsFrench.slice(0, 147)}...`
      : night.benefitsFrench;

  return {
    title: `Nuit ${night.night} - ${night.titleFrench} | Nafila Ramadan`,
    description: `${night.rakaat} Rakaat — ${desc}`,
  };
}

export default function NightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

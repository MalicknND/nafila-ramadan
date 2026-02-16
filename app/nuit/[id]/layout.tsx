import type { Metadata } from "next";
import { nafilaData } from "@/data/ramadan";

const SITE_URL = "https://www.nafila-ramadan.com";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const nightNum = Number(id);
  const night = nafilaData.find((n) => n.night === nightNum);

  if (!night) {
    return {
      title: "Nuit introuvable",
    };
  }

  const desc =
    night.benefitsFrench.length > 150
      ? `${night.benefitsFrench.slice(0, 147)}...`
      : night.benefitsFrench;

  const title = `Nuit ${night.night} - ${night.titleFrench}`;
  const description = `${night.rakaat} Rakaat — ${desc}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/nuit/${night.night}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function NuitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

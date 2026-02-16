import type { MetadataRoute } from "next";
import { nafilaData } from "@/data/ramadan";

const SITE_URL = "https://nafila-ramadan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const nights = nafilaData.map((night) => ({
    url: `${SITE_URL}/night/${night.night}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...nights,
  ];
}

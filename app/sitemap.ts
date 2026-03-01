import type { MetadataRoute } from "next";
import { nafilaData } from "@/data/ramadan";

export const dynamic = "force-static";

const SITE_URL = "https://www.nafila-ramadan.com";
const LAST_MODIFIED = new Date("2025-03-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const nights = nafilaData.map((night) => ({
    url: `${SITE_URL}/nuit/${night.night}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...nights,
  ];
}

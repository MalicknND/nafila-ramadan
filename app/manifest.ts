import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nafila Ramadan",
    short_name: "Nafila",
    description: "Les 30 Nafila du Ramadan - Serigne Souhaibou Mbacké",
    start_url: "/",
    display: "standalone",
    background_color: "#1a3d2e",
    theme_color: "#1a3d2e",
    icons: [
      {
        src: "/nafila-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/nafila-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

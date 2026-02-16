import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider, RamadanStartProvider } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Nafila Ramadan",
  description:
    "Nafila du Ramadan - Les 30 Nafila extraits du livre de Serigne Souhaibou Mbacké",
};

// Dans app/layout.tsx (ou app/viewport.ts)

export const viewport = {
  themeColor: "#1a3d2e",
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement,c=d.classList;try{var s=localStorage.getItem('nafila-dark');if(s==='false')c.remove('dark');else c.add('dark');}catch(e){c.add('dark');}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <LanguageProvider>
        <RamadanStartProvider>{children}</RamadanStartProvider>
      </LanguageProvider>
      </body>
    </html>
  );
}

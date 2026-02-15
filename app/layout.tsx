import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Nafila Ramadan",
  description:
    "Nafila du Ramadan - Les 30 Nafila extraits du livre de Serigne Souhaibou Mbacké",
};

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
            __html: `(function(){var d=document.documentElement,c=d.classList;try{var s=localStorage.getItem('nafila-dark');if(s==='true')c.add('dark');else if(s==='false')c.remove('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

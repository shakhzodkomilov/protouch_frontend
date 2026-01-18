import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderClient from "./ThemeProviderClient";

export const metadata: Metadata = {
  title: {
    default: "Protouch | Интерактивные решения в Ташкенте",
    template: "%s | Protouch",
  },
  description:
    "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте. Protouch — инновационные технологии.",
  keywords: [
    "интерактивный инфокиоск Ташкент",
    "сенсорная панель Узбекистан",
    "роботы Ташкент",
    "Protouch",
  ],

  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_CODE",
  },

  alternates: {
    canonical: "https://protouch.uz",
  },

  icons: {
    icon: "/icons/iconn.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body>
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}

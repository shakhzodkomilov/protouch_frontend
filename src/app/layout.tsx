import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ThemeProviderClient from "./ThemeProviderClient";

export const metadata: Metadata = {
  title: {
    default: "Protouch | Интерактивные решения в Ташкенте",
    template: "%s | Protouch",
  },
  description:
    "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте. Protouch — инновационные технологии и современное оборудование.",
  keywords: [
    "интерактивный инфокиоск Ташкент",
    "интерактивная панель",
    "интерактивный инфокиоск",
    "сенсорная панель Узбекистан",
    "роботы Ташкент",
    "Protouch",
    "интерактивные технологии",
    "сенсорный экран",
    "электроника Ташкент",
  ],
  openGraph: {
    title: "Protouch | Интерактивные технологии в Ташкенте",
    description:
      "Protouch предлагает интерактивные инфокиоски, сенсорные панели и роботов для вашего бизнеса в Ташкенте.",
    url: "https://protouch.uz",
    siteName: "Protouch",
    images: [
      {
        url: "/faviconn.png",
        width: 1200,
        height: 630,
        alt: "Интерактивный инфокиоск Protouch в Ташкенте",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protouch | Интерактивные технологии в Ташкенте",
    description:
      "Интерактивные инфокиоски, сенсорные панели и роботы — современные решения от Protouch.",
    images: ["/faviconn.png"],
  },
  alternates: {
    canonical: "https://protouch.uz",
    languages: {
      uz: "https://protouch.uz/uz",
      ru: "https://protouch.uz/ru",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17911571855"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17911571855');
          `}
        </Script>
      </head>
      <body>
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}

// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer/Footer";

export const metadata: Metadata = {
  openGraph: {
    title: "Protouch Uzbekistan",
    description:
      "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте",
    url: "https://protouch.uz",
    siteName: "Protouch",
    images: [
      {
        url: "/faviconn.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/faviconn.png"],
  },

  alternates: {
    languages: {
      uz: "https://protouch.uz/uz",
      ru: "https://protouch.uz/ru",
      en: "https://protouch.uz/en",
    },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

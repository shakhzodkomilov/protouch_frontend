import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer/Footer";
import { MobileBottomNav } from "../../shared/components/Bottom/MobileBottomNav";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: {
    default:
      "Protouch | Интерактивные инфокиоски и сенсорные панели в Ташкенте",
    template: "%s | Protouch",
  },
  description:
    "Интерактивные инфокиоски, сенсорные панели, рекламные дисплеи и промо-роботы в Ташкенте. Protouch — ваш надежный партнер в цифровых решениях для бизнеса и образования. Высокое качество, современный дизайн и установка под ключ.",
  keywords: [
    "интерактивный киоск Ташкент",
    "сенсорная панель Узбекистан",
    "инфокиоск купить",
    "интерактивные дисплеи",
    "интерактивные доски",
    "роботы Ташкент",
    "Protouch Uzbekistan",
  ],
  alternates: {
    canonical: "https://protouch.uz",
    languages: {
      uz: "https://protouch.uz/uz",
      ru: "https://protouch.uz/ru",
    },
  },
  openGraph: {
    title:
      "Protouch Uzbekistan | Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте",
    description:
      "Protouch — ведущий поставщик интерактивных технологий в Узбекистане. Мы предлагаем сенсорные панели, инфокиоски и промо-роботов для бизнеса, образования и рекламы.",
    url: "https://protouch.uz",
    siteName: "Protouch Uzbekistan",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/faviconn.png",
        width: 1200,
        height: 630,
        alt: "Интерактивные инфокиоски и сенсорные панели Protouch Uzbekistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Protouch | Интерактивные киоски и сенсорные панели в Ташкенте",
    description:
      "Купить интерактивные инфокиоски, сенсорные панели и промо-роботов в Ташкенте. Доставка и установка по Узбекистану.",
    images: ["https://protouch.uz/og-image.jpg"],
  },
  icons: {
    icon: "/faviconn.png",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const googleId = process.env.NEXT_PUBLIC_CLIENT_ID;

  return (
    <>
      {googleId ? (
        <GoogleOAuthProvider clientId={googleId}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main>{children}</main>
            <Footer />
            <MobileBottomNav />
          </NextIntlClientProvider>
        </GoogleOAuthProvider>
      ) : (
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
        </NextIntlClientProvider>
      )}
    </>
  );
}

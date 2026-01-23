import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer/Footer";
import { MobileBottomNav } from "../../shared/components/Bottom/MobileBottomNav";

export const metadata: Metadata = {
  openGraph: {
    title: "Protouch Uzbekistan",
    description:
      "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте",
    url: "https://protouch.uz",
    siteName: "Protouch",
    images: [
      {
        url: "/icons/iconn.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/icons/iconn.png"],
  },
  alternates: {
    languages: {
      uz: "https://protouch.uz/uz",
      ru: "https://protouch.uz/ru",
      en: "https://protouch.uz/en",
    },
  },
};

// Define the type for params as a Promise
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

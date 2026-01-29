import type { Metadata } from "next";
import HomeCategories from "../../shared/components/Main";

export const metadata: Metadata = {
  title: {
    default: "Protouch | Онлайн-магазин в Ташкенте",
    template: "%s | Protouch",
  },
  description:
    "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте. Protouch — инновационные технологии для вашего бизнеса. Онлайн-магазин с лучшими предложениями и гарантией качества.",
  keywords: [
    "интерактивный инфокиоск Ташкент",
    "сенсорная панель Узбекистан",
    "роботы Ташкент",
    "интерактивный экран",
    "Protouch",
    "онлайн-магазин электроники",
    "интерактивные решения",
    "Интерактивная трибуна",
    "интерактивный панель",
    "интерактивный панель ",
    "интерактивный панель 65",
    "интерактивный доска",
    "Интерактивный стол",
    "Интерактивная сенсорная панель",
    "Трибуна",
    "Спикерфон",
  ],
  openGraph: {
    title: "Protouch | Интерактивные решения в Ташкенте",
    description:
      "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте. Protouch предлагает передовые технологии и качественное оборудование.",
    url: "https://protouch.uz/ru",
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
      "Сенсорные панели, инфокиоски и роботы — современные решения от Protouch.",
    images: ["faviconn.png"],
  },
  alternates: {
    canonical: "https://protouch.uz/ru",
    languages: {
      uz: "https://protouch.uz/uz",
      ru: "https://protouch.uz/ru",
    },
  },
};

export default function HomePage() {
  return <HomeCategories />;
}

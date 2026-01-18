import type { Metadata } from "next";
import HomeCategories from "../../shared/components/Main";

export const metadata: Metadata = {
  title: "Protouch | Онлайн-магазин в Ташкенте",
  description:
    "Интерактивные инфокиоски, сенсорные панели и роботы в Ташкенте.",
};

export default function HomePage() {
  return <HomeCategories />;
}

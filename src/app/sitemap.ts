// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getProducts } from "../entities/config/base";

const SITE_URL = process.env.SITE_URL ?? "https://protouch.uz";
const LOCALES = ["uz", "ru"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getProducts(1);
  const products = res?.results ?? [];

  const staticPages = LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      priority: 1,
    },
    {
      url: `${SITE_URL}/${locale}/about-us`,
      priority: 0.8,
    },
  ]);

  const productPages = products.flatMap((p: any) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/product/${p.id}`,
      lastModified: new Date(p.updated_at ?? new Date()),
      priority: 0.9,
    })),
  );

  return [...staticPages, ...productPages];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetadataRoute } from "next";
import { getProducts } from "../entities/config/base";

// 1. Configuration
const SITE_URL = process.env.SITE_URL || "https://protouch.uz";
const LOCALES = ["uz", "ru"] as const;
const DEFAULT_LOCALE = "ru";

// Add all your main routes found in your file tree
const STATIC_ROUTES = [
  "",
  "/about-us",
  "/basket",
  "/delivery",
  "/favorites",
  "/sales",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 2. Fetch Products
  // Note: For a sitemap, you ideally want to fetch all products.
  // If your API supports a 'limit' parameter, set it high (e.g., 1000).
  const res = await getProducts(1);
  const products = res?.results ?? [];

  // 3. Generate Static Page entries
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}/${DEFAULT_LOCALE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((lang) => [lang, `${SITE_URL}/${lang}${route}`]),
      ),
    },
  }));

  // 4. Generate Product Page entries
  const productEntries: MetadataRoute.Sitemap = products.map(
    (product: any) => ({
      url: `${SITE_URL}/${DEFAULT_LOCALE}/product/${product.id}`,
      lastModified: product.updated_at
        ? new Date(product.updated_at)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((lang) => [
            lang,
            `${SITE_URL}/${lang}/product/${product.id}`,
          ]),
        ),
      },
    }),
  );

  return [...staticEntries, ...productEntries];
}

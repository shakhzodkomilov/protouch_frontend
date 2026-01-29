import type { MetadataRoute } from "next";
import axios from "axios";
import { API_URL } from "../entities/config/base";

const SITE_URL = process.env.SITE_URL || "https://protouch.uz";
const LOCALES = ["uz", "ru"] as const;
const DEFAULT_LOCALE = "ru";

const STATIC_ROUTES = [
  "",
  "/about-us",
  "/basket",
  "/delivery",
  "/favorites",
  "/sales",
  "/catalog",
  "/catalogmobile",
  "/chat",
  "/legaletity",
  "/login",
  "/product",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allProducts: any[] = [];
  let currentPage = 1;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const res = await axios.get(`${API_URL}/api/v1/products/`, {
        params: { page: currentPage, lang: "ru" },
      });

      const { results, next } = res.data;
      allProducts.push(...results);

      if (next) {
        currentPage++;
      } else {
        hasNextPage = false;
      }

      if (currentPage > 50) break;
    }

    const categoriesRes = await axios.get(
      `${API_URL}/api/v1/products/categories/`,
    );
    const categories = categoriesRes.data ?? [];

    // 3. Static Entries
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

    // 4. Dynamic Product Entries
    const productEntries: MetadataRoute.Sitemap = allProducts.map(
      (product) => ({
        url: `${SITE_URL}/${DEFAULT_LOCALE}/product/${product.id}`,
        lastModified: product.updated_at
          ? new Date(product.updated_at)
          : new Date(),
        changeFrequency: "daily",
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

    // 5. Category Entries
    const categoryEntries: MetadataRoute.Sitemap = categories.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cat: any) => ({
        url: `${SITE_URL}/${DEFAULT_LOCALE}/catalog/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((lang) => [
              lang,
              `${SITE_URL}/${lang}/catalog/${cat.slug}`,
            ]),
          ),
        },
      }),
    );

    return [...staticEntries, ...productEntries, ...categoryEntries];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [];
  }
}

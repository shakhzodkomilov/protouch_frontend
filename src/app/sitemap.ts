import type { MetadataRoute } from "next";
import { getProducts } from "../entities/config/base";

// ✅ Define proper Product type
type Product = {
  id: number;
  updated_at?: string | Date;
  // Add other fields as needed
};

// ✅ Define Sitemap entry type explicitly
type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  priority: number;
};

const SITE_URL = process.env.SITE_URL ?? "https://protouch.uz";
const LOCALES = ["uz", "ru"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getProducts(1);
  const products: Product[] = res?.results ?? [];

  const staticPages: SitemapEntry[] = LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      priority: 1,
    },
    {
      url: `${SITE_URL}/${locale}/about-us`,
      priority: 0.8,
    },
  ]);

  const productPages: SitemapEntry[] = products.flatMap((p: Product) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/product/${p.id}`,
      lastModified: new Date(p.updated_at ?? new Date()),
      priority: 0.9,
    })),
  );

  return [...staticPages, ...productPages];
}

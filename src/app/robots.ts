import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://protouch.uz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth", "/profile"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

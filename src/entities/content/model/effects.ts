import axios from "axios";
import { createEffect } from "effector";
import { API_URL } from "../../config/base";
import { ensureHttps } from "@/shared/lib/media-url";
import type { Banner, ContentBlock } from "./types";

const pickTitle = (block: ContentBlock, lang?: string) => {
  const isUz = String(lang || "ru").toLowerCase().startsWith("uz");
  const preferred = isUz ? block.titleUz : block.titleRu;
  return (preferred || block.slug || block.titleRu || block.titleUz || "").trim();
};

const normalizeBlockToBanner = (block: ContentBlock, lang?: string): Banner | null => {
  const bannerUrl = ensureHttps(block.bannerUrl);
  if (!bannerUrl) return null;
  return {
    id: block.id,
    title: pickTitle(block, lang),
    slug: block.slug ?? undefined,
    bannerUrl,
    isActive: Boolean(block.isActive ?? true),
  };
};

export const getBannersFx = createEffect<{ lang?: string }, Banner[]>(
  async ({ lang }) => {
    const { data } = await axios.get(`${API_URL}/api/content/blocks`, {
      params: { lang: lang || "ru" },
    });

    const blocks: ContentBlock[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];

    return blocks
      .map((b) => normalizeBlockToBanner(b, lang))
      .filter((b): b is Banner => Boolean(b));
  },
);


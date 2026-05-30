import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL, getLangHeader } from "../../config/base";
import { ensureHttps, DEFAULT_PRODUCT_IMAGE } from "@/shared/lib/media-url";

// ── New API shape: products come back directly with discount fields ──
type SaleProductDto = {
  id: number | string;
  name?: string;
  title?: string;
  price: number | string;
  salePrice?: number | string | null;
  discountPercentage?: number | string | null;
  availability?: string;
  status?: string;
  media?: Array<{ url?: string; isCover?: boolean; position?: number }>;
  image?: string;
  // any extra fields are passed through
  [key: string]: unknown;
};

export type NormalizedSaleProduct = {
  id: number | string;
  title: string;
  price: number;
  salePrice: number | null;
  image: string;
  availability?: string;
  [key: string]: unknown;
};

type SaleProductsState = {
  items: Array<{ product: NormalizedSaleProduct; discountPct: number }>;
  globalMeta: { endsAt?: string; startsAt?: string };
  loading: boolean;
};

// ── Helpers ──────────────────────────────────────────────────────────
const pickCoverImage = (p: SaleProductDto): string => {
  const sorted = [...(p.media ?? [])].sort(
    (a, b) => (a.position ?? 99) - (b.position ?? 99),
  );
  const cover = sorted.find((m) => m.isCover) ?? sorted[0];
  return (
    ensureHttps(cover?.url) ??
    ensureHttps(p.image as string) ??
    DEFAULT_PRODUCT_IMAGE
  );
};

const normalizeProduct = (p: SaleProductDto): NormalizedSaleProduct => {
  const price = Number(p.price);
  const salePrice =
    p.salePrice != null && Number(p.salePrice) > 0 ? Number(p.salePrice) : null;

  return {
    ...p,
    id: p.id,
    title: p.title ?? p.name ?? "",
    price,
    salePrice,
    image: pickCoverImage(p),
  };
};

const calcDiscountPct = (p: SaleProductDto): number => {
  // Prefer explicit discountPercentage from API
  if (p.discountPercentage != null) {
    const pct = Number(p.discountPercentage);
    if (!isNaN(pct) && pct > 0) return pct;
  }
  // Fallback: derive from price vs salePrice
  const price = Number(p.price);
  const salePrice = Number(p.salePrice);
  if (price > 0 && salePrice > 0 && salePrice < price) {
    return Math.round(((price - salePrice) / price) * 100);
  }
  return 0;
};

// ── Hook ─────────────────────────────────────────────────────────────
export function useSaleProducts(lang: string): SaleProductsState {
  const [loading, setLoading] = useState(true);
  const [rawProducts, setRawProducts] = useState<SaleProductDto[]>([]);
  // New API doesn't return sale-level endsAt; keep slot for future use
  const [globalMeta] = useState<{ endsAt?: string; startsAt?: string }>({});

  useEffect(() => {
    let alive = true;
    setLoading(true);

    axios
      .get<unknown>(`${API_URL}/api/products`, {
        params: { hasSale: true },
        headers: getLangHeader(lang),
      })
      .then((res) => {
        const data = res.data;

        // Handle both array and paginated { results: [] } shapes
        const list: SaleProductDto[] = Array.isArray(data)
          ? data
          : Array.isArray((data as { results?: SaleProductDto[] })?.results)
            ? (data as { results: SaleProductDto[] }).results
            : [];

        // Only show published, in-stock (or low-stock) items that actually have a discount
        const filtered = list.filter((p) => {
          if (!p) return false;
          if (p.status && p.status !== "PUBLISHED") return false;
          if (
            p.availability &&
            p.availability !== "IN_STOCK" &&
            p.availability !== "LOW_STOCK"
          )
            return false;
          return calcDiscountPct(p) > 0;
        });

        if (alive) setRawProducts(filtered);
      })
      .catch(() => {
        if (alive) setRawProducts([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [lang]);

  return useMemo(
    () => ({
      items: rawProducts.map((p) => ({
        product: normalizeProduct(p),
        discountPct: calcDiscountPct(p),
      })),
      globalMeta,
      loading,
    }),
    [rawProducts, globalMeta, loading],
  );
}

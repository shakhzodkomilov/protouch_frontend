import { createEffect } from "effector";
import { BasketItem } from "./types";
import {
  fetchBasketFx as fetchBasketApiFx,
  addToBasketApiFx,
  updateBasketApiFx,
  removeFromBasketApiFx,
} from "../api";

const L_STORAGE_KEY = "weel_basket_v2";

const isAuth = (): boolean =>
  typeof window !== "undefined" && !!localStorage.getItem("accessToken");

const safeNum = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const getNested = (obj: Record<string, unknown>, ...keys: string[]): unknown => {
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
};

const getImageUrl = (productObj: Record<string, unknown> | undefined): string => {
  if (!productObj) return "";
  // Backend returns coverImage: { url: "..." }
  const coverImage = productObj.coverImage as Record<string, unknown> | undefined;
  if (coverImage?.url) return String(coverImage.url);
  // Fallback to media array
  const media = productObj.media;
  if (Array.isArray(media) && media.length > 0) {
    const first = media[0] as Record<string, unknown>;
    if (first?.url) return String(first.url);
  }
  const images = productObj.images;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0] as Record<string, unknown>;
    if (first?.url) return String(first.url);
  }
  return "";
};

const parseLocalized = (val: unknown): string => {
  const str = String(val ?? "").trim();
  if (!str) return "";
  if (str.startsWith("{") && str.endsWith("}")) {
    try {
      const parsed = JSON.parse(str);
      if (parsed && typeof parsed === "object") {
        return (
          String(parsed["uz"] ?? "") ||
          String(parsed["ru"] ?? "") ||
          str
        );
      }
    } catch {
      // not valid JSON, return raw
    }
  }
  return str;
};

export const normalizeBasketItem = (raw: unknown): BasketItem | null => {
  if (raw == null || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  // Backend nests product data under `product` key
  const productObj =
    (obj.product as Record<string, unknown> | undefined) ||
    (obj.product_data as Record<string, unknown> | undefined) ||
    (obj.data as Record<string, unknown> | undefined);

  const productId = safeNum(
    obj.productId ?? obj.product_id ?? getNested(productObj, "id"),
  );

  const rawName =
    obj.title ??
    obj.name ??
    obj.product_name ??
    getNested(productObj, "name") ??
    getNested(productObj, "title") ??
    "";
  const title = parseLocalized(rawName);

  const price = safeNum(
    obj.price ??
      obj.product_price ??
      obj.unit_price ??
      getNested(productObj, "price") ??
      getNested(productObj, "displayPrice"),
  );

  const image = getImageUrl(productObj).trim() || String(obj.image ?? "").trim();

  const quantity = safeNum(obj.quantity ?? obj.qty ?? 1);
  const isInStock = Boolean(
    obj.isInStock ?? obj.is_in_stock ?? obj.in_stock ?? true,
  );
  const currency = String(
    obj.currency ?? getNested(productObj, "currency") ?? "UZS",
  );
  const id = safeNum(obj.id) || productId;

  if (!productId) return null;

  return {
    id,
    productId,
    title: title || "Mahsulot",
    price,
    image: image || "/placeholder.jpg",
    quantity: Math.max(1, quantity),
    isInStock,
    currency,
  };
};

const normalizeBasketData = (data: unknown): BasketItem[] => {
  if (Array.isArray(data)) {
    return data.map(normalizeBasketItem).filter((i): i is BasketItem => i !== null);
  }
  const obj = data as Record<string, unknown> | null | undefined;
  // Backend returns { items: [...], totalAmount, totalItems }
  if (Array.isArray(obj?.items)) {
    return (obj.items as unknown[])
      .map(normalizeBasketItem)
      .filter((i): i is BasketItem => i !== null);
  }
  if (Array.isArray(obj?.results)) {
    return (obj.results as unknown[])
      .map(normalizeBasketItem)
      .filter((i): i is BasketItem => i !== null);
  }
  return [];
};

const getLocalBasket = (): BasketItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(L_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeBasketData(parsed);
  } catch {
    return [];
  }
};

const saveLocalBasket = (items: BasketItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(L_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore localStorage errors
  }
};

const fetchBasketFromApi = async (): Promise<BasketItem[]> => {
  const data = await fetchBasketApiFx();
  const normalized = normalizeBasketData(data);
  saveLocalBasket(normalized);
  return normalized;
};

export const getBasketFx = createEffect<void, BasketItem[]>(async () => {
  if (isAuth()) {
    try {
      const data = await fetchBasketFromApi();
      return data;
    } catch {
      return getLocalBasket();
    }
  }
  return getLocalBasket();
});

export const addToBasketFx = createEffect<BasketItem, BasketItem[]>(
  async (newItem) => {
    if (isAuth()) {
      try {
        await addToBasketApiFx({
          productId: newItem.productId,
          quantity: 1,
        });
        const data = await fetchBasketFromApi();
        return data;
      } catch {
        // fallback to local
      }
    }

    const items = getLocalBasket();
    const existing = items.find((i) => i.productId === newItem.productId);

    let updated: BasketItem[];

    if (existing) {
      updated = items.map((i) =>
        i.productId === newItem.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      );
    } else {
      updated = [...items, { ...newItem, quantity: 1 }];
    }

    saveLocalBasket(updated);
    return updated;
  },
);

export const removeFromBasketFx = createEffect<number, BasketItem[]>(
  async (productId) => {
    if (isAuth()) {
      try {
        await removeFromBasketApiFx(productId);
        const data = await fetchBasketFromApi();
        return data;
      } catch {
        // fallback to local
      }
    }

    const items = getLocalBasket();
    const updated = items.filter((i) => i.productId !== productId);
    saveLocalBasket(updated);
    return updated;
  },
);

export const updateQuantityFx = createEffect<
  { productId: number; quantity: number },
  BasketItem[]
>(async ({ productId, quantity }) => {
  if (isAuth()) {
    try {
      await updateBasketApiFx({ productId, quantity });
      const data = await fetchBasketFromApi();
      return data;
    } catch {
      // fallback to local
    }
  }

  const items = getLocalBasket();
  const updated = items.map((i) =>
    i.productId === productId ? { ...i, quantity } : i,
  );
  saveLocalBasket(updated);
  return updated;
});

import { createStore, createEvent, sample, createEffect } from "effector";
import { FavoriteItem } from "./model";
import { fetchFavoritesFx, addFavoriteFx, removeFavoriteFx } from "../api";

const FAV_STORAGE_KEY = "favorites_v2";

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

export const normalizeFavoriteItem = (raw: unknown): FavoriteItem | null => {
  if (raw == null || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const productObj =
    (obj.product as Record<string, unknown> | undefined) ||
    (obj.product_data as Record<string, unknown> | undefined) ||
    (obj.data as Record<string, unknown> | undefined);

  const productId =
    obj.productId ??
    obj.product_id ??
    getNested(productObj, "id") ??
    obj.id;

  const rawName =
    obj.title ??
    obj.name ??
    getNested(productObj, "name") ??
    getNested(productObj, "title") ??
    "";
  const title = parseLocalized(rawName);

  const image = getImageUrl(productObj).trim() || String(obj.image ?? "").trim();

  const price = safeNum(
    obj.price ?? getNested(productObj, "price") ?? getNested(productObj, "displayPrice"),
  );

  const id = safeNum(obj.id) || safeNum(productId);

  if (!productId) return null;

  return {
    id,
    productId: String(productId),
    title: title || "Mahsulot",
    image: image || "/placeholder.jpg",
    price,
  };
};

const normalizeFavoritesData = (data: unknown): FavoriteItem[] => {
  if (Array.isArray(data)) {
    return data.map(normalizeFavoriteItem).filter((i): i is FavoriteItem => i !== null);
  }
  const obj = data as Record<string, unknown> | null | undefined;
  if (Array.isArray(obj?.results)) {
    return (obj.results as unknown[])
      .map(normalizeFavoriteItem)
      .filter((i): i is FavoriteItem => i !== null);
  }
  if (Array.isArray(obj?.items)) {
    return (obj.items as unknown[])
      .map(normalizeFavoriteItem)
      .filter((i): i is FavoriteItem => i !== null);
  }
  return [];
};

export const toggleFavorite = createEvent<FavoriteItem>();
export const loadFavorites = createEvent();

export const $favorites = createStore<FavoriteItem[]>([]).on(
  toggleFavorite,
  (state, payload) => {
    const productId = String(payload.productId);
    const exists = state.find((item) => String(item.productId) === productId);

    if (exists) {
      return state.filter((item) => String(item.productId) !== productId);
    } else {
      return [...state, payload];
    }
  },
);

export const $favoritesCount = $favorites.map((items) => items.length);

export const $isFavorite = (productId: string | number) =>
  $favorites.map((items) =>
    items.some((item) => String(item.productId) === String(productId)),
  );

// Persistence
const persistFavoritesFx = createEffect<void, void, void>(() => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify($favorites.getState()));
    } catch (e) {
      console.error("[Favorites] Failed to persist:", e);
    }
  }
});

const loadFavoritesFx = createEffect<void, FavoriteItem[], Error>(async () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeFavoritesData(parsed);
  } catch {
    return [];
  }
});

// Sync toggle to API if authenticated
const syncFavoritesApiFx = createEffect(async (item: FavoriteItem) => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  if (!token) return;

  const productId = Number(item.productId);
  const current = $favorites.getState();
  const exists = current.some(
    (f) => String(f.productId) === String(productId),
  );

  try {
    if (exists) {
      await addFavoriteFx(productId);
    } else {
      await removeFavoriteFx(productId);
    }
  } catch {
    // revert on next load
  }
});

// Load: if auth → API, else → localStorage
const loadFavoritesRouterFx = createEffect(async () => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  if (token) {
    try {
      const data = await fetchFavoritesFx();
      const normalized = normalizeFavoritesData(data);
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    } catch {
      return loadFavoritesFx();
    }
  }
  return loadFavoritesFx();
});

export const $favoritesLoading = loadFavoritesRouterFx.pending;

sample({ clock: toggleFavorite, target: [persistFavoritesFx, syncFavoritesApiFx] });
sample({ clock: loadFavorites, target: loadFavoritesRouterFx });

sample({
  clock: loadFavoritesRouterFx.doneData,
  fn: (items) => items,
  target: $favorites,
});

sample({
  clock: loadFavoritesFx.doneData,
  fn: (items) => items,
  target: $favorites,
});

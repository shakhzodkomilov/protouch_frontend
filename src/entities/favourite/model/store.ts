import { createStore, createEvent, sample, createEffect } from "effector";
import { FavoriteItem } from "./model";
import { fetchFavoritesFx, addFavoriteFx, removeFavoriteFx } from "../api";

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
      localStorage.setItem("favorites", JSON.stringify($favorites.getState()));
    } catch (e) {
      console.error("[Favorites] Failed to persist:", e);
    }
  }
});

const loadFavoritesFx = createEffect<void, FavoriteItem[], Error>(async () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
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
      localStorage.setItem("favorites", JSON.stringify(data));
      return data;
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

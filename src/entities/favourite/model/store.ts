import { createStore, createEvent, sample, createEffect } from "effector";
import { FavoriteItem } from "./model";

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
    localStorage.setItem("favorites", JSON.stringify($favorites.getState()));
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

sample({ clock: toggleFavorite, target: persistFavoritesFx });
sample({ clock: loadFavorites, target: loadFavoritesFx });
sample({
  clock: loadFavoritesFx.doneData,
  fn: (items) => items,
  target: $favorites,
});

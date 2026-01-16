import { createStore, createEvent, sample, createEffect } from "effector";
import { FavoriteItem } from "./model";

export const toggleFavorite = createEvent<number>();
export const loadFavorites = createEvent();

export const $favorites = createStore<FavoriteItem[]>([]).on(
  toggleFavorite,
  (state, productId) => {
    const exists = state.find((item) => item.productId === productId);
    return exists
      ? state.filter((item) => item.productId !== productId)
      : [
          ...state,
          { id: Date.now(), productId, title: "", image: "", price: 0 },
        ];
  }
);

export const $favoritesCount = $favorites.map((items) => items.length);

// ✅ Factory for per-product stores
export const $isFavorite = (productId: number) =>
  $favorites.map((items) => items.some((item) => item.productId === productId));

// Persistence effects
const persistFavoritesFx = createEffect<void, void, void>(() => {
  if (typeof window !== "undefined") {
    const items = $favorites.getState();
    localStorage.setItem("favorites", JSON.stringify(items));
  }
});

const loadFavoritesFx = createEffect<void, FavoriteItem[], void>(async () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
});

// Auto-save on toggle
sample({
  clock: toggleFavorite,
  target: persistFavoritesFx,
});

// Load on app start
sample({
  clock: loadFavorites,
  target: loadFavoritesFx,
});

sample({
  clock: loadFavoritesFx.doneData,
  target: $favorites,
});

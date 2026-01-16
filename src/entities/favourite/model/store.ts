import { createStore, createEvent, sample, createEffect } from "effector";
import { FavoriteItem } from "./model";

// ✅ FIXED: Accept full FavoriteItem instead of just productId
export const toggleFavorite = createEvent<FavoriteItem | number>();

export const loadFavorites = createEvent();

export const $favorites = createStore<FavoriteItem[]>([]).on(
  toggleFavorite,
  (state, payload) => {
    // Handle both full item and just ID
    const productId = typeof payload === "number" ? payload : payload.productId;
    const exists = state.find((item) => item.productId === productId);

    if (exists) {
      // Remove
      return state.filter((item) => item.productId !== productId);
    } else {
      // Add - create full item if only ID provided
      const newItem: FavoriteItem =
        typeof payload === "number"
          ? {
              id: Date.now(),
              productId: payload,
              title: "",
              image: "",
              price: 0,
            }
          : payload;

      return [...state, newItem];
    }
  }
);

export const $favoritesCount = $favorites.map((items) => items.length);

export const $isFavorite = (productId: string | number) =>
  $favorites.map((items) => items.some((item) => item.productId === productId));

// Persistence (unchanged)
const persistFavoritesFx = createEffect<void, void, void>(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify($favorites.getState()));
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

sample({ clock: toggleFavorite, target: persistFavoritesFx });
sample({ clock: loadFavorites, target: loadFavoritesFx });
sample({
  clock: loadFavoritesFx.doneData,
  fn: (items) => items,
  target: $favorites,
});

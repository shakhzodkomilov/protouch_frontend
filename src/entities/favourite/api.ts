import { createEffect } from "effector";
import { $api } from "../config/base";

function isAuthenticated(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem("accessToken");
}

export const fetchFavoritesFx = createEffect(async () => {
  if (!isAuthenticated()) return [];
  const res = await $api.get("/api/favorites");
  return res.data ?? [];
});

export const addFavoriteFx = createEffect(async (productId: number) => {
  if (!isAuthenticated()) return;
  await $api.post(`/api/favorites/${productId}`);
});

export const removeFavoriteFx = createEffect(async (productId: number) => {
  if (!isAuthenticated()) return;
  await $api.delete(`/api/favorites/${productId}`);
});

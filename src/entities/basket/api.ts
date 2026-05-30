import { createEffect } from "effector";
import { $api } from "../config/base";

function isAuthenticated(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem("accessToken");
}

export const fetchBasketFx = createEffect(async () => {
  if (!isAuthenticated()) return [];
  const res = await $api.get("/api/basket");
  return res.data ?? [];
});

export const addToBasketApiFx = createEffect(
  async (payload: { productId: number; quantity: number }) => {
    if (!isAuthenticated()) return;
    await $api.post("/api/basket", payload);
  },
);

export const updateBasketApiFx = createEffect(
  async (payload: { productId: number; quantity: number }) => {
    if (!isAuthenticated()) return;
    await $api.patch(`/api/basket/${payload.productId}`, {
      quantity: payload.quantity,
    });
  },
);

export const removeFromBasketApiFx = createEffect(async (productId: number) => {
  if (!isAuthenticated()) return;
  await $api.delete(`/api/basket/${productId}`);
});

export const clearBasketApiFx = createEffect(async () => {
  if (!isAuthenticated()) return;
  await $api.delete("/api/basket");
});

import { createEffect } from "effector";
import { $api } from "../config/base";

function isAuthenticated(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem("accessToken");
}

export const fetchBasketFx = createEffect(async () => {
  if (!isAuthenticated()) return [];
  const res = await $api.get("/basket");
  return res.data ?? [];
});

export const addToBasketApiFx = createEffect(
  async (payload: { productId: number; quantity: number }) => {
    if (!isAuthenticated()) return;
    await $api.post("/basket", payload);
  },
);

export const updateBasketApiFx = createEffect(
  async (payload: { productId: number; quantity: number }) => {
    if (!isAuthenticated()) return;
    await $api.patch(`/basket/${payload.productId}`, {
      quantity: payload.quantity,
    });
  },
);

export const removeFromBasketApiFx = createEffect(async (productId: number) => {
  if (!isAuthenticated()) return;
  await $api.delete(`/basket/${productId}`);
});

export const clearBasketApiFx = createEffect(async () => {
  if (!isAuthenticated()) return;
  await $api.delete("/basket");
});

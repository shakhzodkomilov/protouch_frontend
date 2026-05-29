import { createEffect } from "effector";
import { BasketItem } from "./types";
import {
  fetchBasketFx as fetchBasketApiFx,
  addToBasketApiFx,
  updateBasketApiFx,
  removeFromBasketApiFx,
} from "../api";

const L_STORAGE_KEY = "weel_basket";

const isAuth = (): boolean =>
  typeof window !== "undefined" && !!localStorage.getItem("accessToken");

const getLocalBasket = (): BasketItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(L_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalBasket = (items: BasketItem[]) => {
  localStorage.setItem(L_STORAGE_KEY, JSON.stringify(items));
};

const fetchBasketFromApi = async (): Promise<BasketItem[]> => {
  const data = await fetchBasketApiFx();
  saveLocalBasket(data);
  return data;
};

export const getBasketFx = createEffect<void, BasketItem[]>(async () => {
  if (isAuth()) {
    try {
      return await fetchBasketFromApi();
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
        return await fetchBasketFromApi();
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
        return await fetchBasketFromApi();
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
      return await fetchBasketFromApi();
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

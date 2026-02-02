import { createEffect } from "effector";
import { BasketItem } from "./types";

const L_STORAGE_KEY = "weel_basket";

const getLocalBasket = (): BasketItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(L_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalBasket = (items: BasketItem[]) => {
  localStorage.setItem(L_STORAGE_KEY, JSON.stringify(items));
};

export const getBasketFx = createEffect<void, BasketItem[]>(async () => {
  return getLocalBasket();
});

export const addToBasketFx = createEffect<BasketItem, BasketItem[]>(
  async (newItem) => {
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
  const items = getLocalBasket();
  const updated = items.map((i) =>
    i.productId === productId ? { ...i, quantity } : i,
  );
  saveLocalBasket(updated);
  return updated;
});

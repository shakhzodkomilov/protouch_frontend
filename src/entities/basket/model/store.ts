import { createStore, createEvent, sample } from "effector";
import {
  addToBasketFx,
  removeFromBasketFx,
  updateQuantityFx,
  getBasketFx,
} from "./effects";
import { BasketItem, BasketState } from "./types";

export const addToBasket = createEvent<BasketItem>();
export const removeFromBasket = createEvent<number>();
export const updateQuantity = createEvent<{
  productId: number;
  quantity: number;
}>();
export const loadBasket = createEvent();

const initialState: BasketState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const safeNum = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const updateTotals = (items: BasketItem[]): BasketState => {
  const safe = Array.isArray(items) ? items : [];
  return {
    items: safe,
    totalCount: safe.reduce((sum, i) => sum + safeNum(i.quantity), 0),
    totalPrice: safe.reduce((sum, i) => sum + safeNum(i.price) * safeNum(i.quantity), 0),
  };
};

export const $basket = createStore<BasketState>(initialState)
  .on(addToBasket, (state, newItem) => {
    const existing = state.items.find((i) => i.productId === newItem.productId);
    let updated: BasketItem[];
    if (existing) {
      updated = state.items.map((i) =>
        i.productId === newItem.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      );
    } else {
      updated = [...state.items, { ...newItem, quantity: 1 }];
    }
    return updateTotals(updated);
  })
  .on(removeFromBasket, (state, productId) => {
    const updated = state.items.filter((i) => i.productId !== productId);
    return updateTotals(updated);
  })
  .on(updateQuantity, (state, { productId, quantity }) => {
    const updated = state.items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i,
    );
    return updateTotals(updated);
  })
  .on(
    [getBasketFx.doneData, addToBasketFx.doneData, removeFromBasketFx.doneData, updateQuantityFx.doneData],
    (_, items) => updateTotals(items),
  );

sample({ clock: loadBasket, target: getBasketFx });
sample({ clock: addToBasket, target: addToBasketFx });
sample({ clock: removeFromBasket, target: removeFromBasketFx });
sample({ clock: updateQuantity, target: updateQuantityFx });

export const $basketLoading = getBasketFx.pending;

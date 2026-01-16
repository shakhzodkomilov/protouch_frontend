import { createStore, createEvent, sample } from "effector";
import {
  addToBasketFx,
  removeFromBasketFx,
  updateQuantityFx,
  getBasketFx,
} from "./effects.ts";
import { BasketItem, BasketState } from "./types";

export const addToBasket = createEvent<BasketItem>();
export const removeFromBasket = createEvent<number>();
export const updateQuantity = createEvent<{
  productId: number;
  quantity: number;
}>();
export const loadBasket = createEvent();

const initialState: BasketState = { items: [], totalCount: 0, totalPrice: 0 };

const updateTotals = (items: BasketItem[]) => ({
  items,
  totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

export const $basket = createStore<BasketState>(initialState).on(
  [
    getBasketFx.doneData,
    addToBasketFx.doneData,
    removeFromBasketFx.doneData,
    updateQuantityFx.doneData,
  ],
  (_, items) => updateTotals(items)
);

// Trigger effects when events are called
sample({ clock: loadBasket, target: getBasketFx });
sample({ clock: addToBasket, target: addToBasketFx });
sample({ clock: removeFromBasket, target: removeFromBasketFx });
sample({ clock: updateQuantity, target: updateQuantityFx });

export const $basketLoading = getBasketFx.pending;

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

const updateTotals = (items: BasketItem[]): BasketState => {
  const safe = Array.isArray(items) ? items : [];
  return {
    items: safe,
    totalCount: safe.reduce((sum, i) => sum + (i.quantity || 0), 0),
    totalPrice: safe.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 0), 0),
  };
};

export const $basket = createStore<BasketState>(initialState).on(
  [
    getBasketFx.doneData,
    addToBasketFx.doneData,
    removeFromBasketFx.doneData,
    updateQuantityFx.doneData,
  ],
  (_, items) => updateTotals(items),
);

sample({ clock: loadBasket, target: getBasketFx });
sample({ clock: addToBasket, target: addToBasketFx });
sample({ clock: removeFromBasket, target: removeFromBasketFx });
sample({ clock: updateQuantity, target: updateQuantityFx });

export const $basketLoading = getBasketFx.pending;

// src/entities/basket/model/types.ts
export interface BasketItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  isInStock: boolean;
}

export interface BasketState {
  items: BasketItem[];
  totalCount: number;
  totalPrice: number;
}

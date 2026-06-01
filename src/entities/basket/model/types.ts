export interface BasketItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  isInStock: boolean;
  currency?: string;
}

export interface BasketState {
  items: BasketItem[];
  totalCount: number;
  totalPrice: number;
}

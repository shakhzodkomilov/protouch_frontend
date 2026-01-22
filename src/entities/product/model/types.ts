export interface Brand {
  id: string;
  title: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface CategoryChild {
  id: string;
  title: string;
  slug: string;
  brands?: Brand[];
}

export interface CategoryType {
  id: string;
  title: string;
  slug: string;
  is_carousel: boolean;
  image?: Image;
  children: CategoryChild[];
}

export interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  id: number | string;
  title: string;
  short_description: string;
  is_in_stock: boolean;
  is_pre_order: boolean;
  price: number;
  image: string;
  category: string;
}

export interface PaginationType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

// src/entities/product/model/types.ts
export interface ProductDetailType {
  id: string;
  title: string;
  price: number; // ✅ Ensure number
  images: Image[];
  category: CategoryType;
  short_description: string;
  description: string;
  is_in_stock: boolean;
  is_pre_order: boolean;
  image?: string; // ✅ Optional fallback
}

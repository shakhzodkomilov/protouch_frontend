export type InventoryStatus = "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | string;
export type AvailabilityStatus = "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | string;

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  title: string;
  slug: string;
  description?: string | null;
  link?: string | null;
  status?: string;
  imageId?: number | null;
  parentId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  children?: ProductCategoryChild[];
  brands?: ProductBrandLegacy[];
}

// Legacy category shape used in some endpoints/pages (kept for compatibility)
export interface ProductBrandLegacy {
  id: string;
  title: string;
}

export interface ProductImageLegacy {
  id: string;
  url: string;
}

export interface ProductCategoryChild {
  id: string;
  title: string;
  slug: string;
  brands?: ProductBrandLegacy[];
}

export interface CategoryType {
  name?: string;
  id: string;
  title: string;
  slug: string;
  is_carousel?: boolean;
  image?: ProductImageLegacy;
  children?: ProductCategoryChild[];
}

export interface ProductTag {
  productId: number;
  tagId: number;
  tag: { id: number; name: string; slug: string };
}

export interface ProductFeature {
  id: number;
  productId: number;
  name: string;
  value: string;
}

export interface ProductCharacteristic {
  id: number;
  productId: number;
  key: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductMedia {
  id: number;
  productId: number;
  url: string;
  position?: number;
  isCover?: boolean;
}

export interface ProductVideo {
  id: number;
  productId: number;
  url: string;
  position?: number;
}

// Normalized product used by UI. Includes a few legacy aliases (title, short_description, image, is_in_stock)
// to avoid touching every component at once.
export interface Product {
  id: number | string;
  sku?: string;
  name: string;
  shortText?: string;
  description?: string;
  price: number;
  partnerPrice?: number | null;
  dealerPrice?: number | null;
  displayPrice?: number;
  oldPrice?: number;
  currency?: string;
  discountPercentage?: number;
  salePrice?: number | null;
  availability?: AvailabilityStatus;
  inventoryStatus?: InventoryStatus;
  quantityInStock?: number;
  underOrder?: boolean;
  deliveryDays?: number;
  brandId?: number;
  categoryId?: number;
  brand?: ProductBrand;
  category?: ProductCategory | string;
  tags?: ProductTag[];
  features?: ProductFeature[];
  characteristics?: ProductCharacteristic[];
  media?: ProductMedia[];
  videos?: ProductVideo[];
  createdAt?: string;
  updatedAt?: string;

  // legacy aliases used throughout UI
  title?: string;
  short_description?: string;
  is_in_stock?: boolean;
  is_pre_order?: boolean;
  image?: string;
}

export interface PaginationType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductDetailType extends Product {
  images?: ProductImageLegacy[];
  details?: Array<{ key: string; value: string }>;
}

import { createStore, createEvent, sample } from "effector";
import {
  getCategoriesFx,
  getProductsFx,
  getProductDetailFx,
  getSalesHitsFx,
  getNewArrivalsFx,
  getProductsByCategoryFx,
  searchProductsFx,
} from "./effects";
import { CategoryType, PaginationType, ProductDetailType } from "./types";

// ✅ Fixed: Proper error types
type ErrorType = string | { message?: string };

export const loadCategories = createEvent<{
  is_carousel?: string;
  lang?: string;
}>();
export const loadProducts = createEvent<{
  page: number;
  slug?: string;
  brand?: string;
  lang?: string;
  title?: string;
}>();
export const loadProductsByCategory = createEvent<{
  slugs: string;
  page: number;
  lang?: string;
}>();
export const searchProducts = createEvent<{
  lang: string;
  search: string;
  page?: number;
}>();

export const loadSellers = createEvent<{ lang?: string }>();
export const loadArrivals = createEvent<{ lang?: string }>();
export const loadProductDetail = createEvent<{
  product_id: string;
  lang?: string;
}>();

export const $searchProducts = createStore<PaginationType | null>(null).on(
  searchProductsFx.doneData,
  (_, data) => data,
);

export const $searchLoading = searchProductsFx.pending;

// Stores
export const $categories = createStore<CategoryType[]>([]).on(
  getCategoriesFx.doneData,
  (_, data) => data,
);

export const $products = createStore<PaginationType | null>(null)
  .on(getProductsFx.doneData, (_, data) => data)
  .on(getProductsByCategoryFx.doneData, (_, data) => data);

export const $bestSellers = createStore<PaginationType | null>(null).on(
  getSalesHitsFx.doneData,
  (_, data) => data,
);

export const $newArrivals = createStore<PaginationType | null>(null).on(
  getNewArrivalsFx.doneData,
  (_, data) => data,
);

export const $productDetail = createStore<ProductDetailType | null>(null).on(
  getProductDetailFx.doneData,
  (_, data) => data,
);

// Loading flags
export const $loadingCategories = getCategoriesFx.pending;
export const $loadingProducts = getProductsFx.pending;
export const $loadingSellers = getSalesHitsFx.pending;
export const $loadingArrivals = getNewArrivalsFx.pending;
export const $loadingProductDetail = getProductDetailFx.pending;

// ✅ Fixed: Proper ErrorType instead of any
export const $errorCategories = createStore<string | null>(null).on(
  getCategoriesFx.failData,
  (_, e: ErrorType) =>
    (e && typeof e === "object" && "message" in e
      ? e.message
      : "Error loading categories") as string,
);

export const $errorProducts = createStore<string | null>(null)
  .on(
    getProductsFx.failData,
    (_, e: ErrorType) =>
      (e && typeof e === "object" && "message" in e
        ? e.message
        : "Error loading products") as string,
  )
  .on(
    getProductsByCategoryFx.failData,
    (_, e: ErrorType) =>
      (e && typeof e === "object" && "message" in e
        ? e.message
        : "Error loading products") as string,
  );

export const $errorProductDetail = createStore<string | null>(null).on(
  getProductDetailFx.failData,
  (_, e: ErrorType) =>
    (e && typeof e === "object" && "message" in e
      ? e.message
      : "Error loading product") as string,
);

// Triggers
sample({ clock: loadCategories, target: getCategoriesFx });
sample({ clock: loadProducts, target: getProductsFx });
sample({ clock: loadSellers, target: getSalesHitsFx });
sample({ clock: loadArrivals, target: getNewArrivalsFx });
sample({ clock: loadProductDetail, target: getProductDetailFx });
sample({ clock: loadProductsByCategory, target: getProductsByCategoryFx });
sample({
  clock: searchProducts,
  target: searchProductsFx,
});

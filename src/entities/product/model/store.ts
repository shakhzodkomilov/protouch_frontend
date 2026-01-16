import { createStore, createEvent, sample } from "effector";
import {
  getCategoriesFx,
  getProductsFx,
  getProductDetailFx,
  getSalesHitsFx,
  getNewArrivalsFx,
  getProductsByCategoryFx,
  searchProductsFx, // ✅ Added import
} from "./effects";
import { CategoryType, PaginationType, ProductDetailType } from "./types";

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
  // ✅ Fixed: slugs instead of slug
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
  (_, data) => data
);

export const $searchLoading = searchProductsFx.pending;

// Stores
export const $categories = createStore<CategoryType[]>([]).on(
  getCategoriesFx.doneData,
  (_, data) => data
);

export const $products = createStore<PaginationType | null>(null)
  .on(getProductsFx.doneData, (_, data) => data)
  .on(
    // ✅ Added: also updates from category effect
    getProductsByCategoryFx.doneData,
    (_, data) => data
  );

export const $bestSellers = createStore<PaginationType | null>(null).on(
  getSalesHitsFx.doneData,
  (_, data) => data
);

export const $newArrivals = createStore<PaginationType | null>(null).on(
  getNewArrivalsFx.doneData,
  (_, data) => data
);

export const $productDetail = createStore<ProductDetailType | null>(null).on(
  getProductDetailFx.doneData,
  (_, data) => data
);

// Loading flags
export const $loadingCategories = getCategoriesFx.pending;
export const $loadingProducts = getProductsFx.pending;
export const $loadingSellers = getSalesHitsFx.pending;
export const $loadingArrivals = getNewArrivalsFx.pending;
export const $loadingProductDetail = getProductDetailFx.pending;

// Errors
export const $errorCategories = createStore<string | null>(null).on(
  getCategoriesFx.failData,
  (_, e: any) => e?.message || "Error loading categories"
);

export const $errorProducts = createStore<string | null>(null)
  .on(
    getProductsFx.failData,
    (_, e: any) => e?.message || "Error loading products"
  )
  .on(
    // ✅ Added: category errors too
    getProductsByCategoryFx.failData,
    (_, e: any) => e?.message || "Error loading products"
  );

export const $errorProductDetail = createStore<string | null>(null).on(
  getProductDetailFx.failData,
  (_, e: any) => e?.message || "Error loading product"
);

// Triggers ✅ Added missing sample
sample({ clock: loadCategories, target: getCategoriesFx });
sample({ clock: loadProducts, target: getProductsFx });
sample({ clock: loadSellers, target: getSalesHitsFx });
sample({ clock: loadArrivals, target: getNewArrivalsFx });
sample({ clock: loadProductDetail, target: getProductDetailFx });
sample({ clock: loadProductsByCategory, target: getProductsByCategoryFx }); // ✅ Critical fix
sample({
  clock: searchProducts,
  target: searchProductsFx,
});

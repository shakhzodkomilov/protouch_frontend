import { createStore, createEvent, sample } from "effector";
import {
  getCategoriesFx,
  getProductsFx,
  getProductDetailFx,
  getBestSellersFx,
  getProductsByCategoryFx,
  searchProductsFx,
  getNewArrivalsFx,
  getRecommendsFx,
} from "./effects";
import { CategoryType, PaginationType, ProductDetailType } from "./types";

// ✅ Error turlari
type ErrorType = string | { message?: string };

// --- Events ---
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
export const loadRecommends = createEvent<{ lang?: string }>();
export const loadProductDetail = createEvent<{
  product_id: string;
  lang?: string;
}>();

// ✅ Store-ni tozalash eventi (Kategoriya almashganda kerak)
export const clearProducts = createEvent();

// --- Stores ---

// 1. Qidiruv store
export const $searchProducts = createStore<PaginationType | null>(null).on(
  searchProductsFx.doneData,
  (_, data) => data,
);
export const $searchLoading = searchProductsFx.pending;

// 2. Kategoriyalar store
export const $categories = createStore<CategoryType[]>([]).on(
  getCategoriesFx.doneData,
  (_, data) => data,
);

// 3. ASOSIY MAHSULOTLAR STORE (Infinite Scroll mantiqi bilan)
export const $products = createStore<PaginationType | null>(null)
  .on(getProductsFx.doneData, (_, data) => data) // Oddiy yuklash
  .on(getProductsByCategoryFx.doneData, (state, newData) => {
    if (!state || newData.previous === null) {
      return newData;
    }
    return {
      ...newData,
      results: [...state.results, ...newData.results],
    };
  })
  .reset(clearProducts);
// 4. Boshqa storelar
export const $bestSellers = createStore<PaginationType | null>(null).on(
  getBestSellersFx.doneData,
  (_, data) => data,
);

export const $newArrivals = createStore<PaginationType | null>(null).on(
  getNewArrivalsFx.doneData,
  (_, data) => data,
);
export const $Recommends = createStore<PaginationType | null>(null).on(
  getRecommendsFx.doneData,
  (_, data) => data,
);

export const $productDetail = createStore<ProductDetailType | null>(null).on(
  getProductDetailFx.doneData,
  (_, data) => data,
);

// --- Loading Flags ---
export const $loadingCategories = getCategoriesFx.pending;
export const $loadingProducts = getProductsByCategoryFx.pending;
export const $loadingGeneralProducts = getProductsFx.pending;
export const $loadingSellers = getBestSellersFx.pending;
export const $loadingArrivals = getNewArrivalsFx.pending;
export const $loadingRecommend = getRecommendsFx.pending;
export const $loadingProductDetail = getProductDetailFx.pending;

// --- Error Stores ---
const getErrorMessage = (e: ErrorType, defaultMsg: string) =>
  (e && typeof e === "object" && "message" in e
    ? e.message
    : defaultMsg) as string;

export const $errorCategories = createStore<string | null>(null).on(
  getCategoriesFx.failData,
  (_, e) => getErrorMessage(e, "Error loading categories"),
);

export const $errorProducts = createStore<string | null>(null)
  .on(getProductsFx.failData, (_, e) =>
    getErrorMessage(e, "Error loading products"),
  )
  .on(getProductsByCategoryFx.failData, (_, e) =>
    getErrorMessage(e, "Error loading products"),
  );

export const $errorProductDetail = createStore<string | null>(null).on(
  getProductDetailFx.failData,
  (_, e) => getErrorMessage(e, "Error loading product"),
);

// --- Triggers (Samples) ---
sample({ clock: loadCategories, target: getCategoriesFx });
sample({ clock: loadProducts, target: getProductsFx });
sample({ clock: loadSellers, target: getBestSellersFx });
sample({ clock: loadArrivals, target: getNewArrivalsFx });
sample({ clock: loadProductDetail, target: getProductDetailFx });
sample({ clock: loadProductsByCategory, target: getProductsByCategoryFx });
sample({ clock: loadRecommends, target: getRecommendsFx });
sample({ clock: searchProducts, target: searchProductsFx });

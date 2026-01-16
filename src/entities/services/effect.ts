import axios from "axios";
import { createEffect } from "effector";

import { BASE_URL } from "../config/base";
import {
  CategoryType,
  PaginationType,
  ProductDetailType,
} from "../types/productService.types";

// ----------------------
// Categories
// ----------------------
export const getCategoriesFx = createEffect<
  { is_carousel?: string; lang?: string },
  CategoryType[]
>(async ({ is_carousel, lang }) => {
  const params: Record<string, string | undefined> = {};
  if (is_carousel) params.is_carousel = is_carousel;
  if (lang) params.lang = lang;

  const response = await axios.get<Array<CategoryType>>(
    `${BASE_URL}/api/v1/products/categories/`,
    { params }
  );
  return response.data;
});

// ----------------------
// Products (pagination + filters)
// ----------------------
export const getProductsFx = createEffect<
  {
    page: number;
    slug?: string;
    brand?: string;
    lang?: string;
    title?: string;
  },
  PaginationType
>(async ({ page, slug, brand, lang, title }) => {
  const response = await axios.get<PaginationType>(
    `${BASE_URL}/api/v1/products/`,
    {
      params: {
        page,
        slug,
        brand,
        title,
        lang,
      },
    }
  );
  return response.data;
});

export const getProductDetailFx = createEffect<
  { product_id: string; lang?: string },
  ProductDetailType
>(async ({ product_id, lang }) => {
  const response = await axios.get<ProductDetailType>(
    `${BASE_URL}/api/v1/products/product/${product_id}/`,
    { params: { lang } }
  );
  return response.data;
});

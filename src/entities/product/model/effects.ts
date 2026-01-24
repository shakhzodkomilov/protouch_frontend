import axios from "axios";
import { createEffect } from "effector";
import { API_URL } from "../../config/base";
import { CategoryType, PaginationType, ProductDetailType } from "./types";

export const getCategoriesFx = createEffect<
  { is_carousel?: string; lang?: string },
  CategoryType[]
>(async (params) => {
  const { data } = await axios.get(
    `${API_URL}/api/v1/products/categories/?is_carousel=true`,
    {
      params: { lang: "ru", ...params },
    },
  );
  return data;
});

export const getProductsFx = createEffect<
  {
    page: number;
    slug?: string;
    brand?: string;
    lang?: string;
    title?: string;
  },
  PaginationType
>(async (params) => {
  const { data } = await axios.get(`${API_URL}/api/v1/products/`, {
    params: { lang: "ru", ...params },
  });
  return data;
});

export const getProductDetailFx = createEffect<
  { product_id: string; lang?: string },
  ProductDetailType
>(async ({ product_id, lang }) => {
  const { data } = await axios.get(
    `${API_URL}/api/v1/products/product/${product_id}/`,
    { params: { lang: "ru" } },
  );

  return {
    ...data,
    price: Number(data.price),
  };
});
export const getSalesHitsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${API_URL}/api/v1/products/`, {
      params: { is_bestseller: true, lang: lang || "ru" },
    });
    return data;
  },
);

// --- New arrivals ---
export const getNewArrivalsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${API_URL}/api/v1/products/`, {
      params: { is_new: true, lang: lang || "ru" },
    });
    return data;
  },
);

export const getProductsByCategoryFx = createEffect<
  { slugs?: string; page: number; lang?: string },
  PaginationType
>(async ({ slugs, page, lang }) => {
  const { data } = await axios.get(`${API_URL}/api/v1/products/`, {
    params: {
      page,
      ...(slugs && { slug: slugs }),
      brand: "",
      lang: lang || "ru",
    },
  });
  return data;
});

export const searchProductsFx = createEffect<
  { lang?: string; search: string; page?: number },
  PaginationType
>(async ({ lang, search, page = 1 }) => {
  const { data } = await axios.get(`${API_URL}/api/v1/products/`, {
    params: {
      page,
      title: search || undefined,
      lang: lang || "ru",
    },
  });
  return data;
});

import axios from "axios";
import { createEffect } from "effector";
import { BASE_URL } from "../../config/base";
import { CategoryType, PaginationType, ProductDetailType } from "./types";

export const getCategoriesFx = createEffect<
  { is_carousel?: string; lang?: string },
  CategoryType[]
>(async (params) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/products/categories/`, {
    params,
  });
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
  const { data } = await axios.get(`${BASE_URL}/api/v1/products/`, { params });
  return data;
});

export const getProductDetailFx = createEffect<
  { product_id: string; lang?: string },
  ProductDetailType
>(async ({ product_id, lang }) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/v1/products/product/${product_id}/`,
    { params: { lang } }
  );
  return data;
});

export const getSalesHitsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/products/`, {
      params: {
        is_bestseller: true,
        lang,
      },
    });
    return data;
  }
);

export const getNewArrivalsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/products/`, {
      params: {
        is_new: true,
        lang,
      },
    });
    return data;
  }
);

export const getProductsByCategoryFx = createEffect<
  { slugs?: string; page: number; lang?: string },
  PaginationType
>(async ({ slugs, page, lang }) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/products/`, {
    params: {
      page,
      ...(slugs && { slug: slugs }),
      brand: "",
      ...(lang && { lang }),
    },
  });
  return data;
});
export const loadProductsFx = createEffect(
  async ({ lang, search }: { lang: string; search?: string }) => {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        lang,
        search: search || undefined, // Send search query to backend
      },
    });
    return response.data;
  }
);
export const searchProductsFx = createEffect<
  { lang: string; search: string; page?: number },
  PaginationType
>(async ({ lang, search, page = 1 }) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/products/`, {
    params: {
      page,
      title: search || undefined, // Use 'title' param for search (matches your store event)
      lang,
    },
  });
  return data;
});

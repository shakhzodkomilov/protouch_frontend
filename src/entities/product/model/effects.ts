import axios from "axios";
import { createEffect } from "effector";
import { API_URL } from "../../config/base";
import {
  CategoryType,
  Image,
  PaginationType,
  Product,
  ProductDetailType,
} from "./types";

const ensureHttps = (url?: string) => {
  if (!url) {
    return url;
  }

  // Media server at 46.62.220.230:9000 does not serve HTTPS (no valid TLS),
  // so always use plain HTTP for that origin.
  if (
    url.startsWith("https://46.62.220.230:9000/") ||
    url.startsWith("http://46.62.220.230:9000/")
  ) {
    return `http://${url.slice(url.indexOf("46.62.220.230:9000/"))}`;
  }

  if (url.startsWith("http://")) {
    return `https://${url.slice("http://".length)}`;
  }

  return url;
};

const normalizeImage = (image?: Image) =>
  image ? { ...image, url: ensureHttps(image.url) } : image;

const normalizeProduct = (product: Product): Product => ({
  ...product,
  image: ensureHttps(product.image),
});

const normalizePagination = (pagination: PaginationType): PaginationType => ({
  ...pagination,
  results: pagination.results.map(normalizeProduct),
});

export const getCategoriesFx = createEffect<
  { is_carousel?: string; lang?: string },
  CategoryType[]
>(async (params) => {
  const { data } = await axios.get(
    `${API_URL}/api/v1/products/categories/?is_carousel=true`,
    {
      params: {
        is_carousel: params.is_carousel,
        lang: params.lang || "ru",
      },
    },
  );
  return data.map((category: CategoryType) => ({
    ...category,
    image: normalizeImage(category.image),
  }));
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
    params: {
      ...params,
      lang: params.lang || "ru",
    },
  });
  return normalizePagination(data);
});

export const getProductDetailFx = createEffect<
  { product_id: string; lang?: string },
  ProductDetailType
>(async ({ product_id, lang }) => {
  const { data } = await axios.get(
    `${API_URL}/api/v1/products/product/${product_id}/`,
    { params: { lang: lang || "ru" } },
  );

  return {
    ...data,
    price: Number(data.price),
    image: ensureHttps(data.image),
    images: data.images?.map((image) => normalizeImage(image)) ?? [],
  };
});

export const getBestSellersFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(
      `${API_URL}/api/v1/products/?slug=sales-hits`,
      {
        params: { is_bestseller: true, lang: lang || "ru" },
      },
    );
    return normalizePagination(data);
  },
);

// export const getSelesHItsFx = createEffect<
//   { lang?: string; page?: number },
//   PaginationType
// >(async ({ lang, page = 1 }) => {
//   const { data } = await axios.get(`${API_URL}/apiv1/products/`, {
//     params: {
//       page,
//       slug: "sales-hits",
//       lang: lang || "ru",
//     },
//   });
//   return data;
// });
//BestSellers
export const getNewArrivalsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(
      `${API_URL}/api/v1/products/?slug=new-arrivals`,
      {
        params: { is_new: true, lang: lang || "ru" },
      },
    );
    return normalizePagination(data);
  },
);

//Reccomend
export const getRecommendsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(
      `${API_URL}/api/v1/products/?slug=we-recommend`,
      {
        params: { is_new: true, lang: lang || "ru" },
      },
    );
    return normalizePagination(data);
  },
);

//Steam and podcast
export const getStearmAndPodcast = createEffect<
  { lang?: string },
  PaginationType
>(async ({ lang }) => {
  const { data } = await axios.get(
    `${API_URL}/api/v1/products/?slug=studio-audio-equipment/stream-and-podcast`,
    {
      params: { is_new: true, lang: lang || "ru" },
    },
  );
  return normalizePagination(data);
});

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
  return normalizePagination(data);
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
  return normalizePagination(data);
});

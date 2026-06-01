import axios from "axios";
import { createEffect } from "effector";
import { API_URL, getLangHeader } from "../../config/base";
import { ensureHttps } from "@/shared/lib/media-url";
import {
  CategoryType,
  PaginationType,
  Product,
  ProductDetailType,
  ProductImageLegacy,
  ProductMedia,
} from "./types";

const getAuthHeaders = (lang?: string): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const langHeader = getLangHeader(lang);
  headers["x-lang"] = langHeader["x-lang"];
  return headers;
};

const normalizeLegacyImage = (image?: ProductImageLegacy) =>
  image ? { ...image, url: ensureHttps(image.url) } : image;

const pickCoverImage = (media?: ProductMedia[]) => {
  if (!media?.length) return undefined;
  const cover =
    media.find((m) => m.isCover) ??
    [...media].sort(
      (a, b) =>
        (a.position ?? Number.MAX_SAFE_INTEGER) -
        (b.position ?? Number.MAX_SAFE_INTEGER),
    )[0];
  return ensureHttps(cover?.url);
};

const normalizeProduct = (product: Product): Product => {
  const image = pickCoverImage(product.media) ?? ensureHttps(product.image);
  const title = product.name ?? product.title ?? "";
  const short_description = product.shortText ?? product.short_description;
  const is_in_stock =
    product.is_in_stock ??
    (product.availability === "IN_STOCK" && (product.quantityInStock ?? 0) > 0);
  const is_pre_order = product.is_pre_order ?? Boolean(product.underOrder);

  return {
    ...product,
    image,
    title,
    short_description,
    is_in_stock,
    is_pre_order,
    price: Number(product.price),
    dealerPrice: product.dealerPrice != null ? Number(product.dealerPrice) : null,
    partnerPrice: product.partnerPrice != null ? Number(product.partnerPrice) : null,
    displayPrice: product.displayPrice != null ? Number(product.displayPrice) : undefined,
    media: product.media?.map((m) => ({
      ...m,
      url: ensureHttps(m.url) ?? m.url,
    })),
  };
};

const normalizePagination = (
  pagination: PaginationType | null | undefined,
): PaginationType => {
  const results = pagination?.results;
  return {
    count: pagination?.count ?? 0,
    next: pagination?.next ?? null,
    previous: pagination?.previous ?? null,
    results: Array.isArray(results) ? results.map(normalizeProduct) : [],
  };
};

export const getCategoriesFx = createEffect<
  { is_carousel?: string; lang?: string },
  CategoryType[]
>(async (params) => {
  const { data } = await axios.get(
    `${API_URL}/api/products/categories/?is_carousel=true`,
    {
      params: {
        is_carousel: params.is_carousel,
      },
      headers: getAuthHeaders(params.lang),
    },
  );
  return data.map((category: CategoryType) => ({
    ...category,
    image: normalizeLegacyImage(category.image),
  }));
});

export const getProductsFx = createEffect<
  {
    page: number;
    slug?: string;
    brandSlug?: string;
    lang?: string;
    search?: string;
  },
  PaginationType
>(async (params) => {
  const { lang, ...rest } = params;
  const { data } = await axios.get(`${API_URL}/api/products/`, {
    params: rest,
    headers: getAuthHeaders(lang),
  });
  return normalizePagination(data);
});

export const getProductDetailFx = createEffect<
  { product_id: string; lang?: string },
  ProductDetailType
>(async ({ product_id, lang }) => {
  const { data } = await axios.get(`${API_URL}/api/products/${product_id}`, {
    headers: getAuthHeaders(lang),
  });

  const normalized = normalizeProduct(data as Product);
  const images =
    (data.images as ProductImageLegacy[] | undefined)?.map(
      normalizeLegacyImage,
    ) ??
    (data.media as ProductMedia[] | undefined)?.map((m) => ({
      id: String(m.id),
      url: ensureHttps(m.url) ?? m.url,
    })) ??
    [];

  return {
    ...(data as ProductDetailType),
    ...normalized,
    images,
    image: normalized.image,
  };
});

export const getBestSellersFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${API_URL}/api/products`, {
      params: {
        categorySlug: "best-seller",
      },
      headers: getAuthHeaders(lang),
    });

    const paginated = Array.isArray(data)
      ? { count: data.length, next: null, previous: null, results: data }
      : data;

    return normalizePagination(paginated);
  },
);

export const getNewArrivalsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${API_URL}/api/products`, {
      params: {
        categorySlug: "new-collection",
      },
      headers: getAuthHeaders(lang),
    });

    const paginated = Array.isArray(data)
      ? { count: data.length, next: null, previous: null, results: data }
      : data;

    return normalizePagination(paginated);
  },
);

//Reccomend
export const getRecommendsFx = createEffect<{ lang?: string }, PaginationType>(
  async ({ lang }) => {
    const { data } = await axios.get(`${API_URL}/api/products`, {
      params: {
        categorySlug: "recommend",
      },
      headers: getAuthHeaders(lang),
    });
    const paginated = Array.isArray(data)
      ? { count: data.length, next: null, previous: null, results: data }
      : data;

    return normalizePagination(paginated);
  },
);
// Stream and podcast
export const getStreamAndPodcast = createEffect<
  { lang?: string },
  PaginationType
>(async ({ lang }) => {
  const { data } = await axios.get(`${API_URL}/api/products/`, {
    params: {
      slug: "studio-audio-equipment/stream-and-podcast",
      is_new: true,
    },
    headers: getAuthHeaders(lang),
  });
  return normalizePagination(data);
});

export const getProductsByCategoryFx = createEffect<
  { slugs?: string; page: number; lang?: string },
  PaginationType
>(async ({ slugs, page, lang }) => {
  const { data } = await axios.get(`${API_URL}/api/products/`, {
    params: {
      page,
      ...(slugs && { categorySlug: slugs }),
    },
    headers: getAuthHeaders(lang),
  });
  const paginated = Array.isArray(data)
    ? { count: data.length, next: null, previous: null, results: data }
    : data;
  return normalizePagination(paginated);
});

export const searchProductsFx = createEffect<
  { lang?: string; search: string; page?: number },
  PaginationType
>(async ({ lang, search, page = 1 }) => {
  const { data } = await axios.get(`${API_URL}/api/products/`, {
    params: {
      page,
      search: search || undefined,
    },
    headers: getAuthHeaders(lang),
  });
  return normalizePagination(data);
});

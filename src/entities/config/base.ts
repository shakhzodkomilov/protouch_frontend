import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.protouch.uz";

export const $api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor
$api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response Interceptor
$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    return Promise.reject(error);
  },
);

export async function getProducts(page: number = 1) {
  try {
    const res = await axios.get(`${API_URL}/products?page=${page}`);
    return res.data;
  } catch (error) {
    console.error("Sitemap: Error fetching products", error);
    return { results: [] };
  }
}

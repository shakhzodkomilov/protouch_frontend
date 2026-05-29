import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}

export const $api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

$api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      const locale = window.location.pathname.split("/")[1] || "uz";
      window.location.href = `/${locale}/login`;
    }
    return Promise.reject(error);
  },
);

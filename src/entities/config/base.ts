import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}

function getLocaleFromPath(): string {
  if (typeof window === "undefined") return "uz";
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments[0] === "ru" || segments[0] === "uz" ? segments[0] : "uz";
}

export const API_URLwithLang = (endpoint: string, lang?: string) => {
  // No longer needed — lang goes via x-lang header
  return `${API_URL}${endpoint}`;
};

export const getLangHeader = (lang?: string) => ({
  "x-lang": lang || getLocaleFromPath(),
});

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
  if (!config.headers?.["x-lang"]) {
    const lang = getLocaleFromPath();
    if (config.headers) {
      config.headers["x-lang"] = lang;
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

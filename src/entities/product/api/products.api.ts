import { API_URL } from "../../config/base";
import { Product } from "../model/types";

const getUrl = (path: string) =>
  `${API_URL}${path}${path.includes("?") ? "&" : "?"}lang=ru`;

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(getUrl("/products"), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const res = await fetch(getUrl(`/products/category/${category}`), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return res.json();
}

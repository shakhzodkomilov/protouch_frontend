import { BASE_URL } from "../../config/base"
import { Product } from "../model/types"

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${category}`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch products by category")
  }
  return res.json()
}

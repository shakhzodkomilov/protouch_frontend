export const API = process.env.NEXT_PUBLIC_API_URL

export async function getProducts() {
  const res = await fetch(`${API}/products`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("API error")
  }

  return res.json()
}

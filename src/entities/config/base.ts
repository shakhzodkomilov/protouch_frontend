export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function getProducts(p0: number) {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

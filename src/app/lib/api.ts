const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_name: string;
  unit: string;
  current_price: number;
  price_change: number;
  change_percentage: number;
  emoji: string;
  description?: string;
  min_price?: number;
  max_price?: number;
  avg_price?: number;
  bazar_prices?: {
    bazar: string;
    division: string;
    min: number;
    max: number;
    avg: number;
  }[];
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data || data;
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data || data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${slug}`, { next: { revalidate: 0 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data || data;
}
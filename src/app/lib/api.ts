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
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.error("Products Fetch Error:", err);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.error("Categories Fetch Error:", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.error("Product Slug Fetch Error:", err);
    return null;
  }
}
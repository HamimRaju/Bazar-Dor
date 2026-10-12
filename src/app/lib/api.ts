const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  category: string;
  category_name: string;
  unit: string;
  current_price: number;
  price_change: number;
  change_percentage: number;
  emoji: string;
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
    
    const rawList = Array.isArray(json) ? json : (json.data || json.products || []);

    return rawList.map((item: Record<string, unknown>, index: number) => {
      const price = Number(item.today ?? item.current_price ?? item.price ?? 0);
      const changeObj = item.change as Record<string, unknown> | undefined;
      const changePct = Number(changeObj?.pct ?? item.change_percentage ?? item.change ?? 0);
      const dir = changeObj?.dir;
      const pChange = dir === 'down' ? -1 : (dir === 'up' ? 1 : (changePct >= 0 ? 1 : -1));

      // Calculate min, max, avg from markets if available
      const markets = (item.markets as MarketPrice[]) || [];
      let minPrice = item.min_price ? Number(item.min_price) : undefined;
      let maxPrice = item.max_price ? Number(item.max_price) : undefined;
      let avgPrice = item.avg_price ? Number(item.avg_price) : undefined;

      const formattedMarkets = markets.map((m) => {
        const mMin = Number(m.min || price);
        const mMax = Number(m.max || price);
        const mAvg = Math.round((mMin + mMax) / 2);
        return {
          bazar: String(m.market || "বাজার"),
          division: String(m.division || "ঢাকা"),
          min: mMin,
          max: mMax,
          avg: mAvg
        };
      });

      if (formattedMarkets.length > 0 && !minPrice) {
        minPrice = Math.min(...formattedMarkets.map(m => m.min));
        maxPrice = Math.max(...formattedMarkets.map(m => m.max));
        avgPrice = Math.round(formattedMarkets.reduce((acc, m) => acc + m.avg, 0) / formattedMarkets.length);
      }

      return {
        id: String(item.id || index),
        slug: String(item.slug || `product-${index}`),
        name: String(item.nameBn || item.name || item.title || "নামহীন পণ্য"),
        category: String(item.category || "general"),
        category_name: String(item.categoryNameBn || item.category_name || "সাধারণ"),
        unit: String(item.unit || "kg"),
        current_price: isNaN(price) ? 0 : price,
        price_change: isNaN(pChange) ? 0 : pChange,
        change_percentage: isNaN(changePct) ? 0 : changePct,
        emoji: String(item.image || item.icon || item.emoji || "📦"),
        min_price: minPrice,
        max_price: maxPrice,
        avg_price: avgPrice,
        bazar_prices: formattedMarkets
      };
    });
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
    const rawCategories = Array.isArray(json) ? json : (json.data || json.categories || []);
    
    return rawCategories.map((cat: Record<string, unknown>) => ({
      id: String(cat.id || ""),
      name: String(cat.nameBn || cat.name || ""),
      emoji: String(cat.icon || cat.emoji || "📦")
    }));
  } catch (err) {
    console.error("Categories Fetch Error:", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    const found = products.find((p) => p.slug === slug);
    return found || null;
  } catch (err) {
    console.error("Product Slug Fetch Error:", err);
    return null;
  }
}
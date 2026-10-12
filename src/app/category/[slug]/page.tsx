"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const filtered = data.filter((p) => p.category === params.slug);
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.current_price - b.current_price;
    if (sortOption === "highToLow") return b.current_price - a.current_price;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">কোন পণ্য পাওয়া যায়নি</h2>
        <Link href="/" className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold capitalize">{params.slug}</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">সাজান:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি</option>
            <option value="highToLow">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
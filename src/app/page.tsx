"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const risers = [...products].sort((a, b) => b.change_percentage - a.change_percentage).slice(0, 6);
  const fallers = [...products].sort((a, b) => a.change_percentage - b.change_percentage).slice(0, 6);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-emerald-600 font-semibold animate-pulse text-lg">বাজারের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Banner Figma Matched */}
      <section className="bg-emerald-50/70 rounded-3xl p-8 md:p-10 border border-emerald-100/60 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="text-emerald-700 text-xs font-semibold bg-emerald-100/80 px-3 py-1 rounded-full inline-block">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="pt-2">
            <a
              href="#sob-panno"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-xs transition"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Basket Graphic */}
        <div className="bg-white/80 p-6 rounded-full shadow-xs border border-emerald-100 flex items-center justify-center text-8xl shrink-0">
          🧺
        </div>
      </section>

      {/* Risers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-red-500 text-lg">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Fallers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-emerald-500 text-lg">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section id="sob-panno" className="space-y-4 pt-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-400 mt-0.5">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
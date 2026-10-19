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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <p className="text-emerald-700 font-bold animate-pulse text-sm tracking-widest uppercase">তাজা বাজারের তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-teal-50/20 pb-16">
      {/* Decorative Floating Vegetable Vibe Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-300/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-300/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-emerald-950/20 border border-emerald-700/50">
          {/* Subtle Ambient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-5 max-w-xl">
              {/* White background badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-white/80 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-900 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬ • লাইভ বাজার আপডেট
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>
              
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                চাল, ডাল, তেল, তাজা শাকসবজি, মাছ ও মাংসের দাম — বাজারভিত্তিক বিস্তারিত, সর্বনিম্ন-সর্বোচ্চ গড় এবং দামের পরিবর্তন এখন এক জায়গায়।
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="#sob-panno"
                  className="inline-flex items-center gap-2 bg-white text-emerald-950 font-extrabold px-6 py-3 rounded-2xl shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
                >
                  <span>সব পণ্য দেখুন</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Fresh Vegetable Market Image Card */}
            <div className="relative w-full lg:w-[460px] h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-emerald-950 group shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" 
                alt="Fresh Vegetables Market" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Risers (Dam Bereche - Alarming Red Theme) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-red-200/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-red-100 text-red-600 text-base shadow-sm">▲</span> 
              <span>আজ দাম বেড়েছে (উদ্বেগজনক)</span>
            </h2>
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              বাজার দর ঊর্ধ্বমুখী
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Fallers (Dam Komeche - Fresh Emerald Theme) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 text-base shadow-sm">▼</span> 
              <span>আজ দাম কমেছে (স্বস্তির খবর)</span>
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              বাজার দর নিম্নমুখী
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* All Products Grid */}
        <section id="sob-panno" className="space-y-6 pt-6">
          <div className="flex items-end justify-between border-b border-emerald-200/60 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">সব পণ্যের তালিকা</h2>
              <p className="text-xs font-bold text-emerald-700/80 mt-1">মোট {products.length}টি তাজা পণ্যের তথ্য দেখানো হচ্ছে</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
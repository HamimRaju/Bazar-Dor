"use client";

import { useEffect, useState, use } from "react";
import { getProductBySlug, Product } from "@/app/lib/api";
import { formatPrice } from "@/app/lib/utils";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15/16-e params unwrapping korar jonno `use()` hook use korte hoy
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (resolvedParams?.slug) {
      getProductBySlug(resolvedParams.slug)
        .then((data) => setProduct(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [resolvedParams?.slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 animate-pulse text-lg">বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Detail Header */}
      <div className="bg-white border rounded-2xl p-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="text-5xl bg-gray-50 p-4 rounded-xl">{product.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">প্রতি {product.unit} · {product.category_name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-2xl font-extrabold text-emerald-600">{formatPrice(product.current_price)}</p>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-lg font-bold text-emerald-700">{formatPrice(product.min_price || product.current_price)}</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
          <p className="text-lg font-bold text-red-700">{formatPrice(product.max_price || product.current_price)}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">গড় দাম</p>
          <p className="text-lg font-bold text-blue-700">{formatPrice(product.avg_price || product.current_price)}</p>
        </div>
      </div>

      {/* Bazar Prices Table */}
      {product.bazar_prices && product.bazar_prices.length > 0 && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <h2 className="p-4 font-bold border-b text-gray-800">বাজারভিত্তিক আজকের দাম</h2>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3">বাজার</th>
                <th className="p-3">বিভাগ</th>
                <th className="p-3">সর্বনিম্ন</th>
                <th className="p-3">সর্বোচ্চ</th>
                <th className="p-3">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {product.bazar_prices.map((b, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">{b.bazar}</td>
                  <td className="p-3 text-gray-500">{b.division}</td>
                  <td className="p-3 text-emerald-600 font-semibold">{formatPrice(b.min)}</td>
                  <td className="p-3 text-red-600 font-semibold">{formatPrice(b.max)}</td>
                  <td className="p-3 font-semibold">{formatPrice(b.avg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
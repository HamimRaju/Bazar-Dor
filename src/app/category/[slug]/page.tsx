import { getProducts, getCategories } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";
import { toBengaliNumber } from "@/app/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const currentCategory = categories.find((c: { id: string }) => c.id.toLowerCase() === slug.toLowerCase());
  const categoryName = currentCategory ? currentCategory.name : slug;
  const categoryEmoji = currentCategory ? currentCategory.emoji : "📦";

  const filteredProducts = products.filter((p) => {
    const cat = String(p.category || "").toLowerCase();
    const catName = String(p.category_name || "").toLowerCase();
    const target = slug.toLowerCase();

    return cat === target || catName.includes(target) || target.includes(cat);
  });

  return (
    <Suspense fallback={<div className="text-center py-20 text-emerald-600 font-medium">লোড হচ্ছে...</div>}>
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white border rounded-2xl p-8 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-4xl bg-gray-50 p-3 rounded-2xl flex items-center justify-center">{categoryEmoji}</span>
              <h1 className="text-3xl font-extrabold text-gray-900">{categoryName}</h1>
            </div>
            <p className="text-xs text-gray-400 pl-1">
              মোট {toBengaliNumber(filteredProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-gray-400">
            মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border rounded-2xl space-y-4">
              <p className="text-gray-500 font-medium text-base">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
              <div>
                <Link href="/" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl transition text-sm">
                  হোম পেজে ফিরে যান
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </Suspense>
  );
}
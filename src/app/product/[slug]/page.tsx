"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getProductBySlug, type Product } from "@/app/lib/api";
import { formatPrice } from "@/app/lib/utils";

type ProductDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const [slug, setSlug] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        params
            .then(({ slug }) => {
                if (!cancelled) {
                    setSlug(slug);
                }
            })
            .catch((error) => {
                console.error("Failed to resolve route params:", error);

                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        let cancelled = false;

        async function fetchProduct() {
            setLoading(true);
            setProduct(null);

            try {
                const data = await getProductBySlug(slug!);

                if (!cancelled) {
                    setProduct(data);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);

                if (!cancelled) {
                    setProduct(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchProduct();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-16 text-center">
                <p className="animate-pulse text-lg text-gray-500">
                    বিস্তারিত লোড হচ্ছে...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="mx-auto my-16 max-w-md space-y-4 px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    পণ্যটি পাওয়া যায়নি
                </h2>

                <Link
                    href="/"
                    className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-white transition hover:bg-emerald-700"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
            {/* Product Header */}
            <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                    <span className="rounded-xl bg-gray-50 p-4 text-5xl">
                        {product.emoji}
                    </span>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            প্রতি {product.unit} · {product.category_name}
                        </p>
                    </div>
                </div>

                <div className="sm:text-right">
                    <p className="text-sm text-gray-500">আজকের দাম</p>

                    <p className="text-2xl font-extrabold text-emerald-600">
                        {formatPrice(product.current_price)}
                    </p>
                </div>
            </section>

            {/* Price Summary */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                    <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

                    <p className="mt-1 text-xl font-bold text-emerald-700">
                        {formatPrice(
                            product.min_price ?? product.current_price,
                        )}
                    </p>
                </div>

                <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">
                    <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>

                    <p className="mt-1 text-xl font-bold text-red-700">
                        {formatPrice(
                            product.max_price ?? product.current_price,
                        )}
                    </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
                    <p className="text-sm text-gray-600">গড় দাম</p>

                    <p className="mt-1 text-xl font-bold text-blue-700">
                        {formatPrice(
                            product.avg_price ?? product.current_price,
                        )}
                    </p>
                </div>
            </section>

            {/* Bazar Prices Table */}
            {product.bazar_prices && product.bazar_prices.length > 0 && (
                <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <h2 className="border-b border-gray-200 p-4 font-bold text-gray-800">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-150 text-left text-sm">
                            <thead className="border-b bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="p-3">বাজার</th>
                                    <th className="p-3">বিভাগ</th>
                                    <th className="p-3">সর্বনিম্ন</th>
                                    <th className="p-3">সর্বোচ্চ</th>
                                    <th className="p-3">গড়</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {product.bazar_prices.map((b, i) => (
                                    <tr
                                        key={`${b.bazar}-${b.division}-${i}`}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="p-3 font-medium text-gray-800">
                                            {b.bazar}
                                        </td>

                                        <td className="p-3 text-gray-500">
                                            {b.division}
                                        </td>

                                        <td className="p-3 font-semibold text-emerald-600">
                                            {formatPrice(b.min)}
                                        </td>

                                        <td className="p-3 font-semibold text-red-600">
                                            {formatPrice(b.max)}
                                        </td>

                                        <td className="p-3 font-semibold text-gray-800">
                                            {formatPrice(b.avg)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Back Button */}
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}

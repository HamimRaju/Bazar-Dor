"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { useEffect, useState } from "react";
import { getProducts, getCategories, Product } from "@/app/lib/api";
import { toBengaliNumber, formatPrice } from "@/app/lib/utils";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; emoji: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-xs">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-2 rounded-xl text-xl font-bold flex items-center justify-center">🛒</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">বাজার দর</h1>
            <p className="text-xs text-gray-500 mt-1">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        {/* Auth status / Profile Dropdown */}
        <div className="relative">
          {session?.user ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-50 border px-3 py-1.5 rounded-full text-sm hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-gray-800">{session.user.name}</span>
                <span className="text-xs">▼</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-emerald-600 px-3 py-1.5">
                সাইন ইন
              </Link>
              <Link href="/sign-up" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Links Row */}
      <div className="border-t border-b py-2 bg-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 overflow-x-auto text-sm font-medium scrollbar-none">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.id}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap transition ${
                  isActive ? "bg-emerald-600 text-white font-semibold" : "text-gray-700 hover:bg-emerald-100/60"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Infinite Scrolling Ticker (Marquee) */}
      <div className="bg-gray-50 border-b overflow-hidden py-2 text-xs">
        <div className="animate-marquee flex gap-8 items-center">
          {[...products, ...products].map((p, index) => {
            const isUp = p.price_change >= 0;
            return (
              <Link href={`/product/${p.slug}`} key={`${p.id}-${index}`} className="inline-flex items-center gap-1.5 hover:opacity-75 transition">
                <span>{p.emoji}</span>
                <span className="font-semibold text-gray-800">{p.name}</span>
                <span className="text-gray-600">{toBengaliNumber(p.current_price)} টাকা/{p.unit}</span>
                <span className={isUp ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                  {isUp ? "▲" : "▼"} {toBengaliNumber(Math.abs(p.change_percentage))}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
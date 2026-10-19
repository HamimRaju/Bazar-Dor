"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { useEffect, useState } from "react";
import { getProducts, getCategories, Product } from "@/app/lib/api";
import { toBengaliNumber } from "@/app/lib/utils";

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
    <header className="border-b border-emerald-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
        {/* Stylish Brand Logo with Responsive Font & Sizing */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white rounded-2xl shadow-lg shadow-emerald-600/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shrink-0">
            <svg 
              className="w-5 h-5 sm:w-7 sm:h-7 filter drop-shadow" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c2 2 .5 5.5-.6 9.2A7 7 0 0 1 11 20z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.5 12 16 13 18"></path>
            </svg>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5">
              {/* Responsive Brand Font Sizing */}
              <span className="text-base sm:text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-transparent drop-shadow-sm leading-tight sm:leading-none font-sans truncate">
                বাজার দর
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-[9px] sm:text-xs font-bold tracking-widest text-emerald-700/90 uppercase truncate">
                Bazar Dor • তাজা বাজার
              </span>
            </div>
          </div>
        </Link>

        {/* Auth Buttons / Profile with Compact Mobile Adaption */}
        <div className="relative shrink-0">
          {session?.user ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 bg-emerald-50/80 backdrop-blur-md border border-emerald-300/60 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-xs sm:text-sm hover:bg-emerald-100/60 transition shadow-2xs"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                  {session.user.name?.[0]?.toUpperCase()}
                </div>
                <span className="font-semibold text-gray-800 max-w-[70px] sm:max-w-xs truncate">{session.user.name}</span>
                <span className="text-[10px] text-emerald-600">▼</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-2xl shadow-2xl py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Colorful Vibrant Glass Sign In Button */}
              <Link 
                href="/sign-in" 
                className="relative group px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/60 backdrop-blur-md border border-emerald-300/70 hover:bg-emerald-200/70 hover:border-emerald-400 shadow-sm shadow-emerald-500/10 transition-all duration-300"
              >
                <span>সাইন ইন</span>
              </Link>

              {/* Colorful Premium Gradient Sign Up Button */}
              <Link 
                href="/sign-up" 
                className="relative group overflow-hidden px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 backdrop-blur-md border border-emerald-400/45 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                <span className="relative z-10 flex items-center gap-1">
                  সাইন আপ
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Links (Horizontally Scrollable on Mobile) */}
      <div className="border-t border-emerald-200/50 py-2 bg-gradient-to-r from-emerald-50/50 via-white/60 to-emerald-50/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center gap-2 sm:gap-2.5 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-none">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.id}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive 
                    ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-300 scale-105" 
                    : "bg-white/80 backdrop-blur-xs border border-emerald-200/80 text-gray-700 hover:bg-emerald-100/60 hover:border-emerald-300"
                }`}
              >
                <span className="text-sm sm:text-base">{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="bg-emerald-950/[0.03] border-t border-emerald-200/50 overflow-hidden py-1.5 sm:py-2 text-xs">
        <div className="animate-marquee flex gap-6 sm:gap-8 items-center whitespace-nowrap">
          {[...products, ...products].map((p, index) => {
            const isUp = p.price_change >= 0;
            return (
              <Link 
                href={`/product/${p.slug}`} 
                key={`${p.id}-${index}`} 
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-xs px-3 sm:px-3.5 py-1 rounded-full border border-emerald-200/70 shadow-2xs hover:border-emerald-400 transition-all shrink-0"
              >
                <span>{p.emoji}</span>
                <span className="font-bold text-gray-800">{p.name}</span>
                <span className="text-gray-500 font-medium">{toBengaliNumber(p.current_price)} টাকা/{p.unit}</span>
                <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded-md text-[11px] ${isUp ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
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
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { useState, useEffect, Suspense } from "react";
import { getCategories } from "@/app/lib/api";

function NavContent() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const [categories, setCategories] = useState<{ id: string; name: string; emoji: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
            🛒
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">বাজার দর</h1>
            <p className="text-[10px] text-gray-400 mt-0.5">মঙ্গলবারের বাজার দর</p>
          </div>
        </Link>

        {/* User Profile / Auth */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full transition"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 overflow-hidden relative flex items-center justify-center text-xs font-bold text-emerald-800">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name || "User"} fill className="object-cover" />
                ) : (
                  session.user.name?.charAt(0) || "U"
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition shadow-xs"
            >
              সাইন ইন
            </Link>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-gray-50 border-t border-gray-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-11 whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.id}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`flex items-center gap-1.5 text-xs font-medium transition py-1 px-2.5 rounded-lg ${
                  isActive ? "bg-emerald-600 text-white shadow-xs" : "text-gray-600 hover:text-emerald-600 hover:bg-gray-100"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b" />}>
      <NavContent />
    </Suspense>
  );
}
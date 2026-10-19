import Link from "next/link";
import { Product } from "@/app/lib/api";
import { toBengaliNumber, formatPrice } from "@/app/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.price_change >= 0;
  const isZero = product.change_percentage === 0;

  return (
    <Link 
      href={`/product/${product.slug}`} 
      className={`group relative block rounded-3xl p-5 shadow-md transition-all duration-300 border backdrop-blur-md ${
        isUp && !isZero
          ? "bg-gradient-to-br from-red-50/70 via-white to-red-100/40 border-red-200/80 shadow-red-950/5 hover:shadow-xl hover:shadow-red-950/10 hover:border-red-300 hover:-translate-y-1.5"
          : "bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/40 border-emerald-200/70 shadow-emerald-950/5 hover:shadow-xl hover:shadow-emerald-900/10 hover:border-emerald-300 hover:-translate-y-1.5"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* 3D Fresh Icon Container */}
        <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl text-2xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner border ${
          isUp && !isZero
            ? "bg-gradient-to-tr from-red-100 via-red-200/60 to-rose-100 border-red-200"
            : "bg-gradient-to-tr from-emerald-100 via-emerald-200/60 to-teal-100 border-white"
        }`}>
          <span>{product.emoji}</span>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5"></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-gray-900 text-base sm:text-lg group-hover:text-emerald-900 transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-xs font-bold text-emerald-700/80 mt-0.5">
            প্রতি {product.unit}
          </p>
          
          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isUp && !isZero ? "text-red-700/70" : "text-emerald-800/60"}`}>
                আজকের দাম
              </span>
              <span className="font-black text-lg sm:text-xl text-gray-900 tracking-tight drop-shadow-2xs">
                {formatPrice(product.current_price)}
              </span>
            </div>

            {/* 3D Status Percentage Badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs border ${
                isZero
                  ? "bg-gray-100 text-gray-600 border-gray-200"
                  : isUp
                  ? "bg-red-500 text-white border-red-600 shadow-red-500/20 shadow-md animate-pulse"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {isZero ? "— ০.০%" : `${isUp ? "▲" : "▼"} ${toBengaliNumber(Math.abs(product.change_percentage))}%`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
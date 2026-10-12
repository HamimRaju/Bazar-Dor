import Link from "next/link";
import { Product } from "@/app/lib/api";
import { toBengaliNumber, formatPrice } from "@/app/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.price_change >= 0;
  const isZero = product.change_percentage === 0;

  return (
    <Link href={`/product/${product.slug}`} className="block bg-white border rounded-2xl p-4 hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <span className="text-3xl bg-gray-50 p-3 rounded-xl flex items-center justify-center">{product.emoji}</span>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">প্রতি {product.unit}</p>
          
          <div className="mt-4 flex items-end justify-between">
            <div>
              <span className="text-[11px] text-gray-400 block">আজকের দাম</span>
              <span className="font-extrabold text-lg text-gray-900">{formatPrice(product.current_price)}</span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-md ${
                isZero
                  ? "bg-gray-100 text-gray-600"
                  : isUp
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-600"
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
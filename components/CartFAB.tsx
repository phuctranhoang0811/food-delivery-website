"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartFAB() {
  const { getCartCount, openCart } = useCart();

  if (getCartCount() === 0) return null;

  return (
    <button
      onClick={openCart}
      className="md:hidden fixed bottom-24 right-4 bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 hover:bg-orange-600 transition-all z-40 active:scale-95"
    >
      <div className="relative">
        <ShoppingCart className="w-7 h-7" strokeWidth={2.5} />
        <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-orange-500 relative ring-0 shadow-sm leading-none">
          {getCartCount()}
        </div>
      </div>
    </button>
  );
}

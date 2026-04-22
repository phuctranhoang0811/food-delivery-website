"use client";

import { Home, Store, ClipboardList, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isRestaurants = pathname.includes('/RestaurantDetail') || pathname.includes('/product');
  const isOrders = pathname.includes('/order-history') || pathname.includes('/order-success') || pathname.includes('/track-order');
  const isProfile = pathname.includes('/profile') || pathname.includes('/login') || pathname.includes('/signup');

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-2 z-50 flex justify-between items-center text-xs font-medium text-gray-500 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button
        onClick={() => router.push("/")}
        className={`flex flex-col items-center space-y-1 w-14 ${isHome ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500 transition-colors'}`}
      >
        <Home className={`w-[22px] h-[22px] ${isHome ? 'fill-orange-500 stroke-orange-500' : 'stroke-gray-400'}`} />
        <span className={`text-[10px] font-semibold ${isHome ? 'text-orange-500' : ''}`}>Home</span>
      </button>

      <button
        onClick={() => router.push("/RestaurantDetail")}
        className={`flex flex-col items-center space-y-1 w-14 ${isRestaurants ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500 transition-colors'}`}
      >
        <Store className={`w-[22px] h-[22px] ${isRestaurants ? 'stroke-orange-500 stroke-2' : 'stroke-gray-400'}`} />
        <span className={`text-[10px] font-semibold ${isRestaurants ? 'text-orange-500' : ''}`}>Restaurants</span>
      </button>

      <button
        onClick={() => router.push("/order-history")}
        className={`flex flex-col items-center space-y-1 w-14 ${isOrders ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500 transition-colors'}`}
      >
        <ClipboardList className={`w-[22px] h-[22px] ${isOrders ? 'stroke-orange-500 stroke-2' : 'stroke-gray-400'}`} />
        <span className={`text-[10px] font-semibold ${isOrders ? 'text-orange-500' : ''}`}>Orders</span>
      </button>

      <button
        onClick={() => router.push("/profile")}
        className={`flex flex-col items-center space-y-1 w-14 ${isProfile ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500 transition-colors'}`}
      >
        <User className={`w-[22px] h-[22px] ${isProfile ? 'fill-orange-500 stroke-orange-500' : 'stroke-gray-400'}`} />
        <span className={`text-[10px] font-semibold ${isProfile ? 'text-orange-500' : ''}`}>Profile</span>
      </button>
    </div>
  );
}


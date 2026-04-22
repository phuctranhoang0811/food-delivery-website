"use client";

import { Home, Search, ClipboardList, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 pb-safe z-50 flex justify-between items-center text-xs font-medium text-gray-500 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => router.push("/")}
        className={`flex flex-col items-center space-y-1 w-16 ${pathname === '/' ? 'text-orange-500' : 'hover:text-orange-500 transition-colors'}`}
      >
        <div className={`p-1.5 rounded-full ${pathname === '/' ? 'bg-orange-50' : ''}`}>
          <Home className={`w-[22px] h-[22px] ${pathname === '/' ? 'fill-orange-500' : ''}`} />
        </div>
        <span className="text-[10px] font-bold">Home</span>
      </button>

      <button 
        onClick={() => router.push("/browse-menu")}
        className={`flex flex-col items-center space-y-1 w-16 ${pathname.includes('/browse-menu') ? 'text-orange-500' : 'hover:text-orange-500 transition-colors'}`}
      >
        <div className={`p-1.5 rounded-full ${pathname.includes('/browse-menu') ? 'bg-orange-50' : ''}`}>
          <Search className={`w-[22px] h-[22px] ${pathname.includes('/browse-menu') ? 'stroke-[2.5px]' : ''}`} />
        </div>
        <span className="text-[10px] font-bold">Search</span>
      </button>

      <button 
        onClick={() => router.push("/order-history")}
        className={`flex flex-col items-center space-y-1 w-16 ${pathname.includes('/order-history') ? 'text-orange-500' : 'hover:text-orange-500 transition-colors'}`}
      >
        <div className={`p-1.5 rounded-full ${pathname.includes('/order-history') ? 'bg-orange-50' : ''}`}>
          <ClipboardList className={`w-[22px] h-[22px] ${pathname.includes('/order-history') ? 'stroke-[2.5px]' : ''}`} />
        </div>
        <span className="text-[10px] font-bold">Orders</span>
      </button>

      <button 
        onClick={() => router.push("/profile")}
        className={`flex flex-col items-center space-y-1 w-16 ${pathname.includes('/profile') ? 'text-orange-500' : 'hover:text-orange-500 transition-colors'}`}
      >
        <div className={`p-1.5 rounded-full ${pathname.includes('/profile') ? 'bg-orange-50' : ''}`}>
          <User className={`w-[22px] h-[22px] ${pathname.includes('/profile') ? 'fill-orange-500' : ''}`} />
        </div>
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </div>
  );
}

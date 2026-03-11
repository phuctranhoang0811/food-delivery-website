"use client";

import { useState, useEffect, useRef } from "react";
import { Star, MapPin, ShoppingCart, Clock, User, LogOut, ClipboardList, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import CartSidebar from "./CartSidebar";
import Image from "next/image";
import { formatPriceWithSymbol } from "@/lib/formatPrice";

export default function Header() {
  const [userId, setUserId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { getCartCount, getCartTotal, getFinalTotal, openCart } = useCart();

  // Read login state from localStorage
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    setDropdownOpen(false);
    router.push("/");
  };

  const handleNavClick = (item: string) => {
    switch (item) {
      case "Home": router.push("/"); break;
      case "Restaurants": router.push("/RestaurantDetail"); break;
      case "Browse Menu": router.push("/browse-menu"); break;
      case "Special Offers": router.push("/special-offers"); break;
      case "Track Order": router.push("/track-order"); break;
      default: router.push("/");
    }
  };

  const getActiveItem = () => {
    if (pathname.includes("/RestaurantDetail") || pathname.includes("/product") || pathname.includes("/checkout")) return "Restaurants";
    if (pathname.includes("/special-offers")) return "Special Offers";
    if (pathname.includes("/track-order") || pathname.includes("/order-history") || pathname.includes("/order-success")) return "Track Order";
    return "Home";
  };

  const activeItem = getActiveItem();

  return (
    <>
      <header className="bg-gray-800 text-white w-full">
        {/* Top Bar */}
        <div className="bg-gray-800 text-white">
          <div className="container mx-auto max-w-[1800px] flex items-center justify-between py-2 px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
              <span className="text-sm">
                Get 5% Off your first order,{" "}
                <span className="font-bold text-orange-500">Promo: ORDER5</span>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-white w-4 h-4" />
              <span className="text-sm">Regent Street, A4, A4201, London</span>
              <a href="#" className="text-orange-500 text-sm underline hover:text-orange-400">
                Change Location
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={openCart}
                className="flex items-center bg-green-600 hover:bg-green-700 rounded-lg px-3 py-1 space-x-2 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <ShoppingCart className="text-white w-4 h-4" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {getCartCount()}
                    </span>
                  )}
                </div>
                <span className="text-white text-sm font-semibold">{getCartCount()} Items</span>
                <span className="text-white text-sm font-bold">{formatPriceWithSymbol(getFinalTotal())}</span>
                <Clock className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-white text-black shadow-sm">
          <div className="container mx-auto max-w-[1800px] flex items-center justify-between py-4 px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="flex items-center">
              <Image
                src="/OrderUk.jpg"
                alt="Order UK Logo"
                width={160}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
            <ul className="flex space-x-8 text-base">
              {["Home", "Restaurants", "Special Offers", "Track Order"].map((item) => (
                <li key={item}>
                  <button
                    className={`px-6 py-2 rounded-full transition-colors ${
                      activeItem === item
                        ? "bg-orange-500 text-white font-semibold"
                        : "hover:text-orange-500 text-gray-700"
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            {userId ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">My Account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="py-1">
                      <button
                        onClick={() => { setDropdownOpen(false); router.push("/profile"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left"
                      >
                        <User className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-800">Update Profile</span>
                      </button>
                      <button
                        onClick={() => { setDropdownOpen(false); router.push("/checkout"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left"
                      >
                        <ShoppingCart className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-800">Checkout</span>
                      </button>
                      <button
                        onClick={() => { setDropdownOpen(false); router.push("/order-history"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left"
                      >
                        <ClipboardList className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-800">Order History</span>
                      </button>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-500">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="bg-gray-900 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-colors"
              >
                <User className="text-orange-500 w-4 h-4" />
                <span>Login/Signup</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}

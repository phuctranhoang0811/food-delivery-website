"use client";

import { useState } from "react";
import { Star, MapPin, ShoppingCart, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import CartSidebar from "./CartSidebar";
import Image from "next/image";
import { formatPriceWithSymbol } from "@/lib/formatPrice";

export default function Header() {
  const [activeItem, setActiveItem] = useState("Home");
  const router = useRouter();
  const { getCartCount, getCartTotal, openCart } = useCart();

  const handleNavClick = (item) => {
    setActiveItem(item);

    // Route dựa trên menu item
    switch (item) {
      case "Home":
        router.push("/");
        break;
      case "Restaurants":
        router.push("/RestaurantDetail");
        break;
      case "Browse Menu":
        router.push("/browse-menu");
        break;
      case "Special Offers":
        router.push("/special-offers");
        break;
      case "Track Order":
        router.push("/track-order");
        break;
      default:
        router.push("/");
    }
  };

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
              <a
                href="#"
                className="text-orange-500 text-sm underline hover:text-orange-400"
              >
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
                <span className="text-white text-sm font-semibold">
                  {getCartCount()} Items
                </span>
                <span className="text-white text-sm font-bold">
                  {formatPriceWithSymbol(getCartTotal())}
                </span>
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
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <ul className="flex space-x-8 text-base">
              {[
                "Home",
                "Browse Menu",
                "Special Offers",
                "Restaurants",
                "Track Order",
              ].map((item) => (
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
            <button
              onClick={() => router.push("/login")}
              className="bg-gray-900 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <User className="text-orange-500 w-4 h-4" />
              <span>Login/Signup</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}

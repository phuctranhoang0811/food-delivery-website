"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { menuItems, offers } from "@/app/RestaurantDetail/data";
import { useCart } from "@/contexts/CartContext";
import Toast from "./Toast";
import { formatPriceFromString } from "@/lib/formatPrice";

export default function RestaurantMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Lấy các categories
  const burgersForOffers = menuItems
    .filter((item) => item.category === "Burgers")
    .slice(0, 3);
  const friesForOffers = menuItems
    .filter((item) => item.category === "Fries")
    .slice(0, 3);
  const drinksForOffers = menuItems
    .filter((item) => item.category === "Cold drinks")
    .slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.stopPropagation(); // prevent card click from navigating to product detail
    const priceStr = (item.price || "0").toString();
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;

    const cartItem = {
      id: item.id || Math.random().toString(),
      name: item.name || item.title,
      price: numericPrice,
      image: item.image,
      restaurant: "McDonald's East London",
    };
    addToCart(cartItem);
    setToastMessage(`"${cartItem.name}" added to cart!`);
    setShowToast(true);
  };

  return (
    <section className="w-full">
      {/* Sticky Navigation Bar - REMOVED */}

      {/* Content Area */}
      <div className="max-w-[2000px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-24 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          All Offers from McDonald's East London
        </h2>

        <div className="space-y-12">
          {/* Special Offers Cards */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#FC8A06] flex items-center gap-2">
              <span className="bg-[#FC8A06] text-white px-3 py-1 rounded-lg text-sm">
                HOT
              </span>
              Special Offers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold z-10 shadow-md">
                    {offer.discount}
                  </div>

                  {/* Offer Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Offer Info */}
                  <div className="p-5 flex items-center justify-between bg-gradient-to-br from-orange-50 to-white">
                    <h3 className="font-bold text-lg text-gray-900">
                      {offer.title}
                    </h3>
                    <button
                      onClick={(e) => handleAddToCart(e, offer)}
                      className="bg-[#FC8A06] text-white rounded-full p-3 hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:scale-110"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Burgers Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              🍔 Popular Burgers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {burgersForOffers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FC8A06]"
                >
                  <div className="flex gap-4">
                    {/* Item Info - Left */}
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2 line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-xl text-[#FC8A06]">
                        {formatPriceFromString(item.price)}
                      </p>
                    </div>

                    {/* Item Image - Right */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-28 h-28 shadow-md"
                      />
                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="absolute -bottom-2 -right-2 bg-[#FC8A06] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Additional Burgers */}
              {[
                {
                  id: "burger-extra-1",
                  name: "Gourmet Cheese Burger",
                  description:
                    "Fresh lettuce, tomato, melting cheese on toasted bun with special sauce",
                  price: "₫65,000",
                  image:
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
                },
                {
                  id: "burger-extra-2",
                  name: "Double Beef Burger",
                  description:
                    "Two beef patties, cheese, pickles, onions with signature sauce",
                  price: "₫82,000",
                  image:
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=90",
                },
                {
                  id: "burger-extra-3",
                  name: "BBQ Bacon Burger",
                  description:
                    "Crispy bacon, BBQ sauce, cheddar cheese, onion rings on sesame bun",
                  price: "₫78,000",
                  image:
                    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=90",
                },
              ].map((item, index) => (
                <div
                  key={`burger-extra-${index}`}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FC8A06]"
                >
                  <div className="flex gap-4">
                    {/* Item Info - Left */}
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2 line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-xl text-[#FC8A06]">
                        {formatPriceFromString(item.price)}
                      </p>
                    </div>

                    {/* Item Image - Right */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-28 h-28 shadow-md"
                      />
                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="absolute -bottom-2 -right-2 bg-[#FC8A06] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fries Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              🍟 Crispy Fries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {friesForOffers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FC8A06]"
                >
                  <div className="flex gap-4">
                    {/* Item Info - Left */}
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2 line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-xl text-[#FC8A06]">
                        {formatPriceFromString(item.price)}
                      </p>
                    </div>

                    {/* Item Image - Right */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-28 h-28 shadow-md"
                      />
                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="absolute -bottom-2 -right-2 bg-[#FC8A06] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Additional Fries */}
              {[
                {
                  id: "fries-extra-1",
                  name: "Golden Crispy Fries",
                  description:
                    "Classic salted fries, perfectly golden and crispy texture",
                  price: "₫38,000",
                  image:
                    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
                },
                {
                  id: "fries-extra-2",
                  name: "Cheese Loaded Fries",
                  description:
                    "Crispy fries topped with melted cheddar cheese sauce",
                  price: "₫48,000",
                  image:
                    "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=90",
                },
                {
                  id: "fries-extra-3",
                  name: "Curly Fries Basket",
                  description:
                    "Seasoned curly fries with special spicy coating",
                  price: "₫42,000",
                  image:
                    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=90",
                },
              ].map((item, index) => (
                <div
                  key={`fries-extra-${index}`}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FC8A06]"
                >
                  <div className="flex gap-4">
                    {/* Item Info - Left */}
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2 line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-xl text-[#FC8A06]">
                        {formatPriceFromString(item.price)}
                      </p>
                    </div>

                    {/* Item Image - Right */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-28 h-28 shadow-md"
                      />
                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="absolute -bottom-2 -right-2 bg-[#FC8A06] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Drinks Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              🥤 Refreshing Drinks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {drinksForOffers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FC8A06]"
                >
                  <div className="flex gap-4">
                    {/* Item Info - Left */}
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2 line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-xl text-[#FC8A06]">
                        {formatPriceFromString(item.price)}
                      </p>
                    </div>

                    {/* Item Image - Right */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-28 h-28 shadow-md"
                      />
                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="absolute -bottom-2 -right-2 bg-[#FC8A06] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Additional Drinks */}
              {[
                {
                  id: "drinks-extra-1",
                  name: "Iced Cola Classic",
                  description:
                    "Refreshing cola with ice cubes and lemon slice, perfect for summer",
                  price: "₫32,000",
                  image:
                    "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=90",
                },
                {
                  id: "drinks-extra-2",
                  name: "Fresh Lemonade",
                  description:
                    "Homemade lemonade with fresh lemon, mint leaves and sparkling water",
                  price: "₫45,000",
                  image:
                    "https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800&q=90",
                },
                {
                  id: "drinks-extra-3",
                  name: "Berry Smoothie",
                  description:
                    "Mixed berries smoothie with yogurt, fresh and healthy choice",
                  price: "₫58,000",
                  image:
                    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&q=90",
                },
              ].map((item, index) => (
                <div
                  key={`drinks-extra-${index}`}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FC8A06]"
                >
                  <div className="flex gap-4">
                    {/* Item Info - Left */}
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2 line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="font-bold text-xl text-[#FC8A06]">
                        {formatPriceFromString(item.price)}
                      </p>
                    </div>

                    {/* Item Image - Right */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-28 h-28 shadow-md"
                      />
                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="absolute -bottom-2 -right-2 bg-[#FC8A06] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, Smile, Star } from "lucide-react";
import { useState } from "react";
import Toast from "./Toast";
import FeaturedRestaurants from "./FeaturedRestaurants";
import SearchBar from "./SearchBar";

function Body() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  return (
    <section className="py-6 md:py-8">
      {/* === MOBILE APP LAYOUT === */}
      <div className="md:hidden space-y-6 pb-12">
        {/* Logo */}
        <div className="flex justify-center -mt-4 mb-2">
          <Image
            src="/OrderUk.jpg"
            alt="Order UK Logo"
            width={160}
            height={50}
            className="h-9 w-auto object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="px-4">
          <div className="flex items-center bg-[#f4f5f7] rounded-full px-4 py-3.5 border border-transparent focus-within:border-orange-500 transition-colors">
            <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <input 
              type="text"
              placeholder="What are you craving?"
              className="bg-transparent border-none outline-none w-full text-black placeholder-gray-500 font-medium ml-3 text-sm focus:ring-0"
              onChange={(e) => { /* Placeholder for native layout */ }}
            />
            <div className="bg-white p-1.5 rounded-full shadow-sm flex-shrink-0 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="pl-4">
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2 pr-4">
            {["All", "Burgers", "Sushi", "Pizza", "Healthy"].map((cat, i) => (
              <button 
                key={cat}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                  i === 0 
                    ? 'bg-[#2a303c] text-white border-[#2a303c]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Near You */}
        <div className="px-4">
          <h2 className="text-[19px] font-bold text-gray-900 mb-4 tracking-tight">Featured Near You</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Big Card */}
            <div className="col-span-2 relative h-56 rounded-[20px] overflow-hidden group cursor-pointer shadow-sm">
              <Image src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt="Chef Burgers London" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 bg-white pl-1.5 pr-2 py-1 rounded-full flex items-center shadow-sm">
                <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500 mr-1" />
                <span className="text-xs font-bold text-gray-900 leading-none mt-0.5">4.9</span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold leading-tight">Smash & Grab Burgers</h3>
                <p className="text-xs text-gray-200 mt-1">$0 Delivery fee • 15–25 min</p>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="relative h-44 rounded-[20px] overflow-hidden group cursor-pointer shadow-sm">
              <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt="Grand Ai Cafe" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white pr-2">
                <h3 className="text-sm font-bold leading-tight line-clamp-1">Oshi Sushi Bar</h3>
                <p className="text-xs text-gray-200 mt-1">30–40 min</p>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="relative h-44 rounded-[20px] overflow-hidden group cursor-pointer shadow-sm">
              <Image src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt="Luigi's Oven" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white pr-2">
                <h3 className="text-sm font-bold leading-tight line-clamp-1">Luigi's Oven</h3>
                <p className="text-xs text-gray-200 mt-1">20–30 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === DESKTOP LAYOUT === */}
      <div className="hidden md:block">
        <div className="bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400 rounded-3xl p-6 lg:p-10 overflow-hidden relative shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-6 w-full md:w-1/2">
            <p className="text-gray-700 text-sm font-medium">
              Order Restaurant food, takeaway and groceries.
            </p>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight">
                Feast Your Senses,
              </h1>
              <h1 className="text-2xl md:text-5xl font-bold text-orange-500 leading-tight">
                Fast and Fresh
              </h1>
            </div>
            <p className="text-gray-700 text-sm font-medium">
              Enter an address to see what we deliver
            </p>
            <SearchBar 
              onSearch={(val) => {
                setToastMessage(`Searching delivery for: ${val}`);
                setShowToast(true);
              }}
            />
          </div>

          {/* Right Content - Image */}
          <div className="relative w-full md:w-1/2">
            <Image
              src="/body.jpg"
              alt="Food delivery illustration"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Exclusive Deals Section */}
      <div className="mt-12">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xl sm:text-2xl">
            <h2 className="font-bold text-gray-900">Up to -40%</h2>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 fill-orange-500" />
            <h2 className="font-bold text-gray-900">
              Order.uk exclusive deals
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100">
              Vegan
            </button>
            <button className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100">
              Sushi
            </button>
            <button className="px-4 sm:px-6 py-2 rounded-full border-2 border-orange-500 text-orange-500 text-xs sm:text-sm font-medium hover:bg-orange-50">
              Pizza & Fast food
            </button>
            <button className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100">
              others
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Chef Burgers London",
              discount: "-40%",
              image:
                "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
            },
            {
              name: "Grand Ai Cafe London",
              discount: "-20%",
              image:
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
            },
            {
              name: "Butterbrot Caf'e London",
              discount: "-17%",
              image:
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
            },
          ].map((deal) => (
            <div
              key={deal.name}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative h-64">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  {deal.discount}
                </div>
              </div>
              <div className="bg-gray-900/80 text-white p-4">
                <p className="text-orange-500 text-xs font-semibold mb-1">
                  Restaurant
                </p>
                <h3 className="text-lg font-bold">{deal.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Order.uk Popular Categories
          </h2>
          <Smile className="w-6 h-6 text-orange-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            {
              name: "Burgers & Fast food",
              count: "21 Restaurants",
              img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            },
            {
              name: "Salads",
              count: "32 Restaurants",
              img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
            },
            {
              name: "Pasta & Casuals",
              count: "4 Restaurants",
              img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500",
            },
            {
              name: "Pizza",
              count: "32 Restaurants",
              img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
            },
            {
              name: "Breakfast",
              count: "4 Restaurants",
              img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800",
            },
            {
              name: "Soups",
              count: "32 Restaurants",
              img: "/soup-bowl.jpg",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-32 bg-gray-200 relative">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-gray-900">{cat.name}</h3>
                <p className="text-orange-500 text-xs">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <FeaturedRestaurants />

      {/* Popular Restaurants */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Restaurants
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            {
              name: "McDonald's London",
              logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
              cover: true,
            },
            {
              name: "Papa Johns",
              logo: "/papaJohn.jpg",
              cover: true,
            },
            {
              name: "KFC West London",
              logo: "/logo-kfc.jpg",
              cover: true,
            },
            {
              name: "Texas Chicken",
              logo: "/texas-chicken-logo-png_seeklogo-254144.png",
              cover: false,
            },
            {
              name: "Burger King",
              logo: "/burger-king-logo-png_seeklogo-287946.png",
              cover: false,
            },
            {
              name: "Shaurma 1",
              logo: "/logoshaurma.png",
              cover: false,
            },
          ].map((res) => (
            <Link key={res.name} href="/RestaurantDetail">
              <div className="flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer rounded-2xl overflow-hidden">
                <div className="h-40 flex items-center justify-center bg-white">
                  <Image
                    src={res.logo}
                    alt={res.name}
                    width={200}
                    height={200}
                    className={`w-full h-full ${res.cover ? "object-cover" : "object-contain"}`}
                  />
                </div>
                <div className="bg-orange-500 text-white text-center py-3 text-xs font-bold">
                  {res.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* App Download Section */}
      <div className="mt-12 mb-8 bg-gray-100 rounded-3xl p-8 lg:p-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Order
            <span className="bg-orange-500 text-white px-2 py-1 rounded-lg mx-1">
              uk
            </span>
            ing is more
          </h2>
          <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-semibold mb-6">
            <span className="text-orange-500">Personalised</span> & Instant
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Download the Order.uk app for faster ordering
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                width={150}
                height={50}
                className="h-14 w-auto hover:scale-105 transition-transform cursor-pointer"
              />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={150}
                height={50}
                className="h-14 w-auto hover:scale-105 transition-transform cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Partner & Ride Sections */}
      <div className="mt-8 mb-8 grid md:grid-cols-2 gap-6">
        {/* Partner */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] group">
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <span className="bg-white/90 text-gray-900 px-4 py-1 rounded-full text-xs font-bold w-fit">
              Earn more with lower fees
            </span>
            <div>
              <p className="text-orange-500 font-bold mb-1">
                Signup as a business
              </p>
              <h3 className="text-3xl font-bold text-white mb-4">
                Partner with us
              </h3>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Ride */}
        <div className="relative rounded-3xl overflow-hidden h-[300px] group">
          <div className="absolute inset-0 bg-orange-400 opacity-20"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <span className="bg-white/90 text-gray-900 px-4 py-1 rounded-full text-xs font-bold w-fit">
              Avail exclusive perks
            </span>
            <div>
              <p className="text-orange-500 font-bold mb-1">
                Signup as a rider
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ride with us
              </h3>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      </div> {/* <-- Closing hidden md:block */}

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

export default Body;

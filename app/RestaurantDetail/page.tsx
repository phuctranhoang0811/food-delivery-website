"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantMenu from "@/components/RestaurantMenu";
import RestaurantInfo from "@/components/RestaurantInfo";
import RestaurantMapReviews from "@/components/RestaurantMapReviews";
import Image from "next/image";
import { Clock, Truck, Star, ShoppingBag } from "lucide-react";

function RestaurantDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Restaurant Banner Section */}
      <section
        className="w-full max-w-[2000px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-24 flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvb2R8ZW58MHx8fHwxNjE2NzY3NzYx&ixlib=rb-1.2.1&q=80&w=1080)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-orange-500 text-sm font-semibold italic">
              I'm lovin' it!
            </p>
            <h1 className="text-5xl font-bold mb-6">McDonald's East London</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2 border border-gray-400 rounded-full px-6 py-3">
                <ShoppingBag className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium">
                  Minimum Order: 12 GBP
                </span>
              </div>
              <div className="flex items-center gap-2 border border-gray-400 rounded-full px-6 py-3">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Delivery in 20-25 Minutes
                </span>
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors">
              <Clock className="w-5 h-5" />
              Open until 3:00 AM
            </button>
          </div>

          {/* Right Content - Product Image and Rating Card */}
          <div className="relative flex justify-center items-center">
            {/* Product Image */}
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90"
                alt="Burger Image"
                width={500}
                height={400}
                className="w-full h-auto object-contain bg-white transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            {/* Rating Card - Positioned Below Image */}
            <div className="absolute bottom-4 left-4 bg-white text-gray-900 rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">3.4</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 3
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  1,360 reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Menu Section */}
      <RestaurantMenu />

      {/* Restaurant Information Section */}
      <RestaurantInfo />

      {/* Map & Reviews Section */}
      <RestaurantMapReviews />

      <Footer />
    </div>
  );
}

export default RestaurantDetail;

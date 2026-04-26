"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Star, Clock, MapPin, Ticket, ChevronLeft, ChevronRight } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  hasPromo: boolean;
}

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "McDonald's East London",
    cuisine: "Burgers, Fast Food, Drinks",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    rating: 4.8,
    deliveryTime: "20 mins",
    distance: "1.2 km",
    hasPromo: true,
  },
  {
    id: "2",
    name: "Papa Johns Pizza",
    cuisine: "Pizza, Italian, Desserts",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800&q=80",
    rating: 4.5,
    deliveryTime: "30 mins",
    distance: "2.5 km",
    hasPromo: true,
  },
  {
    id: "3",
    name: "KFC Fried Chicken",
    cuisine: "Chicken, Fast Food, Snacks",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=800&q=80",
    rating: 4.3,
    deliveryTime: "25 mins",
    distance: "1.8 km",
    hasPromo: true,
  },
  {
    id: "4",
    name: "Burger King Royal",
    cuisine: "Burgers, Grilled, Sides",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    rating: 4.6,
    deliveryTime: "22 mins",
    distance: "2.0 km",
    hasPromo: true,
  },
  {
    id: "5",
    name: "Starbucks Coffee",
    cuisine: "Coffee, Bakery, Cafe",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    rating: 4.7,
    deliveryTime: "15 mins",
    distance: "0.8 km",
    hasPromo: true,
  },
  {
    id: "6",
    name: "Sushi Zen Garden",
    cuisine: "Japanese, Sushi, Seafood",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.9,
    deliveryTime: "35 mins",
    distance: "3.2 km",
    hasPromo: true,
  },
  {
    id: "7",
    name: "Bella Italia",
    cuisine: "Pasta, Italian, Wine",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80",
    rating: 4.4,
    deliveryTime: "40 mins",
    distance: "4.1 km",
    hasPromo: false,
  },
  {
    id: "8",
    name: "Thai Spice Express",
    cuisine: "Thai, Spicy, Noodles",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    rating: 4.2,
    deliveryTime: "28 mins",
    distance: "2.4 km",
    hasPromo: true,
  },
];

export default function FeaturedRestaurants() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-8 relative group">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {restaurants.map((restaurant) => (
          <Link
            href={`/RestaurantDetail`}
            key={restaurant.id}
            className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden group/card snap-start"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover group-hover/card:scale-105 transition-transform duration-500"
              />
              {restaurant.hasPromo && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase">
                  Promo
                </div>
              )}
            </div>

            {/* Content */}
            <div className="py-3 px-1">
              <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-[3rem]">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-1">
                {restaurant.cuisine}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{restaurant.distance}</span>
                </div>
              </div>

              {/* Promo Icon */}
              <div className="mt-3 flex items-center text-green-500">
                <Ticket className="w-5 h-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

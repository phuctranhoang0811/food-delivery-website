"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { Star, Clock, MapPin, Tag, ChevronLeft, ChevronRight } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  deliveryTime: number;
  distance: number;
  promo: string | null;
}

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "McDonald's",
    cuisine: "Burger · Fast Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=450&fit=crop",
    rating: 4.8,
    deliveryTime: 15,
    distance: 0.8,
    promo: "20% OFF TODAY",
  },
  {
    id: "2",
    name: "KFC",
    cuisine: "Fried Chicken · Fast Food",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=450&fit=crop",
    rating: 4.6,
    deliveryTime: 20,
    distance: 1.2,
    promo: "10% OFF TODAY",
  },
  {
    id: "3",
    name: "Papa Johns",
    cuisine: "Pizza · Italian",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=450&fit=crop",
    rating: 4.5,
    deliveryTime: 25,
    distance: 2.0,
    promo: "FREE DELIVERY",
  },
  {
    id: "4",
    name: "Burger King",
    cuisine: "Burger · Sandwich",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=450&fit=crop",
    rating: 4.3,
    deliveryTime: 30,
    distance: 1.5,
    promo: "15% OFF TODAY",
  },
  {
    id: "5",
    name: "Texas Chicken",
    cuisine: "Chicken · Lunch",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&h=450&fit=crop",
    rating: 4.2,
    deliveryTime: 22,
    distance: 1.8,
    promo: null,
  },
  {
    id: "6",
    name: "Shaurma 1",
    cuisine: "Shawarma · Rice Bowl",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&h=450&fit=crop",
    rating: 4.0,
    deliveryTime: 18,
    distance: 0.5,
    promo: "10% OFF TODAY",
  },
  {
    id: "7",
    name: "Saigon Rice House",
    cuisine: "Rice Bowl · Lunch",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=450&fit=crop",
    rating: 4.7,
    deliveryTime: 18,
    distance: 0.9,
    promo: "10% OFF TODAY",
  },
  {
    id: "8",
    name: "Noodle & Co.",
    cuisine: "Noodles · Asian",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=450&fit=crop",
    rating: 4.4,
    deliveryTime: 20,
    distance: 1.1,
    promo: null,
  },
  {
    id: "9",
    name: "Pho Street Kitchen",
    cuisine: "Pho · Vietnamese",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=450&fit=crop",
    rating: 4.9,
    deliveryTime: 16,
    distance: 0.6,
    promo: "10% OFF TODAY",
  },
  {
    id: "10",
    name: "Thai Hotpot Vip",
    cuisine: "Hotpot · Thai",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=450&fit=crop",
    rating: 4.5,
    deliveryTime: 35,
    distance: 2.3,
    promo: "FREE DELIVERY",
  },
  {
    id: "11",
    name: "Pizza 4P's",
    cuisine: "Pizza · Japanese–Italian",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=450&fit=crop",
    rating: 4.8,
    deliveryTime: 28,
    distance: 1.7,
    promo: "15% OFF TODAY",
  },
  {
    id: "12",
    name: "Sushi Hokkaido",
    cuisine: "Sushi · Japanese",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=450&fit=crop",
    rating: 4.6,
    deliveryTime: 24,
    distance: 1.4,
    promo: null,
  },
];

const SCROLL_AMOUNT = 300;
const NUM_DOTS = 3;

export default function FeaturedRestaurants() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const sorted = [...restaurants].sort((a, b) => b.rating - a.rating);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    const maxScroll = scrollWidth - clientWidth;
    const dot = maxScroll > 0
      ? Math.round((scrollLeft / maxScroll) * (NUM_DOTS - 1))
      : 0;
    setActiveDot(dot);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollToDot = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (index / (NUM_DOTS - 1)) * maxScroll, behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
        <p className="text-sm text-gray-500 mt-0.5">Most loved by customers today</p>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-3 -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {sorted.map((res) => (
          <Link
            key={res.id}
            href="/RestaurantDetail"
            className="flex-none w-[260px] sm:w-[280px]"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group cursor-pointer h-full">

              {/* Image — 16:9 ratio */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={res.image}
                  alt={res.name}
                  fill
                  className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                />

                {/* Promo Badge */}
                {res.promo && (
                  <span className="absolute top-2.5 left-2.5 bg-[#00b14f] text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide shadow">
                    Promo
                  </span>
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3.5 space-y-1.5">
                <h3 className="font-bold text-gray-900 text-[15px] leading-tight truncate">
                  {res.name}
                </h3>
                <p className="text-gray-500 text-xs truncate">{res.cuisine}</p>

                {/* Stats Row */}
                <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                  <span className="font-semibold text-gray-800">{res.rating.toFixed(1)}</span>
                  <span className="text-gray-300 mx-0.5">•</span>
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{res.deliveryTime} min</span>
                  <span className="text-gray-300 mx-0.5">•</span>
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{res.distance} km</span>
                </div>

                {/* Promo Text Row */}
                {res.promo ? (
                  <div className="flex items-center gap-1.5 pt-1 border-t border-dashed border-gray-100">
                    <Tag className="w-3.5 h-3.5 text-[#00b14f] shrink-0" />
                    <span className="text-[#00b14f] text-[11px] font-semibold uppercase tracking-wide truncate">
                      {res.promo}
                    </span>
                  </div>
                ) : (
                  <div className="pt-1 border-t border-dashed border-gray-100">
                    <span className="text-[11px] text-gray-300 italic">No offers available</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Controls: ← dots → */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200
            ${canScrollLeft
              ? "border-[#00b14f] text-[#00b14f] hover:bg-[#00b14f] hover:text-white shadow-sm"
              : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: NUM_DOTS }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToDot(i)}
              aria-label={`Page ${i + 1}`}
              className={`rounded-full transition-all duration-300
                ${activeDot === i
                  ? "w-5 h-2.5 bg-[#00b14f]"
                  : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
                }`}
            />
          ))}
        </div>

        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200
            ${canScrollRight
              ? "border-[#00b14f] text-[#00b14f] hover:bg-[#00b14f] hover:text-white shadow-sm"
              : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hide native scrollbar for webkit */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

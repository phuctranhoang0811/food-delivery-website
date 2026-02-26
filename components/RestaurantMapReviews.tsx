"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/app/RestaurantDetail/data";
import Map from "@/components/Map";

export default function RestaurantMapReviews() {
  return (
    <>
      {/* Map Section */}
      <section className="w-full bg-white py-12">
        <div className="max-w-[2000px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-24">
          <div className="h-[400px]">
            <Map
              latitude={51.5047}
              longitude={-0.0865}
              storeName="McDonald's"
              address="Tooley St, London Bridge, London SE1 2TF, United Kingdom"
              phone="+934443-43"
              website="http://mcdonalds.uk/"
            />
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-[2000px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-24">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Customer Reviews
            </h3>
            <div className="flex gap-3">
              <button className="bg-[#FC8A06] text-white rounded-full p-3 hover:bg-orange-600 transition-colors shadow-md">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="bg-[#FC8A06] text-white rounded-full p-3 hover:bg-orange-600 transition-colors shadow-md">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Review Header */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#FC8A06] text-lg">
                      {review.avatar}
                    </span>
                  </div>

                  {/* Name & Location */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>

                  {/* Rating & Date */}
                  <div className="text-right">
                    <div className="flex gap-1 mb-1 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-[#FC8A06] text-[#FC8A06]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Overall Rating Card */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-8 shadow-md text-center min-w-[200px]">
              <div className="text-6xl font-bold text-gray-900 mb-3">3.4</div>
              <div className="flex gap-1 justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < 3
                        ? "fill-[#FC8A06] text-[#FC8A06]"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 font-medium">1,360 reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Store and Google Play Logos */}
      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-[2000px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-24 flex justify-center gap-4">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
            alt="Download on the App Store"
            width={150}
            height={50}
            className="object-contain cursor-pointer hover:scale-105 transition-transform"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            width={150}
            height={50}
            className="object-contain cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
      </section>
    </>
  );
}

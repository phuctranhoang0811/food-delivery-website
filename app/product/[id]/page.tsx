"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Truck, Clock, Plus, Minus } from "lucide-react";
import { menuItems } from "@/app/RestaurantDetail/data";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPriceFromString } from "@/lib/formatPrice";
import Toast from "@/components/Toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  // Tìm sản phẩm từ menuItems
  const product = menuItems.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const priceStr = (product.price || "0").toString();
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image,
      restaurant: "McDonald's East London",
      quantity: quantity,
    };

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: numericPrice,
        image: product.image,
        restaurant: "McDonald's East London",
      });
    }

    setToastMessage(`${product.name} (x${quantity}) added to cart!`);
    setShowToast(true);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-semibold transition-colors mb-6 w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left: Product Image */}
            <div className="lg:col-span-7 h-full">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  quality={100}
                  className="object-cover w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Badge (e.g. Popular/Discount) */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-orange-600 shadow-sm text-sm">
                  {product.category}
                </div>
              </div>

              {/* Delivery Info Box (Under Image) */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Delivery Time</h4>
                    <p className="text-gray-600 text-xs">20-30 minutes</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Truck className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Free Delivery</h4>
                    <p className="text-gray-600 text-xs">Orders over 500k</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Actions */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md text-sm font-bold">
                    <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                    4.8
                  </div>
                  <span className="text-gray-500 text-sm underline cursor-pointer hover:text-gray-700">See 256 reviews</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                  {product.name}
                </h1>
                <h2 className="text-gray-500 font-medium mb-4">from McDonald's East London</h2>
                <div className="text-3xl font-bold text-orange-500">
                  {formatPriceFromString(product.price)}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.description}
                  {" "}Made with fresh, locally sourced ingredients and packed with incredible flavor to satisfy your cravings instantly.
                </p>
              </div>

              {/* Spacer to push checkout bottom */}
              <div className="flex-1"></div>

              {/* Quantity and Add to Cart area */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900">Quantity</span>
                  <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-bold text-lg transition-transform active:scale-95 shadow-lg flex justify-between items-center px-6"
                >
                  <span>Add to Cart</span>
                  <span>
                    {formatPriceFromString(
                      (
                        parseInt(product.price.replace(/[^0-9]/g, ""), 10) * quantity
                      ).toString(),
                    )}
                  </span>
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Reviews Section (Full width below) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "John Doe", rating: 5, date: "2 days ago", comment: "Excellent quality! The food arrived hot and the taste was incredible. Highly recommended." },
              { name: "Jane Smith", rating: 4, date: "1 week ago", comment: "Great taste, fast delivery. Will definitely order from here again!" },
              { name: "Mike Johnson", rating: 5, date: "2 weeks ago", comment: "Best burger I've ever had! The packaging kept everything perfectly intact." },
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex bg-white px-2 py-1 rounded-md shadow-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">&quot;{review.comment}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Truck, Clock, Plus, Minus } from "lucide-react";
import { menuItems } from "@/app/RestaurantDetail/data";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPriceFromString } from "@/lib/formatPrice";
import Toast from "@/components/Toast";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Product Image and Details */}
          <div className="space-y-6">
            {/* Product Image - Breaking out of container */}
            <div className="relative w-full h-80 rounded-2xl overflow-visible shadow-2xl">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl -z-10"></div>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover w-full h-full rounded-2xl shadow-xl"
              />
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">4.5</div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">256 reviews</p>
                </div>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="font-bold text-lg text-gray-900">
                McDonald's East London
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Delivery: 20-30 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <span>Free delivery on orders over 500,000 VND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info and Ordering */}
          <div className="space-y-6">
            {/* Product Name and Price */}
            <div className="bg-white rounded-2xl p-8 shadow-md space-y-6">
              <div>
                <p className="text-gray-600 text-sm mb-2">
                  Category: {product.category}
                </p>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-orange-500">
                  {formatPriceFromString(product.price)}
                </p>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selection */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Select Quantity
                </h3>
                <div className="flex items-center gap-6 bg-gray-900 p-4 rounded-xl w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="border-t pt-6 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
                >
                  Add to Cart •{" "}
                  {formatPriceFromString(
                    (
                      parseInt(product.price.replace(/[^0-9]/g, ""), 10) *
                      quantity
                    ).toString(),
                  )}
                </button>
                <button
                  onClick={() => router.back()}
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-bold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-6">
                Customer Reviews
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "John Doe",
                    rating: 5,
                    comment: "Excellent quality! Highly recommended.",
                  },
                  {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great taste, fast delivery.",
                  },
                  {
                    name: "Mike Johnson",
                    rating: 5,
                    comment: "Best burger I've ever had!",
                  },
                ].map((review, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="font-semibold text-gray-900">
                        {review.name}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
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
    </div>
  );
}

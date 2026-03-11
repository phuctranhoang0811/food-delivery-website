"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Home, FileText } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate fallback or get from active order
    let fallback = Math.floor(Math.random() * 900000) + 100000;
    setOrderNumber(fallback.toString());
    const saved = localStorage.getItem("orderuk-active-order");
    if (saved) {
      try {
        const orders = JSON.parse(saved);
        if (orders && orders.length > 0) {
          setOrderNumber(orders[0].id.replace("#", ""));
        }
      } catch (e) {}
    }

    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll start preparing your food right away!
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-bold text-orange-600">#{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Estimated Time:</span>
            <span className="font-semibold">20-30 mins</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Status:</span>
            <span className="text-green-600 font-semibold">Preparing</span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Order Placed</span>
            <span>Preparing</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="flex-1 h-1 bg-green-600 mx-1"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <div className="flex-1 h-1 bg-gray-200 mx-1"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-1 bg-gray-200 mx-1"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>

          <button
            onClick={() => router.push("/track-order")}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Track Order
          </button>
        </div>

        {/* Auto redirect notice */}
        <p className="text-xs text-gray-500 mt-4">
          You'll be redirected to home page in 10 seconds
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderStepper, { OrderStep } from "@/components/OrderStepper";

interface TrackOrderItem {
  name: string;
  qty: number;
}

interface TrackedOrder {
  id: string;
  step: OrderStep;
  items: TrackOrderItem[];
  total: string;
}

// Mock active orders – replace with real DB query when Order model is ready
const MOCK_TRACKED_ORDERS: TrackedOrder[] = [
  {
    id: "#2345678",
    step: "Shipping",
    items: [
      { name: "Banh Mi",           qty: 2 },
      { name: "Pho Tai",           qty: 1 },
      { name: "Vietnamese Coffee", qty: 1 },
    ],
    total: "$42.50",
  },
  {
    id: "#2345689",
    step: "Preparing",
    items: [
      { name: "Spicy Tuna Roll", qty: 1 },
      { name: "Miso Soup",       qty: 1 },
      { name: "Edamame",         qty: 1 },
    ],
    total: "$28.00",
  },
];

export default function TrackOrderPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trackedOrders, setTrackedOrders] = useState<TrackedOrder[]>([]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.replace("/login");
      return;
    }
    setIsLoggedIn(true);

    const saved = localStorage.getItem("orderuk-active-order");
    if (saved) {
      try {
        setTrackedOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders");
      }
    } else {
      setTrackedOrders(MOCK_TRACKED_ORDERS);
    }
  }, [router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Page content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Page title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Order Tracking</h1>

          {/* Order cards */}
          <div className="flex flex-col gap-6">
            {trackedOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left – Stepper */}
                  <div className="sm:w-1/2 p-6 flex items-start">
                    <OrderStepper currentStep={order.step} />
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px bg-gray-100 my-6" />

                  {/* Right – Order details */}
                  <div className="sm:w-1/2 p-6 flex flex-col gap-4">
                    {/* Order ID */}
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Order ID: {order.id}
                      </span>
                    </div>

                    {/* Items list */}
                    <ul className="flex flex-col gap-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          {item.qty}x {item.name}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="border-t border-gray-200" />

                    {/* Total */}
                    <p className="text-sm font-bold text-gray-900">
                      Total Price:{" "}
                      <span className="text-gray-900">{order.total}</span>
                    </p>

                    {/* View Details button */}
                    <button
                      onClick={() => router.push("/order-history")}
                      className="bg-[#00b14f] hover:bg-[#009a44] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors w-fit"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

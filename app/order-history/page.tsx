"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  restaurant: string;
  status: "Delivered" | "Processing" | "Cancelled";
  total: number;
  items: OrderItem[];
}

// Mock order history data (replace with real API when order model is ready)
const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-20260228-001",
    date: "28 Feb 2026, 11:30 AM",
    restaurant: "McDonald's East London",
    status: "Delivered",
    total: 192000,
    items: [
      { name: "Double Beef Burger", qty: 1, price: 82000 },
      { name: "Big Mac Deluxe", qty: 1, price: 85000 },
      { name: "Iced Cola Classic", qty: 1, price: 32000 },
    ],
  },
  {
    id: "ORD-20260225-002",
    date: "25 Feb 2026, 07:15 PM",
    restaurant: "KFC Central",
    status: "Delivered",
    total: 155000,
    items: [
      { name: "Crispy Chicken Bucket", qty: 1, price: 120000 },
      { name: "Fresh Lemonade", qty: 1, price: 45000 },
    ],
  },
  {
    id: "ORD-20260220-003",
    date: "20 Feb 2026, 12:45 PM",
    restaurant: "Pizza 4P's",
    status: "Delivered",
    total: 238000,
    items: [
      { name: "Margherita Pizza (M)", qty: 1, price: 165000 },
      { name: "Garlic Bread", qty: 2, price: 38000 },
    ],
  },
  {
    id: "ORD-20260215-004",
    date: "15 Feb 2026, 06:00 PM",
    restaurant: "Sushi Hokkaido",
    status: "Cancelled",
    total: 310000,
    items: [
      { name: "Salmon Sashimi Set", qty: 1, price: 220000 },
      { name: "Miso Soup", qty: 2, price: 45000 },
    ],
  },
];

const statusConfig = {
  Delivered: {
    color: "text-green-700 bg-green-50 border-green-200",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  Processing: {
    color: "text-orange-700 bg-orange-50 border-orange-200",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Cancelled: {
    color: "text-red-600 bg-red-50 border-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

function formatVND(amount: number) {
  return amount.toLocaleString("vi-VN") + " VND";
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.replace("/login");
      return;
    }
    setIsLoggedIn(true);
  }, [router]);

  if (!isLoggedIn) return null;

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Order History</h1>
          <span className="ml-auto text-sm text-gray-400">{MOCK_ORDERS.length} orders</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {MOCK_ORDERS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="w-16 h-16 text-gray-200 mb-4" />
            <p className="text-lg font-semibold text-gray-700">No orders yet</p>
            <p className="text-sm text-gray-400 mt-1">Your past orders will appear here.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          MOCK_ORDERS.map((order) => {
            const cfg = statusConfig[order.status];
            const isOpen = expanded === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() => toggle(order.id)}
                  className="w-full flex items-start gap-4 p-5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-gray-900 text-sm truncate">{order.restaurant}</p>
                      <span
                        className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.color} shrink-0`}
                      >
                        {cfg.icon}
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-xs text-gray-500">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                      <p className="text-sm font-bold text-orange-500">{formatVND(order.total)}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{order.id}</p>
                  </div>
                  <div className="text-gray-400 mt-1 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expandable: Order Items */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 pb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-3">
                      Items Ordered
                    </p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">
                            <span className="text-orange-500 font-semibold mr-1">x{item.qty}</span>
                            {item.name}
                          </span>
                          <span className="font-semibold text-gray-800">{formatVND(item.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed border-gray-200 mt-4 pt-3 flex justify-between text-sm font-bold">
                      <span className="text-gray-700">Total</span>
                      <span className="text-orange-500">{formatVND(order.total)}</span>
                    </div>

                    {/* Reorder button */}
                    {order.status === "Delivered" && (
                      <button
                        onClick={() => router.push("/RestaurantDetail")}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold text-sm py-2.5 rounded-xl border border-orange-200 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reorder
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

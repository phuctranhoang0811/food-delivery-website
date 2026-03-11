"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Edit3,
  Minus,
  Plus,
  Trash2,
  DollarSign,
  Clock,
  Truck,
  Check,
  X,
} from "lucide-react";
import { formatPriceWithSymbol } from "@/lib/formatPrice";
import VoucherSelector, { type Voucher } from "@/components/VoucherSelector";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    label: "Home",
    address: "Regent Street, A4, A4201, London",
    floor: "Floor 2, Apartment 4B",
    note: "Near to Icon Plaza, A4201",
  });
  const [editForm, setEditForm] = useState({ ...deliveryAddress });

  const DELIVERY_FEE = 15000; // 15,000 VND
  const SERVICE_TAX = 10000; // 10,000 VND
  const FREE_DELIVERY_THRESHOLD = 500000; // 500,000 VND

  const subtotal = getCartTotal();
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const totalAmount = subtotal + deliveryFee + SERVICE_TAX;
  const discount = selectedVoucher
    ? selectedVoucher.type === "percent"
      ? Math.min(subtotal * (selectedVoucher.discount / 100), 100000)
      : selectedVoucher.discount
    : 0;
  const finalAmount = totalAmount - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handlePlaceOrder = async () => {
    // Set loading state
    setIsPlacingOrder(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save active order for tracking
    const newOrder = {
      id: `#${Math.floor(1000000 + Math.random() * 9000000)}`,
      step: "Shipping", // Start at shipping/preparing
      items: items.map(item => ({ name: item.name, qty: item.quantity })),
      total: formatPriceWithSymbol(finalAmount),
    };

    // Storing as array so track-order can map it
    localStorage.setItem("orderuk-active-order", JSON.stringify([newOrder]));

    // Clear cart and redirect
    clearCart();
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items to get started!
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Delivery Address
                  </h2>
                </div>
                {!isEditingAddress ? (
                  <button
                    onClick={() => { setEditForm({ ...deliveryAddress }); setIsEditingAddress(true); }}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    <Edit3 className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setDeliveryAddress({ ...editForm }); setIsEditingAddress(false); }}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Check className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                )}
              </div>

              {isEditingAddress ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Label (e.g. Home, Work)</label>
                    <input
                      type="text"
                      value={editForm.label}
                      onChange={(e) => setEditForm((p) => ({ ...p, label: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Floor / Apartment</label>
                    <input
                      type="text"
                      value={editForm.floor}
                      onChange={(e) => setEditForm((p) => ({ ...p, floor: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Delivery Note</label>
                    <input
                      type="text"
                      value={editForm.note}
                      onChange={(e) => setEditForm((p) => ({ ...p, note: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  {/* Map placeholder */}
                  <div className="w-24 h-24 bg-green-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {deliveryAddress.label}
                    </h3>
                    <p className="text-gray-600 text-sm">{deliveryAddress.address}</p>
                    <p className="text-gray-600 text-sm">{deliveryAddress.floor}</p>
                    <p className="text-gray-500 text-xs mt-1">{deliveryAddress.note}</p>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Clock className="w-4 h-4" />
                        <span>20-30 min</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Truck className="w-4 h-4" />
                        <span>Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-5 bg-orange-500 rounded"></div>
                <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.restaurant}</p>
                      <p className="font-bold text-orange-500 mt-1">
                        {formatPriceWithSymbol(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-white rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-white rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Item Total */}
                      <div className="text-right min-w-[80px]">
                        <p className="font-bold text-gray-900">
                          {formatPriceWithSymbol(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-5 bg-orange-500 rounded"></div>
                <h2 className="text-lg font-bold text-gray-900">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Visa */}
                <button
                  onClick={() => setSelectedPayment("visa")}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    selectedPayment === "visa"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="bg-blue-700 text-white font-bold italic text-2xl px-4 py-1 rounded">
                    VISA
                  </div>
                  <p className="font-semibold text-gray-900">Pay by Visa</p>
                  <p className="text-xs text-gray-500">Credit / Debit card</p>
                </button>

                {/* Cash */}
                <button
                  onClick={() => setSelectedPayment("cash")}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    selectedPayment === "cash"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <DollarSign className="w-10 h-10 text-green-600" />
                  <p className="font-semibold text-gray-900">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when delivered</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Voucher Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  VOUCHER / KHUYẾN MÃI
                </label>
                <VoucherSelector onApply={(v) => setSelectedVoucher(v)} />
              </div>

              {/* Order Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPriceWithSymbol(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                    {deliveryFee === 0
                      ? "Free"
                      : formatPriceWithSymbol(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Service Tax</span>
                  <span>{formatPriceWithSymbol(SERVICE_TAX)}</span>
                </div>

                {selectedVoucher && discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá ({selectedVoucher.code})</span>
                    <span>-{formatPriceWithSymbol(discount)}</span>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>{formatPriceWithSymbol(finalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Free Delivery Info */}
              {subtotal >= FREE_DELIVERY_THRESHOLD && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm font-medium">Free Delivery</span>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">
                    Because your order is over 500,000 VND, shipping is on us!
                  </p>
                </div>
              )}

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-colors shadow-lg ${
                  isPlacingOrder
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {isPlacingOrder ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </div>
                ) : (
                  "Place Order"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing an order you agree to our{" "}
                <span className="text-orange-500 underline">Terms</span> and{" "}
                <span className="text-orange-500 underline">Privacy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

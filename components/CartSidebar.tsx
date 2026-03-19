"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPriceWithSymbol } from "@/lib/formatPrice";

export default function CartSidebar() {
  const {
    items,
    appliedVoucher,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getFinalTotal,
    removeVoucher,
    getCartCount,
  } = useCart();

  const router = useRouter();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 bg-black/50"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } shadow-2xl overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {getCartCount()}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Add some delicious items to get started!
                </p>
                <button
                  onClick={closeCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg p-4"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      {item.restaurant && (
                        <p className="text-sm text-gray-500 truncate">
                          {item.restaurant}
                        </p>
                      )}
                      <p className="text-orange-500 font-bold">
                        {formatPriceWithSymbol(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        {formatPriceWithSymbol(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-900">Subtotal:</span>
                <span className="font-bold text-orange-500">
                  {formatPriceWithSymbol(getCartTotal())}
                </span>
              </div>

              {/* Discount if present */}
              {appliedVoucher && (
                <div className="flex justify-between items-center text-lg text-green-600">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Discount ({appliedVoucher.code}):</span>
                    <button onClick={removeVoucher} className="text-xs text-red-500 hover:text-red-700 underline">Remove</button>
                  </div>
                  <span className="font-bold">
                    -{formatPriceWithSymbol(appliedVoucher.discountAmount)}
                  </span>
                </div>
              )}

              {/* Delivery Info */}
              <div className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                <p>🚚 Free delivery on orders over 500,000 VND</p>
                <p>📍 Delivery: 20-30 minutes</p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
              >
                Proceed to Checkout • {formatPriceWithSymbol(getFinalTotal())}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

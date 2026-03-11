"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Toast from "@/components/Toast";
import { formatPriceWithSymbol } from "@/lib/formatPrice";
import { Ticket, CheckCircle } from "lucide-react";

const VOUCHERS = [
  { id: 1, code: "WELCOME50", title: "New User Discount", desc: "Get up to 50,000 VND off on your first order", discountAmount: 50000, color: "bg-orange-500" },
  { id: 2, code: "SUMMERCOOL", title: "Summer Party", desc: "Enjoy 30,000 VND off for all orders over 100,000 VND", discountAmount: 30000, color: "bg-blue-500" },
  { id: 3, code: "FREESHIP", title: "Free Shipping", desc: "Save 15,000 VND on delivery fee", discountAmount: 15000, color: "bg-green-500" },
  { id: 4, code: "MIDNIGHT", title: "Midnight Cravings", desc: "Save 25,000 VND for orders from 22h - 02h", discountAmount: 25000, color: "bg-purple-500" },
  { id: 5, code: "VEGANLOVER", title: "Vegan Special", desc: "Save 40,000 VND on all healthy and vegan meals", discountAmount: 40000, color: "bg-teal-500", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
];

export default function SpecialOffers() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { applyVoucher, appliedVoucher, openCart } = useCart();

  const handleApplyVoucher = (voucher: { code: string; discountAmount: number }) => {
    applyVoucher(voucher);
    setToastMessage(`Voucher "${voucher.code}" applied successfully!`);
    setShowToast(true);
    setTimeout(() => {
       openCart();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Special Offers & Vouchers</h1>
          <p className="text-lg text-gray-600">Claim your discount and order your favorite meals right away!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VOUCHERS.map((voucher) => (
            <div key={voucher.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row">
              <div className={`relative ${voucher.color} p-6 flex flex-col justify-center items-center text-white sm:w-1/3 min-h-[140px] overflow-hidden`}>
                {voucher.image && (
                  <Image src={voucher.image} alt={voucher.title} fill className="object-cover opacity-40 mix-blend-overlay" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <Ticket className="w-10 h-10 mb-2 opacity-90 filter drop-shadow-md" />
                  <span className="font-mono font-bold text-lg tracking-wider border-2 border-white/80 px-3 py-1 border-dashed rounded bg-black/20 backdrop-blur-sm drop-shadow-md">
                    {voucher.code}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{voucher.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{voucher.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-gray-900">
                    -{formatPriceWithSymbol(voucher.discountAmount)}
                  </span>
                  {appliedVoucher?.code === voucher.code ? (
                    <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Applied
                    </div>
                  ) : (
                     <button
                       onClick={() => handleApplyVoucher(voucher)}
                       className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
                     >
                       Add Voucher
                     </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      <Footer />
    </main>
  );
}

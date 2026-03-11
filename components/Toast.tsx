"use client";

import { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-3.5 flex items-center gap-3 min-w-[280px] max-w-sm">
        <div className="w-8 h-8 rounded-full bg-[#FC8A06] flex items-center justify-center shrink-0">
          <ShoppingCart className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium text-sm flex-1 leading-snug">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors shrink-0 ml-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

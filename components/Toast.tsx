"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

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
      className={`fixed top-24 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-green-500 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="w-6 h-6 flex-shrink-0" />
        <span className="font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

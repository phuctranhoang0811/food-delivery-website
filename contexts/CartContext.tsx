"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant?: string;
}

// Định nghĩa các action types
type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "APPLY_VOUCHER"; payload: { code: string; discountAmount: number } }
  | { type: "REMOVE_VOUCHER" };

// State của Cart
interface CartState {
  items: CartItem[];
  appliedVoucher: { code: string; discountAmount: number } | null;
}

// Context interface
interface CartContextType {
  items: CartItem[];
  appliedVoucher: { code: string; discountAmount: number } | null;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getFinalTotal: () => number;
  applyVoucher: (voucher: { code: string; discountAmount: number }) => void;
  removeVoucher: () => void;
  getCartCount: () => number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [], appliedVoucher: null };

    case "LOAD_CART":
      return { ...state, items: action.payload };

    case "APPLY_VOUCHER":
      return { ...state, appliedVoucher: action.payload };

    case "REMOVE_VOUCHER":
      return { ...state, appliedVoucher: null };

    default:
      return state;
  }
};

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], appliedVoucher: null });
  const [isOpen, ReactSetIsOpen] = React.useState(false);

  // Load cart từ localStorage khi component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("orderuk-cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: cartItems });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    const savedVoucher = localStorage.getItem("orderuk-voucher");
    if (savedVoucher) {
      try {
        const voucher = JSON.parse(savedVoucher);
        dispatch({ type: "APPLY_VOUCHER", payload: voucher });
      } catch (error) {
         console.error("Error loading voucher from localStorage:", error);
      }
    }
  }, []);

  // Lưu cart vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("orderuk-cart", JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    if (state.appliedVoucher) {
      localStorage.setItem("orderuk-voucher", JSON.stringify(state.appliedVoucher));
    } else {
      localStorage.removeItem("orderuk-voucher");
    }
  }, [state.appliedVoucher]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const applyVoucher = (voucher: { code: string; discountAmount: number }) => {
    dispatch({ type: "APPLY_VOUCHER", payload: voucher });
  };

  const removeVoucher = () => {
    dispatch({ type: "REMOVE_VOUCHER" });
  };

  const getCartTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal();
    const discount = state.appliedVoucher ? state.appliedVoucher.discountAmount : 0;
    return Math.max(0, subtotal - discount);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const openCart = () => ReactSetIsOpen(true);
  const closeCart = () => ReactSetIsOpen(false);

  const value = {
    items: state.items,
    appliedVoucher: state.appliedVoucher,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getFinalTotal,
    applyVoucher,
    removeVoucher,
    getCartCount,
    isOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook để sử dụng Cart Context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

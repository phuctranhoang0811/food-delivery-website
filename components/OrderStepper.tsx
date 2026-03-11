"use client";

import { Check, ChefHat, Truck, Home } from "lucide-react";

export type OrderStep = "Ordered" | "Preparing" | "Shipping" | "Delivered";

interface OrderStepperProps {
  currentStep: OrderStep;
}

const STEPS: { key: OrderStep; label: string; icon: React.ReactNode }[] = [
  { key: "Ordered",   label: "Ordered",   icon: <Check className="w-4 h-4" /> },
  { key: "Preparing", label: "Preparing", icon: <ChefHat className="w-4 h-4" /> },
  { key: "Shipping",  label: "Shipping",  icon: <Truck className="w-4 h-4" /> },
  { key: "Delivered", label: "Delivered", icon: <Home className="w-4 h-4" /> },
];

const STEP_ORDER: Record<OrderStep, number> = {
  Ordered: 0,
  Preparing: 1,
  Shipping: 2,
  Delivered: 3,
};

export default function OrderStepper({ currentStep }: OrderStepperProps) {
  const currentIndex = STEP_ORDER[currentStep];

  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => {
        const isDone    = i < currentIndex;
        const isActive  = i === currentIndex;
        const isPending = i > currentIndex;

        const circleClass = isPending
          ? "bg-gray-200 text-gray-400"
          : "bg-[#00b14f] text-white";

        const labelClass = isPending
          ? "text-gray-400"
          : isActive
          ? "text-gray-900 font-bold"
          : "text-gray-700 font-semibold";

        const lineClass = i < STEPS.length - 1
          ? i < currentIndex
            ? "bg-[#00b14f]"
            : "bg-gray-200"
          : "";

        return (
          <div key={step.key} className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              {/* Circle icon */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${circleClass}`}
              >
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              {/* Label */}
              <span className={`text-sm transition-colors ${labelClass}`}>
                {step.label}
              </span>
            </div>

            {/* Vertical connector line */}
            {i < STEPS.length - 1 && (
              <div className={`ml-[17px] w-0.5 h-6 ${lineClass}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

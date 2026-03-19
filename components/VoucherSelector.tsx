"use client";

import { useState } from "react";
import { Ticket, Utensils, Percent, Check } from "lucide-react";

export interface Voucher {
  id: string;
  code: string;
  title: string;
  condition: string;
  expiry: string;
  discount: number;
  type: "percent" | "fixed";
  bgColor: string;
  icon: "ticket" | "food" | "percent";
}

const MOCK_VOUCHERS: Voucher[] = [
  {
    id: "v1",
    code: "SAVE50K",
    title: "Discount 50,000VND",
    condition: "Valid for orders from 200,000VND",
    expiry: "31/03/2026",
    discount: 50000,
    type: "fixed",
    bgColor: "bg-orange-500",
    icon: "ticket",
  },
  {
    id: "v2",
    code: "FREESHIP",
    title: "Free Shipping",
    condition: "No minimum order",
    expiry: "15/03/2026",
    discount: 15000,
    type: "fixed",
    bgColor: "bg-green-500",
    icon: "food",
  },
  {
    id: "v3",
    code: "MEGA20",
    title: "Discount 20%",
    condition: "Max 100,000VND · Orders from 300,000VND",
    expiry: "20/04/2026",
    discount: 20,
    type: "percent",
    bgColor: "bg-purple-500",
    icon: "percent",
  },
  {
    id: "v4",
    code: "NEWUSER",
    title: "New User Offer",
    condition: "Discount 30,000VND for first order",
    expiry: "30/03/2026",
    discount: 30000,
    type: "fixed",
    bgColor: "bg-blue-500",
    icon: "ticket",
  },
];

function VoucherIcon({
  type,
  className,
}: {
  type: Voucher["icon"];
  className?: string;
}) {
  if (type === "food") return <Utensils className={className} />;
  if (type === "percent") return <Percent className={className} />;
  return <Ticket className={className} />;
}

interface VoucherSelectorProps {
  onApply?: (voucher: Voucher | null) => void;
}

export default function VoucherSelector({ onApply }: VoucherSelectorProps) {
  const [inputCode, setInputCode] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const applyVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setInputCode(voucher.code);
    setErrorMsg("");
    onApply?.(voucher);
  };

  const handleApplyCode = () => {
    const trimmed = inputCode.trim().toUpperCase();
    if (!trimmed) return;
    const found = MOCK_VOUCHERS.find((v) => v.code === trimmed);
    if (found) {
      applyVoucher(found);
    } else {
      setErrorMsg("Invalid or expired voucher code.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleApplyCode();
  };

  return (
    <div className="space-y-5">
      {/* ── Input section ── */}
      <div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter voucher code..."
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value.toUpperCase());
              setErrorMsg("");
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
          <button
            onClick={handleApplyCode}
            className="px-5 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm rounded-r-xl transition-colors whitespace-nowrap"
          >
            Apply
          </button>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-xs mt-1.5 pl-1">{errorMsg}</p>
        )}

        {selectedVoucher && !errorMsg && (
          <p className="text-green-600 text-xs mt-1.5 pl-1 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Applied: {selectedVoucher.title}
          </p>
        )}
      </div>

      {/* ── Voucher list ── */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Available Vouchers
        </p>

        <div className="space-y-3">
          {MOCK_VOUCHERS.map((voucher) => {
            const isSelected = selectedVoucher?.id === voucher.id;
            return (
              <div
                key={voucher.id}
                onClick={() => applyVoucher(voucher)}
                className={`relative flex rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected
                    ? "ring-2 ring-orange-500 shadow-md"
                    : "shadow-sm ring-1 ring-gray-100"
                  }`}
              >
                {/* ── Left colored stub ── */}
                <div
                  className={`${voucher.bgColor} w-[72px] flex-shrink-0 flex flex-col items-center justify-center gap-1.5 text-white py-4 px-2`}
                >
                  <VoucherIcon type={voucher.icon} className="w-6 h-6" />
                  <span className="text-[11px] font-extrabold text-center leading-tight">
                    {voucher.type === "percent"
                      ? `-${voucher.discount}%`
                      : `-${voucher.discount / 1000}K`}
                  </span>
                </div>

                {/* ── Tear notches: two half-circles at the divider line ── */}
                {/* Top notch — circle centered at top edge of divider */}
                <div
                  className="absolute w-5 h-5 rounded-full bg-gray-50 -translate-x-1/2 z-10"
                  style={{ left: 72, top: -10 }}
                />
                {/* Bottom notch — circle centered at bottom edge of divider */}
                <div
                  className="absolute w-5 h-5 rounded-full bg-gray-50 -translate-x-1/2 z-10"
                  style={{ left: 72, bottom: -10 }}
                />

                {/* ── Right content area ── */}
                <div className="flex-1 bg-white flex items-center justify-between px-4 py-3 border-l-2 border-dashed border-gray-200">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="font-bold text-gray-900 text-sm truncate mb-0.5">
                      {voucher.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                      {voucher.condition}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-gray-100 text-black border border-gray-300 font-mono text-[10px] font-bold rounded whitespace-nowrap tracking-wide shadow-sm">
                        {voucher.code}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        EXP: {voucher.expiry}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-sm">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <button
                        className="px-3 py-1.5 text-xs font-semibold text-orange-500 border border-orange-400 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
                        onClick={(e) => {
                          e.stopPropagation();
                          applyVoucher(voucher);
                        }}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

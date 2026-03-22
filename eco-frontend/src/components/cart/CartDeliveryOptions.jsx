








import React from "react";
import { DELIVERY_OPTIONS } from "../../data/cartData.js";

export default function CartDeliveryOptions({ selected, subtotal, onSelect }) {
    return (
        <div className="space-y-2">
            {DELIVERY_OPTIONS.map((opt) => {
                const isFree = opt.free_above !== null && subtotal >= opt.free_above;
                const finalCost = isFree ? 0 : opt.price;
                const isActive = selected === opt.id;

                return (
                    <label
                        key={opt.id}
                        onClick={() => onSelect(opt.id)}
                        className={`
              flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150
              ${isActive
                                ? "border-[#5a9a3a] bg-[#f0f7ea]"
                                : "border-gray-100 bg-white hover:border-[#c8e6b0]"
                            }
            `}
                    >
                        {}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
              ${isActive ? "border-[#5a9a3a] bg-[#5a9a3a]" : "border-gray-300"}`}
                        >
                            {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        {}
                        <div className="flex-1">
                            <p className={`text-sm font-bold ${isActive ? "text-[#1a2e1a]" : "text-gray-700"}`}>
                                {opt.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{opt.days}</p>
                        </div>

                        {}
                        <div className="text-right flex-shrink-0">
                            {finalCost === 0 ? (
                                <span className="text-sm font-black text-[#5a9a3a]">FREE</span>
                            ) : (
                                <span className="text-sm font-black text-[#1a2e1a]">₹{finalCost}</span>
                            )}
                            {isFree && opt.price > 0 && (
                                <p className="text-xs text-gray-400 line-through">₹{opt.price}</p>
                            )}
                        </div>
                    </label>
                );
            })}

            {}
            {subtotal < 999 && (
                <div className="mt-2 p-3 bg-[#f0f7ea] rounded-xl border border-[#c8e6b0]">
                    <p className="text-xs font-semibold text-[#1a2e1a] mb-1.5">
                        Add <span className="font-black text-[#5a9a3a]">₹{(999 - subtotal).toLocaleString()}</span> more for free standard delivery
                    </p>
                    <div className="w-full h-1.5 bg-[#c8e6b0] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#5a9a3a] rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
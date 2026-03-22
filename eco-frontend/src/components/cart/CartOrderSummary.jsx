














import React from "react";
import { TRUST_BADGES } from "../../data/cartData.js";

export default function CartOrderSummary({
    cart,
    deliveryCost,
    promoCode,
    promoData,
    carbonSaved,
    onCheckout,
    promoSlot,
}) {
    const itemCount = cart.reduce((s, i) => s + i.qty, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const savings = cart.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0);
    const promoDiscount = promoData ? Math.round(subtotal * promoData.discount) : 0;
    const total = subtotal - promoDiscount + deliveryCost;

    return (
        <div className="bg-white rounded-2xl border border-[#c8e6b0] shadow-sm overflow-hidden sticky top-24">

            {}
            <div className="bg-gradient-to-r from-[#1a2e1a] to-[#2d4a1e] px-5 py-4">
                <h2 className="font-black text-white text-base">Order Summary</h2>
                <p className="text-xs text-gray-400 mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>
            </div>

            <div className="p-5 space-y-4">

                {}
                <div className="space-y-2.5 text-sm">

                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({itemCount} items)</span>
                        <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                    </div>

                    {savings > 0 && (
                        <div className="flex justify-between text-[#5a9a3a]">
                            <span>Item savings</span>
                            <span className="font-black">−₹{savings.toLocaleString()}</span>
                        </div>
                    )}

                    {promoDiscount > 0 && (
                        <div className="flex justify-between text-[#5a9a3a]">
                            <span>
                                Promo{" "}
                                <span className="font-mono text-xs bg-[#f0f7ea] border border-[#c8e6b0] rounded px-1 py-0.5">
                                    {promoCode}
                                </span>
                            </span>
                            <span className="font-black">−₹{promoDiscount.toLocaleString()}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                        <span>Delivery</span>
                        <span className={`font-semibold ${deliveryCost === 0 ? "text-[#5a9a3a]" : ""}`}>
                            {deliveryCost === 0 ? "FREE" : `₹${deliveryCost}`}
                        </span>
                    </div>

                    <div className="border-t border-[#f0f7ea] pt-2.5 flex justify-between text-[#1a2e1a] font-black text-base">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    {(savings + promoDiscount) > 0 && (
                        <div className="bg-[#f0f7ea] rounded-xl px-3 py-2 text-center">
                            <p className="text-xs font-black text-[#5a9a3a]">
                                🎉 You save ₹{(savings + promoDiscount).toLocaleString()} on this order!
                            </p>
                        </div>
                    )}
                </div>

                {}
                <div>
                    <p className="text-xs font-black text-[#1a2e1a] mb-2">Promo Code</p>
                    {promoSlot}
                </div>

                {}
                <div className="flex items-center gap-2.5 bg-[#f0f7ea] rounded-xl px-3 py-2.5 border border-[#c8e6b0]">
                    <span className="text-xl flex-shrink-0">🌍</span>
                    <div>
                        <p className="text-xs font-black text-[#2d6a1a]">
                            Saves {carbonSaved.toFixed(2)} kg CO₂
                        </p>
                        <p className="text-xs text-gray-400">vs. plastic packaging</p>
                    </div>
                </div>

                {}
                <button
                    onClick={onCheckout}
                    className="w-full py-3.5 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] active:bg-[#3a7a1a] transition-colors shadow-sm"
                >
                    Proceed to Checkout →
                </button>

                {}
                <div className="grid grid-cols-2 gap-2">
                    {TRUST_BADGES.map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-1.5 text-xs text-gray-400">
                            <span>{icon}</span>
                            <span>{text}</span>
                        </div>
                    ))}
                </div>

                {}
                <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">We accept</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["UPI", "Cards", "Net Banking", "COD", "EMI"].map((m) => (
                            <span key={m} className="text-xs border border-gray-200 rounded-md px-2 py-0.5 text-gray-500 font-medium">
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
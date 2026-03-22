








import React from "react";

export default function CartSavedItems({ savedItems, onMoveToCart, onRemove }) {
    if (!savedItems.length) return null;

    return (
        <section className="mt-6">
            <h2 className="text-base font-black text-[#1a2e1a] mb-3">
                Saved for later ({savedItems.length})
            </h2>

            <div className="space-y-3">
                {savedItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-start">

                        {}
                        <div className="w-16 h-16 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-3xl flex-shrink-0 border border-[#e8f5e0]">
                            {item.emoji}
                        </div>

                        {}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#1a2e1a] text-sm leading-tight line-clamp-2">{item.name}</h3>
                            <p className="text-[#5a9a3a] font-black text-sm mt-1">₹{item.price.toLocaleString()}</p>
                            <p className="text-xs text-[#5a9a3a] mt-0.5">🌱 {item.carbonSaved} kg CO₂/unit</p>

                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => onMoveToCart(item)}
                                    className="px-4 py-1.5 rounded-xl bg-[#5a9a3a] text-white text-xs font-black hover:bg-[#4a8a2a] transition-colors"
                                >
                                    Move to cart
                                </button>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-400 hover:text-[#d94f2e] hover:border-red-200 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
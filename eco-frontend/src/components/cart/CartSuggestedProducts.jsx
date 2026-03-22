






import React, { useState } from "react";
import { SUGGESTED_PRODUCTS } from "../../data/cartData.js";

export default function CartSuggestedProducts({ onAddToCart }) {
    const [added, setAdded] = useState({});

    const handleAdd = (product) => {
        onAddToCart(product);
        setAdded((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
    };

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-[#1a2e1a]">You might also like</h2>
                <span className="text-xs text-gray-400">Frequently bought together</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SUGGESTED_PRODUCTS.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-gray-100 hover:border-[#5a9a3a] hover:shadow-md transition-all duration-200 p-4 flex flex-col"
                    >
                        {}
                        <div className="h-20 bg-[#f0f7ea] rounded-xl flex items-center justify-center text-4xl mb-3 border border-[#e8f5e0]">
                            {product.emoji}
                        </div>

                        {}
                        {product.badges?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-1.5">
                                {product.badges.map((b) => (
                                    <span key={b} className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0]">
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h3 className="text-xs font-bold text-[#1a2e1a] leading-tight mb-1 flex-1">{product.name}</h3>
                        <p className="text-xs text-[#5a9a3a] mb-2">🌱 {product.carbonSaved} kg CO₂/unit</p>
                        <p className="font-black text-[#5a9a3a] text-sm mb-3">₹{product.price}</p>

                        <button
                            onClick={() => handleAdd(product)}
                            className={`w-full py-2 rounded-xl text-xs font-black transition-all duration-200
                ${added[product.id]
                                    ? "bg-green-600 text-white"
                                    : "bg-[#5a9a3a] text-white hover:bg-[#4a8a2a]"
                                }`}
                        >
                            {added[product.id] ? "✓ Added!" : "Add to Cart"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
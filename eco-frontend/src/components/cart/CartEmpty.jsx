






import React from "react";

export default function CartEmpty({ onShopNow }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">

            {}
            <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full bg-[#f0f7ea] border-2 border-[#c8e6b0] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#c8e6b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                {}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#5a9a3a] flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">🌿</span>
                </div>
            </div>

            <h2 className="text-2xl font-black text-[#1a2e1a] mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">
                Add some eco-friendly packaging to get started. Every item you choose helps save the planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onShopNow}
                    className="px-8 py-3 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] transition-colors shadow-sm"
                >
                    Browse Products →
                </button>
                <button
                    onClick={onShopNow}
                    className="px-8 py-3 rounded-xl border-2 border-[#c8e6b0] text-[#5a9a3a] font-black text-sm hover:border-[#5a9a3a] hover:bg-[#f0f7ea] transition-colors"
                >
                    View Deals
                </button>
            </div>

            {}
            <p className="mt-8 text-xs text-gray-400 flex items-center gap-2">
                <span>🔒</span> Secure checkout · Free returns · Ships in 24 hrs
            </p>
        </div>
    );
}
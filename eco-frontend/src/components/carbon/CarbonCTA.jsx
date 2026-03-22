







import React from "react";

export default function CarbonCTA({ onShopNow }) {
    return (
        <section className="relative bg-gradient-to-r from-[#1a2e1a] via-[#2d4a1e] to-[#1a3320] rounded-3xl overflow-hidden px-8 py-10 text-center">

            {}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 80% 50%, rgba(143,204,96,.15) 0%, transparent 55%)",
                }}
            />

            <div className="relative z-10">
                <span className="text-5xl block mb-4 select-none">🌍</span>

                <h2 className="text-2xl font-black text-white mb-2">
                    Want to Save More CO₂?
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-7 leading-relaxed">
                    Switch more of your packaging to eco alternatives and watch your personal
                    carbon impact grow with every order.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={onShopNow}
                        className="px-8 py-3 rounded-xl bg-[#8fcc60] text-[#1a2e1a] text-sm font-black hover:bg-white transition-colors shadow-lg"
                    >
                        Shop Eco Products →
                    </button>
                    <button
                        onClick={onShopNow}
                        className="px-8 py-3 rounded-xl border-2 border-[#5a9a3a] text-[#8fcc60] text-sm font-black hover:bg-[#5a9a3a] hover:text-white transition-colors"
                    >
                        View All Products
                    </button>
                </div>

                {}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-500">
                    {[
                        ["🚚", "Free shipping over ₹999"],
                        ["🌱", "Every order plants a tree"],
                        ["♻️", "100% certified eco materials"],
                    ].map(([icon, text]) => (
                        <span key={text} className="flex items-center gap-1.5">
                            <span>{icon}</span>
                            <span>{text}</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
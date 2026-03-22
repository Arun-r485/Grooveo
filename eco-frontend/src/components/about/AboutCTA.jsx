







import React from "react";

export default function AboutCTA({ onShopNow, onGetInTouch }) {
    return (
        <section className="relative bg-gradient-to-r from-[#1a2e1a] via-[#2d4a1e] to-[#1a3320] rounded-3xl overflow-hidden px-8 py-12 text-center">

            {}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 75% 40%, rgba(143,204,96,.15) 0%, transparent 55%)",
                }}
            />

            <div className="relative z-10 max-w-xl mx-auto">
                <span className="text-5xl mb-5 block select-none">🌍</span>

                <h2 className="text-2xl font-black text-white mb-3">
                    Ready to Make the Switch?
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    Join 10,000+ businesses already packaging sustainably.
                    It takes 5 minutes to place your first order.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                    <button
                        onClick={onShopNow}
                        className="px-8 py-3 rounded-xl bg-[#8fcc60] text-[#1a2e1a] text-sm font-black hover:bg-white transition-colors shadow-lg"
                    >
                        Browse Products →
                    </button>
                    <button
                        onClick={onGetInTouch}
                        className="px-8 py-3 rounded-xl border-2 border-[#5a9a3a] text-[#8fcc60] text-sm font-black hover:bg-[#5a9a3a] hover:text-white transition-colors"
                    >
                        Talk to Our Team
                    </button>
                </div>

                {}
                <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500">
                    {[
                        ["🚀", "Ships in 24 hours"],
                        ["🔒", "Secure payments"],
                        ["↩️", "30-day returns"],
                        ["🌱", "Plants a tree per order"],
                    ].map(([icon, text]) => (
                        <span key={text} className="flex items-center gap-1.5">
                            <span>{icon}</span>{text}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
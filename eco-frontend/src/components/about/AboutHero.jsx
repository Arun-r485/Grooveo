








import React from "react";

export default function AboutHero({ onShopNow, onViewCarbon }) {
    return (
        <section className="relative bg-gradient-to-br from-[#1a2e1a] via-[#2d4a1e] to-[#1a3320] rounded-3xl overflow-hidden mb-10 px-8 py-16 text-center">

            {}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 50%, rgba(143,204,96,.16) 0%, transparent 50%)," +
                        "radial-gradient(circle at 80% 20%, rgba(90,154,58,.12) 0%, transparent 45%)",
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto">
                {}
                <div className="inline-flex items-center gap-2 bg-[#5a9a3a]/20 border border-[#5a9a3a]/40 rounded-full px-4 py-1.5 mb-6">
                    <span className="text-sm">🌿</span>
                    <span className="text-xs font-bold text-[#8fcc60] uppercase tracking-widest">
                        Our Story
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    We're On a Mission to{" "}
                    <span className="text-[#8fcc60]">End Plastic Packaging</span>
                </h1>

                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    EcoPackStore was born from a simple belief: beautiful packaging
                    shouldn't cost the planet. We make sustainable packaging easy,
                    affordable and beautiful — without compromise.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={onShopNow}
                        className="px-8 py-3 rounded-xl bg-[#8fcc60] text-[#1a2e1a] text-sm font-black hover:bg-white transition-colors shadow-lg"
                    >
                        Shop Our Products →
                    </button>
                    <button
                        onClick={onViewCarbon}
                        className="px-8 py-3 rounded-xl border-2 border-[#5a9a3a] text-[#8fcc60] text-sm font-black hover:bg-[#5a9a3a] hover:text-white transition-colors"
                    >
                        View Our Impact
                    </button>
                </div>
            </div>
        </section>
    );
}





import React from "react";

export default function AboutStory() {
    return (
        <section className="flex flex-col md:flex-row gap-10 items-center mb-12">

            {}
            <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#f0f7ea] border border-[#c8e6b0] rounded-full px-4 py-1.5 mb-5">
                    <span className="text-sm">📖</span>
                    <span className="text-xs font-bold text-[#5a9a3a] uppercase tracking-widest">Our Story</span>
                </div>

                <h2 className="text-3xl font-black text-[#1a2e1a] leading-tight mb-5">
                    From a Problem We{" "}
                    <span className="text-[#5a9a3a]">Couldn't Ignore</span>
                </h2>

                <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
                    <p>
                        In 2019, our founder Arjun Mehta was running a small D2C skincare brand.
                        He was shocked to discover that his packaging — the first thing customers
                        touched — was generating hundreds of kilograms of plastic waste every month.
                    </p>
                    <p>
                        He looked for a reliable, affordable eco-friendly alternative. He found
                        nothing that worked at scale. Suppliers were either too expensive, too slow,
                        or simply greenwashing. So he built EcoPackStore himself.
                    </p>
                    <p>
                        Today we serve 10,000+ businesses across India — from solo makers on
                        Instagram to large D2C brands — all making the switch to packaging that
                        gives back more than it takes.
                    </p>
                </div>

                {}
                <div className="flex flex-wrap gap-2 mt-6">
                    {["Founded 2019", "Bengaluru HQ", "22 cities served", "B-Corp Certified"].map((chip) => (
                        <span
                            key={chip}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#f0f7ea] border border-[#c8e6b0] text-[#2d6a1a]"
                        >
                            {chip}
                        </span>
                    ))}
                </div>
            </div>

            {}
            <div className="flex-shrink-0 flex justify-center">
                <div className="relative">
                    {}
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#f0f7ea] to-[#c8e6b0] flex items-center justify-center shadow-xl border-4 border-white">
                        <span className="text-8xl select-none">🏭</span>
                    </div>

                    {}
                    <div className="absolute -top-3 -right-3 bg-[#5a9a3a] text-white rounded-2xl px-3 py-2 shadow-lg">
                        <div className="text-lg font-black leading-none">6+</div>
                        <div className="text-xs opacity-80">Years</div>
                    </div>

                    {}
                    <div className="absolute -bottom-3 -left-3 bg-white border-2 border-[#c8e6b0] rounded-2xl px-3 py-2 shadow-lg">
                        <div className="text-lg font-black text-[#5a9a3a] leading-none">10K+</div>
                        <div className="text-xs text-gray-400">Customers</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
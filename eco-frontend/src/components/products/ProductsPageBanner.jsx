
import React from "react";

export default function ProductsPageBanner() {
    return (
        <div className="bg-gradient-to-r from-[#1a2e1a] to-[#2d4a1e] rounded-2xl px-7 py-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            {}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-[#8fcc60] uppercase tracking-widest">
                        Eco-Friendly Packaging
                    </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                    All Products
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    12 certified sustainable products · Ships in 24 hrs
                </p>
            </div>

            {}
            <div className="flex items-center gap-6 flex-shrink-0">
                {[
                    { val: "100%", label: "Eco certified" },
                    { val: "2.4M", label: "kg CO₂ saved" },
                    { val: "4.7★", label: "Avg. rating" },
                ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                        <div className="text-lg font-black text-[#8fcc60]">{val}</div>
                        <div className="text-xs text-gray-400">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
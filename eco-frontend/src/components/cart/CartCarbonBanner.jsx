








import React from "react";

export default function CartCarbonBanner({ carbonSaved, onViewImpact }) {
    const trees = Math.max(1, Math.ceil(carbonSaved / 0.02));

    return (
        <div className="flex items-center gap-4 bg-[#f0f7ea] border-2 border-[#c8e6b0] rounded-2xl px-5 py-4 mb-5">

            {}
            <div className="w-10 h-10 rounded-xl bg-[#5a9a3a] flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-xl">🌍</span>
            </div>

            {}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-[#1a2e1a]">
                    This cart saves{" "}
                    <span className="text-[#5a9a3a]">{carbonSaved.toFixed(2)} kg CO₂</span>
                    {" "}vs. plastic packaging
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                    That's equivalent to planting{" "}
                    <span className="font-semibold text-[#5a9a3a]">{trees} tree{trees > 1 ? "s" : ""}</span>
                </p>
            </div>

            {/* CTA */}
            <button
                onClick={onViewImpact}
                className="flex-shrink-0 text-xs font-black text-[#5a9a3a] hover:underline whitespace-nowrap hidden sm:block"
            >
                View Impact →
            </button>
        </div>
    );
}
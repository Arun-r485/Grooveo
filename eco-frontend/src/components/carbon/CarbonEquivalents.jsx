import React from "react";
import { EQUIVALENT_FACTS } from "../../data/carbonData.js";

function formatVal(val) {
    if (val >= 1000) return (val / 1000).toFixed(1) + "k";
    if (val >= 1) return val % 1 === 0 ? val.toString() : val.toFixed(1);
    return val.toFixed(3);
}

export default function CarbonEquivalents({ carbonSaved }) {
    const hasData = carbonSaved > 0;

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-black text-[#1a2e1a]">What Your Savings Equal</h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {hasData
                            ? "Your CO₂ savings translated into everyday terms"
                            : "Add products to cart to see your impact"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {EQUIVALENT_FACTS.map(({ icon, label, multiplier }) => {
                    const val = carbonSaved * multiplier;

                    return (
                        <div
                            key={label}
                            className={`
                flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-300
                ${hasData
                                    ? "bg-white border-[#c8e6b0] hover:border-[#5a9a3a] hover:shadow-md"
                                    : "bg-gray-50 border-gray-100"
                                }
              `}
                        >
                            <span className="text-3xl mb-2 select-none">{icon}</span>

                            <div className={`text-xl font-black tabular-nums leading-tight ${hasData ? "text-[#5a9a3a]" : "text-gray-300"}`}>
                                {hasData ? formatVal(val) : "—"}
                            </div>

                            <div className="text-xs text-gray-500 mt-1 leading-tight font-medium">
                                {label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}






import React from "react";
import { HOW_WE_CALCULATE } from "../../data/carbonData.js";

export default function CarbonHowItWorks() {
    return (
        <section className="mb-8">
            <div className="mb-5">
                <h2 className="text-xl font-black text-[#1a2e1a]">How We Calculate Your Savings</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                    Based on peer-reviewed Life Cycle Assessment (LCA) methodology
                </p>
            </div>

            {}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {HOW_WE_CALCULATE.map(({ icon, title, desc }, i) => (
                    <div
                        key={title}
                        className="bg-white rounded-2xl border border-[#c8e6b0] p-5 shadow-sm hover:border-[#5a9a3a] hover:shadow-md transition-all duration-200"
                    >
                        {}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-[#f0f7ea] border border-[#c8e6b0] flex items-center justify-center text-lg flex-shrink-0">
                                {icon}
                            </div>
                            <div className="w-6 h-6 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                                {i + 1}
                            </div>
                        </div>
                        <h3 className="font-black text-[#1a2e1a] text-sm mb-1.5">{title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>

            {}
            <div className="flex items-start gap-3 bg-[#f0f7ea] border border-[#c8e6b0] rounded-2xl p-4">
                <span className="text-xl flex-shrink-0 mt-0.5">📄</span>
                <div>
                    <p className="text-xs font-bold text-[#1a2e1a] mb-0.5">Data sources & methodology</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Our CO₂ calculations are based on ISO 14040/14044 Life Cycle Assessment standards,
                        ECOINVENT database v3.9, and the UK DEFRA Greenhouse Gas Conversion Factors (2023).
                        Each product's carbon factor is independently verified and updated annually.
                    </p>
                </div>
            </div>
        </section>
    );
}
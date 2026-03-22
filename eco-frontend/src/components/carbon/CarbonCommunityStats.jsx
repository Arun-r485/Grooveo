




import React from "react";
import { COMMUNITY_IMPACT } from "../../data/carbonData.js";

export default function CarbonCommunityStats() {
    return (
        <section className="mb-8">
            <div className="mb-4">
                <h2 className="text-xl font-black text-[#1a2e1a]">Community Impact</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                    What the entire EcoPackStore community has achieved together
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {COMMUNITY_IMPACT.map(({ value, unit, label, icon }) => (
                    <div
                        key={label}
                        className="relative bg-gradient-to-br from-[#1a2e1a] to-[#2d4a1e] rounded-2xl p-5 text-center overflow-hidden border border-[#3a5a2a] shadow-md"
                    >
                        {}
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 50% 0%, rgba(143,204,96,1) 0%, transparent 70%)",
                            }}
                        />

                        <div className="relative z-10">
                            <span className="text-3xl select-none block mb-3">{icon}</span>
                            <div className="text-2xl font-black text-[#8fcc60] leading-none">
                                {value}
                                {unit && <span className="text-base ml-0.5">{unit}</span>}
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5 leading-snug font-medium">{label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
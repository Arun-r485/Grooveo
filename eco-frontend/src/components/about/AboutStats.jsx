




import React from "react";
import { ABOUT_STATS } from "../../data/aboutData.js";

export default function AboutStats() {
    return (
        <section className="bg-white rounded-2xl border border-[#c8e6b0] shadow-sm mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#f0f7ea]">
                {ABOUT_STATS.map(({ value, label }) => (
                    <div key={label} className="px-6 py-6 text-center">
                        <div className="text-3xl font-black text-[#5a9a3a] mb-1">{value}</div>
                        <div className="text-sm text-gray-400 font-medium">{label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
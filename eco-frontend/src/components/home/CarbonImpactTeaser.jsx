

import React from "react";
import { COMMUNITY_STATS } from "../../data/homeData";

export default function CarbonImpactTeaser({ onTrackImpact }) {
    return (
        <section className="bg-sage-whisper py-14">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <div className="text-6xl mb-4 select-none">🌍</div>

                <h2 className="text-3xl font-black text-forest-night mb-3">
                    Your Purchases Are Saving the Planet
                </h2>

                <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                    Every eco package you choose instead of plastic prevents CO₂ emissions.
                    Track your personal carbon savings and watch your real-world impact grow.
                </p>

                {}
                <div className="flex flex-wrap justify-center gap-10 mb-10">
                    {COMMUNITY_STATS.map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <div className="text-3xl font-black text-leaf-green">{value}</div>
                            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onTrackImpact}
                    className="btn btn-lg bg-leaf-green border-leaf-green text-white hover:bg-leaf-dark font-black shadow"
                >
                    Track My Carbon Impact →
                </button>

                <p className="text-xs text-gray-400 mt-4">
                    Impact calculated using peer-reviewed Life Cycle Assessment data
                </p>
            </div>
        </section>
    );
}
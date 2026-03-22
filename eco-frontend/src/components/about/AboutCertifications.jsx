




import React from "react";
import { CERTIFICATIONS } from "../../data/aboutData.js";

export default function AboutCertifications() {
    return (
        <section className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a1e] rounded-3xl p-8 mb-12 shadow-lg">
            <div className="text-center mb-7">
                <h2 className="text-2xl font-black text-white mb-1.5">
                    Certifications & Commitments
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Independent verification that we do what we say
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CERTIFICATIONS.map(({ label, icon, desc }) => (
                    <div
                        key={label}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5a9a3a]/50 rounded-2xl p-4 transition-all duration-200"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl flex-shrink-0">{icon}</span>
                            <span className="font-black text-white text-sm leading-tight">{label}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
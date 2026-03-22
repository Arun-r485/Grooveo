




import React from "react";
import { VALUES } from "../../data/aboutData.js";

export default function AboutValues() {
    return (
        <section className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-[#1a2e1a]">What We Stand For</h2>
                <p className="text-sm text-gray-400 mt-1.5 max-w-lg mx-auto">
                    Four principles that guide every decision we make
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {VALUES.map(({ icon, title, desc }, i) => (
                    <div
                        key={title}
                        className="group relative bg-white rounded-2xl border border-[#c8e6b0] p-6 shadow-sm hover:border-[#5a9a3a] hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                        {}
                        <span className="absolute top-4 right-5 text-4xl font-black text-[#f0f7ea] select-none pointer-events-none">
                            0{i + 1}
                        </span>

                        <div className="relative z-10">
                            {}
                            <div className="w-11 h-11 rounded-2xl bg-[#f0f7ea] border border-[#c8e6b0] flex items-center justify-center text-2xl mb-4 group-hover:bg-[#e0f0d0] transition-colors">
                                {icon}
                            </div>

                            <h3 className="font-black text-[#1a2e1a] text-base mb-2">{title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
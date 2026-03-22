




import React from "react";
import { PRESS } from "../../data/aboutData.js";

export default function AboutPress() {
    return (
        <section className="mb-12">
            <p className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                As seen in
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRESS.map(({ outlet, quote, logo }) => (
                    <div
                        key={outlet}
                        className="bg-white rounded-2xl border border-[#c8e6b0] p-5 shadow-sm hover:border-[#5a9a3a] hover:shadow-md transition-all duration-200 text-center"
                    >
                        {}
                        <div className="text-3xl mb-2">{logo}</div>
                        <p className="font-black text-[#1a2e1a] text-sm mb-2">{outlet}</p>
                        <p className="text-xs text-gray-400 italic leading-relaxed">"{quote}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
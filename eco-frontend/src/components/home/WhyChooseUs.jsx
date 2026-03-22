import React from "react";
import { WHY_FEATURES, CERTIFICATIONS } from "../../data/homeData";

export default function WhyChooseUs() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-14">

            {}
            <div className="text-center mb-10">
                <h2 className="text-2xl font-black text-forest-night">Why Choose EcoPackStore?</h2>
                <p className="text-gray-400 text-sm mt-1 max-w-lg mx-auto">
                    Trusted by 10,000+ businesses — from home bakers to large-scale e-commerce brands
                </p>
            </div>

            {}
            <div className="grid md:grid-cols-3 gap-6">
                {WHY_FEATURES.map(({ icon, title, desc }) => (
                    <div
                        key={title}
                        className="card bg-white shadow-sm border border-gray-100 hover:border-leaf-green hover:shadow-md transition-all duration-200 p-6"
                    >
                        <div className="text-4xl mb-4">{icon}</div>
                        <h3 className="font-black text-forest-night text-base mb-2">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                ))}
            </div>

            {}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
                {CERTIFICATIONS.map((cert) => (
                    <span
                        key={cert}
                        className="badge badge-lg bg-[#e8f5e0] text-[#2d6a1a] border-[#b8dca0] font-bold py-3 px-4"
                    >
                        ✓ {cert}
                    </span>
                ))}
            </div>
        </section>
    );
}
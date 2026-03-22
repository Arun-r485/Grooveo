
import React from "react";
import { TIMELINE } from "../../data/aboutData.js";

export default function AboutTimeline() {
    return (
        <section className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-[#1a2e1a]">Our Journey</h2>
                <p className="text-sm text-gray-400 mt-1.5">From a single idea to 10,000+ businesses</p>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    {}
                    <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#5a9a3a] via-[#c8e6b0] to-[#f0f7ea]" />

                    <div className="space-y-6">
                        {TIMELINE.map((item, i) => {
                            const isLast = i === TIMELINE.length - 1;
                            return (
                                <div key={item.year} className="flex gap-5 items-start">

                                    {}
                                    <div className={`
                    relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center
                    text-lg flex-shrink-0 border-2 shadow-sm
                    ${isLast
                                            ? "bg-[#5a9a3a] border-[#4a8a2a]"
                                            : "bg-white border-[#c8e6b0]"
                                        }
                  `}>
                                        <span>{item.icon}</span>
                                    </div>

                                    {}
                                    <div className={`
                    flex-1 rounded-2xl p-4 border-2 shadow-sm transition-all duration-200 mb-1
                    hover:shadow-md
                    ${isLast
                                            ? "bg-[#f0f7ea] border-[#5a9a3a]"
                                            : "bg-white border-[#e8f5e0] hover:border-[#c8e6b0]"
                                        }
                  `}>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${isLast ? "bg-[#5a9a3a] text-white" : "bg-[#f0f7ea] text-[#5a9a3a]"}`}>
                                                {item.year}
                                            </span>
                                            <h3 className="font-black text-[#1a2e1a] text-sm">{item.title}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
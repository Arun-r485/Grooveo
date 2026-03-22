
import React from "react";
import { TEAM } from "../../data/aboutData.js";

export default function AboutTeam() {
    return (
        <section className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-[#1a2e1a]">The People Behind EcoPackStore</h2>
                <p className="text-sm text-gray-400 mt-1.5 max-w-lg mx-auto">
                    A small team with a big obsession — making sustainable packaging the default
                </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {TEAM.map(({ name, role, emoji, quote, linkedin }) => (
                    <div
                        key={name}
                        className="group bg-white rounded-2xl border border-[#c8e6b0] p-5 shadow-sm hover:border-[#5a9a3a] hover:shadow-lg transition-all duration-200 flex flex-col"
                    >
                        {}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f0f7ea] to-[#c8e6b0] flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-105 transition-transform duration-200 shadow-sm">
                            {emoji}
                        </div>

                        {}
                        <h3 className="font-black text-[#1a2e1a] text-sm text-center">{name}</h3>
                        <p className="text-xs font-semibold text-[#5a9a3a] text-center mb-3">{role}</p>

                        {}
                        <div className="flex-1 relative">
                            {}
                            <span className="text-3xl font-black text-[#c8e6b0] leading-none absolute -top-2 -left-1 select-none">
                                "
                            </span>
                            <p className="text-xs text-gray-500 leading-relaxed pl-3 italic">{quote}</p>
                        </div>

                        {}
                        <a
                            href={linkedin}
                            className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#5a9a3a] transition-colors"
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
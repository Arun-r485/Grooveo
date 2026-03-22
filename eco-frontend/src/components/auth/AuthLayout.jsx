







import React from "react";
import { TRUST_POINTS } from "../../data/authData.js";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f4f7f2] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl border border-[#c8e6b0]">

                {}
                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1a2e1a] via-[#2d4a1e] to-[#1a3320] w-80 flex-shrink-0 p-8 relative overflow-hidden">

                    {}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 30%, rgba(143,204,96,.18) 0%, transparent 55%)," +
                                "radial-gradient(circle at 80% 80%, rgba(90,154,58,.14) 0%, transparent 50%)",
                        }}
                    />

                    <div className="relative z-10">
                        {}
                        <div className="flex items-center gap-2.5 mb-10">
                            <div className="w-9 h-9 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white font-black text-lg">
                                E
                            </div>
                            <span className="text-white font-black text-lg">
                                EcoPack<span className="text-[#8fcc60]">Store</span>
                            </span>
                        </div>

                        {}
                        <h2 className="text-2xl font-black text-white leading-tight mb-3">
                            Pack Smart.<br />
                            <span className="text-[#8fcc60]">Save the Planet.</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Join 10,000+ businesses that have made the switch to eco-friendly packaging.
                        </p>

                        {}
                        <ul className="space-y-3">
                            {TRUST_POINTS.map(({ icon, text }) => (
                                <li key={text} className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-xl bg-[#5a9a3a]/20 border border-[#5a9a3a]/30 flex items-center justify-center text-base flex-shrink-0">
                                        {icon}
                                    </span>
                                    <span className="text-sm text-gray-300">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {}
                    <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4">
                        <p className="text-2xl font-black text-[#8fcc60]">2.4M kg</p>
                        <p className="text-xs text-gray-400 mt-0.5">CO₂ saved by our community</p>
                    </div>
                </div>

                {}
                <div className="flex-1 bg-white p-8 md:p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";

export default function ProductsFilterSidebar({
    categories,
    activeCategory,
    onCategory,
    certifications,
    activeCerts,
    onCertToggle,
    priceMax,
    onPriceMax,
    onReset,
}) {
    const [certOpen, setCertOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);

    const hasFilters =
        activeCategory !== "All" || activeCerts.length > 0 || priceMax < 2000;

    return (
        <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#c8e6b0] overflow-hidden shadow-sm sticky top-24">

                {}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f7ea]">
                    <span className="text-sm font-black text-[#1a2e1a]">Filters</span>
                    {hasFilters && (
                        <button
                            onClick={onReset}
                            className="text-xs font-bold text-[#5a9a3a] hover:text-[#4a8a2a] transition-colors"
                        >
                            Reset all
                        </button>
                    )}
                </div>

                {}
                <div className="px-3 py-3 border-b border-[#f0f7ea]">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider px-1 mb-2">
                        Category
                    </p>
                    <ul className="space-y-0.5">
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => onCategory(cat)}
                                    className={`
                    w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all
                    ${activeCategory === cat
                                            ? "bg-[#5a9a3a] text-white shadow-sm"
                                            : "text-gray-600 hover:bg-[#f0f7ea] hover:text-[#1a2e1a]"
                                        }
                  `}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {}
                <div className="px-3 py-3 border-b border-[#f0f7ea]">
                    <button
                        onClick={() => setCertOpen(!certOpen)}
                        className="flex items-center justify-between w-full text-xs font-black text-gray-400 uppercase tracking-wider px-1 mb-2"
                    >
                        <span>Certifications</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-3.5 h-3.5 transition-transform ${certOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {certOpen && (
                        <ul className="space-y-1 mt-1">
                            {certifications.map((cert) => {
                                const active = activeCerts.includes(cert);
                                return (
                                    <li key={cert}>
                                        <label className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-[#f0f7ea] transition-colors group">
                                            <div
                                                onClick={() => onCertToggle(cert)}
                                                className={`
                          w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all cursor-pointer
                          ${active
                                                        ? "bg-[#5a9a3a] border-[#5a9a3a]"
                                                        : "border-[#c8e6b0] bg-white group-hover:border-[#5a9a3a]"
                                                    }
                        `}
                                            >
                                                {active && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span
                                                onClick={() => onCertToggle(cert)}
                                                className={`text-xs font-semibold cursor-pointer ${active ? "text-[#1a2e1a]" : "text-gray-500"}`}
                                            >
                                                {cert}
                                            </span>
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {}
                <div className="px-3 py-3">
                    <button
                        onClick={() => setPriceOpen(!priceOpen)}
                        className="flex items-center justify-between w-full text-xs font-black text-gray-400 uppercase tracking-wider px-1 mb-2"
                    >
                        <span>Max price</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-3.5 h-3.5 transition-transform ${priceOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {priceOpen && (
                        <div className="px-1">
                            <div className="flex justify-between text-xs text-gray-400 mb-2">
                                <span>₹0</span>
                                <span className="font-bold text-[#1a2e1a]">₹{priceMax.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min={100}
                                max={2000}
                                step={50}
                                value={priceMax}
                                onChange={(e) => onPriceMax(Number(e.target.value))}
                                className="w-full accent-[#5a9a3a] cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-300 mt-1">
                                <span>₹100</span>
                                <span>₹2,000</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
import React from "react";
import { CATEGORIES } from "../../data/homeData";

export default function CategoryGrid({ onCategoryClick }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            {}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-[#1a2e1a]">Shop by Category</h2>
                <button
                    onClick={() => onCategoryClick("All")}
                    className="text-sm font-semibold text-[#5a9a3a] hover:underline"
                >
                    Browse all →
                </button>
            </div>

            {}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {CATEGORIES.map(({ icon, name, count }) => (
                    <button
                        key={name}
                        onClick={() => onCategoryClick(name)}
                        className="group card bg-white shadow-sm border border-gray-100 hover:bg-[#f0f7ea] hover:border-[#5a9a3a] hover:shadow-md transition-all duration-200 p-3 text-center"
                    >
                        <span className="block text-3xl mb-1.5">{icon}</span>
                        <span className="block text-xs font-black text-[#1a2e1a] group-hover:text-[#5a9a3a] leading-tight">
                            {name}
                        </span>
                        <span className="block text-xs text-gray-400 mt-0.5">{count} items</span>
                    </button>
                ))}
            </div>
        </section>
    );
}
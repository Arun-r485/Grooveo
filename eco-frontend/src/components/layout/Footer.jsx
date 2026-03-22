import React from "react";
import { FOOTER_COLS } from "../../data/homeData";

function GlobeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
    );
}

function CurrencyIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
    );
}

function BoxIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M3.375 3C2.34 3 1.5 3.84 1.5 4.875v.75C1.5 6.66 2.34 7.5 3.375 7.5h17.25C21.66 7.5 22.5 6.66 22.5 5.625v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
            <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75a.75.75 0 01.75-.75h4a.75.75 0 010 1.5H10a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
    );
}

function SelectorBtn({ icon, label }) {
    return (
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#3a5a3a] text-gray-400 text-xs hover:border-leaf-green hover:text-gray-200 transition-colors">
            {icon}
            {label}
        </button>
    );
}

export default function Footer({ onNavigate }) {
    return (
        <footer style={{ backgroundColor: "#182e18" }}>

            {}
            <div className="max-w-7xl mx-auto px-8 pt-10 pb-8 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8">
                {FOOTER_COLS.map((col) => (
                    <div key={col.heading}>
                        <p className="text-white font-black text-xs tracking-widest uppercase mb-3">
                            {col.heading}
                        </p>
                        <ul>
                            {col.links.map((link) => (
                                <li key={link}>
                                    <button
                                        onClick={() => onNavigate?.(link)}
                                        className="text-gray-400 text-sm leading-[1.9rem] block text-left w-full hover:text-green-200 hover:underline transition-colors bg-transparent border-0 p-0 cursor-pointer"
                                    >
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {}
            <div className="border-t" style={{ borderColor: "#2a4a2a" }} />

            {}
            <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">

                {}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-6 h-6 rounded-sm bg-[#4a8a30] flex items-center justify-center">
                        <BoxIcon />
                    </div>
                    <span className="text-white font-black text-sm tracking-tight">EcoPackStore</span>
                </div>

                {}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    {["Conditions of Use", "Privacy Notice", "Your Ads Privacy Choices"].map((l) => (
                        <a key={l} href="#" className="hover:text-green-300 transition-colors whitespace-nowrap">
                            {l}
                        </a>
                    ))}
                    <span className="text-gray-600 whitespace-nowrap">
                        © 2024, EcoPackStore.com, Inc. or its affiliates
                    </span>
                </div>

                {}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <SelectorBtn icon={<GlobeIcon />} label="English" />
                    <SelectorBtn icon={<CurrencyIcon />} label="INR – Indian Rupee" />
                </div>
            </div>

            {}
            <div
                className="border-t py-3 text-center"
                style={{ borderColor: "#1e3c1e", backgroundColor: "#121f12" }}
            >
                <p className="text-xs" style={{ color: "#4a784a" }}>
                    Made with recycled pixels for a better tomorrow.
                </p>
            </div>
        </footer>
    );
}
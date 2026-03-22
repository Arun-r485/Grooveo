
import React, { useState } from "react";

const METHODS = [
    { id: 1, type: "UPI", label: "GPay", detail: "arjun@okicici", icon: "📱", default: true },
    { id: 2, type: "Card", label: "HDFC Visa", detail: "•••• •••• •••• 4521", icon: "💳", default: false },
    { id: 3, type: "NetBanking", label: "SBI NetBanking", detail: "State Bank of India", icon: "🏦", default: false },
];

export default function PaymentMethodsPage({ navigate }) {
    const [methods, setMethods] = useState(METHODS);
    const [adding, setAdding] = useState(null); 

    const setDefault = id => setMethods(prev => prev.map(m => ({ ...m, default: m.id === id })));
    const remove = id => setMethods(prev => prev.filter(m => m.id !== id));

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Payment Methods</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Payment Methods</h1>

            <div className="space-y-3 mb-6">
                {methods.map(m => (
                    <div key={m.id} className={`bg-white rounded-2xl border-2 p-5 shadow-sm flex items-center gap-4 ${m.default ? "border-[#5a9a3a]" : "border-gray-100"}`}>
                        <div className="w-12 h-12 rounded-xl bg-[#f0f7ea] border border-[#c8e6b0] flex items-center justify-center text-2xl flex-shrink-0">{m.icon}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-black text-[#1a2e1a] text-sm">{m.label}</p>
                                {m.default && <span className="text-xs font-bold px-2 py-0.5 bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0] rounded-full">Default</span>}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{m.detail}</p>
                            <p className="text-xs text-[#5a9a3a] font-semibold mt-0.5">{m.type}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            {!m.default && (
                                <button onClick={() => setDefault(m.id)} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-[#5a9a3a] hover:text-[#5a9a3a] transition-colors">Set Default</button>
                            )}
                            <button onClick={() => remove(m.id)} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-red-100 text-[#d94f2e] hover:bg-red-50 transition-colors">Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-dashed border-[#c8e6b0] p-5">
                <p className="font-black text-[#1a2e1a] text-sm mb-3">Add Payment Method</p>
                <div className="flex flex-wrap gap-2">
                    {[{ id: "upi", label: "+ Add UPI" }, { id: "card", label: "+ Add Card" }, { id: "netbanking", label: "+ Net Banking" }].map(b => (
                        <button key={b.id} onClick={() => setAdding(b.id)}
                            className="text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-[#c8e6b0] text-[#5a9a3a] hover:bg-[#f0f7ea] hover:border-[#5a9a3a] transition-colors">
                            {b.label}
                        </button>
                    ))}
                </div>
                {adding && (
                    <div className="mt-4 p-4 bg-[#f0f7ea] rounded-xl border border-[#c8e6b0]">
                        <p className="text-xs font-black text-[#1a2e1a] mb-3">Add {adding.toUpperCase()} — coming soon!</p>
                        <button onClick={() => setAdding(null)} className="text-xs font-bold text-[#5a9a3a] hover:underline">Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}
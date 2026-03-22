
import React, { useState } from "react";

const LISTINGS = [
    { id: 1, name: "Recycled Kraft Bags – Bulk 500 Pack", emoji: "🛍️", price: 3499, stock: 120, sales: 45, status: "Active" },
    { id: 2, name: "Custom Compostable Mailers – 250 Pack", emoji: "🟫", price: 2199, stock: 0, sales: 23, status: "Out of stock" },
];

const STATS = [
    { label: "Total Sales", value: "₹1,24,500", icon: "💰" },
    { label: "Orders This Month", value: "68", icon: "📦" },
    { label: "Active Listings", value: "2", icon: "🏷️" },
    { label: "Avg. Rating", value: "4.7 ★", icon: "⭐" },
];

export default function SellerAccountPage({ navigate }) {
    const [applied, setApplied] = useState(false);
    const [isSeller] = useState(false); 

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Seller Account</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Seller Account</h1>

            {!isSeller ? (
                applied ? (
                    <div className="bg-[#f0f7ea] border-2 border-[#5a9a3a] rounded-2xl p-8 text-center">
                        <p className="text-5xl mb-4">🎉</p>
                        <p className="text-xl font-black text-[#1a2e1a]">Application Received!</p>
                        <p className="text-sm text-gray-500 mt-2">Our team will review your application within 3–5 business days.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a1e] rounded-2xl p-8 text-white">
                            <h2 className="text-xl font-black mb-2">Start Selling on EcoPackStore</h2>
                            <p className="text-gray-300 text-sm mb-6">Reach 10,000+ eco-conscious businesses looking for sustainable packaging.</p>
                            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                                {[["0%", "Commission for first 3 months"], ["₹0", "No listing fees"], ["24hr", "Seller support response"]].map(([v, l]) => (
                                    <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
                                        <p className="text-2xl font-black text-[#8fcc60]">{v}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{l}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setApplied(true)} className="px-8 py-3 rounded-xl bg-[#8fcc60] text-[#1a2e1a] font-black hover:bg-white transition-colors">
                                Apply to Sell →
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[{ icon: "📦", t: "Easy Listing", d: "List your eco products in minutes with our guided form" },
                            { icon: "💰", t: "Fast Payouts", d: "Weekly payouts directly to your bank account" },
                            { icon: "📊", t: "Analytics", d: "Real-time sales, traffic and carbon savings dashboard" },
                            { icon: "🌿", t: "Eco Badge", d: "Get verified with our Eco Certified Seller badge" }].map(b => (
                                <div key={b.t} className="bg-white rounded-2xl border border-[#c8e6b0] p-4 shadow-sm flex items-start gap-3">
                                    <span className="text-2xl">{b.icon}</span>
                                    <div><p className="font-black text-[#1a2e1a] text-sm">{b.t}</p><p className="text-xs text-gray-400 mt-0.5">{b.d}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ) : (
                <div className="space-y-6">
                    {}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {STATS.map(s => (
                            <div key={s.label} className="bg-white rounded-2xl border border-[#c8e6b0] p-4 text-center shadow-sm">
                                <span className="text-2xl block mb-1">{s.icon}</span>
                                <p className="text-xl font-black text-[#5a9a3a]">{s.value}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                    {}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h2 className="font-black text-[#1a2e1a]">Your Listings</h2>
                            <button className="text-xs font-black px-4 py-2 rounded-xl bg-[#5a9a3a] text-white hover:bg-[#4a8a2a]">+ Add Listing</button>
                        </div>
                        {LISTINGS.map(l => (
                            <div key={l.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0">
                                <div className="w-12 h-12 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-2xl">{l.emoji}</div>
                                <div className="flex-1"><p className="font-semibold text-[#1a2e1a] text-sm">{l.name}</p><p className="text-xs text-gray-400">₹{l.price} · {l.sales} sold</p></div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${l.status === "Active" ? "bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0]" : "bg-red-50 text-[#d94f2e] border border-red-200"}`}>{l.status}</span>
                                <button className="text-xs font-bold text-[#5a9a3a] hover:underline">Edit</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
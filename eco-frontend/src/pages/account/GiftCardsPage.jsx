
import React, { useState } from "react";

const MY_CARDS = [
    { id: 1, code: "ECO-GIFT-4821", balance: 500, expiresOn: "31 Mar 2026" },
    { id: 2, code: "ECO-GIFT-7765", balance: 1000, expiresOn: "30 Jun 2026" },
];

const DENOMINATIONS = [250, 500, 1000, 2000, 5000];

export default function GiftCardsPage({ navigate }) {
    const [redeemCode, setRedeemCode] = useState("");
    const [redeemed, setRedeemed] = useState(false);
    const [selected, setSelected] = useState(null);
    const [purchased, setPurchased] = useState(false);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Gift Cards</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Gift Cards</h1>

            {}
            {MY_CARDS.length > 0 && (
                <div className="mb-8">
                    <h2 className="font-black text-[#1a2e1a] mb-3">Your Gift Cards</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {MY_CARDS.map(c => (
                            <div key={c.id} className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a1e] rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#5a9a3a]/20 -translate-y-1/2 translate-x-1/2" />
                                <p className="text-[#8fcc60] font-black text-xs uppercase tracking-widest mb-3">EcoPackStore Gift Card</p>
                                <p className="text-3xl font-black mb-1">₹{c.balance.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 mb-3">Balance remaining</p>
                                <p className="text-xs font-mono text-gray-300">{c.code}</p>
                                <p className="text-xs text-gray-400 mt-1">Expires {c.expiresOn}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
                <h2 className="font-black text-[#1a2e1a] mb-3">Redeem a Gift Card</h2>
                {redeemed ? (
                    <div className="flex items-center gap-3 p-3 bg-[#f0f7ea] border border-[#c8e6b0] rounded-xl">
                        <span className="text-xl">✅</span>
                        <p className="text-sm font-bold text-[#2d6a1a]">₹500 added to your account!</p>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input value={redeemCode} onChange={e => setRedeemCode(e.target.value)} placeholder="Enter gift card code"
                            className="flex-1 text-sm border-2 border-[#c8e6b0] rounded-xl px-4 py-2.5 outline-none focus:border-[#5a9a3a]" />
                        <button onClick={() => redeemCode && setRedeemed(true)}
                            className="px-5 py-2.5 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] transition-colors">
                            Apply
                        </button>
                    </div>
                )}
            </div>

            {}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-black text-[#1a2e1a] mb-1">Buy a Gift Card</h2>
                <p className="text-xs text-gray-400 mb-4">Give the gift of eco-friendly packaging 🌿</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {DENOMINATIONS.map(d => (
                        <button key={d} onClick={() => setSelected(d)}
                            className={`px-4 py-2 rounded-xl text-sm font-black border-2 transition-all ${selected === d ? "bg-[#5a9a3a] border-[#5a9a3a] text-white" : "border-[#c8e6b0] text-[#1a2e1a] hover:border-[#5a9a3a]"}`}>
                            ₹{d.toLocaleString()}
                        </button>
                    ))}
                </div>
                {purchased ? (
                    <div className="p-3 bg-[#f0f7ea] border border-[#c8e6b0] rounded-xl text-center">
                        <p className="text-sm font-black text-[#2d6a1a]">🎉 Gift card purchased! Check your email.</p>
                    </div>
                ) : (
                    <button onClick={() => selected && setPurchased(true)} disabled={!selected}
                        className="w-full py-3 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                        {selected ? `Buy ₹${selected.toLocaleString()} Gift Card →` : "Select an amount"}
                    </button>
                )}
            </div>
        </div>
    );
}
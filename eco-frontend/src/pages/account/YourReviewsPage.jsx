
import React, { useState } from "react";

const REVIEWED = [
    { id: 1, name: "Kraft Mailer Box – 200 Pack", emoji: "📦", rating: 5, date: "15 Jan 2025", review: "Excellent quality — sturdy, eco-friendly and ships perfectly. Will reorder.", helpful: 12 },
    { id: 2, name: "Seeded Gift Tags – 100 Pack", emoji: "🌱", rating: 4, date: "02 Jan 2025", review: "Customers absolutely love receiving these. Great conversation starter about sustainability.", helpful: 8 },
];

const TO_REVIEW = [
    { id: 3, name: "Mushroom Packaging Filler – 2kg", emoji: "🍄", orderId: "ECO-108532", orderDate: "28 Dec 2024" },
    { id: 4, name: "Bamboo Tissue Paper – 200 Sheets", emoji: "🎋", orderId: "ECO-105001", orderDate: "10 Dec 2024" },
];

function Stars({ rating, onChange }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
                <button key={s}
                    onMouseEnter={() => onChange && setHover(s)}
                    onMouseLeave={() => onChange && setHover(0)}
                    onClick={() => onChange?.(s)}
                    className={`text-xl transition-colors ${s <= (hover || rating) ? "text-[#e8a020]" : "text-gray-200"} ${onChange ? "cursor-pointer" : "cursor-default"}`}>
                    ★
                </button>
            ))}
        </div>
    );
}

export default function YourReviewsPage({ navigate }) {
    const [writing, setWriting] = useState(null);
    const [draftRating, setDraftRating] = useState(0);
    const [draftText, setDraftText] = useState("");
    const [submitted, setSubmitted] = useState({});

    const submit = id => {
        if (!draftRating) return;
        setSubmitted(p => ({ ...p, [id]: true }));
        setWriting(null); setDraftRating(0); setDraftText("");
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Your Reviews</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Your Reviews</h1>

            {}
            {TO_REVIEW.filter(p => !submitted[p.id]).length > 0 && (
                <div className="mb-8">
                    <h2 className="font-black text-[#1a2e1a] mb-3">Waiting for your review</h2>
                    <div className="space-y-3">
                        {TO_REVIEW.filter(p => !submitted[p.id]).map(p => (
                            <div key={p.id}>
                                <div className="bg-[#f0f7ea] border border-[#c8e6b0] rounded-2xl p-4 flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-white border border-[#e8f5e0] flex items-center justify-center text-3xl flex-shrink-0">{p.emoji}</div>
                                    <div className="flex-1">
                                        <p className="font-black text-[#1a2e1a] text-sm">{p.name}</p>
                                        <p className="text-xs text-gray-400">Order {p.orderId} · {p.orderDate}</p>
                                    </div>
                                    <button onClick={() => setWriting(p.id)} className="text-xs font-black px-4 py-2 rounded-xl bg-[#5a9a3a] text-white hover:bg-[#4a8a2a] transition-colors flex-shrink-0">
                                        Write Review
                                    </button>
                                </div>
                                {writing === p.id && (
                                    <div className="bg-white rounded-2xl border-2 border-[#5a9a3a] p-4 mt-2 space-y-3">
                                        <Stars rating={draftRating} onChange={setDraftRating} />
                                        <textarea value={draftText} onChange={e => setDraftText(e.target.value)} rows={3} placeholder="Share your experience with this product…"
                                            className="w-full text-sm border-2 border-[#c8e6b0] rounded-xl px-4 py-2.5 outline-none focus:border-[#5a9a3a] resize-none" />
                                        <div className="flex gap-2">
                                            <button onClick={() => submit(p.id)} disabled={!draftRating} className="flex-1 py-2 rounded-xl bg-[#5a9a3a] text-white text-xs font-black disabled:opacity-40 hover:bg-[#4a8a2a] transition-colors">Submit Review</button>
                                            <button onClick={() => setWriting(null)} className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-400 hover:bg-gray-50">Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {}
            <div>
                <h2 className="font-black text-[#1a2e1a] mb-3">Your Past Reviews</h2>
                <div className="space-y-4">
                    {REVIEWED.map(r => (
                        <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-2xl border border-[#e8f5e0] flex-shrink-0">{r.emoji}</div>
                                <div className="flex-1">
                                    <p className="font-black text-[#1a2e1a] text-sm">{r.name}</p>
                                    <Stars rating={r.rating} />
                                    <p className="text-xs text-gray-400 mt-0.5">{r.date}</p>
                                </div>
                                <button className="text-xs font-bold text-[#5a9a3a] hover:underline flex-shrink-0">Edit</button>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed italic">"{r.review}"</p>
                            <p className="text-xs text-gray-400 mt-3">👍 {r.helpful} people found this helpful</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}









import React, { useState } from "react";
import { PROMO_CODES } from "../../data/cartData.js";

export default function CartPromoCode({ appliedCode, onApply, onRemove }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        const code = input.trim().toUpperCase();
        if (!code) { setError("Enter a promo code."); return; }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        setLoading(false);

        if (PROMO_CODES[code]) {
            onApply(code, PROMO_CODES[code]);
            setInput("");
            setError("");
        } else {
            setError("Invalid code. Try ECO10, GREEN20 or FIRSTeco.");
        }
    };

    if (appliedCode) {
        const data = PROMO_CODES[appliedCode.toUpperCase()] || {};
        return (
            <div className="flex items-center gap-3 p-3 bg-[#f0f7ea] border-2 border-[#5a9a3a] rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#5a9a3a] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                    <p className="text-xs font-black text-[#1a2e1a]">
                        <span className="font-mono bg-white border border-[#c8e6b0] rounded px-1.5 py-0.5 mr-1.5">
                            {appliedCode.toUpperCase()}
                        </span>
                        applied — {data.label}
                    </p>
                </div>
                <button
                    onClick={onRemove}
                    className="text-xs text-[#d94f2e] font-bold hover:underline"
                >
                    Remove
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className={`flex rounded-xl overflow-hidden border-2 transition-colors ${error ? "border-[#d94f2e]" : "border-[#c8e6b0] focus-within:border-[#5a9a3a]"}`}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleApply()}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2.5 text-sm text-gray-700 bg-white outline-none placeholder-gray-400"
                />
                <button
                    onClick={handleApply}
                    disabled={loading}
                    className="px-5 py-2.5 bg-[#1a2e1a] text-white text-sm font-black hover:bg-[#2d4a1e] transition-colors disabled:opacity-60 flex-shrink-0"
                >
                    {loading ? (
                        <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : "Apply"}
                </button>
            </div>
            {error && (
                <p className="text-xs text-[#d94f2e] font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
            <p className="text-xs text-gray-400">Try: ECO10 · GREEN20 · FIRSTeco</p>
        </div>
    );
}
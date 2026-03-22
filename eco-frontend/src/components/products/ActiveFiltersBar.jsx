
import React from "react";

function Chip({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1.5 bg-[#f0f7ea] border border-[#c8e6b0] text-[#2d6a1a] text-xs font-bold px-3 py-1.5 rounded-full">
            {label}
            <button
                onClick={onRemove}
                className="w-3.5 h-3.5 rounded-full bg-[#5a9a3a] text-white flex items-center justify-center hover:bg-[#4a8a2a] transition-colors leading-none text-xs"
            >
                ×
            </button>
        </span>
    );
}

export default function ActiveFiltersBar({
    activeCategory,
    activeCerts,
    priceMax,
    onRemoveCategory,
    onRemoveCert,
    onResetPrice,
    onReset,
}) {
    const hasCategory = activeCategory !== "All";
    const hasCerts = activeCerts.length > 0;
    const hasPrice = priceMax < 2000;
    const hasAny = hasCategory || hasCerts || hasPrice;

    if (!hasAny) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-5 p-3 bg-[#f0f7ea] rounded-xl border border-[#c8e6b0]">
            <span className="text-xs font-black text-gray-400 mr-1">Active:</span>

            {hasCategory && (
                <Chip label={activeCategory} onRemove={onRemoveCategory} />
            )}
            {activeCerts.map((cert) => (
                <Chip key={cert} label={cert} onRemove={() => onRemoveCert(cert)} />
            ))}
            {hasPrice && (
                <Chip label={`Under ₹${priceMax.toLocaleString()}`} onRemove={onResetPrice} />
            )}

            <button
                onClick={onReset}
                className="ml-auto text-xs font-bold text-[#5a9a3a] hover:text-[#4a8a2a] transition-colors"
            >
                Clear all
            </button>
        </div>
    );
}
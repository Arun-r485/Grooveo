














import React, { useRef } from "react";

function TrashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}

export default function CartItem({ item, onIncrement, onDecrement, onRemove, onSaveForLater }) {
    const stepperRef = useRef(null);

    const triggerPop = () => {
        const el = stepperRef.current;
        if (!el) return;
        el.classList.remove("stepper-pop");
        void el.offsetWidth;
        el.classList.add("stepper-pop");
    };

    const discount = item.originalPrice
        ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
        : 0;

    const lineTotal = item.price * item.qty;
    const lineSavings = item.originalPrice ? (item.originalPrice - item.price) * item.qty : 0;
    const itemCO2 = (item.carbonSaved || 0) * item.qty;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 hover:border-[#c8e6b0] transition-colors p-4 flex gap-4">

            {}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-4xl flex-shrink-0 border border-[#e8f5e0]">
                {item.emoji}
            </div>

            {}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">

                {}
                {item.badges?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {item.badges.map((b) => (
                            <span key={b} className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0]">
                                {b}
                            </span>
                        ))}
                    </div>
                )}

                {}
                <h3 className="font-black text-[#1a2e1a] text-sm leading-snug">{item.name}</h3>

                {}
                <p className="text-xs text-[#5a9a3a] font-semibold">
                    🌱 {itemCO2.toFixed(2)} kg CO₂ saved (×{item.qty} units)
                </p>

                {}
                <p className="text-xs text-[#5a9a3a] font-semibold flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    In Stock
                </p>

                {}
                <div className="flex items-center flex-wrap gap-3 mt-1">

                    {}
                    <div
                        ref={stepperRef}
                        className="flex items-stretch h-9 rounded-full overflow-hidden border-2 border-[#5a9a3a] shadow-sm w-28"
                    >
                        <button
                            onClick={() => { onDecrement(item.id); triggerPop(); }}
                            title={item.qty === 1 ? "Remove" : "Decrease"}
                            className="w-10 flex items-center justify-center bg-[#5a9a3a] hover:bg-[#3f7a28] active:bg-[#2d5a1e] text-white transition-colors flex-shrink-0"
                        >
                            {item.qty === 1 ? <TrashIcon /> : <span className="text-lg font-black leading-none">−</span>}
                        </button>
                        <div className="flex-1 flex items-center justify-center bg-white text-[#1a2e1a] font-black text-sm border-x-2 border-[#5a9a3a] tabular-nums">
                            {item.qty}
                        </div>
                        <button
                            onClick={() => { onIncrement(item.id); triggerPop(); }}
                            title="Increase"
                            className="w-10 flex items-center justify-center bg-[#5a9a3a] hover:bg-[#3f7a28] active:bg-[#2d5a1e] text-white transition-colors flex-shrink-0"
                        >
                            <span className="text-lg font-black leading-none">+</span>
                        </button>
                    </div>

                    {}
                    <div className="flex items-center gap-1 text-xs font-semibold">
                        <button
                            onClick={() => onRemove(item.id)}
                            className="px-3 py-1.5 rounded-lg text-[#d94f2e] hover:bg-red-50 transition-colors"
                        >
                            Remove
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => onSaveForLater(item.id)}
                            className="px-3 py-1.5 rounded-lg text-[#5a9a3a] hover:bg-[#f0f7ea] transition-colors"
                        >
                            Save for later
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="px-3 py-1.5 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {}
            <div className="flex-shrink-0 text-right flex flex-col items-end gap-0.5">
                <span className="text-lg font-black text-[#1a2e1a]">₹{lineTotal.toLocaleString()}</span>
                {lineSavings > 0 && (
                    <>
                        <span className="text-xs text-gray-400 line-through">₹{(item.originalPrice * item.qty).toLocaleString()}</span>
                        <span className="text-xs font-black text-[#d94f2e]">Save ₹{lineSavings.toLocaleString()}</span>
                    </>
                )}
                {discount > 0 && (
                    <span className="mt-1 text-xs bg-[#d94f2e] text-white font-black px-2 py-0.5 rounded-full">
                        -{discount}%
                    </span>
                )}
                <span className="text-xs text-gray-400 mt-1">₹{item.price.toLocaleString()}/unit</span>
            </div>
        </div>
    );
}
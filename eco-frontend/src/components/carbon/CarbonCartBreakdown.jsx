









import React from "react";

export default function CarbonCartBreakdown({ cart, onShopNow }) {
    const hasItems = cart.length > 0;
    const maxPerItem = hasItems
        ? Math.max(...cart.map((i) => (i.carbonSaved || 0) * i.qty))
        : 1;

    const totalCO2 = cart.reduce((s, i) => s + (i.carbonSaved || 0) * i.qty, 0);

    return (
        <section className="bg-white rounded-3xl border border-[#c8e6b0] p-6 mb-8 shadow-sm">

            {}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-black text-[#1a2e1a]">Your Cart Breakdown</h2>
                    <p className="text-sm text-gray-400 mt-0.5">CO₂ saved per product in your current cart</p>
                </div>
                {hasItems && (
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Cart total</p>
                        <p className="text-lg font-black text-[#5a9a3a]">{totalCO2.toFixed(2)} kg</p>
                    </div>
                )}
            </div>

            {!hasItems ? (
                
                <div className="flex flex-col items-center py-10 text-center">
                    <span className="text-5xl mb-3 select-none">🛒</span>
                    <p className="font-black text-[#1a2e1a] mb-1">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mb-5">
                        Add eco-friendly products to see their CO₂ impact here.
                    </p>
                    <button
                        onClick={onShopNow}
                        className="px-6 py-2.5 rounded-xl bg-[#5a9a3a] text-white text-sm font-bold hover:bg-[#4a8a2a] transition-colors"
                    >
                        Shop Products →
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {cart.map((item) => {
                        const itemCO2 = (item.carbonSaved || 0) * item.qty;
                        const barPercent = maxPerItem > 0 ? (itemCO2 / maxPerItem) * 100 : 0;
                        const totalShare = totalCO2 > 0 ? (itemCO2 / totalCO2) * 100 : 0;

                        return (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-[#f9fdf6] border border-[#e8f5e0] hover:border-[#c8e6b0] transition-colors">

                                {}
                                <div className="w-10 h-10 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-xl flex-shrink-0">
                                    {item.emoji}
                                </div>

                                {}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                        <p className="text-sm font-bold text-[#1a2e1a] leading-tight line-clamp-1">
                                            {item.name}
                                        </p>
                                        <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                                            ×{item.qty}
                                        </span>
                                    </div>

                                    {}
                                    <div className="w-full h-2 bg-[#e8f5e0] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${barPercent}%`,
                                                background: "linear-gradient(90deg, #5a9a3a, #8fcc60)",
                                            }}
                                        />
                                    </div>
                                </div>

                                {}
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-black text-[#5a9a3a]">
                                        {itemCO2.toFixed(2)} kg
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {totalShare.toFixed(0)}% of total
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {}
                    <div className="flex items-center justify-between pt-3 border-t border-[#e8f5e0] px-1">
                        <p className="text-sm font-black text-[#1a2e1a]">Total CO₂ saved</p>
                        <p className="text-lg font-black text-[#5a9a3a]">{totalCO2.toFixed(2)} kg</p>
                    </div>
                </div>
            )}
        </section>
    );
}
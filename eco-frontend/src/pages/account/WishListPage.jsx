
import React, { useState } from "react";

const WISH_PRODUCTS = [
    { id: 1, name: "Cork Wine Shipper – 2 Bottle", emoji: "🍷", price: 649, originalPrice: 849, carbonSaved: 1.3, inStock: true },
    { id: 2, name: "Glass Jar Crate – 12 Pack", emoji: "🫙", price: 799, originalPrice: 999, carbonSaved: 1.0, inStock: false },
    { id: 3, name: "Honeycomb Paper Wrap – 3m Roll", emoji: "🍯", price: 279, originalPrice: 349, carbonSaved: 0.7, inStock: true },
    { id: 4, name: "Custom Eco Stamp Set", emoji: "🖊️", price: 199, originalPrice: 249, carbonSaved: 0.1, inStock: true },
];

export default function WishListPage({ navigate, onAddToCart }) {
    const [items, setItems] = useState(WISH_PRODUCTS);
    const [added, setAdded] = useState({});

    const remove = id => setItems(prev => prev.filter(i => i.id !== id));
    const addCart = item => {
        onAddToCart?.(item);
        setAdded(p => ({ ...p, [item.id]: true }));
        setTimeout(() => setAdded(p => ({ ...p, [item.id]: false })), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Your Wish List</span>
            </div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-[#1a2e1a]">Your Wish List <span className="text-gray-400 font-normal text-lg">({items.length})</span></h1>
                <button onClick={() => navigate("products")} className="text-sm font-bold text-[#5a9a3a] hover:underline">+ Add Products</button>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-5xl mb-4">❤️</p>
                    <p className="text-lg font-black text-[#1a2e1a] mb-2">Your wish list is empty</p>
                    <button onClick={() => navigate("products")} className="px-6 py-2.5 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a]">Browse Products</button>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map(item => {
                        const disc = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
                        return (
                            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 hover:border-[#5a9a3a] hover:shadow-md transition-all p-4 flex flex-col">
                                <div className="relative h-32 bg-[#f0f7ea] rounded-xl flex items-center justify-center text-5xl mb-3 border border-[#e8f5e0]">
                                    {item.emoji}
                                    {disc > 0 && <span className="absolute top-2 left-2 text-xs font-black bg-[#d94f2e] text-white px-2 py-0.5 rounded-full">-{disc}%</span>}
                                    {!item.inStock && <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center"><span className="text-xs font-black text-gray-400">Out of Stock</span></div>}
                                </div>
                                <h3 className="font-black text-[#1a2e1a] text-sm leading-tight mb-1 flex-1">{item.name}</h3>
                                <p className="text-xs text-[#5a9a3a] font-semibold mb-2">🌱 {item.carbonSaved} kg CO₂/unit</p>
                                <div className="flex items-baseline gap-1.5 mb-3">
                                    <span className="text-lg font-black text-[#5a9a3a]">₹{item.price.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex gap-2">
                                    {item.inStock ? (
                                        <button onClick={() => addCart(item)}
                                            className={`flex-1 py-2 rounded-xl text-xs font-black transition-colors ${added[item.id] ? "bg-green-600 text-white" : "bg-[#5a9a3a] text-white hover:bg-[#4a8a2a]"}`}>
                                            {added[item.id] ? "✓ Added!" : "Add to Cart"}
                                        </button>
                                    ) : (
                                        <button className="flex-1 py-2 rounded-xl text-xs font-black border-2 border-dashed border-[#5a9a3a] text-[#5a9a3a] hover:bg-[#f0f7ea]">Notify Me</button>
                                    )}
                                    <button onClick={() => remove(item.id)} className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-400 hover:text-[#d94f2e] hover:border-red-200 transition-colors">✕</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../eco/orders.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const STATUS_COLORS = {
    Delivered: "#5a9a3a",
    Processing: "#2c7bb5",
    Shipped: "#2c7bb5",
    Returned: "#e8a020",
    Cancelled: "#d94f2e",
    Pending: "#e8a020",
};

const FILTERS = ["All Orders", "Last 30 days", "Last 3 months", "Last 6 months", "Archived"];

export default function YourOrdersPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All Orders");
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState(null);

    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrders().then(r => r.data.orders),
        enabled: !!user,
    });

    if (!user) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12">
                    <h1 className="text-2xl font-black text-[#1a2e1a] mb-4">Sign in to view your orders</h1>
                    <p className="text-gray-500 mb-6">Please sign in to access your order history and track your purchases.</p>
                    <Link
                        to="/auth"
                        className="inline-block px-6 py-3 rounded-xl bg-[#5a9a3a] text-white font-bold hover:bg-[#4a8a2a] transition-colors"
                    >
                        Sign In →
                    </Link>
                </div>
            </div>
        );
    }

    const visible = (orders || []).filter(o =>
        o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        (o.id && o.id.toLowerCase().includes(search.toLowerCase())) ||
        o.items?.some(i => i.name?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            {}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("/account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Your Orders</span>
            </div>

            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Your Orders</h1>

            {}
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-5 animate-pulse">
                            <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
                            <div className="h-3 bg-gray-100 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-red-100">
                    <p className="text-red-600 font-bold mb-4">Unable to load your orders.</p>
                    <button onClick={() => window.location.reload()} className="btn btn-ghost btn-sm">Try Again</button>
                </div>
            ) : (
                <>
                    {}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="flex gap-1 flex-wrap">
                            {FILTERS.map(f => (
                                <button key={f} onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filter === f ? "bg-[#5a9a3a] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-[#5a9a3a]"}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div className="flex ml-auto rounded-xl overflow-hidden border border-[#c8e6b0] bg-white focus-within:border-[#5a9a3a] transition-colors sm:w-64">
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…"
                                className="flex-1 px-4 py-2 text-sm outline-none text-gray-700 placeholder-gray-400" />
                            <div className="px-3 flex items-center text-[#5a9a3a]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {visible.map(order => {
                            const orderId = order.orderId || order.id;
                            const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : order.date;
                            const statusColor = STATUS_COLORS[order.status] || "#5a9a3a";

                            return (
                                <div key={orderId} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-[#c8e6b0] transition-colors">
                                    {}
                                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
                                        <div className="flex flex-wrap gap-5 text-xs">
                                            <div><p className="text-gray-400 uppercase tracking-wider">Order placed</p><p className="font-black text-[#1a2e1a]">{orderDate}</p></div>
                                            <div><p className="text-gray-400 uppercase tracking-wider">Total</p><p className="font-black text-[#1a2e1a]">₹{(order.total || 0).toLocaleString()}</p></div>
                                            <div><p className="text-gray-400 uppercase tracking-wider">Order ID</p><p className="font-black text-[#1a2e1a]">{orderId}</p></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black px-3 py-1 rounded-full border-2"
                                                style={{ color: statusColor, borderColor: statusColor, backgroundColor: statusColor + "18" }}>
                                                {order.status}
                                            </span>
                                            <button onClick={() => setExpanded(expanded === orderId ? null : orderId)}
                                                className="text-xs font-bold text-[#5a9a3a] hover:underline">
                                                {expanded === orderId ? "Hide ▲" : "Details ▼"}
                                            </button>
                                        </div>
                                    </div>

                                    {}
                                    <div className="px-5 py-4 flex flex-wrap gap-4">
                                        {order.items.map((item, idx) => (
                                            <div key={item.name || idx} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-2xl border border-[#e8f5e0]">{item.emoji || "📦"}</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1a2e1a] line-clamp-1 max-w-[180px]">{item.name}</p>
                                                    <p className="text-xs text-gray-400">Qty: {item.qty} · ₹{(item.price || 0).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {}
                                    {expanded === orderId && (
                                        <div className="px-5 pb-4 border-t border-gray-50 pt-3 space-y-3">
                                            <p className="text-xs text-[#5a9a3a] font-semibold">🌱 Saved {(order.totalCO2Saved || order.co2 || 0).toFixed(1)} kg CO₂ on this order</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["Track Package", "Return Items", "Buy Again", "Leave Review", "Get Invoice", "Contact Support"].map(a => (
                                                    <button key={a} className="text-xs font-bold px-4 py-2 rounded-xl border-2 border-[#c8e6b0] text-[#1a2e1a] hover:bg-[#f0f7ea] hover:border-[#5a9a3a] transition-all">{a}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
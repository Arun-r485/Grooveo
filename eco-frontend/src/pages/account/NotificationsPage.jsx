
import React, { useState } from "react";

const NOTIF_SETTINGS = [
    { id: "orders", group: "Orders", label: "Order updates", desc: "Shipping, delivery and return status", on: true },
    { id: "deals", group: "Orders", label: "Deals & offers", desc: "Flash sales, promo codes and discounts", on: true },
    { id: "wishlist", group: "Orders", label: "Wish list availability", desc: "When out-of-stock items are available", on: true },
    { id: "eco_tips", group: "Eco", label: "Weekly eco tips", desc: "Sustainability news and packaging advice", on: false },
    { id: "impact", group: "Eco", label: "Impact milestones", desc: "When you unlock a new eco milestone", on: true },
    { id: "newsletter", group: "Marketing", label: "Newsletter", desc: "Product launches and company news", on: false },
    { id: "sms", group: "Marketing", label: "SMS notifications", desc: "Text messages for critical updates", on: true },
    { id: "whatsapp", group: "Marketing", label: "WhatsApp updates", desc: "Order updates via WhatsApp", on: false },
];

const RECENT_NOTIFS = [
    { id: 1, icon: "📦", title: "Order ECO-112847 delivered", time: "2 hours ago", read: false },
    { id: 2, icon: "🌱", title: "You unlocked Green Champion badge!", time: "1 day ago", read: false },
    { id: 3, icon: "🔖", title: "Cork Wine Shipper is back in stock", time: "3 days ago", read: true },
    { id: 4, icon: "🎉", title: "20% off — use code GREEN20", time: "5 days ago", read: true },
];

export default function NotificationsPage({ navigate }) {
    const [settings, setSettings] = useState(NOTIF_SETTINGS);
    const [notifs, setNotifs] = useState(RECENT_NOTIFS);
    const toggle = id => setSettings(prev => prev.map(s => s.id === id ? { ...s, on: !s.on } : s));
    const markRead = id => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

    const groups = [...new Set(settings.map(s => s.group))];

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Notifications</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Notifications</h1>

            {}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-[#1a2e1a]">Recent</h2>
                    <button onClick={() => setNotifs(p => p.map(n => ({ ...n, read: true })))} className="text-xs font-bold text-[#5a9a3a] hover:underline">Mark all read</button>
                </div>
                <div className="space-y-2">
                    {notifs.map(n => (
                        <div key={n.id} onClick={() => markRead(n.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${n.read ? "" : "bg-[#f0f7ea] border border-[#c8e6b0]"} hover:bg-[#f0f7ea]`}>
                            <span className="text-2xl flex-shrink-0">{n.icon}</span>
                            <div className="flex-1">
                                <p className={`text-sm ${n.read ? "text-gray-600" : "font-bold text-[#1a2e1a]"}`}>{n.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 rounded-full bg-[#5a9a3a] flex-shrink-0 mt-1.5" />}
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-black text-[#1a2e1a] mb-4">Notification Preferences</h2>
                {groups.map(group => (
                    <div key={group} className="mb-5 last:mb-0">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-50">{group}</p>
                        <div className="space-y-3">
                            {settings.filter(s => s.group === group).map(s => (
                                <div key={s.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-[#1a2e1a]">{s.label}</p>
                                        <p className="text-xs text-gray-400">{s.desc}</p>
                                    </div>
                                    <button onClick={() => toggle(s.id)}
                                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${s.on ? "bg-[#5a9a3a]" : "bg-gray-200"}`}>
                                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${s.on ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
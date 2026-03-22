










import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const ACCOUNT_TILES = [
    { icon: "📦", title: "Your Orders", desc: "Track, return, or buy again", bg: "#f0f7ea", border: "#c8e6b0", page: "orders" },
    { icon: "🔒", title: "Login & Security", desc: "Edit password and account details", bg: "#f0f4ff", border: "#c7d2fe", page: "login-security" },
    { icon: "📍", title: "Your Addresses", desc: "Edit addresses for orders and gifts", bg: "#fff7ed", border: "#fed7aa", page: "addresses" },
    { icon: "💳", title: "Payment Methods", desc: "Edit or add payment methods", bg: "#fdf2f8", border: "#f5d0fe", page: "payments" },
    { icon: "❤️", title: "Your Wish List", desc: "View your saved products", bg: "#fff1f2", border: "#fecdd3", page: "wishlist" },
    { icon: "🌍", title: "Carbon Dashboard", desc: "Track your eco impact", bg: "#f0f7ea", border: "#c8e6b0", page: "carbon" },
    { icon: "🔔", title: "Notifications", desc: "Manage your alerts and emails", bg: "#fffbeb", border: "#fde68a", page: "notifications" },
    { icon: "🏢", title: "Business Account", desc: "Manage your B2B account", bg: "#f0f9ff", border: "#bae6fd", page: "business" },
    { icon: "🎁", title: "Gift Cards", desc: "Redeem or buy gift cards", bg: "#fdf4ff", border: "#e9d5ff", page: "gift-cards" },
    { icon: "🌿", title: "Eco Preferences", desc: "Manage your sustainability settings", bg: "#f0f7ea", border: "#c8e6b0", page: "eco-prefs" },
    { icon: "⭐", title: "Your Reviews", desc: "Products you've reviewed", bg: "#fffbeb", border: "#fde68a", page: "reviews" },
    { icon: "📊", title: "Seller Account", desc: "Manage your listings", bg: "#f0f4ff", border: "#c7d2fe", page: "seller" },
];

const RECENT_ORDERS = [
    {
        id: "ECO-112847",
        date: "12 Jan 2025",
        status: "Delivered",
        statusColor: "#5a9a3a",
        total: 2148,
        items: [
            { name: "Kraft Mailer Box – 200 Pack", emoji: "📦", qty: 1, price: 1299 },
            { name: "Seeded Gift Tags – 100 Pack", emoji: "🌱", qty: 1, price: 249 },
            { name: "Biodegradable Bubble Wrap – 5m Roll", emoji: "💨", qty: 1, price: 349 },
        ],
        co2Saved: 1.5,
    },
    {
        id: "ECO-108532",
        date: "28 Dec 2024",
        status: "Delivered",
        statusColor: "#5a9a3a",
        total: 599,
        items: [{ name: "Mushroom Packaging Filler – 2kg", emoji: "🍄", qty: 1, price: 599 }],
        co2Saved: 1.5,
    },
    {
        id: "ECO-105001",
        date: "10 Dec 2024",
        status: "Returned",
        statusColor: "#e8a020",
        total: 449,
        items: [{ name: "Bamboo Tissue Paper – 200 Sheets", emoji: "🎋", qty: 1, price: 449 }],
        co2Saved: 0.4,
    },
];



function ProfileCard({ user, onSignOut }) {
    return (
        <div className="bg-white rounded-2xl border border-[#c8e6b0] p-6 flex items-start gap-5 shadow-sm">
            {}
            <div className="w-16 h-16 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white font-black text-2xl flex-shrink-0 shadow-md">
                {user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
            </div>

            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-[#1a2e1a]">{user.name}</h2>
                <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0]">
                        🌿 Eco Member
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0]">
                        🌱 Green Champion
                    </span>
                </div>
            </div>

            <button
                onClick={onSignOut}
                className="flex-shrink-0 text-xs font-bold text-[#d94f2e] hover:underline"
            >
                Sign Out
            </button>
        </div>
    );
}

function AccountTiles() {
    const navigate = useNavigate();
    return (
        <section>
            <h2 className="text-lg font-black text-[#1a2e1a] mb-4">Your Account</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {ACCOUNT_TILES.map(({ icon, title, desc, bg, border, page }) => (
                    <button
                        key={title}
                        onClick={() => page && navigate(page)}
                        className="text-left p-4 rounded-2xl border-2 hover:shadow-md transition-all duration-200 group"
                        style={{ backgroundColor: bg, borderColor: border }}
                    >
                        <span className="text-3xl block mb-2">{icon}</span>
                        <p className="font-black text-[#1a2e1a] text-sm leading-tight group-hover:text-[#5a9a3a] transition-colors">
                            {title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-snug">{desc}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}

function RecentOrders() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(null);

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-[#1a2e1a]">Recent Orders</h2>
                <button
                    onClick={() => navigate("/products")}
                    className="text-sm font-bold text-[#5a9a3a] hover:underline"
                >
                    View all orders →
                </button>
            </div>

            <div className="space-y-3">
                {RECENT_ORDERS.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-[#c8e6b0] transition-colors">

                        {}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Order placed</p>
                                    <p className="text-sm font-bold text-[#1a2e1a]">{order.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
                                    <p className="text-sm font-bold text-[#1a2e1a]">₹{order.total.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                                    <p className="text-sm font-bold text-[#1a2e1a]">{order.id}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-xs font-black px-3 py-1 rounded-full border-2" style={{ color: order.statusColor, borderColor: order.statusColor, backgroundColor: order.statusColor + "15" }}>
                                    {order.status}
                                </span>
                                <button
                                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                                    className="text-xs font-bold text-[#5a9a3a] hover:underline"
                                >
                                    {expanded === order.id ? "Hide ▲" : "Details ▼"}
                                </button>
                            </div>
                        </div>

                        {}
                        <div className="px-5 py-3 flex items-center gap-3 flex-wrap">
                            {order.items.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-[#f0f7ea] flex items-center justify-center text-xl border border-[#e8f5e0]">
                                        {item.emoji}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#1a2e1a] line-clamp-1 max-w-[140px]">{item.name}</p>
                                        <p className="text-xs text-gray-400">Qty: {item.qty} · ₹{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {}
                        {expanded === order.id && (
                            <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1.5 text-[#5a9a3a] font-semibold">
                                        🌱 Saved {order.co2Saved} kg CO₂
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["Track Package", "Return Items", "Buy Again", "Leave Review", "Get Invoice"].map((action) => (
                                        <button
                                            key={action}
                                            className="text-xs font-bold px-4 py-2 rounded-xl border-2 border-[#c8e6b0] text-[#1a2e1a] hover:bg-[#f0f7ea] hover:border-[#5a9a3a] transition-all"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

function EcoStats() {
    return (
        <section className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a1e] rounded-2xl p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌍</span>
                <h2 className="text-lg font-black">Your Eco Impact</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { val: "3.4 kg", label: "CO₂ saved" },
                    { val: "170", label: "Plastic bags avoided" },
                    { val: "3", label: "Orders placed" },
                    { val: "🌳 170", label: "Trees equivalent" },
                ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                        <p className="text-xl font-black text-[#8fcc60]">{val}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}


export default function AccountPage({
    user, onSignOut }) {
    const navigate = useNavigate();
    if (!user) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <p className="text-5xl mb-4">🔒</p>
                <h2 className="text-2xl font-black text-[#1a2e1a] mb-2">You're not signed in</h2>
                <p className="text-gray-400 mb-6">Sign in to view your account, orders and eco impact.</p>
                <button
                    onClick={() => navigate("/auth")}
                    className="px-8 py-3 rounded-xl bg-[#5a9a3a] text-white font-black hover:bg-[#4a8a2a] transition-colors"
                >
                    Sign In →
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

            {}
            <ProfileCard user={user} onSignOut={onSignOut} />

            {}
            <EcoStats />

            {}
            <AccountTiles />

            {}
            <RecentOrders />
        </div>
    );
}
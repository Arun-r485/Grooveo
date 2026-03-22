

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/carbon", label: "🌱 Carbon Saved" },
    { path: "/about", label: "About" },
];

const RECENT_ORDERS = [
    { id: 1, name: "Kraft Mailer Box – 200 Pack", emoji: "📦", price: 1299 },
    { id: 2, name: "Seeded Gift Tags – 100 Pack", emoji: "🌱", price: 249 },
    { id: 3, name: "Biodegradable Bubble Wrap – 5m Roll", emoji: "💨", price: 349 },
];

const YOUR_LISTS = [
    { label: "Shopping List", path: "/account/wishlist" },
    { label: "Create a Wish List", path: "/account/wishlist" },
    { label: "Wish from Any Website", path: "/account/wishlist" },
    { label: "Explore Showroom", path: "/products" },
];

const ACCOUNT_LINKS = [
    { label: "Switch Accounts", icon: "🔄", path: "/account" },
    { label: "Sign Out", icon: "🚪", signOut: true },
    null,
    { label: "Your Account", icon: "👤", path: "/account" },
    { label: "Your Orders", icon: "📦", path: "/account/orders" },
    { label: "Your Wish List", icon: "❤️", path: "/account/wishlist" },
    { label: "Carbon Impact", icon: "🌍", path: "/carbon" },
    { label: "Your Recommendations", icon: "⭐", path: "/account" },
    { label: "Recalls & Safety Alerts", icon: "⚠️", path: "/account" },
    null,
    { label: "Your Subscriptions", icon: "🔔", path: "/account/notifications" },
    { label: "Memberships & Programs", icon: "🏅", path: "/account" },
    { label: "Your Seller Account", icon: "🏪", path: "/account/seller" },
    { label: "Eco Certification Hub", icon: "♻️", path: "/account/eco-prefs" },
    { label: "Register for Business", icon: "🏢", path: "/account/business" },
];


function ProfileDropdown({ user, onSignOut }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const leaveTimer = useRef(null);

    const handleMouseEnter = () => { clearTimeout(leaveTimer.current); setOpen(true); };
    const handleMouseLeave = () => { leaveTimer.current = setTimeout(() => setOpen(false), 200); };

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => { document.removeEventListener("mousedown", handler); clearTimeout(leaveTimer.current); };
    }, []);

    const initials = user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

    const go = (path) => { navigate(path); setOpen(false); };

    return (
        <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            {}
            <button onClick={() => go("/account")}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[#2d4a1e] transition-colors group">
                <div className="w-8 h-8 rounded-full bg-[#5a9a3a] border-2 border-[#8fcc60] flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                    {initials}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none">
                    <span className="text-[#8fcc60] text-xs font-semibold truncate max-w-[100px]">Hi, {user.name.split(" ")[0]}</span>
                    <span className="text-white text-xs font-black">Account ▾</span>
                </div>
            </button>

            {}
            {open && (
                <div className="absolute right-0 top-full z-[999] pt-1">
                    <div className="w-[700px] max-w-[96vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex">

                        {}
                        <div className="w-56 flex-shrink-0 border-r border-gray-100 p-4 bg-gray-50">
                            <p className="font-black text-[#1a2e1a] text-sm mb-0.5">Buy it again</p>
                            <button onClick={() => go("/account/orders")} className="text-xs text-[#5a9a3a] hover:underline font-semibold mb-4 block">
                                View All &amp; Manage
                            </button>
                            <div className="space-y-3">
                                {RECENT_ORDERS.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2.5">
                                        <div className="w-12 h-12 rounded-xl bg-[#f0f7ea] border border-[#c8e6b0] flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-700 line-clamp-2 leading-tight mb-1">{item.name}</p>
                                            <p className="text-xs font-black text-[#5a9a3a]">₹{item.price.toLocaleString()}</p>
                                            <button onClick={() => go("/products")}
                                                className="mt-1 text-xs bg-[#e8a020] text-[#1a2e1a] font-black px-2.5 py-1 rounded-full hover:bg-[#d09010] transition-colors">
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {}
                        <div className="w-52 flex-shrink-0 border-r border-gray-100 p-4">
                            <p className="font-black text-[#1a2e1a] text-sm mb-3">Your Lists</p>
                            <ul className="space-y-0.5">
                                {YOUR_LISTS.map((item) => (
                                    <li key={item.label}>
                                        <button onClick={() => go(item.path)}
                                            className="w-full text-left px-2 py-2 rounded-lg text-sm text-gray-600 hover:bg-[#f0f7ea] hover:text-[#1a2e1a] transition-colors">
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {}
                        <div className="flex-1 p-4 overflow-y-auto max-h-[420px]">
                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white font-black text-sm flex-shrink-0">{initials}</div>
                                <div><p className="font-black text-[#1a2e1a] text-sm">{user.name}</p><p className="text-xs text-gray-400">{user.email}</p></div>
                            </div>
                            <p className="font-black text-[#1a2e1a] text-sm mb-2">Your Account</p>
                            <ul className="space-y-0.5">
                                {ACCOUNT_LINKS.map((item, i) => {
                                    if (!item) return <li key={i} className="border-t border-gray-100 my-1.5" />;
                                    return (
                                        <li key={item.label}>
                                            <button
                                                onClick={() => { if (item.signOut) { onSignOut(); setOpen(false); navigate("/"); } else go(item.path); }}
                                                className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors
                          ${item.signOut ? "text-[#d94f2e] hover:bg-red-50" : "text-gray-600 hover:bg-[#f0f7ea] hover:text-[#1a2e1a]"}`}>
                                                <span className="text-base w-5 flex-shrink-0 leading-none">{item.icon}</span>
                                                {item.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default function Header({ cartCount, user, setUser }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) =>
        path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

    const handleSignOut = () => { setUser(null); navigate("/"); };

    return (
        <header className="sticky top-0 z-50">
            <div className="bg-[#1a2e1a]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

                    {}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-9 h-9 bg-[#5a9a3a] rounded-full flex items-center justify-center text-white font-black text-base">E</div>
                        <span className="text-white font-black text-lg hidden sm:block tracking-tight">
                            EcoPack<span className="text-[#8fcc60]">Store</span>
                        </span>
                    </Link>

                    {}
                    <div className="flex-1 hidden md:flex">
                        <div className="flex w-full rounded-lg overflow-hidden border border-[#3a5a2a] focus-within:border-[#8fcc60] transition-colors">
                            <input type="text" placeholder="Search eco packaging..."
                                className="flex-1 bg-white text-gray-800 text-sm px-4 py-2 outline-none placeholder-gray-400" />
                            <button onClick={() => navigate("/products")}
                                className="bg-[#5a9a3a] hover:bg-[#4a8a2a] active:bg-[#3a7a1a] transition-colors px-4 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {}
                    <div className="flex items-center gap-1 flex-shrink-0">

                        {}
                        <nav className="hidden xl:flex items-center gap-1 mr-2">
                            {NAV_LINKS.map(({ path, label }) => (
                                <Link key={path} to={path}
                                    className={`px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap transition-colors
                    ${isActive(path) ? "text-[#8fcc60]" : "text-gray-300 hover:text-white"}`}>
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden xl:block w-px h-8 bg-[#2d4a1e] mx-1" />

                        {}
                        {user ? (
                            <ProfileDropdown user={user} onSignOut={handleSignOut} />
                        ) : (
                            <Link to="/auth" className="hidden sm:flex flex-col items-end px-3 py-1.5 rounded-md hover:bg-[#2d4a1e] transition-colors group">
                                <span className="text-gray-400 text-xs font-normal group-hover:text-gray-300 leading-tight">Hello, Sign in</span>
                                <span className="text-white font-black text-sm leading-tight">Account ▾</span>
                            </Link>
                        )}

                        {}
                        <Link to="/cart" className="relative flex items-center px-3 py-1.5 rounded-md hover:bg-[#2d4a1e] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-yellow-400 text-[#1a2e1a] text-xs font-black rounded-full flex items-center justify-center px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden p-2 rounded-md hover:bg-[#2d4a1e] transition-colors ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {menuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                </div>

                {}
                <div className="md:hidden px-4 pb-3">
                    <div className="flex w-full rounded-lg overflow-hidden border border-[#3a5a2a]">
                        <input type="text" placeholder="Search eco packaging..."
                            className="flex-1 bg-white text-gray-800 text-sm px-4 py-2 outline-none placeholder-gray-400" />
                        <button className="bg-[#5a9a3a] hover:bg-[#4a8a2a] transition-colors px-4 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {}
                {menuOpen && (
                    <div className="xl:hidden bg-[#1e381e] border-t border-[#2d4a1e] px-4 py-3">
                        <nav className="flex flex-col gap-1">
                            {NAV_LINKS.map(({ path, label }) => (
                                <Link key={path} to={path} onClick={() => setMenuOpen(false)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors
                    ${isActive(path) ? "bg-[#2d4a1e] text-[#8fcc60]" : "text-gray-300 hover:bg-[#2d4a1e] hover:text-white"}`}>
                                    {label}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <div className="border-t border-[#2d4a1e] my-1" />
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <div className="w-8 h-8 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white font-black text-xs">
                                            {user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-sm">{user.name}</p>
                                            <p className="text-gray-400 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link to="/account" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:bg-[#2d4a1e] hover:text-white transition-colors">👤 Your Account</Link>
                                    <Link to="/carbon" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:bg-[#2d4a1e] hover:text-white transition-colors">🌍 Carbon Impact</Link>
                                    <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="text-left px-4 py-2.5 rounded-lg text-sm font-bold text-[#d94f2e] hover:bg-red-900/20 transition-colors">🚪 Sign Out</button>
                                </>
                            ) : (
                                <Link to="/auth" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:bg-[#2d4a1e] hover:text-white transition-colors">👤 Sign In / Account</Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>

            {}
            <div className="bg-[#2d4a1e] py-1.5 text-center text-xs text-[#a8d880] tracking-wide">
                🌿 Free shipping over ₹999 &nbsp;&nbsp;·&nbsp;&nbsp;
                🌱 Every order plants a tree &nbsp;&nbsp;·&nbsp;&nbsp;
                ♻️ 100% compostable
            </div>
        </header>
    );
}
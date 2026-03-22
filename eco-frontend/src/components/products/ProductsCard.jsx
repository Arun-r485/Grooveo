import React, { useRef, useState } from "react";

function TrashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );
}


function NotifyMe() {
    const [state, setState] = useState("idle"); 
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!email.trim() || !email.includes("@")) {
            setError("Enter a valid email address.");
            return;
        }
        setError("");
        setState("done");
    };

    if (state === "done") {
        return (
            <div className="mt-2 flex flex-col items-center gap-2 py-3 px-4 rounded-xl bg-[#f0f7ea] border-2 border-[#5a9a3a]">
                <div className="w-8 h-8 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white">
                    <CheckIcon />
                </div>
                <p className="text-xs font-bold text-[#1a2e1a] text-center">You're on the list!</p>
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                    We'll email you the moment this is back in stock.
                </p>
            </div>
        );
    }

    if (state === "input") {
        return (
            <div className="mt-2 flex flex-col gap-2 p-3 rounded-xl bg-[#f9fdf6] border-2 border-[#5a9a3a]">
                {}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#5a9a3a] flex items-center justify-center text-white flex-shrink-0">
                        <BellIcon />
                    </div>
                    <p className="text-xs font-bold text-[#1a2e1a]">Get back-in-stock alert</p>
                </div>

                {}
                <div className={`flex rounded-lg overflow-hidden border-2 transition-colors ${error ? "border-[#d94f2e]" : "border-[#c8e6b0] focus-within:border-[#5a9a3a]"}`}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="your@email.com"
                        className="flex-1 px-3 py-2 text-xs text-gray-700 bg-white outline-none placeholder-gray-300"
                        autoFocus
                    />
                </div>

                {}
                {error && (
                    <p className="text-xs text-[#d94f2e] font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}

                {}
                <div className="flex gap-2">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-2 rounded-lg bg-[#5a9a3a] text-white text-xs font-bold hover:bg-[#4a8a2a] active:bg-[#3a7a1a] transition-colors"
                    >
                        Notify Me
                    </button>
                    <button
                        onClick={() => { setState("idle"); setEmail(""); setError(""); }}
                        className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-xs font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <p className="text-xs text-gray-400 text-center">No spam. One email only.</p>
            </div>
        );
    }

    
    return (
        <button
            onClick={() => setState("input")}
            className="
        mt-2 w-full flex items-center justify-center gap-2
        py-2.5 rounded-xl text-sm font-bold
        bg-white border-2 border-dashed border-[#5a9a3a]
        text-[#5a9a3a] hover:bg-[#f0f7ea] hover:border-solid
        active:bg-[#e8f5e0] transition-all duration-200
        group
      "
        >
            <span className="group-hover:animate-bounce">
                <BellIcon />
            </span>
            Notify Me When Available
        </button>
    );
}


export default function ProductsCard({
    product,
    cartQty,
    onAddToCart,
    onIncrement,
    onDecrement,
}) {
    const stepperRef = useRef(null);
    const inCart = cartQty > 0;

    const triggerPop = () => {
        const el = stepperRef.current;
        if (!el) return;
        el.classList.remove("stepper-pop");
        void el.offsetWidth;
        el.classList.add("stepper-pop");
    };

    const handleAdd = (e) => { e.stopPropagation(); onAddToCart(product); };
    const handleInc = (e) => { e.stopPropagation(); onIncrement(product.id); triggerPop(); };
    const handleDec = (e) => { e.stopPropagation(); onDecrement(product.id); triggerPop(); };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <article className={`
      flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden
      transition-all duration-200 group
      ${product.inStock
                ? "border-gray-100 hover:border-[#5a9a3a] hover:shadow-lg"
                : "border-gray-100"
            }
    `}>

            {}
            <div className={`relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0 ${product.inStock ? "bg-[#f0f7ea]" : "bg-gray-50"}`}>
                <span className={`text-6xl select-none transition-transform duration-300 ${product.inStock ? "group-hover:scale-110" : "grayscale opacity-50"}`}>
                    {product.emoji}
                </span>

                {}
                {discount > 0 && product.inStock && (
                    <span className="absolute top-2.5 left-2.5 bg-[#d94f2e] text-white text-xs font-black px-2 py-0.5 rounded-full">
                        -{discount}%
                    </span>
                )}

                {}
                {inCart && (
                    <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#5a9a3a] flex items-center justify-center shadow-md">
                        <CheckIcon />
                    </span>
                )}

                {}
                {!product.inStock && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-800/70 backdrop-blur-sm py-1.5 text-center">
                        <span className="text-xs font-bold text-white tracking-wide uppercase">Out of Stock</span>
                    </div>
                )}
            </div>

            {}
            <div className="flex flex-col flex-1 p-4 gap-2">

                {}
                {product.badges?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {product.badges.map((b) => (
                            <span key={b} className={`text-xs font-bold px-2 py-0.5 rounded-full border ${product.inStock ? "bg-[#f0f7ea] text-[#2d6a1a] border-[#c8e6b0]" : "bg-gray-100 text-gray-400 border-gray-200"}`}>
                                {b}
                            </span>
                        ))}
                    </div>
                )}

                {}
                <h3 className={`font-black text-sm leading-snug line-clamp-2 flex-shrink-0 ${product.inStock ? "text-[#1a2e1a]" : "text-gray-400"}`}>
                    {product.name}
                </h3>

                {}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                    {product.desc}
                </p>

                {}
                <div className="flex items-center gap-1.5">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? (product.inStock ? "text-[#e8a020]" : "text-gray-300") : "text-gray-200"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-500">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {}
                <div className="flex items-center gap-2">
                    <span className={`text-lg font-black ${product.inStock ? "text-[#5a9a3a]" : "text-gray-400"}`}>
                        ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                    {discount > 0 && product.inStock && (
                        <span className="text-xs font-black text-[#d94f2e] ml-auto">
                            Save {discount}%
                        </span>
                    )}
                </div>

                {}
                <div className="flex items-center justify-between text-xs">
                    <span className={product.inStock ? "text-[#5a9a3a] font-semibold" : "text-gray-400"}>
                        🌱 {product.carbonSaved} kg CO₂/unit
                    </span>
                    <span className="text-gray-400">MOQ: {product.moq} units</span>
                </div>

                {}
                {!product.inStock ? (
                    <NotifyMe />
                ) : !inCart ? (
                    <button
                        onClick={handleAdd}
                        className="mt-1 w-full py-2.5 rounded-xl text-sm font-black bg-[#5a9a3a] text-white hover:bg-[#4a8a2a] active:bg-[#3a7a1a] transition-colors shadow-sm"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div ref={stepperRef} className="mt-1">
                        <div className="flex items-stretch w-full h-10 rounded-xl overflow-hidden border-2 border-[#5a9a3a] shadow-sm">
                            <button
                                onClick={handleDec}
                                title={cartQty === 1 ? "Remove from cart" : "Decrease quantity"}
                                className="w-11 flex items-center justify-center bg-[#5a9a3a] hover:bg-[#3f7a28] active:bg-[#2d5a1e] text-white transition-colors flex-shrink-0"
                            >
                                {cartQty === 1 ? <TrashIcon /> : <span className="text-xl font-black leading-none">−</span>}
                            </button>
                            <div className="flex-1 flex items-center justify-center bg-white text-[#1a2e1a] font-black text-sm tabular-nums border-x-2 border-[#5a9a3a]">
                                {cartQty}
                            </div>
                            <button
                                onClick={handleInc}
                                title="Increase quantity"
                                className="w-11 flex items-center justify-center bg-[#5a9a3a] hover:bg-[#3f7a28] active:bg-[#2d5a1e] text-white transition-colors flex-shrink-0"
                            >
                                <span className="text-xl font-black leading-none">+</span>
                            </button>
                        </div>
                        <p className="text-center text-xs text-[#5a9a3a] font-bold mt-1.5">
                            ₹{(product.price * cartQty).toLocaleString()} total
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
}
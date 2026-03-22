




import React, { useRef } from "react";


function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
        </svg>
    );
}


function InCartBadge() {
    return (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-leaf-green flex items-center justify-center shadow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
            </svg>
        </span>
    );
}

export default function ProductCard({
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
        <article className="card bg-white shadow-sm border border-gray-100 hover:border-leaf-green hover:shadow-lg transition-all duration-200 group">

            {}
            <figure className="relative bg-sage-whisper h-36 flex items-center justify-center text-5xl select-none rounded-t-2xl overflow-hidden">
                <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                    {product.emoji}
                </span>

                {}
                {discount > 0 && (
                    <span className="absolute top-2 left-2 badge badge-error badge-sm text-white font-black">
                        -{discount}%
                    </span>
                )}

                {}
                {inCart && <InCartBadge />}
            </figure>

            {}
            <div className="card-body p-3 gap-1.5">

                {}
                {product.badges?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {product.badges.map((b) => (
                            <span
                                key={b}
                                className="badge badge-xs bg-[#e8f5e0] text-[#3a7a1a] border-0 font-bold"
                            >
                                {b}
                            </span>
                        ))}
                    </div>
                )}

                {}
                <h3 className="font-black text-forest-night text-sm leading-tight line-clamp-2">
                    {product.name}
                </h3>

                {}
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">
                        {"★".repeat(Math.floor(product.rating))}
                        <span className="text-gray-200">
                            {"★".repeat(5 - Math.floor(product.rating))}
                        </span>
                    </span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {}
                <div className="flex items-baseline gap-1.5">
                    <span className="text-leaf-green font-black text-base">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {}
                <p className="text-xs text-leaf-green font-semibold">
                    🌱 Saves {product.carbonSaved} kg CO₂/unit
                </p>

                {}
                {!inCart ? (
                    
                    <button
                        onClick={handleAdd}
                        className="btn btn-xs mt-1.5 w-full bg-leaf-green border-leaf-green text-white hover:bg-leaf-dark font-black transition-all"
                    >
                        Add to Cart
                    </button>
                ) : (
                    
                    <div ref={stepperRef} className="mt-1.5 w-full">
                        <div className="flex items-stretch w-full h-9 rounded-full overflow-hidden border-2 border-leaf-green shadow-sm">

                            {}
                            <button
                                onClick={handleDec}
                                title={cartQty === 1 ? "Remove from cart" : "Decrease quantity"}
                                className="w-10 flex-shrink-0 flex items-center justify-center bg-leaf-green hover:bg-[#3f7a28] active:bg-[#2d5a1e] text-white transition-colors"
                            >
                                {cartQty === 1 ? <TrashIcon /> : <span className="text-lg font-black leading-none">−</span>}
                            </button>

                            {}
                            <div className="flex-1 flex items-center justify-center bg-white text-forest-night font-black text-sm tabular-nums select-none border-x-2 border-leaf-green">
                                {cartQty}
                            </div>

                            {}
                            <button
                                onClick={handleInc}
                                title="Increase quantity"
                                className="w-10 flex-shrink-0 flex items-center justify-center bg-leaf-green hover:bg-[#3f7a28] active:bg-[#2d5a1e] text-white transition-colors"
                            >
                                <span className="text-lg font-black leading-none">+</span>
                            </button>
                        </div>

                        {}
                        <p className="text-center text-xs text-leaf-green font-bold mt-1">
                            ₹{(product.price * cartQty).toLocaleString()} total
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
}
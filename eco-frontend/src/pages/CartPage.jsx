import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


import { useCart } from "../hooks/useCart.js";
import { useAuth } from "../context/AuthContext.jsx";
import { calculateTotals } from "../utils/orderMath.js";
import { DELIVERY_OPTIONS } from "../data/cartData.js";


import CartEmpty from "../components/cart/CartEmpty.jsx";
import CartCarbonBanner from "../components/cart/CartCarbonBanner.jsx";
import CartItem from "../components/cart/CartItem.jsx";
import CartSavedItems from "../components/cart/CartSavedItems.jsx";
import CartPromoCode from "../components/cart/CartPromoCode.jsx";
import CartDeliveryOptions from "../components/cart/CartDeliveryOptions.jsx";
import CartOrderSummary from "../components/cart/CartOrderSummary.jsx";
import CartSuggestedProducts from "../components/cart/CartSuggestedProducts.jsx";

export default function CartPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    
    const { cart, update, remove, clear } = useCart();

    
    const [savedItems, setSavedItems] = useState([]); 
    const [delivery, setDelivery] = useState("standard");
    const [promoCode, setPromoCode] = useState(null);
    const [promoData, setPromoData] = useState(null);

    
    const { subtotal, tax, total } = calculateTotals(cart);

    const carbonSaved = useMemo(() =>
        cart.reduce((s, i) => s + (i.carbonSaved || 0) * i.qty, 0),
        [cart]);

    const selectedDelivery = DELIVERY_OPTIONS.find((o) => o.id === delivery);
    const deliveryCost = selectedDelivery
        ? (selectedDelivery.free_above !== null && subtotal >= selectedDelivery.free_above)
            ? 0
            : selectedDelivery.price
        : 0;

    
    const handleIncrement = (id) => {
        const item = cart.find(i => (i.product?._id || i.product) === id);
        if (item) update.mutate({ productId: id, qty: item.qty + 1 });
    };

    const handleDecrement = (id) => {
        const item = cart.find(i => (i.product?._id || i.product) === id);
        if (item && item.qty > 1) {
            update.mutate({ productId: id, qty: item.qty - 1 });
        } else {
            remove.mutate(id);
        }
    };

    const handleSaveForLater = (id) => {
        const item = cart.find((i) => (i.product?._id || i.product) === id);
        if (item) {
            setSavedItems((prev) => [...prev, item]);
            remove.mutate(id);
        }
    };

    const handleApplyPromo = (code, data) => {
        setPromoCode(code);
        setPromoData(data);
    };

    
    if (!user) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-black text-forest-night">Please Log In</h2>
                <p className="text-gray-500 mb-6">You need an account to save items in your eco-cart.</p>
                <button onClick={() => navigate("/auth")} className="btn btn-primary">Sign In Now</button>
            </div>
        );
    }

    if (cart.length === 0 && savedItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8">
                <CartEmpty onShopNow={() => navigate("/products")} />
                <CartSuggestedProducts onAddToCart={(p) => navigate("/products")} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-[#1a2e1a]">
                    Shopping Cart
                    <span className="ml-2 text-base font-semibold text-gray-400">
                        ({cart.reduce((s, i) => s + i.qty, 0)} items)
                    </span>
                </h1>
                <button onClick={() => navigate("/products")} className="text-sm font-bold text-[#5a9a3a] hover:underline">
                    ← Continue Shopping
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {}
                <div className="flex-1 min-w-0 space-y-4">
                    <CartCarbonBanner carbonSaved={carbonSaved} onViewImpact={() => navigate("/carbon")} />

                    <div className="space-y-3">
                        {cart.map((item) => (
                            <CartItem
                                key={item.product?._id || item.product}
                                item={item}
                                onIncrement={() => handleIncrement(item.product?._id || item.product)}
                                onDecrement={() => handleDecrement(item.product?._id || item.product)}
                                onRemove={() => remove.mutate(item.product?._id || item.product)}
                                onSaveForLater={() => handleSaveForLater(item.product?._id || item.product)}
                            />
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <h2 className="font-black text-[#1a2e1a] text-base mb-4">Delivery Options</h2>
                        <CartDeliveryOptions selected={delivery} subtotal={subtotal} onSelect={setDelivery} />
                    </div>

                    <CartSavedItems
                        savedItems={savedItems}
                        onMoveToCart={(item) => {
                            update.mutate({ productId: item.product?._id || item.product, qty: 1 });
                            setSavedItems(prev => prev.filter(i => i.id !== item.id));
                        }}
                    />
                </div>

                {}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <CartOrderSummary
                        subtotal={subtotal}
                        tax={tax}
                        deliveryCost={deliveryCost}
                        total={total}
                        carbonSaved={carbonSaved}
                        onCheckout={() => navigate("/checkout")}
                        promoSlot={
                            <CartPromoCode
                                appliedCode={promoCode}
                                onApply={handleApplyPromo}
                                onRemove={() => setPromoCode(null)}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
}
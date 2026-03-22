
import React from "react";
import ProductsCard from "./ProductsCard.jsx";

export default function ProductsGrid({
    products,
    cart,
    onAddToCart,
    onIncrement,
    onDecrement,
}) {
    const getQty = (id) => cart.find((i) => i.id === id)?.qty ?? 0;

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4 select-none">🔍</span>
                <h3 className="text-lg font-black text-[#1a2e1a] mb-1">No products found</h3>
                <p className="text-sm text-gray-400">Try adjusting your filters or search term.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductsCard
                    key={product.id}
                    product={product}
                    cartQty={getQty(product.id)}
                    onAddToCart={onAddToCart}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            ))}
        </div>
    );
}
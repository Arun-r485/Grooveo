import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../eco/products.js";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({
    cart,
    onAddToCart,
    onIncrement,
    onDecrement,
    onViewAll,
}) {
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", "featured"],
        queryFn: () =>
            getProducts({ featured: true, limit: 8 })
                .then(r => r.data.products),
    });

    const featuredProducts = data || [];

    const getQty = (id) => cart.find((i) => i.id === id)?.qty ?? 0;

    return (
        <section className="max-w-7xl mx-auto px-6 pb-12">
            {}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black text-forest-night">Featured Products</h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Handpicked eco packaging for every business
                    </p>
                </div>
                <button
                    onClick={onViewAll}
                    className="btn btn-sm btn-outline border-leaf-green text-leaf-green hover:bg-leaf-green hover:text-white font-black"
                >
                    View All →
                </button>
            </div>

            {}
            {isLoading ? (
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-72 bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
                            <div className="h-40 bg-gray-100 rounded-xl mb-4" />
                            <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-100 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="p-8 text-center bg-red-50 rounded-2xl border-2 border-dashed border-red-100">
                    <p className="text-red-600 font-bold">Unable to load featured products.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id || product._id}
                            product={product}
                            cartQty={getQty(product.id || product._id)}
                            onAddToCart={onAddToCart}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                        />
                    ))}
                </div>
            )}

            {}
            <div className="mt-6 text-center md:hidden">
                <button
                    onClick={onViewAll}
                    className="btn btn-wide bg-leaf-green border-leaf-green text-white hover:bg-leaf-dark font-black"
                >
                    Shop All Products →
                </button>
            </div>
        </section>
    );
}
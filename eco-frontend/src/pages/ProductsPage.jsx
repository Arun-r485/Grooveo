import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../eco/products.js";

import {
    FILTER_CATEGORIES,
    FILTER_CERTIFICATIONS,
    SORT_OPTIONS,
} from "../data/productsData.js";

import ProductsPageBanner from "../components/products/ProductsPageBanner.jsx";
import ProductsFilterSidebar from "../components/products/ProductsFilterSidebar.jsx";
import ProductsSearchBar from "../components/products/ProductsSearchBar.jsx";
import ActiveFiltersBar from "../components/products/ActiveFiltersBar.jsx";
import ProductsGrid from "../components/products/ProductsGrid.jsx";

export default function ProductsPage({
    cart,
    onAddToCart,
    onIncrement,
    onDecrement,
}) {
    
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [certs, setCerts] = useState([]);
    const [priceMax, setPriceMax] = useState(2000);
    const [sort, setSort] = useState("popular");
    const [mobileOpen, setMobileOpen] = useState(false);

    
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", { category, search, sort, priceMax, certs: certs.join(",") }],
        queryFn: () =>
            getProducts({ category, search, sort, priceMax, certs: certs.join(",") })
                .then(r => r.data.products),
        keepPreviousData: true, 
    });

    const filtered = data || [];

    
    const toggleCert = (cert) =>
        setCerts((prev) =>
            prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
        );

    
    const resetAll = () => {
        setSearch("");
        setCategory("All");
        setCerts([]);
        setPriceMax(2000);
        setSort("popular");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <ProductsPageBanner />

            <div className="flex gap-6 items-start">
                {}
                <div className="hidden lg:block">
                    <ProductsFilterSidebar
                        categories={FILTER_CATEGORIES}
                        activeCategory={category}
                        onCategory={setCategory}
                        certifications={FILTER_CERTIFICATIONS}
                        activeCerts={certs}
                        onCertToggle={toggleCert}
                        priceMax={priceMax}
                        onPriceMax={setPriceMax}
                        onReset={resetAll}
                    />
                </div>

                {}
                <div className="flex-1 min-w-0">
                    {}
                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#c8e6b0] bg-white text-sm font-bold text-[#1a2e1a] hover:border-[#5a9a3a] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#5a9a3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                            Filters
                            {(category !== "All" || certs.length > 0 || priceMax < 2000) && (
                                <span className="w-5 h-5 rounded-full bg-[#5a9a3a] text-white text-xs font-black flex items-center justify-center">
                                    {(category !== "All" ? 1 : 0) + certs.length + (priceMax < 2000 ? 1 : 0)}
                                </span>
                            )}
                        </button>

                        {mobileOpen && (
                            <div className="mt-3">
                                <ProductsFilterSidebar
                                    categories={FILTER_CATEGORIES}
                                    activeCategory={category}
                                    onCategory={(c) => { setCategory(c); setMobileOpen(false); }}
                                    certifications={FILTER_CERTIFICATIONS}
                                    activeCerts={certs}
                                    onCertToggle={toggleCert}
                                    priceMax={priceMax}
                                    onPriceMax={setPriceMax}
                                    onReset={resetAll}
                                />
                            </div>
                        )}
                    </div>

                    <ProductsSearchBar
                        search={search}
                        onSearch={setSearch}
                        sort={sort}
                        onSort={setSort}
                        resultCount={filtered.length}
                        sortOptions={SORT_OPTIONS}
                    />

                    <ActiveFiltersBar
                        activeCategory={category}
                        activeCerts={certs}
                        priceMax={priceMax}
                        onRemoveCategory={() => setCategory("All")}
                        onRemoveCert={toggleCert}
                        onResetPrice={() => setPriceMax(2000)}
                        onReset={resetAll}
                    />

                    {}
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                                >
                                    {}
                                    <div className="h-40 w-full bg-gray-100 rounded-xl animate-pulse" />

                                    {}
                                    <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />

                                    {}
                                    <div className="space-y-2">
                                        <div className="h-3 w-full bg-gray-50 rounded animate-pulse" />
                                        <div className="h-3 w-5/6 bg-gray-50 rounded animate-pulse" />
                                    </div>

                                    {}
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
                                        <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-red-100">
                            <p className="text-red-500 font-bold">Failed to load eco-products.</p>
                            <button onClick={() => window.location.reload()} className="btn btn-ghost btn-sm mt-2">Try Again</button>
                        </div>
                    ) : (
                        <ProductsGrid
                            products={filtered}
                            cart={cart}
                            onAddToCart={onAddToCart}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
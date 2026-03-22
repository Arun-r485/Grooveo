
import { useNavigate } from "react-router-dom";
import React from "react";

import HeroSection from "../components/home/HeroSection.jsx";
import TrustBadges from "../components/home/TrustBadges.jsx";
import CategoryGrid from "../components/home/CategoryGrid.jsx";
import DealBanner from "../components/home/DealBanner.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import CarbonImpactTeaser from "../components/home/CarbonImpactTeaser.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";

export default function HomePage({
    cart,
    onAddToCart,
    onIncrement,
    onDecrement,
}) {
    return (
        <div>
            {}
            <HeroSection
                onShopNow={() => navigate("/products")}
                onViewImpact={() => navigate("/carbon")}
            />

            {}
            <TrustBadges />

            {}
            <CategoryGrid onCategoryClick={() => navigate("/products")} />

            {}
            <DealBanner onGrabDeal={() => navigate("/products")} />

            {}
            <FeaturedProducts
                cart={cart}
                onAddToCart={onAddToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onViewAll={() => navigate("/products")}
            />

            {}
            <CarbonImpactTeaser onTrackImpact={() => navigate("/carbon")} />

            {}
            <WhyChooseUs />
        </div>
    );
}









import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";

import CarbonHero from "../components/carbon/CarbonHero.jsx";
import CarbonEquivalents from "../components/carbon/CarbonEquivalents.jsx";
import CarbonMilestones from "../components/carbon/CarbonMilestones.jsx";
import CarbonCartBreakdown from "../components/carbon/CarbonCartBreakdown.jsx";
import CarbonCommunityStats from "../components/carbon/CarbonCommunityStats.jsx";
import CarbonHowItWorks from "../components/carbon/CarbonHowItWorks.jsx";
import CarbonCTA from "../components/carbon/CarbonCTA.jsx";

export default function CarbonPage({ cart }) {
    const navigate = useNavigate();

    
    const carbonSaved = useMemo(
        () => cart.reduce((sum, item) => sum + (item.carbonSaved || 0) * item.qty, 0),
        [cart]
    );

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

            {}
            <CarbonHero carbonSaved={carbonSaved} />

            {}
            <CarbonEquivalents carbonSaved={carbonSaved} />

            {}
            <CarbonMilestones carbonSaved={carbonSaved} />

            {}
            <CarbonCartBreakdown
                cart={cart}
                onShopNow={() => navigate("/products")}
            />

            {}
            <CarbonCommunityStats />

            {}
            <CarbonHowItWorks />

            {}
            <CarbonCTA onShopNow={() => navigate("/products")} />
        </div>
    );
}
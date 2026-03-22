






import { useNavigate } from "react-router-dom";
import React from "react";

import AboutHero from "../components/about/AboutHero.jsx";
import AboutStats from "../components/about/AboutStats.jsx";
import AboutStory from "../components/about/AboutStory.jsx";
import AboutValues from "../components/about/AboutValues.jsx";
import AboutTimeline from "../components/about/AboutTimeline.jsx";
import AboutTeam from "../components/about/AboutTeam.jsx";
import AboutCertifications from "../components/about/AboutCertifications.jsx";
import AboutPress from "../components/about/AboutPress.jsx";
import AboutCTA from "../components/about/AboutCTA.jsx";

export default function AboutPage() {
    const navigate = useNavigate();
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

            {}
            <AboutHero
                onShopNow={() => navigate("/products")}
                onViewCarbon={() => navigate("/carbon")}
            />

            {}
            <AboutStats />

            {}
            <AboutStory />

            {}
            <AboutValues />

            {}
            <AboutTimeline />

            {}
            <AboutTeam />

            {}
            <AboutCertifications />

            {}
            <AboutPress />

            {}
            <AboutCTA
                onShopNow={() => navigate("/products")}
                onGetInTouch={() => navigate("/auth")}
            />
        </div>
    );
}
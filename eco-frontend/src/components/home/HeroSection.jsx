








import React from "react";

export default function HeroSection({ onShopNow, onViewImpact }) {
    return (
        <section className="relative bg-gradient-to-br from-forest-night via-canopy to-[#1a3320] text-white overflow-hidden">

            {}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 18% 55%, rgba(143,204,96,.15) 0%, transparent 50%)," +
                        "radial-gradient(circle at 82% 18%, rgba(90,154,58,.12) 0%, transparent 42%)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">

                {}
                <div className="flex-1 text-center md:text-left">
                    <div className="badge badge-success mb-4 text-xs tracking-widest font-bold">
                        🌿 ECO-CERTIFIED PACKAGING
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                        Pack Smart.
                        <br />
                        <span className="text-spring-lime">Save the Planet.</span>
                    </h1>

                    <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                        Premium eco-friendly packaging for businesses that care. Compostable,
                        recyclable &amp; beautiful — without compromising your brand.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <button
                            onClick={onShopNow}
                            className="btn btn-lg bg-leaf-green border-leaf-green text-white hover:bg-leaf-dark shadow-lg font-black"
                        >
                            Shop Now →
                        </button>
                        <button
                            onClick={onViewImpact}
                            className="btn btn-lg btn-outline border-spring-lime text-spring-lime hover:bg-spring-lime hover:text-forest-night font-black"
                        >
                            View My Impact
                        </button>
                    </div>

                    {}
                    <div className="mt-8 flex flex-wrap gap-5 justify-center md:justify-start text-sm text-gray-400">
                        <span>✅ 10,000+ businesses</span>
                        <span>✅ 4.9★ rating</span>
                        <span>✅ Ships in 24 hrs</span>
                    </div>
                </div>

                {}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 select-none">
                        {}
                        <div className="absolute inset-0 bg-leaf-green rounded-full opacity-20 animate-ping" />
                        <div className="absolute inset-4 bg-spring-lime rounded-full opacity-10 animate-pulse" />

                        {}
                        <div className="absolute inset-0 flex items-center justify-center text-[7rem] md:text-[9rem]">
                            📦
                        </div>

                        {}
                        <div className="absolute -top-4 -right-4 bg-white text-forest-night rounded-full px-3 py-1.5 text-xs font-black shadow-lg">
                            100% Compostable
                        </div>
                        <div className="absolute -bottom-2 -left-4 bg-spring-lime text-forest-night rounded-full px-3 py-1.5 text-xs font-black shadow-lg">
                            Zero Plastic
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
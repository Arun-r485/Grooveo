import React, { useEffect, useState } from "react";

function AnimatedNumber({ target, decimals = 2, duration = 1200 }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (target <= 0) { setDisplay(0); return; }
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); 
            setDisplay(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration]);

    return <>{display.toFixed(decimals)}</>;
}

export default function CarbonHero({ carbonSaved }) {
    const hasData = carbonSaved > 0;

    return (
        <section className="relative bg-gradient-to-br from-[#1a2e1a] via-[#2d4a1e] to-[#1a3320] rounded-3xl overflow-hidden mb-8">

            {}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 15% 60%, rgba(143,204,96,.18) 0%, transparent 50%)," +
                        "radial-gradient(circle at 85% 20%, rgba(90,154,58,.14) 0%, transparent 45%)",
                }}
            />

            <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center gap-10">

                {}
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-[#5a9a3a]/20 border border-[#5a9a3a]/40 rounded-full px-4 py-1.5 mb-5">
                        <span className="text-sm">🌱</span>
                        <span className="text-xs font-bold text-[#8fcc60] uppercase tracking-widest">Your Carbon Impact</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                        Every Purchase<br />
                        <span className="text-[#8fcc60]">Saves the Planet</span>
                    </h1>

                    <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0 leading-relaxed">
                        Track the real-world CO₂ you've prevented by choosing eco packaging
                        over conventional plastic alternatives.
                    </p>

                    {!hasData && (
                        <p className="mt-4 text-xs text-[#8fcc60] font-semibold">
                            👆 Add products to your cart to start tracking
                        </p>
                    )}
                </div>

                {}
                <div className="flex-shrink-0 text-center">
                    <div className="relative inline-block">
                        {}
                        <div className="absolute inset-0 rounded-full bg-[#5a9a3a]/20 blur-2xl scale-150" />

                        <div className="relative bg-white/10 backdrop-blur border border-white/20 rounded-3xl px-10 py-8">
                            <div className="text-6xl md:text-7xl font-black text-[#8fcc60] tabular-nums leading-none">
                                {hasData
                                    ? <AnimatedNumber target={carbonSaved} decimals={2} />
                                    : "0.00"
                                }
                            </div>
                            <div className="text-white font-bold text-lg mt-1">kg CO₂ Saved</div>
                            <div className="text-gray-400 text-xs mt-1">from your purchases</div>

                            {}
                            <div className="flex items-center justify-center gap-1.5 mt-3">
                                <span className="w-2 h-2 rounded-full bg-[#8fcc60] animate-pulse" />
                                <span className="text-xs text-gray-400">Updates with your cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
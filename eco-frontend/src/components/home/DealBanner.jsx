

import React, { useState, useEffect } from "react";

const INITIAL_SECONDS = 8 * 3600 + 24 * 60 + 13;

export default function DealBanner({ onGrabDeal }) {
    const [secs, setSecs] = useState(INITIAL_SECONDS);

    useEffect(() => {
        const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, []);

    const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
    const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const ss = String(secs % 60).padStart(2, "0");

    return (
        <section className="max-w-7xl mx-auto px-6 mb-10">
            <div className="bg-gradient-to-r from-canopy to-[#1a3320] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">

                {}
                <div>
                    <div className="badge badge-warning mb-2 text-xs font-black tracking-widest">
                        🔥 TODAY'S DEAL
                    </div>
                    <h2 className="text-2xl font-black text-white">
                        Buy 50 units, get{" "}
                        <span className="text-spring-lime">20% off</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        On all Kraft Mailer Boxes — limited time offer.
                    </p>
                </div>

                {}
                <div className="flex items-center gap-5">
                    <div className="text-center">
                        <div className="text-3xl font-mono font-black text-spring-lime tabular-nums">
                            {hh}:{mm}:{ss}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">Time remaining</div>
                    </div>
                    <button
                        onClick={onGrabDeal}
                        className="btn bg-spring-lime border-spring-lime text-forest-night hover:bg-white hover:border-white font-black shadow"
                    >
                        Grab Deal 🎁
                    </button>
                </div>
            </div>
        </section>
    );
}
import React from "react";
import { TRUST_BADGES } from "../../data/homeData";

export default function TrustBadges() {
    return (
        <section className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                    {TRUST_BADGES.map(({ icon, text }) => (
                        <li key={text} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-xl leading-none">{icon}</span>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
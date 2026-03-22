







import React from "react";
import { MILESTONES } from "../../data/carbonData.js";

export default function CarbonMilestones({ carbonSaved }) {
    const unlocked = MILESTONES.filter((m) => carbonSaved >= m.kg);
    const currentBadge = unlocked[unlocked.length - 1] || null;
    const nextBadge = MILESTONES.find((m) => m.kg > carbonSaved) || MILESTONES[MILESTONES.length - 1];
    const progress = Math.min(100, (carbonSaved / nextBadge.kg) * 100);

    return (
        <section className="bg-white rounded-3xl border border-[#c8e6b0] p-6 mb-8 shadow-sm">

            {}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-xl font-black text-[#1a2e1a]">Eco Milestones</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Unlock badges as your impact grows</p>
                </div>

                {}
                {currentBadge && (
                    <div className="flex items-center gap-2 bg-[#f0f7ea] border border-[#c8e6b0] rounded-full px-4 py-2">
                        <span className="text-lg">{currentBadge.icon}</span>
                        <div>
                            <p className="text-xs font-black text-[#2d6a1a] leading-none">{currentBadge.label}</p>
                            <p className="text-xs text-gray-400 leading-none mt-0.5">Achieved!</p>
                        </div>
                    </div>
                )}
            </div>

            {}
            <div className="mb-2 flex justify-between items-center text-xs">
                <span className="text-gray-400">
                    Progress to <span className="font-bold text-[#1a2e1a]">{nextBadge.label}</span>
                </span>
                <span className="font-black text-[#5a9a3a]">
                    {carbonSaved.toFixed(2)} / {nextBadge.kg} kg
                </span>
            </div>

            {}
            <div className="relative w-full h-4 bg-[#f0f7ea] rounded-full overflow-hidden border border-[#c8e6b0] mb-6">
                <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #5a9a3a 0%, #8fcc60 100%)",
                    }}
                />
                {}
                <div
                    className="absolute inset-y-0 left-0 w-1/3 rounded-full opacity-30"
                    style={{
                        background: "linear-gradient(90deg, transparent, white, transparent)",
                        transform: `translateX(${progress * 2}%)`,
                        transition: "transform .7s ease-out",
                    }}
                />
            </div>

            {}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {MILESTONES.map((m) => {
                    const isUnlocked = carbonSaved >= m.kg;
                    const isNext = m.id === nextBadge.id && !isUnlocked;

                    return (
                        <div
                            key={m.id}
                            className={`
                relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-300
                ${isUnlocked
                                    ? "border-[#5a9a3a] bg-[#f0f7ea] shadow-sm"
                                    : isNext
                                        ? "border-dashed border-[#5a9a3a] bg-white"
                                        : "border-gray-100 bg-gray-50"
                                }
              `}
                        >
                            {}
                            {!isUnlocked && (
                                <div className="absolute top-2 right-2">
                                    {isNext ? (
                                        <span className="text-xs">🎯</span>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            )}

                            {}
                            <span className={`text-3xl mb-2 select-none ${!isUnlocked && !isNext ? "grayscale opacity-30" : ""}`}>
                                {m.icon}
                            </span>

                            {}
                            <p className={`text-xs font-black leading-tight ${isUnlocked ? "text-[#1a2e1a]" : "text-gray-400"}`}>
                                {m.label}
                            </p>

                            {}
                            <p className={`text-xs mt-0.5 font-medium ${isUnlocked ? "text-[#5a9a3a]" : "text-gray-300"}`}>
                                {m.kg} kg
                            </p>

                            {}
                            {isUnlocked && (
                                <p className="text-xs text-gray-400 mt-1 leading-tight">{m.desc}</p>
                            )}

                            {}
                            {isNext && (
                                <span className="mt-2 text-xs font-bold text-[#5a9a3a] bg-[#f0f7ea] px-2 py-0.5 rounded-full border border-[#c8e6b0]">
                                    Up next
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}









import React, { useEffect, useState } from "react";

export default function AuthSuccessScreen({ user, isNew, onContinue }) {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const id = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) { clearInterval(id); onContinue(); }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center py-8 gap-5">

            {}
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#f0f7ea] border-4 border-[#5a9a3a] flex items-center justify-center animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#5a9a3a]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-black text-[#1a2e1a] mb-1">
                    {isNew ? "Welcome to EcoPackStore! 🌿" : `Welcome back, ${user.name}! 👋`}
                </h2>
                <p className="text-sm text-gray-400">
                    {isNew
                        ? "Your account has been created successfully."
                        : "You've signed in successfully."
                    }
                </p>
            </div>

            {}
            <div className="bg-[#f0f7ea] border border-[#c8e6b0] rounded-2xl px-6 py-4 w-full max-w-xs">
                <p className="font-black text-[#1a2e1a] text-sm">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
            </div>

            {}
            <div className="w-full max-w-xs">
                <p className="text-xs text-gray-400 mb-2">
                    Redirecting to homepage in {countdown}s…
                </p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#5a9a3a] rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                    />
                </div>
            </div>

            <button
                onClick={onContinue}
                className="px-8 py-2.5 rounded-xl bg-[#5a9a3a] text-white text-sm font-black hover:bg-[#4a8a2a] transition-colors shadow-sm"
            >
                Go to Home →
            </button>
        </div>
    );
}








import React from "react";

const TABS = [
    { id: "signin", label: "Sign In" },
    { id: "register", label: "Create Account" },
];

export default function AuthTabSwitcher({ mode, onSwitch }) {
    return (
        <div className="flex bg-[#f4f7f2] rounded-2xl p-1 mb-8 gap-1">
            {TABS.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => onSwitch(id)}
                    className={`
            flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200
            ${mode === id
                            ? "bg-white text-[#1a2e1a] shadow-sm border border-[#c8e6b0]"
                            : "text-gray-400 hover:text-gray-600"
                        }
          `}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
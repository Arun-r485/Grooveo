







import React from "react";
import { PASSWORD_RULES } from "../../data/authData.js";

const LEVELS = [
    { label: "Too weak", color: "#d94f2e", segments: 1 },
    { label: "Weak", color: "#e8a020", segments: 2 },
    { label: "Good", color: "#8fcc60", segments: 3 },
    { label: "Strong", color: "#5a9a3a", segments: 4 },
];

export default function PasswordStrengthBar({ password }) {
    if (!password) return null;

    const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
    const level = LEVELS[Math.max(0, passed - 1)];

    return (
        <div className="mt-1 space-y-2">
            {}
            <div className="flex gap-1">
                {[1, 2, 3, 4].map((seg) => (
                    <div
                        key={seg}
                        className="flex-1 h-1.5 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: seg <= passed ? level.color : "#e5e7eb",
                        }}
                    />
                ))}
            </div>

            {}
            <p className="text-xs font-semibold" style={{ color: level.color }}>
                {level.label}
            </p>

            {}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {PASSWORD_RULES.map((rule) => {
                    const ok = rule.test(password);
                    return (
                        <li key={rule.id} className="flex items-center gap-1.5 text-xs">
                            <span className={ok ? "text-[#5a9a3a]" : "text-gray-300"}>
                                {ok ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 102 0V7zm-1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                            <span className={ok ? "text-[#2d6a1a]" : "text-gray-400"}>
                                {rule.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
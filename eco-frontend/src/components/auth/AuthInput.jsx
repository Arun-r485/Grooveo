















import React, { useState } from "react";

export default function AuthInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
    icon,
    required = false,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1.5">
            {}
            <label htmlFor={name} className="text-sm font-semibold text-[#1a2e1a]">
                {label}
                {required && <span className="text-[#d94f2e] ml-0.5">*</span>}
            </label>

            {}
            <div className={`
        flex items-center gap-2 border-2 rounded-xl px-3.5 py-2.5 bg-white
        transition-all duration-200
        ${error
                    ? "border-[#d94f2e] bg-red-50/30"
                    : "border-[#c8e6b0] focus-within:border-[#5a9a3a] focus-within:shadow-sm"
                }
      `}>
                {}
                {icon && (
                    <span className={`flex-shrink-0 text-base ${error ? "text-[#d94f2e]" : "text-[#5a9a3a]"}`}>
                        {icon}
                    </span>
                )}

                {}
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={
                        type === "password" ? "current-password"
                            : type === "email" ? "email"
                                : "off"
                    }
                    className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />

                {}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="flex-shrink-0 text-gray-400 hover:text-[#5a9a3a] transition-colors"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {}
            {error && (
                <p className="flex items-center gap-1.5 text-xs text-[#d94f2e] font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}
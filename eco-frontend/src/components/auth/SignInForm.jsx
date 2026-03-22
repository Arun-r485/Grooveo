import React, { useState } from "react";
import AuthInput from "./AuthInput.jsx";
import AuthDivider from "./AuthDivider.jsx";
import SocialLoginButtons from "./SocialLoginButtons.jsx";


import { useAuth } from "../../context/AuthContext.jsx";

export default function SignInForm({ onSuccess, onSwitch }) {
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverErr, setServerErr] = useState("");

    // 2. Extract the real login function
    const { login } = useAuth();

    const ch = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
        setErrors((e) => ({ ...e, [name]: "" }));
        setServerErr("");
    };

    const validate = () => {
        const e = {};
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
        if (!form.password) e.password = "Password is required.";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        setServerErr("");

        try {
            // 3. Call the real backend login logic
            const user = await login(form.email, form.password);

            // 4. Trigger the success callback (usually navigates to Home or Account)
            onSuccess(user);
        } catch (err) {
            // 5. Handle real server errors (e.g., 401 Unauthorized)
            console.error("Login error:", err);
            console.error("Response:", err.response?.data);
            console.error("Status:", err.response?.status);
            setServerErr(
                err.response?.data?.message ||
                "Unable to connect to server. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {}
            {serverErr && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#d94f2e] mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-[#d94f2e] font-medium">{serverErr}</p>
                </div>
            )}

            {}
            <AuthInput
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={ch}
                placeholder="you@example.com"
                error={errors.email}
                required
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                }
            />

            {}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-[#1a2e1a]">
                        Password <span className="text-[#d94f2e]">*</span>
                    </label>
                    <button type="button" className="text-xs font-semibold text-[#5a9a3a] hover:underline">
                        Forgot password?
                    </button>
                </div>
                <AuthInput
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={ch}
                    placeholder="••••••••"
                    error={errors.password}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    }
                />
            </div>

            {}
            <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                    type="checkbox"
                    name="remember"
                    className="hidden"
                    checked={form.remember}
                    onChange={ch}
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all 
                    ${form.remember ? "bg-[#5a9a3a] border-[#5a9a3a]" : "border-gray-300 group-hover:border-[#5a9a3a]"}`}>
                    {form.remember && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <span className="text-sm text-gray-600">Keep me signed in</span>
            </label>

            {}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] active:bg-[#3a7a1a] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
            >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Sign In →"}
            </button>

            <AuthDivider />
            <SocialLoginButtons mode="signin" />

            <p className="text-center text-sm text-gray-500 mt-2">
                New to EcoPackStore?{" "}
                <button type="button" onClick={onSwitch} className="font-black text-[#5a9a3a] hover:underline">
                    Create an account
                </button>
            </p>
        </form>
    );
}
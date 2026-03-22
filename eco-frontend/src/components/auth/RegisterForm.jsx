import React, { useState } from "react";
import AuthInput from "./AuthInput.jsx";
import AuthDivider from "./AuthDivider.jsx";
import SocialLoginButtons from "./SocialLoginButtons.jsx";
import PasswordStrengthBar from "./PasswordStrengthBar.jsx";


import { useAuth } from "../../context/AuthContext.jsx";

export default function RegisterForm({ onSuccess, onSwitch }) {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false, business: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverErr, setServerErr] = useState("");

    // 2. Extract the register function
    const { register } = useAuth();

    const ch = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
        setErrors((e) => ({ ...e, [name]: "" }));
        setServerErr("");
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Full name is required.";
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
        if (!form.password) e.password = "Password is required.";
        else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
        if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
        if (!form.agree) e.agree = "You must accept the terms.";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        setServerErr("");

        try {
            // 3. Call real backend registration
            // Note: Sending 'business' as role if needed, or keeping it simple
            const user = await register(form.name, form.email, form.password);

            // 4. Trigger success callback
            // passing 'true' to indicate a fresh registration for welcome toasts
            onSuccess(user, true);
        } catch (err) {
            // 5. Handle errors (e.g., "User already exists")
            setServerErr(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">

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
            <div className="flex gap-2 p-1 bg-[#f4f7f2] rounded-xl mb-1">
                {[
                    { id: false, label: "Personal", icon: "👤" },
                    { id: true, label: "Business", icon: "🏢" },
                ].map(({ id, label, icon }) => (
                    <button
                        key={label}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, business: id }))}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                        ${form.business === id
                                ? "bg-white text-[#1a2e1a] shadow-sm border border-[#c8e6b0]"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        <span>{icon}</span>{label}
                    </button>
                ))}
            </div>

            {}
            <AuthInput
                label="Full Name"
                name="name"
                value={form.name}
                onChange={ch}
                placeholder="Your full name"
                error={errors.name}
                required
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />

            <AuthInput
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={ch}
                placeholder="you@example.com"
                error={errors.email}
                required
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
            />

            <div>
                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={ch}
                    placeholder="Create a strong password"
                    error={errors.password}
                    required
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                />
                <PasswordStrengthBar password={form.password} />
            </div>

            <AuthInput
                label="Confirm Password"
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={ch}
                placeholder="Repeat your password"
                error={errors.confirm}
                required
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            />

            {}
            <div>
                <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="hidden" checked={form.agree} onChange={() => setForm(f => ({ ...f, agree: !f.agree }))} />
                    <div className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all 
                        ${form.agree ? "bg-[#5a9a3a] border-[#5a9a3a]" : "border-gray-300 group-hover:border-[#5a9a3a]"}`}>
                        {form.agree && <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">
                        I agree to the <a href="#" className="font-semibold text-[#5a9a3a] hover:underline">Terms</a> and <a href="#" className="font-semibold text-[#5a9a3a] hover:underline">Privacy Policy</a>
                    </span>
                </label>
                {errors.agree && <p className="mt-1 text-xs text-[#d94f2e] font-medium">{errors.agree}</p>}
            </div>

            {}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] active:bg-[#3a7a1a] disabled:opacity-60 transition-all shadow-sm flex items-center justify-center gap-2"
            >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Create Account →"}
            </button>

            <AuthDivider />
            <SocialLoginButtons mode="register" />

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button type="button" onClick={onSwitch} className="font-black text-[#5a9a3a] hover:underline">Sign in</button>
            </p>
        </form>
    );
}
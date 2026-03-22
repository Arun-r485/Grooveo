
import React, { useState } from "react";

function Section({ title, children }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-black text-[#1a2e1a] mb-4 pb-3 border-b border-gray-100">{title}</h2>
            {children}
        </div>
    );
}

function Row({ label, value, onEdit }) {
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(value);
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-[#1a2e1a] mt-0.5">{editing ? "•••••••••••••" : val}</p>
            </div>
            {editing ? (
                <div className="flex gap-2">
                    <button onClick={() => setEditing(false)} className="text-xs font-bold text-[#5a9a3a] hover:underline">Save</button>
                    <button onClick={() => setEditing(false)} className="text-xs font-bold text-gray-400 hover:underline">Cancel</button>
                </div>
            ) : (
                <button onClick={() => setEditing(true)} className="text-xs font-bold text-[#5a9a3a] hover:underline border border-[#c8e6b0] px-3 py-1 rounded-lg hover:bg-[#f0f7ea] transition-colors">Edit</button>
            )}
        </div>
    );
}

export default function LoginSecurityPage({ user, navigate }) {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Login & Security</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-6">Login &amp; Security</h1>

            <div className="space-y-4">
                <Section title="Login credentials">
                    <Row label="Name" value={user?.name || "Arjun Mehta"} />
                    <Row label="Email" value={user?.email || "arjun@eco.in"} />
                    <Row label="Password" value="••••••••••" />
                    <Row label="Mobile number" value="+91 98765 43210" />
                </Section>

                <Section title="Two-Step Verification">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-[#1a2e1a]">Two-step verification</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {twoFactor ? "Enabled — your account is extra secure" : "Add an extra layer of security to your account"}
                            </p>
                        </div>
                        <button
                            onClick={() => setTwoFactor(v => !v)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${twoFactor ? "bg-[#5a9a3a]" : "bg-gray-200"}`}>
                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${twoFactor ? "translate-x-6" : "translate-x-0.5"}`} />
                        </button>
                    </div>
                </Section>

                <Section title="Connected accounts">
                    {[{ icon: "G", label: "Google", color: "#4285F4", connected: false }, { icon: "f", label: "Facebook", color: "#1877F2", connected: true }].map(s => (
                        <div key={s.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: s.color }}>{s.icon}</div>
                                <div>
                                    <p className="text-sm font-semibold text-[#1a2e1a]">{s.label}</p>
                                    <p className="text-xs text-gray-400">{s.connected ? "Connected" : "Not connected"}</p>
                                </div>
                            </div>
                            <button className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-colors ${s.connected ? "border-red-200 text-[#d94f2e] hover:bg-red-50" : "border-[#c8e6b0] text-[#5a9a3a] hover:bg-[#f0f7ea]"}`}>
                                {s.connected ? "Disconnect" : "Connect"}
                            </button>
                        </div>
                    ))}
                </Section>

                <Section title="Danger zone">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-[#d94f2e]">Delete account</p>
                            <p className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all data</p>
                        </div>
                        <button className="text-xs font-bold px-4 py-2 rounded-xl border-2 border-[#d94f2e] text-[#d94f2e] hover:bg-red-50 transition-colors">
                            Delete Account
                        </button>
                    </div>
                </Section>
            </div>
        </div>
    );
}
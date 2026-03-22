
import React, { useState } from "react";

const PREFS = [
    { id: "packaging", label: "Minimal packaging", desc: "Prefer fewer layers and smaller boxes where possible", on: true },
    { id: "plastic", label: "Zero plastic", desc: "Never include any plastic in my orders", on: true },
    { id: "co2", label: "Carbon-offset shipping", desc: "Add ₹5 per order to offset delivery emissions", on: false },
    { id: "bio", label: "Biodegradable only", desc: "Only show biodegradable certified products", on: false },
    { id: "bulk", label: "Bulk suggestions", desc: "Recommend bulk sizes to reduce packaging waste", on: true },
    { id: "newsletter", label: "Eco newsletter", desc: "Monthly sustainability tips and product highlights", on: true },
];

const CERTIFICATIONS = ["FSC Certified", "BPI Certified", "Compostable", "Plastic-Free", "ASTM D6400", "ISO 14001"];

export default function EcoPreferencesPage({ navigate }) {
    const [prefs, setPrefs] = useState(PREFS);
    const [certs, setCerts] = useState(["Compostable", "Plastic-Free"]);
    const [saved, setSaved] = useState(false);

    const toggle = id => setPrefs(p => p.map(x => x.id === id ? { ...x, on: !x.on } : x));
    const toggleCert = c => setCerts(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Eco Preferences</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-1">Eco Preferences</h1>
            <p className="text-sm text-gray-400 mb-6">Customise your sustainability settings to match your values.</p>

            {}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
                <h2 className="font-black text-[#1a2e1a] mb-4">Packaging Preferences</h2>
                <div className="space-y-4">
                    {prefs.map(p => (
                        <div key={p.id} className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-[#1a2e1a]">{p.label}</p>
                                <p className="text-xs text-gray-400">{p.desc}</p>
                            </div>
                            <button onClick={() => toggle(p.id)} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${p.on ? "bg-[#5a9a3a]" : "bg-gray-200"}`}>
                                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${p.on ? "translate-x-5" : "translate-x-0.5"}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
                <h2 className="font-black text-[#1a2e1a] mb-2">Default Certification Filters</h2>
                <p className="text-xs text-gray-400 mb-4">Products shown to you will be pre-filtered by these certifications.</p>
                <div className="flex flex-wrap gap-2">
                    {CERTIFICATIONS.map(c => (
                        <button key={c} onClick={() => toggleCert(c)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${certs.includes(c) ? "bg-[#5a9a3a] border-[#5a9a3a] text-white" : "border-[#c8e6b0] text-[#2d6a1a] bg-[#f0f7ea] hover:border-[#5a9a3a]"}`}>
                            {certs.includes(c) ? "✓ " : ""}{c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Save */}
            <button onClick={save}
                className={`w-full py-3 rounded-xl font-black text-sm transition-all ${saved ? "bg-green-600 text-white" : "bg-[#5a9a3a] text-white hover:bg-[#4a8a2a]"}`}>
                {saved ? "✓ Preferences Saved!" : "Save Preferences"}
            </button>
        </div>
    );
}
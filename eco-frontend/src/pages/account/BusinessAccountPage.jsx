
import React, { useState } from "react";

export default function BusinessAccountPage({ navigate }) {
    const [applied, setApplied] = useState(false);
    const [form, setForm] = useState({ company: "", gst: "", industry: "", size: "" });

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Business Account</span>
            </div>
            <h1 className="text-2xl font-black text-[#1a2e1a] mb-2">Business Account</h1>
            <p className="text-sm text-gray-400 mb-6">Access bulk pricing, GST invoices and a dedicated account manager.</p>

            {}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                    { icon: "💰", title: "Bulk Pricing", desc: "Save up to 40% on orders above 500 units" },
                    { icon: "📋", title: "GST Invoices", desc: "Automated tax-compliant invoices for every order" },
                    { icon: "🚀", title: "Priority Dispatch", desc: "Same-day processing for verified business accounts" },
                    { icon: "🤝", title: "Dedicated Manager", desc: "A personal account manager for your packaging needs" },
                    { icon: "🎨", title: "Custom Branding", desc: "White-label and private-label packaging options" },
                    { icon: "📊", title: "Usage Reports", desc: "Monthly spend and carbon savings analytics" },
                ].map(b => (
                    <div key={b.title} className="flex items-start gap-3 bg-white rounded-2xl border border-[#c8e6b0] p-4 shadow-sm">
                        <span className="text-2xl flex-shrink-0">{b.icon}</span>
                        <div>
                            <p className="font-black text-[#1a2e1a] text-sm">{b.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{b.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {applied ? (
                <div className="bg-[#f0f7ea] border-2 border-[#5a9a3a] rounded-2xl p-6 text-center">
                    <p className="text-4xl mb-3">✅</p>
                    <p className="text-lg font-black text-[#1a2e1a]">Application Submitted!</p>
                    <p className="text-sm text-gray-500 mt-1">We'll review your application and get back within 2 business days.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-[#1a2e1a] mb-4">Apply for Business Account</h2>
                    <div className="space-y-3">
                        {[["company", "Company / Brand Name"], ["gst", "GST Number"], ["industry", "Industry"], ["size", "Company Size"]].map(([k, ph]) => (
                            <div key={k}>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">{ph}</label>
                                {k === "industry" ? (
                                    <select value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                                        className="w-full text-sm border-2 border-[#c8e6b0] rounded-xl px-4 py-2.5 outline-none focus:border-[#5a9a3a] bg-white">
                                        <option value="">Select industry</option>
                                        {["E-Commerce", "Food & Beverage", "Retail", "Manufacturing", "Gifting", "Other"].map(o => <option key={o}>{o}</option>)}
                                    </select>
                                ) : k === "size" ? (
                                    <select value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                                        className="w-full text-sm border-2 border-[#c8e6b0] rounded-xl px-4 py-2.5 outline-none focus:border-[#5a9a3a] bg-white">
                                        <option value="">Select size</option>
                                        {["1-10", "11-50", "51-200", "200+"].map(o => <option key={o}>{o} employees</option>)}
                                    </select>
                                ) : (
                                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph}
                                        className="w-full text-sm border-2 border-[#c8e6b0] rounded-xl px-4 py-2.5 outline-none focus:border-[#5a9a3a]" />
                                )}
                            </div>
                        ))}
                        <button onClick={() => setApplied(true)}
                            className="w-full py-3 rounded-xl bg-[#5a9a3a] text-white font-black text-sm hover:bg-[#4a8a2a] transition-colors mt-2">
                            Submit Application →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
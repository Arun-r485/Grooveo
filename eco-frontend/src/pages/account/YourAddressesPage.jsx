
import React, { useState } from "react";

const SAMPLE_ADDRESSES = [
    { id: 1, name: "Home", full: "Arjun Mehta, 14B, Green Valley Apts, Koramangala, Bengaluru – 560034", phone: "+91 98765 43210", default: true },
    { id: 2, name: "Office", full: "EcoPack HQ, 3rd Floor, Prestige Tech Park, Whitefield, Bengaluru – 560066", phone: "+91 80 4567 8900", default: false },
];

export default function YourAddressesPage({ navigate }) {
    const [addresses, setAddresses] = useState(SAMPLE_ADDRESSES);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({ name: "", full: "", phone: "" });

    const handleAdd = () => {
        if (!form.name || !form.full) return;
        setAddresses(prev => [...prev, { id: Date.now(), ...form, default: false }]);
        setForm({ name: "", full: "", phone: "" });
        setAdding(false);
    };

    const setDefault = (id) => setAddresses(prev => prev.map(a => ({ ...a, default: a.id === id })));
    const remove = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <button onClick={() => navigate("account")} className="hover:text-[#5a9a3a]">Your Account</button>
                <span>›</span><span className="text-[#1a2e1a] font-semibold">Your Addresses</span>
            </div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-[#1a2e1a]">Your Addresses</h1>
                <button onClick={() => setAdding(true)} className="px-4 py-2 rounded-xl bg-[#5a9a3a] text-white text-sm font-black hover:bg-[#4a8a2a] transition-colors">
                    + Add Address
                </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {}
                {adding && (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-[#5a9a3a] p-5 space-y-3">
                        <h3 className="font-black text-[#1a2e1a] text-sm">New Address</h3>
                        {[["name", "Label (Home / Office)"], ["full", "Full Address"], ["phone", "Phone Number"]].map(([k, ph]) => (
                            <input key={k} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                                placeholder={ph} className="w-full text-sm border-2 border-[#c8e6b0] rounded-xl px-4 py-2.5 outline-none focus:border-[#5a9a3a]" />
                        ))}
                        <div className="flex gap-2">
                            <button onClick={handleAdd} className="flex-1 py-2 rounded-xl bg-[#5a9a3a] text-white text-xs font-black hover:bg-[#4a8a2a]">Save</button>
                            <button onClick={() => setAdding(false)} className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50">Cancel</button>
                        </div>
                    </div>
                )}

                {addresses.map(addr => (
                    <div key={addr.id} className={`bg-white rounded-2xl border-2 p-5 shadow-sm ${addr.default ? "border-[#5a9a3a]" : "border-gray-100"}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-[#1a2e1a]">{addr.name}</span>
                                {addr.default && <span className="text-xs font-bold px-2 py-0.5 bg-[#f0f7ea] text-[#2d6a1a] border border-[#c8e6b0] rounded-full">Default</span>}
                            </div>
                            <button onClick={() => remove(addr.id)} className="text-xs text-[#d94f2e] hover:underline">Remove</button>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">{addr.full}</p>
                        <p className="text-xs text-gray-400 mb-3">{addr.phone}</p>
                        <div className="flex gap-2">
                            <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#c8e6b0] text-[#5a9a3a] hover:bg-[#f0f7ea] transition-colors">Edit</button>
                            {!addr.default && (
                                <button onClick={() => setDefault(addr.id)} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-[#5a9a3a] hover:text-[#5a9a3a] transition-colors">Set Default</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}





export const DELIVERY_OPTIONS = [
    { id: "standard", label: "Standard Delivery", days: "3–5 business days", price: 99, free_above: 999 },
    { id: "express", label: "Express Delivery", days: "1–2 business days", price: 199, free_above: null },
    { id: "pickup", label: "Store Pickup", days: "Ready in 4 hours", price: 0, free_above: null },
];

export const PROMO_CODES = {
    ECO10: { discount: 0.10, label: "10% off your order" },
    GREEN20: { discount: 0.20, label: "20% off your order" },
    FIRSTeco: { discount: 0.15, label: "15% off — first order" },
};

export const SUGGESTED_PRODUCTS = [
    { id: 101, name: "Eco Tape – 6 Roll Pack", price: 149, emoji: "🟩", carbonSaved: 0.1, badges: ["New"] },
    { id: 102, name: "Kraft Tissue Paper – 50 Sheets", price: 199, emoji: "🎋", carbonSaved: 0.2, badges: ["Popular"] },
    { id: 103, name: "Compostable Void Fill – 1kg", price: 299, emoji: "🌿", carbonSaved: 0.5, badges: ["Eco Pick"] },
    { id: 104, name: "Recycled Ribbon Set", price: 99, emoji: "🎀", carbonSaved: 0.1, badges: [] },
];

export const TRUST_BADGES = [
    { icon: "🔒", text: "256-bit SSL secured" },
    { icon: "↩️", text: "30-day returns" },
    { icon: "🚚", text: "Ships in 24 hrs" },
    { icon: "🌱", text: "Plants a tree" },
];
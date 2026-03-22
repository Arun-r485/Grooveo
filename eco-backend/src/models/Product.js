
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        desc: { type: String, default: "" },
        emoji: { type: String, default: "📦" },
        category: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        originalPrice: { type: Number, default: null },
        carbonSaved: { type: Number, default: 0 },
        moq: { type: Number, default: 1 },
        inStock: { type: Boolean, default: true },
        stock: { type: Number, default: 100 },
        badges: [{ type: String }],
        certifications: [{ type: String }],
        images: [{ type: String }],
        rating: { type: Number, default: 0, min: 0, max: 5 },
        numReviews: { type: Number, default: 0 },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);


productSchema.index({ name: "text", desc: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);
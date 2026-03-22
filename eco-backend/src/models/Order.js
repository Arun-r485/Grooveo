const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        emoji: { type: String },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        carbonSaved: { type: Number, default: 0 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        orderId: {
            type: String,
            unique: true,
            default: () => "ECO-" + Math.floor(100000 + Math.random() * 900000),
        },
        items: [orderItemSchema],
        shippingAddress: {
            name: { type: String },
            address: { type: String },
            city: { type: String },
            state: { type: String },
            pincode: { type: String },
            phone: { type: String },
        },
        paymentMethod: { type: String, default: "COD" },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        delivery: { type: String, enum: ["standard", "express", "pickup"], default: "standard" },
        deliveryCost: { type: Number, default: 0 },
        subtotal: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        promoCode: { type: String, default: "" },
        total: { type: Number, required: true },
        totalCO2Saved: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"],
            default: "pending",
        },
        deliveredAt: { type: Date, default: null },
        notes: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
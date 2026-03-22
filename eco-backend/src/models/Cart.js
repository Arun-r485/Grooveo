
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product:  { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    qty:      { type: Number, required: true, min: 1, default: 1 },
    
    name:     { type: String },
    price:    { type: Number },
    emoji:    { type: String },
    carbonSaved: { type: Number, default: 0 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items:     [cartItemSchema],
    promoCode: { type: String, default: "" },
    delivery:  { type: String, default: "standard" },
  },
  { timestamps: true }
);


cartSchema.virtual("total").get(function () {
  return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
});

module.exports = mongoose.model("Cart", cartSchema);
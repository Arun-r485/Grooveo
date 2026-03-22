const mongoose = require("mongoose");
const Product = require("./Product.js");

const reviewSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, trim: true, default: "" },
        helpful: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// One review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Recalculate product rating after save / delete
reviewSchema.statics.recalcRating = async function (productId) {
    const stats = await this.aggregate([
        { $match: { product: productId } },
        { $group: { _id: "$product", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    if (stats.length) {
        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(stats[0].avgRating * 10) / 10,
            numReviews: stats[0].count,
        });
    } else {
        await Product.findByIdAndUpdate(productId, { rating: 0, numReviews: 0 });
    }
};

reviewSchema.post("save", function () { this.constructor.recalcRating(this.product); });
reviewSchema.post("deleteOne", function () { this.constructor.recalcRating(this.product); });
reviewSchema.post("findOneAndDelete", function (doc) { if (doc) doc.constructor.recalcRating(doc.product); });

module.exports = mongoose.model("Review", reviewSchema);
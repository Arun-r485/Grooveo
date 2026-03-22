
const Review = require("../models/Review.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");



const getProductReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "name avatar")
            .sort({ createdAt: -1 })
            .lean();
        res.json(reviews);
    } catch (err) {
        next(err);
    }
};



const createReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const productId = req.params.productId;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        
        const already = await Review.findOne({ product: productId, user: req.user._id });
        if (already) return res.status(400).json({ message: "You have already reviewed this product" });

        
        const hasPurchased = await Order.findOne({
            user: req.user._id,
            status: "delivered",
            "items.product": productId,
        });
        if (!hasPurchased) {
            return res.status(400).json({ message: "You can only review products you have purchased and received" });
        }

        const review = await Review.create({
            product: productId,
            user: req.user._id,
            rating,
            comment,
        });

        const populated = await review.populate("user", "name avatar");
        res.status(201).json(populated);
    } catch (err) {
        next(err);
    }
};



const updateReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorised" });
        }

        review.rating = req.body.rating ?? review.rating;
        review.comment = req.body.comment ?? review.comment;
        await review.save();

        res.json(review);
    } catch (err) {
        next(err);
    }
};



const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorised" });
        }

        await review.deleteOne();
        res.json({ message: "Review deleted" });
    } catch (err) {
        next(err);
    }
};



const getMyReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ user: req.user._id })
            .populate("product", "name emoji price")
            .sort({ createdAt: -1 })
            .lean();
        res.json(reviews);
    } catch (err) {
        next(err);
    }
};

module.exports = { getProductReviews, createReview, updateReview, deleteReview, getMyReviews };
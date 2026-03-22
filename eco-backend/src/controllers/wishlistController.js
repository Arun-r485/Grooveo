
const Wishlist = require("../models/Wishlist.js");
const Product = require("../models/Product.js");



const getWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id })
            .populate("products")
            .lean();
        res.json(wishlist?.products || []);
    } catch (err) {
        next(err);
    }
};



const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
                await wishlist.save();
            }
        }

        const populated = await wishlist.populate("products");
        res.json(populated.products);
    } catch (err) {
        next(err);
    }
};



const removeFromWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) return res.json([]);

        wishlist.products = wishlist.products.filter(
            (p) => p.toString() !== req.params.productId
        );
        await wishlist.save();

        const populated = await wishlist.populate("products");
        res.json(populated.products);
    } catch (err) {
        next(err);
    }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
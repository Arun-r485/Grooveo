
const Product = require("../models/Product.js");




const getProducts = async (req, res, next) => {
    try {
        const {
            category, search, sort = "popular",
            priceMax, certs,
            page = 1, limit = 12,
            featured,
        } = req.query;

        const filter = {};

        if (category && category !== "All") filter.category = category;
        if (priceMax) filter.price = { $lte: Number(priceMax) };
        if (featured === "true") filter.isFeatured = true;

        if (certs) {
            const certArr = certs.split(",").filter(Boolean);
            if (certArr.length) filter.certifications = { $all: certArr };
        }

        if (search) {
            filter.$text = { $search: search };
        }

        
        const sortMap = {
            popular: { numReviews: -1 },
            rating: { rating: -1 },
            "price-asc": { price: 1 },
            "price-desc": { price: -1 },
            discount: { originalPrice: -1 },
            newest: { createdAt: -1 },
        };
        const sortObj = sortMap[sort] || sortMap.popular;

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort(sortObj)
            .skip(skip)
            .limit(Number(limit))
            .lean();

        res.json({
            products,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            total,
        });
    } catch (err) {
        next(err);
    }
};



const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        next(err);
    }
};



const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({ ...req.body, seller: req.user._id });
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};



const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        next(err);
    }
};



const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        next(err);
    }
};



const getCategories = async (req, res, next) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProducts, getProductById,
    createProduct, updateProduct, deleteProduct,
    getCategories,
};
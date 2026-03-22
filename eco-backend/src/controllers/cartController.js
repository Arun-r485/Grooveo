
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");


const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.product", "name price emoji carbonSaved inStock");
    if (!cart) cart = await Cart.create({ user: userId, items: [] });
    return cart;
};



const getCart = async (req, res, next) => {
    try {
        const cart = await getOrCreateCart(req.user._id);
        res.json(cart);
    } catch (err) {
        next(err);
    }
};




const addToCart = async (req, res, next) => {
    try {
        const { productId, qty = 1 } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
        if (!product.inStock) return res.status(400).json({ message: "Product is out of stock" });

        const cart = await getOrCreateCart(req.user._id);

        const existing = cart.items.find(
            (i) => i.product.toString() === productId
        );

        if (existing) {
            existing.qty += qty;
        } else {
            cart.items.push({
                product: product._id,
                qty,
                name: product.name,
                price: product.price,
                emoji: product.emoji,
                carbonSaved: product.carbonSaved,
            });
        }

        await cart.save();
        const populated = await cart.populate("items.product", "name price emoji carbonSaved inStock");
        res.json(populated);
    } catch (err) {
        next(err);
    }
};




const updateCartItem = async (req, res, next) => {
    try {
        const { qty } = req.body;
        const cart = await getOrCreateCart(req.user._id);

        const item = cart.items.find(
            (i) => i.product.toString() === req.params.productId
        );
        if (!item) return res.status(404).json({ message: "Item not in cart" });

        if (qty <= 0) {
            
            cart.items = cart.items.filter(
                (i) => i.product.toString() !== req.params.productId
            );
        } else {
            item.qty = qty;
        }

        await cart.save();
        const populated = await cart.populate("items.product", "name price emoji carbonSaved inStock");
        res.json(populated);
    } catch (err) {
        next(err);
    }
};



const removeFromCart = async (req, res, next) => {
    try {
        const cart = await getOrCreateCart(req.user._id);
        cart.items = cart.items.filter(
            (i) => i.product.toString() !== req.params.productId
        );
        await cart.save();
        res.json(cart);
    } catch (err) {
        next(err);
    }
};



const clearCart = async (req, res, next) => {
    try {
        const cart = await getOrCreateCart(req.user._id);
        cart.items = [];
        cart.promoCode = "";
        await cart.save();
        res.json({ message: "Cart cleared" });
    } catch (err) {
        next(err);
    }
};




const applyPromo = async (req, res, next) => {
    try {
        const PROMO_CODES = {
            ECO10: { discount: 0.10, label: "10% off" },
            GREEN20: { discount: 0.20, label: "20% off" },
            FIRSTeco: { discount: 0.15, label: "15% off — first order" },
        };

        const code = (req.body.code || "").trim().toUpperCase();
        if (!PROMO_CODES[code]) {
            return res.status(400).json({ message: "Invalid promo code" });
        }

        const cart = await getOrCreateCart(req.user._id);
        cart.promoCode = code;
        await cart.save();

        res.json({ message: "Promo applied", promo: PROMO_CODES[code], cart });
    } catch (err) {
        next(err);
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart, applyPromo };
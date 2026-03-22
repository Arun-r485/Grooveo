
const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");
const User = require("../models/User.js");




const placeOrder = async (req, res, next) => {
    try {
        const { shippingAddress, paymentMethod = "COD", delivery = "standard" } = req.body;

        
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        
        const DELIVERY_COST = { standard: 99, express: 199, pickup: 0 };
        const subtotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
        const deliveryCost = subtotal >= 999 && delivery === "standard"
            ? 0
            : DELIVERY_COST[delivery] || 99;

        
        const PROMO_MAP = { ECO10: 0.10, GREEN20: 0.20, FIRSTeco: 0.15 };
        const discount = cart.promoCode
            ? Math.round(subtotal * (PROMO_MAP[cart.promoCode] || 0))
            : 0;

        const total = subtotal - discount + deliveryCost;
        const totalCO2Saved = cart.items.reduce((s, i) => s + (i.carbonSaved || 0) * i.qty, 0);

        
        const items = cart.items.map((i) => ({
            product: i.product,
            name: i.name,
            emoji: i.emoji,
            qty: i.qty,
            price: i.price,
            carbonSaved: i.carbonSaved,
        }));

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress,
            paymentMethod,
            delivery,
            deliveryCost,
            subtotal,
            discount,
            promoCode: cart.promoCode || "",
            total,
            totalCO2Saved,
            status: "confirmed",
        });

        
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { totalCO2Saved },
        });

        
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.qty },
            });
        }

        
        cart.items = [];
        cart.promoCode = "";
        await cart.save();

        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

// ── @route  GET /api/orders
// ── @access Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

// ── @route  GET /api/orders/:id
// ── @access Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .lean();

        if (!order) return res.status(404).json({ message: "Order not found" });

        
        if (
            order.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Not authorised" });
        }

        res.json(order);
    } catch (err) {
        next(err);
    }
};



const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorised" });
        }

        if (["shipped", "delivered"].includes(order.status)) {
            return res.status(400).json({ message: "Cannot cancel a shipped or delivered order" });
        }

        order.status = "cancelled";
        await order.save();
        res.json(order);
    } catch (err) {
        next(err);
    }
};



const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .lean();
        res.json(orders);
    } catch (err) {
        next(err);
    }
};



const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status,
                ...(status === "delivered" && { deliveredAt: new Date() }),
            },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    placeOrder, getMyOrders, getOrderById,
    cancelOrder, getAllOrders, updateOrderStatus,
};
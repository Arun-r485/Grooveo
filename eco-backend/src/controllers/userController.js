
const User = require("../models/User.js");



const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).lean();
        res.json(user);
    } catch (err) {
        next(err);
    }
};



const updateProfile = async (req, res, next) => {
    try {
        const { name, phone, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone, avatar },
            { new: true, runValidators: true }
        ).lean();

        res.json(user);
    } catch (err) {
        next(err);
    }
};



const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 }).lean();
        res.json(users);
    } catch (err) {
        next(err);
    }
};



const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        next(err);
    }
};



const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = { getProfile, updateProfile, getAllUsers, deleteUser, updateUserRole };
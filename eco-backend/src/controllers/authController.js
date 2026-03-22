const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");



const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            token: generateToken(user._id),
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};



const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            token: generateToken(user._id),
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};



const getMe = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};



const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select("+password");
        if (!(await user.matchPassword(currentPassword))) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getMe, changePassword };
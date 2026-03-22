
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");




const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorised — no token" });
        }

        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") return res.status(401).json({ message: "Invalid token" });
        if (err.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired" });
        next(err);
    }
};



const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
        return res.status(403).json({
            message: `Role '${req.user?.role}' is not allowed to perform this action`,
        });
    }
    next();
};

module.exports = { protect, authorize };
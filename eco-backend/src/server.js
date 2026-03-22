require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const morgan = require("morgan");



const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/products.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/orders.js");
const userRoutes = require("./routes/users.js");
const reviewRoutes = require("./routes/reviews.js");
const wishlistRoutes = require("./routes/wishlist.js");


connectDB();

const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


app.use("/eco/auth", authRoutes);
app.use("/eco/products", productRoutes);
app.use("/eco/cart", cartRoutes);
app.use("/eco/orders", orderRoutes);
app.use("/eco/users", userRoutes);
app.use("/eco/reviews", reviewRoutes);
app.use("/eco/wishlist", wishlistRoutes);


app.get("/eco/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development"
    });
});


app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});


app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 EcoPackStore Server running on port ${PORT}`);
});
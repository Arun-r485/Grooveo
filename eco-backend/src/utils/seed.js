

require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const Product = require("../models/Product.js");
const User = require("../models/User.js");

const PRODUCTS = [
    { name: "Kraft Mailer Box – 200 Pack", emoji: "📦", category: "Mailer Boxes", price: 1299, originalPrice: 1699, carbonSaved: 0.8, moq: 50, inStock: true, badges: ["Bestseller", "FSC Certified"], certifications: ["FSC Certified"], desc: "Premium 100% recycled kraft boxes ideal for e-commerce shipping.", rating: 4.8, numReviews: 312, isFeatured: true },
    { name: "Compostable Poly Mailers – 100 Pack", emoji: "🟫", category: "Mailer Bags", price: 849, originalPrice: 999, carbonSaved: 1.2, moq: 25, inStock: true, badges: ["New", "BPI Certified"], certifications: ["BPI Certified", "Compostable"], desc: "Plant-based mailer bags that break down in 90 days.", rating: 4.7, numReviews: 210, isFeatured: true },
    { name: "Recycled Kraft Paper Bags – 50 Pack", emoji: "🛍️", category: "Kraft Bags", price: 499, originalPrice: 649, carbonSaved: 0.5, moq: 20, inStock: true, badges: ["Eco Pick"], certifications: ["FSC Certified"], desc: "Strong twisted-handle kraft bags for retail or gifting.", rating: 4.6, numReviews: 178, isFeatured: false },
    { name: "Biodegradable Bubble Wrap – 5m Roll", emoji: "💨", category: "Protective", price: 349, originalPrice: 449, carbonSaved: 0.6, moq: 10, inStock: true, badges: ["Plastic-Free"], certifications: ["Plastic-Free"], desc: "Corn-starch bubble wrap with zero plastic.", rating: 4.5, numReviews: 98, isFeatured: false },
    { name: "Seeded Gift Tags – 100 Pack", emoji: "🌱", category: "Gift Packaging", price: 249, originalPrice: 329, carbonSaved: 0.2, moq: 10, inStock: true, badges: ["Top Rated", "Plantable"], certifications: ["Plastic-Free"], desc: "Wildflower seed paper tags customers can plant after unboxing.", rating: 4.9, numReviews: 420, isFeatured: true },
    { name: "Mushroom Packaging Filler – 2kg", emoji: "🍄", category: "Protective", price: 599, originalPrice: 799, carbonSaved: 1.5, moq: 5, inStock: true, badges: ["Innovative"], certifications: ["Compostable"], desc: "Mycelium-grown filler that biodegrades in weeks.", rating: 4.4, numReviews: 67, isFeatured: false },
    { name: "Bamboo Tissue Paper – 200 Sheets", emoji: "🎋", category: "Gift Packaging", price: 299, originalPrice: 399, carbonSaved: 0.4, moq: 10, inStock: true, badges: ["Bamboo"], certifications: ["FSC Certified"], desc: "Luxury tissue paper from fast-growing bamboo.", rating: 4.7, numReviews: 145, isFeatured: false },
    { name: "Sugar Cane Takeaway Box – 50 Pack", emoji: "🥡", category: "Food Packaging", price: 449, originalPrice: 549, carbonSaved: 0.9, moq: 25, inStock: true, badges: ["Food Safe", "Compostable"], certifications: ["BPI Certified", "Compostable", "Food Safe"], desc: "Sugarcane bagasse box. Microwave-safe and fully compostable.", rating: 4.8, numReviews: 201, isFeatured: true },
    { name: "Honeycomb Paper Wrap – 3m Roll", emoji: "🍯", category: "Protective", price: 279, originalPrice: 349, carbonSaved: 0.7, moq: 5, inStock: true, badges: ["Paper-Based"], certifications: ["FSC Certified", "Plastic-Free"], desc: "Expandable honeycomb paper. Zero plastic cushioning.", rating: 4.5, numReviews: 112, isFeatured: false },
    { name: "Cork Wine Shipper – 2 Bottle", emoji: "🍷", category: "Specialty", price: 649, originalPrice: 849, carbonSaved: 1.3, moq: 5, inStock: true, badges: ["Premium"], certifications: ["FSC Certified"], desc: "Natural cork inserts inside recycled cardboard. Zero styrofoam.", rating: 4.7, numReviews: 55, isFeatured: false },
    { name: "Custom Eco Stamp Set", emoji: "🖊️", category: "Branding", price: 199, originalPrice: 249, carbonSaved: 0.1, moq: 1, inStock: true, badges: ["DIY Branding"], certifications: [], desc: "Personalise plain kraft boxes with 5 eco-stamp designs.", rating: 4.4, numReviews: 330, isFeatured: false },
    { name: "Glass Jar Crate – 12 Pack", emoji: "🫙", category: "Specialty", price: 799, originalPrice: 999, carbonSaved: 1.0, moq: 6, inStock: false, badges: ["Reusable"], certifications: ["FSC Certified"], desc: "Corrugated cardboard crate with dividers for glass jar shipping.", rating: 4.6, numReviews: 89, isFeatured: false },
];

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    
    await Product.deleteMany({});
    console.log("🗑️  Cleared products");

    
    await Product.insertMany(PRODUCTS);
    console.log(`🌱 Seeded ${PRODUCTS.length} products`);

    
    const existing = await User.findOne({ email: "admin@ecopack.in" });
    if (!existing) {
        await User.create({
            name: "EcoPack Admin",
            email: "admin@ecopack.in",
            password: "Admin@1234",
            role: "admin",
        });
        console.log("👤 Created admin user  →  admin@ecopack.in / Admin@1234");
    }

    
    const demoExists = await User.findOne({ email: "demo@ecopack.in" });
    if (!demoExists) {
        await User.create({
            name: "Demo User",
            email: "demo@ecopack.in",
            password: "Demo@1234",
            role: "user",
        });
        console.log("👤 Created demo user   →  demo@ecopack.in / Demo@1234");
    }

    console.log("✅ Seed complete");
    process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });
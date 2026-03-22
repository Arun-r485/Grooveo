const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 80,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false,        
        },
        phone: { type: String, default: "" },
        avatar: { type: String, default: "" },
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            default: "user",
        },
        isBusiness: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        ecoMilestone: { type: String, default: "First Step" },
        totalCO2Saved: { type: Number, default: 0 },
    },
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.methods.matchPassword = async function (entered) {
    return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);
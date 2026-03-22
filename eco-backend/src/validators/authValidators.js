const { body } = require("express-validator");

const registerRules = [
    body("name")
        .trim().notEmpty().withMessage("Name is required")
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email")
        .trim().isEmail().withMessage("Enter a valid email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/).withMessage("Password needs an uppercase letter")
        .matches(/[0-9]/).withMessage("Password needs a number")
        .matches(/[^A-Za-z0-9]/).withMessage("Password needs a special character"),
];

const loginRules = [
    body("email").trim().isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerRules, loginRules };
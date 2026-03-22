const { body } = require("express-validator");

const productRules = [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("carbonSaved").optional().isFloat({ min: 0 }),
    body("moq").optional().isInt({ min: 1 }),
];

module.exports = { productRules };
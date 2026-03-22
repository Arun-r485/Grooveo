
const router = require("express").Router();
const {
    getProducts, getProductById,
    createProduct, updateProduct, deleteProduct,
    getCategories,
} = require("../controllers/productController.js");
const { protect, authorize } = require("../middleware/auth.js");
const validate = require("../middleware/validate.js");
const { productRules } = require("../validators/productValidators.js");


router.get("/", getProducts);


router.get("/eco/categories", getCategories);


router.get("/eco/:id", getProductById);


router.post("/eco", protect, authorize("admin", "seller"), productRules, validate, createProduct);


router.put("/eco/:id", protect, authorize("admin", "seller"), updateProduct);


router.delete("/eco/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;
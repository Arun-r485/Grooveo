
const router = require("express").Router();
const {
    getCart, addToCart, updateCartItem,
    removeFromCart, clearCart, applyPromo,
} = require("../controllers/cartController.js");
const { protect } = require("../middleware/auth.js");


router.use(protect);


router.get("/eco", getCart);


router.post("/eco/cart", addToCart);


router.put("/promo", applyPromo);


router.put("/:productId", updateCartItem);


router.delete("/", clearCart);


router.delete("/:productId", removeFromCart);

module.exports = router;
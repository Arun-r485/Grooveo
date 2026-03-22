
const router = require("express").Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/wishlistController.js");
const { protect } = require("../middleware/auth.js");

router.use(protect);


router.get("/", getWishlist);


router.post("/eco/:productId", addToWishlist);


router.delete("/eco/:productId", removeFromWishlist);

module.exports = router;

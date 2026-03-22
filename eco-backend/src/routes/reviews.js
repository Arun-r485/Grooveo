
const router = require("express").Router();
const {
  getProductReviews, createReview,
  updateReview, deleteReview, getMyReviews,
} = require("../controllers/reviewController.js");
const { protect } = require("../middleware/auth.js");


router.get("/eco/my", protect, getMyReviews);


router.get("/eco/:productId", getProductReviews);


router.post("/eco/:productId", protect, createReview);


router.put("/eco/:reviewId", protect, updateReview);


router.delete("/eco/:reviewId", protect, deleteReview);

module.exports = router;


const router = require("express").Router();
const {
    placeOrder, getMyOrders, getOrderById,
    cancelOrder, getAllOrders, updateOrderStatus,
} = require("../controllers/orderController.js");
const { protect, authorize } = require("../middleware/auth.js");

router.use(protect);


router.post("/", placeOrder);


router.get("/", (req, res, next) =>
    req.user.role === "admin" ? getAllOrders(req, res, next) : getMyOrders(req, res, next)
);


router.get("/eco/:id", getOrderById);


router.put("/eco/:id/cancel", cancelOrder);


router.put("/eco/:id/status", authorize("admin"), updateOrderStatus);

module.exports = router;
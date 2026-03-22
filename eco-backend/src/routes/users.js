
const router = require("express").Router();
const {
  getProfile, updateProfile,
  getAllUsers, deleteUser, updateUserRole,
} = require("../controllers/userController.js");
const { protect, authorize } = require("../middleware/auth.js");

router.use(protect);


router.get("/eco/profile", getProfile);


router.put("/eco/profile", updateProfile);


router.get("/", authorize("admin"), getAllUsers);


router.put("/eco/:id/role", authorize("admin"), updateUserRole);


router.delete("/eco/:id", authorize("admin"), deleteUser);

module.exports = router;

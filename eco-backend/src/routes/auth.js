
const router = require("express").Router();
const { register, login, getMe, changePassword } = require("../controllers/authController.js");
const { protect } = require("../middleware/auth.js");
const validate = require("../middleware/validate.js");
const { registerRules, loginRules } = require("../validators/authValidators.js");


router.post("/register", registerRules, validate, register);


router.post("/login", loginRules, validate, login);


router.get("/me", protect, getMe);


router.put("/change-password", protect, changePassword);

module.exports = router;
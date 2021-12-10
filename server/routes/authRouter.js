const { Router } = require("express");
const {
  signup,
  login,
  protect,
  getUser,
} = require("../controllers/authController");

const router = Router();

// router.get("/", fetchUsers);
router.post("/signup", signup);
router.post("/login", login);
router.get("/", protect, getUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

module.exports = router;

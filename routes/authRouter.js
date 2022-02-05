const { Router } = require("express");
const {
  signup,
  login,
  protect,
  getUser,
  checkUsernameExist,
  forgotPassword,
} = require("../controllers/authController");

const router = Router();

// router.get("/", fetchUsers);
router.get("/", protect, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/check-username", checkUsernameExist);
// router.get("/forgot-password", test);
router.get("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

module.exports = router;

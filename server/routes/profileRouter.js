const { Router } = require("express");
const { protect } = require("../controllers/authController");
const {
  updateUser,
  uploadImage,
  getProfileImageUrl,
} = require("../controllers/profileController");
const upload = require("../middleware/upload");

const router = Router();

//Update user profile
router.patch("/", protect, updateUser);
router.post("/image", protect, upload.single("profile-image"), uploadImage);
router.get("/image", protect, getProfileImageUrl);

module.exports = router;

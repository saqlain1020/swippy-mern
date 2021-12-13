const { Router } = require("express");
const { protect } = require("../controllers/authController");
const {
  updateUser,
  uploadImage,
  getProfileImageUrl,
  toggleDirect,
  getProfileImageUrlUserId,
  getUserDataFromId,
  getUserFromTagSerial,
  attachTagToUser,
  detachTagFromUser,
  getUserByUsername,
  userScanned,
} = require("../controllers/profileController");
const upload = require("../middleware/upload");

const router = Router();

//Update user profile
router.patch("/", protect, updateUser);
router.get("/:userId", getUserDataFromId);
router.get("/username/:username", getUserByUsername);
router.post("/image", protect, upload.single("profile-image"), uploadImage);
router.get("/image", protect, getProfileImageUrl);
router.get("/image/:userId", getProfileImageUrlUserId);
router.patch("/toggle-direct", protect, toggleDirect);
router.get("/tag/:serial", getUserFromTagSerial);
router.post("/tag/:serial", protect, attachTagToUser);
router.delete("/tag/:serial", protect, detachTagFromUser);
router.get("/scanned/:serial", userScanned);

module.exports = router;

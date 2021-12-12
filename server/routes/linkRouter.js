const { Router } = require("express");
const { protect } = require("../controllers/authController");
const {
  addLink,
  getLinks,
  updateLink,
  deleteLink,
} = require("../controllers/linkController");

const router = Router();

router.post("/", protect, addLink);
router.get("/", protect, getLinks);
router.patch("/:linkId", protect, updateLink);
router.delete("/:linkId", protect, deleteLink);

module.exports = router;

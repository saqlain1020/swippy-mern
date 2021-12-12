const { Router } = require("express");
const { protect } = require("../controllers/authController");
const {
  addLink,
  getLinks,
  updateLink,
  deleteLink,
  makePrimary,
} = require("../controllers/linkController");

const router = Router();

router.post("/", protect, addLink);
router.get("/", protect, getLinks);
router.patch("/:linkId", protect, updateLink);
router.delete("/:linkId", protect, deleteLink);
router.patch("/make-primary/:linkId", protect, makePrimary);

module.exports = router;

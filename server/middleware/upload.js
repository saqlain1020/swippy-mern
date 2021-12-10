const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile-pictures");
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id.toString());
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

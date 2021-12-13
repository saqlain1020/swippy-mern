const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    url: String,
    contactCard: {
      type: Object,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required!"],
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

var Link = new mongoose.model("Link", linkSchema);
module.exports = Link;

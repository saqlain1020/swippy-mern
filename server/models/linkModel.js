const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
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
});

var Link = new mongoose.model("Link", linkSchema);
module.exports = Link;

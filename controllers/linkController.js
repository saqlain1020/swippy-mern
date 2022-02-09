const Link = require("../models/linkModel");
const User = require("../models/userModel");

exports.addLink = async (req, res) => {
  try {
    let user = req.user;
    let data = req.body;
    let link = await Link.create({ ...data, userId: user._id });
    console.log(link);
    res.status(200).json(link);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getLinks = async (req, res) => {
  try {
    let user = req.user;
    let links = await Link.find({ userId: user._id });
    console.log(links);
    res.status(200).json(links);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.updateLink = async (req, res) => {
  try {
    let user = req.user;
    let { linkId } = req.params;
    let data = req.body;
    
    console.log("in upd",data,linkId);
    let link = await Link.findOneAndUpdate(
      { userId: user._id, _id: linkId },
      data,
      { new: true }
    );
    res.status(200).json(link);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    let user = req.user;
    let { linkId } = req.params;
    let link = await Link.findOneAndDelete({ userId: user._id, _id: linkId });
    res.status(200).json(link);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.makePrimary = async (req, res) => {
  try {
    let user = req.user;
    let { linkId } = req.params;
    await Link.updateMany({ userId: user._id }, { isPrimary: false });
    await Link.update({ _id: linkId, userId: user._id }, { isPrimary: true });
    user = await User.findById(user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

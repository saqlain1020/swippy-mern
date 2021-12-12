const Link = require("../models/linkModel");

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
    console.log(data);
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

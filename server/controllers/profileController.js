const User = require("../models/userModel");

//update mongo user object
exports.updateUser = async (req, res) => {
  try {
    let user = req.user;
    let userData = req.body;
    console.log(userData, user._id);
    var updatedUser = await User.findOneAndUpdate({ _id: user._id }, userData, {
      new: true, //return new updated data
      runValidators: true, //validate fields before updating
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getUserDataFromId = async (req, res) => {
  try {
    let { userId } = req.params;
    var user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.uploadImage = (req, res) => {
  try {
    console.log(req.file);
    var fullUrl = req.protocol + "://" + req.get("host");
    console.log(fullUrl);
    res.status(200).json({});
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getProfileImageUrl = (req, res) => {
  try {
    var fullUrl = req.protocol + "://" + req.get("host");
    console.log(
      fullUrl + "/uploads/profile-pictures/" + req.user._id.toString()
    );
    let url = fullUrl + "/uploads/profile-pictures/" + req.user._id.toString();
    res.status(200).json(url);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getProfileImageUrlUserId = (req, res) => {
  try {
    var fullUrl = req.protocol + "://" + req.get("host");
    console.log(
      fullUrl + "/uploads/profile-pictures/" + req.params.userId.toString()
    );
    let url =
      fullUrl + "/uploads/profile-pictures/" + req.params.userId.toString();
    res.status(200).json(url);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.toggleDirect = async (req, res) => {
  try {
    let user = req.user;
    let userModel = await User.findById(user._id);
    let response = await userModel.toggleDirect();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getUserFromTagSerial = async (req, res) => {
  try {
    let { serial } = req.params;
    let user = await User.findOne({ tags: serial });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.attachTagToUser = async (req, res) => {
  try {
    let { serial } = req.params;
    let user = req.user;
    let existingUser = await User.findOne({ tags: serial });
    if (!existingUser) {
      let response = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { tags: serial } },
        { new: true }
      );
      res.status(200).json(response);
    } else {
      res.status(500).json({
        status: "error",
        error: "Tag already exists",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.detachTagFromUser = async (req, res) => {
  try {
    let { serial } = req.params;
    let user = req.user;
    let rsponse = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { tags: serial } },
      { new: true }
    );
    res.status(200).json(rsponse);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

const User = require("../models/userModel");
const { calcProfileImageUrl } = require("../utility/commonFunctions");

//update mongo user object
exports.updateUser = async (req, res) => {
  try {
    let user = req.user;
    let userData = req.body;
    userData = { ...userData, displayPhoto: calcProfileImageUrl(req) };
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
    user = user.toObject()
    user = { ...user, displayPhoto: calcProfileImageUrl(req, userId) };
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
    res.status(200).json(calcProfileImageUrl(req));
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getProfileImageUrl = (req, res) => {
  try {
    res.status(200).json(calcProfileImageUrl(req));
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getProfileImageUrlUserId = (req, res) => {
  try {
    res.status(200).json(calcProfileImageUrl(req, req.params.userId));
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
    user = user.toObject()
    user = { ...user, displayPhoto: calcProfileImageUrl(req, user._id) };
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
      response = response.toObject()
      response = {
        ...response,
        displayPhoto: calcProfileImageUrl(req, response._id),
      };
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
    let response = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { tags: serial } },
      { new: true }
    );
    response = response.toObject()
    response = {
      ...response,
      displayPhoto: calcProfileImageUrl(req, response._id),
    };
    res.status(200).json(rsponse);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    let { username } = req.params;
    let user = await User.findOne({ username: username });
    user = user.toObject()
    user = { ...user, displayPhoto: calcProfileImageUrl(req, user._id) };
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.userScanned = async (req, res) => {
  try {
    let { serial } = req.params;

    let user = await User.findOneAndUpdate(
      { tags: serial },
      { $inc: { scanCount: 1 } },
      { new: true }
    );
    user = { ...user.toObject(), displayPhoto: calcProfileImageUrl(req, user._id) };
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

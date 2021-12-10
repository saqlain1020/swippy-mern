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

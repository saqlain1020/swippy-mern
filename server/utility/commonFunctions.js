exports.calcProfileImageUrl = (req, _id = null) => {
  try {
    let id = _id || req.user._id.toString();

    var fullUrl = req.protocol + "://" + req.get("host");
    let url = fullUrl + "/uploads/profile-pictures/" + id;
    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

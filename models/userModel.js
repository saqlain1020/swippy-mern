const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require('fs')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "user name is required!"],
      immutable: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    scanCount: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      unique: true, //indexing
      required: true, //TODO: check email pattern //validation
      lower: true, // user@gmail.com & User@gmail.com //modification
    },
    displayPhoto: {
      type: String,
    },
    direct: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false, //security
    },
    tags: {
      type: [String],
      default: [],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//model instance method -> this method will be available for all the documents created by this model
userSchema.methods.passwordVerification = async (password, hasedPassword) => {
  return await bcrypt.compare(password, hasedPassword);
};

//password reset token generator
userSchema.methods.passwordResetTokenGenerator = function () {
  //this -> user document
  //generate random string of 32 bits
  var resetToken = crypto.randomBytes(32).toString("hex");
  //encrypt reset token
  var encryptedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //save encrypted resettoken in user document
  this.passwordResetToken = encryptedResetToken;
  //set token expiry (10 min)
  this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
  //return non-encrypted reset token
  return resetToken;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") && !this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  this.username = this.username.toLowerCase();
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isNew && !this.name) this.name = this.username;
  next();
});

userSchema.pre("save", async function (next) {
  //this -> document
  if (!this.isModified("password")) return next();
  var encryptedPassword = await bcrypt.hash(this.password, 12); //number brute force attack
  this.password = encryptedPassword;
  next();
});

// // Check if tag is unique before saving tags
// userSchema.pre("updateOne", async function (next) {
//   //this -> document
//   console.log("in save middle")
//   this.model.findById(this._id).then(user=>console.log(user))
//   if (!this.isModified("tags")) return next();

//   // var encryptedPassword = await bcrypt.hash(this.password, 12); //number brute force attack
//   // this.password = encryptedPassword;
//   next();
// });

//virtual populate
userSchema.virtual("socialLinks", {
  ref: "Link",
  foreignField: "userId", //referencing -> populate
  localField: "_id", //referencing -> populate
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "socialLinks",
  });
  next();
});

userSchema.methods.toggleDirect = function () {
  this.direct = !this.direct;
  this.save();
  return this;
};

var User = new mongoose.model("User", userSchema);
module.exports = User;

const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const { calcProfileImageUrl } = require("../utility/commonFunctions");
const sgMail = require("../utility/sendgrid")
const nodemailer = require("nodemailer")

const signJWT = (userId) => {
  return JWT.sign({ id: userId }, process.env.JWT_WEB_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, res) => {
  var token = signJWT(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "development" ? false : true, //this will only valid for HTTPS connection
    httpOnly: process.env.NODE_ENV === "development" ? false : true, //transfer only in http/https protocols
  });
  res.status(200).json({
    status: "success",
    token: token,
    user,
  });
};

exports.signup = async (req, res) => {
  try {
    //encryption
    var user = await User.create(req.body); //bson
    //profile creation
    user = { ...user, displayPhoto: calcProfileImageUrl(req, user._id) };
    createAndSendToken(user, res);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    var { email, password } = req.body;
    //check if user & email exits
    if (!email || !password) {
      return res.status(404).json({
        status: "error",
        error: "please enter email & password",
      });
    }
    //fetch user whose email is given
    var user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        error: "invalid email or password",
      });
    }
    //verify password
    //enceptyed ps === password
    var passwordVerified = await user.passwordVerification(
      password,
      user.password
    );
    if (!passwordVerified || !user) {
      return res.status(401).json({
        status: "error",
        error: "invalid email or password",
      });
    }

    // bson to json

    let { password: p, ...profile } = user.toJSON();

    profile = {
      ...profile,
      displayPhoto: calcProfileImageUrl(req, profile._id),
    };
    createAndSendToken(profile, res);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    var token = null;
    // 1- fetch token from request header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") // authorization: Bearer {token}
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2- check if token exits
    if (!token) {
      return res.status(401).json({
        error: "please sign in!",
      });
    }
    // 3- verify
    var { id: userId, iat: tokenIssuedAt } = await promisify(JWT.verify)(
      token,
      process.env.JWT_WEB_SECRET
    ); //converting callback function to async await method (promise)
    // 4- check if user exist in DB
    var user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        error: "user belonging to this token does not exist!",
      });
    }
    // 5- check if user doesnt change password after signing token
    var passwordChangedAt = user.passwordChangedAt;
    if (passwordChangedAt) {
      var isPasswordChangedAfter =
        passwordChangedAt.getTime() > tokenIssuedAt * 1000;
      if (isPasswordChangedAfter) {
        return res.status(401).json({
          error: "password has been changed, please login again!",
        });
      }
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    user = {
      ...req.user.toJSON(),
      displayPhoto: calcProfileImageUrl(req, req.user._id),
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.checkUsernameExist = async (req, res) => {
  try {
    let username = req.query.username.toLowerCase();
    let user = await User.findOne({ username });
    console.log(user);
    console.log(username);
    res.status(200).json({
      isAvailable: user ? false : true,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    var email = req.query.email.toLowerCase();
    //1 - fetch user on the basis of email
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "no user found!",
      });
    }
    //2 - generate reset token
    var resetToken = user.passwordResetTokenGenerator();
    await user.save({ validateBeforeSave: false }); //saving already existing doc
    //3 - send it to user's email
    const msg = {
      to: email, // Change to your recipient
      from: process.env.SENDGRID_FROM_MAIL, // Change to your verified sender
      subject: 'Password Reset Email',
      html: `please click to that link for changing your password, note that the link will expires in 10 min - <a href="http://localhost:3000/auth/change-password/${resetToken}">Click Here</a> http://localhost:3000/auth/change-password/${resetToken}`,
    }
    // await sgMail.send(msg);

    let transporter = nodemailer.createTransport({
    service: "Gmail",
      // secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_FROM_MAIL, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail(msg);

    res.status(200).json({
      status: "success",
      msg: "reset token has been sent to the email",
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //get user on the basis of passwordResetToken
    var { token } = req.params;
    var { password, passwordConfirm } = req.body;
    var encryptedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    var user = await User.findOne({
      passwordResetToken: encryptedResetToken,
      passwordResetTokenExpiresAt: { $gt: Date.now() },
    });
    //if user doesnt exist then send error in response
    if (!user) {
      return res.status(401).json({
        error: "token doesnt exist or has been expired!",
      });
    }
    //set user new password
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    await user.save();
    createAndSendToken(user, res);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

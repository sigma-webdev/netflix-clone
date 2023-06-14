const asyncHandler = require("../middleware/asyncHandler.js");
const userModel = require("../model/userSchema.js");
const customError = require("../utils/customError.js");
const bcrypt = require("bcrypt");
const cookieOptions = require("../utils/cookieOption.js");
const transporter = require("../config/emailConfig.js");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const userExist = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const result = await userModel.findOne({ email: email });
  console.log(result);
  if (result) {
    return res.status(200).json({ success: true, isUserExist: true });
  } else {
    return res.status(200).json({ success: false, isUserExist: false });
  }
});

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userInfo = userModel({ email, password });
  const result = await userInfo.save();
  result.password = undefined;
  const jwtToken = result.generateJwtToken();
  res.cookie("token", jwtToken, cookieOptions);
  return res.status(200).json({ success: true, data: result });
});

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // check user exist or not
  const user = await userModel.findOne({ email }).select("+password");
  if (!user)
    return next(
      new customError(
        "sorry we can't find you account with this email address please try again or create a new account",
        400
      )
    );
  // check the password is correct or not
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return next(
      new customError(
        "Incorrect password. Please try again or reset password",
        400
      )
    );

  const jwtToken = user.generateJwtToken();
  res.cookie("token", jwtToken, cookieOptions);
  res.status(200).json({ success: true, data: user });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new customError("Email is required", 400));
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(
      new customError("No account found for this email address.", 404)
    );
  }
  const resetToken = user.getForgotPasswordToken();
  await user.save();

  const resetUrl = `${req.headers.referer}reset_password/${resetToken}`;

  // create mail content
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: user.email,
    subject: "Netflix reset password",
    html: `<b>Hello ${user.name}</b><br>
               <a href="${resetUrl}" target ="_blank" >Click here to reset password</a>`
  };

  // send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;
      await user.save();
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Further instructions sent on you email " + email
    });
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password, conformPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  if (!password || !conformPassword) {
    return next(
      new customError("password and conform Password is Required", 400)
    );
  }

  // check user is exist
  const user = await userModel.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiryDate: { $gt: new Date(Date.now()) }
  });

  if (!user) {
    return next(
      new customError("forgot password token is invalid or expired", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();

  // create jwt token and send  to client,
  const JwtToken = user.generateJwtToken();
  res.status(200).cookie("Token", JwtToken, cookieOptions).json({
    success: true,
    message: "successfully updated the password",
    Token: token
  });
});

const signOut = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: new Date().now, // 7 days
    path: "/",
    sameSite: "Lax"
  });
  res.status(200).json({ success: true, message: "log out successful" });
});

const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const result = await userModel.findById(userId);
  return res.status(200).json({ success: true, data: result });
});

module.exports = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  userExist,
  getUser,
  signOut
};

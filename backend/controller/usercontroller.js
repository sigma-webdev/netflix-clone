const asyncHandler = require("../middleware/asyncHandler.js");
const userModel = require("../model/userSchema.js");
const customError = require("../utils/customerror.js");

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userInfo = userModel({ email, password });
  await userInfo.save();
});

const singIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check user exist or not
  const user = await userModel.findOne({ email }).select("+password");
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!user) return next(customError("user not found", 400));

  const jwtToken = user.jwtToken();

  res.cookie("token", token, cookieOptions);
  res.status(200).json({ success: true, data: user });
});

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(CustomError("Email is required", 400));
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const resetToken = user.generateForgotPasswordToken();
  await user.save();

  const resetUrl = `${req.headers.referer}reset_password/${resetToken}`;

  // create mail content
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: user.email,
    subject: "Event managment Reset password",
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
      message: "Furthre instrunctions sent on you email " + email
    });
  });
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  if (!password || !confirmPassword) {
    return next(
      new CustomError("password and conform Password is Required", 400)
    );
  }

  // check user is exist
  const user = await userModel.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: new Date(Date.now()) }
  });
  if (!user) {
    return next(
      new CustomError("forgot password token is invalid or expired", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();

  // create jwt token and send  to client,
  const JwtToken = user.getJwtToken();
  res.status(200).cookie("Token", JwtToken, cookieOptions).json({
    success: true,
    message: "successfuly updated the password",
    Token: token
  });
};

module.exports = { singIn, signUp, resetPassword };

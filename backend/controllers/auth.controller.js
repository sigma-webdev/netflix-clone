const crypto = require("crypto");

const validator = require("email-validator");
const bcrypt = require("bcrypt");

const asyncHandler = require("../middleware/asyncHandler.js");
const userModel = require("../models/user.model.js");
const CustomError = require("../utils/customError.js");
const cookieOptions = require("../utils/cookieOption.js");
const transporter = require("../config/email.config.js");

/******************************************************
 * @userExist
 * @route /api/v1/auth/user-exist
 * @description check if the user registered or not
 * @body email
 * @returns object with isUserExist boolean value
 ******************************************************/

const userExist = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  // check if the email is valid or not using email-validator npm package
  const isEmailValid = validator.validate(email);

  if (!isEmailValid)
    return next(new CustomError("Please enter a valid email 📩", 400));

  // If email is valid and user with this emailID is present in database
  // return return isUserExist true or false if not present
  const result = await userModel.findOne({ email: email });

  const data = {};

  if (result) {
    data["isUserExist"] = true;
    data["email"] = email;
  } else {
    data["isUserExist"] = false;
    data["email"] = email;
  }

  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: data.isUserExist ? "User exist" : "User does not exist",
    data: data,
  });
});

/******************************************************
 * @signUp
 * @route /api/v1/auth/signUp
 * @description  register the user
 * @body email , password
 * @returns user object and jwtToken in cookie
 ******************************************************/
const signUp = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Email and Password are required.", 400));
  }
  // this regex will check the password has at-least 1 capital letter, one symbol , one number and must contain 6-10 characters
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,60}$/;
  if (!passwordRegex.test(password)) {
    return next(
      new CustomError(
        "password must be 6 to 60 characters in length and contain at-least one capital letter, one symbol and one number",
        400
      )
    );
  }

  // check if the email is valid or not using email-validator npm package
  const isEmailValid = validator.validate(email);

  if (!isEmailValid)
    return next(new CustomError("Please enter a valid email 📩", 400));

  const user = await userModel.findOne({ email: email });
  if (user)
    return next(
      new CustomError(`user with email: ${email} already exist`, 409)
    );

  const userInfo = userModel({ email, password });

  const result = await userInfo.save();
  result.password = undefined;

  // get the jwt token form userSchema methods
  const jwtToken = result.generateJwtToken();
  // return jwtToken in cookie and user object
  res.cookie("token", jwtToken, cookieOptions);
  return res.status(201).json({
    statusCode: 201,
    success: true,
    message: "successfully registered the user",
    data: result,
    token: jwtToken,
  });
});

/******************************************************
 * @signIn
 * @route /api/v1/auth/signin
 * @description  authenticate the user using jwt with given credentials, if user is authenticated return user object with jwtToken in cookie
 * @body email , password
 * @returns user object and jwtToken in cookie
 ******************************************************/
const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const isEmailValid = validator.validate(email);

  if (!isEmailValid)
    return next(new CustomError("Please enter a valid email 📩", 400));

  // check user exist or not if not return error message
  const user = await userModel.findOne({ email }).select("+password");

  if (!user)
    return next(
      new CustomError(
        "Sorry we can't find you account with this email address please try again or create a new account",
        404
      )
    );

  // check the password is correct or not if not return error message
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect)
    return next(
      new CustomError(
        "Incorrect password. Please try again or reset password",
        400
      )
    );

  user.password = undefined;

  // get the jwt token form userSchema methods
  const jwtToken = user.generateJwtToken();
  // return jwtToken in cookie and user object
  res.cookie("token", jwtToken, cookieOptions);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "successfully singIn",
    data: user,
    token: jwtToken,
  });
});

/******************************************************
 * @forgot-password
 * @route /api/v1/auth/forgot-password
 * @description send email for reset password if the user with that email is exist
 * @body email
 * @returns user object and jwtToken in cookie
 ******************************************************/
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // if email is missing form body return error message
  if (!email) return next(new CustomError("Email is required", 400));

  // get the user from database using email
  const user = await userModel.findOne({ email });

  // if user is not present in database return error message
  if (!user) {
    return next(
      new CustomError("No account found for this email address.", 404)
    );
  }

  // get the forgotPasswordToken from userSchema methods and save the user with the forgotPasswordToken
  const resetToken = user.getForgotPasswordToken();

  await user.save();

  // create the url for reset password which we will send on user email-id
  // this url will help user to reset the password

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  // create mail content
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: user.email,
    subject: "Complete your password reset request",
    html: `<b>Hello ${user.name}</b><br>
               <a href="${resetUrl}" target ="_blank" >Click here to reset password</a>`,
  };

  // send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiryDate = undefined;
      await user.save();
      return next(error);
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Further instructions sent on you email:" + email,
      data: null,
    });
  });
});

/******************************************************
 * @reset-password
 * @route /api/v1/auth/reset-password
 * @description reset user password
 * @body password and confirmPassword
 * @param token
 * @returns return message if password is successfully updated
 ******************************************************/
const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(
      new CustomError("password and confirmPassword are required", 400)
    );
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,60}$/;
  if (!passwordRegex.test(password)) {
    return next(
      new CustomError(
        "password must be 6 to 60 characters in length and contain at-least one capital letter, one symbol and one number",
        400
      )
    );
  }
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // check both password and confirmPassword are present in body , if not send error message
  if (!password || !confirmPassword) {
    return next(
      new CustomError("Both Password and confirm Password are Required", 400)
    );
  }

  // check the password and confirmPassword are same or not, if different return error message
  if (password !== confirmPassword) {
    return next(
      new CustomError("Password and confirm password do not match", 400)
    );
  }

  // check user is exist
  const user = await userModel.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiryDate: { $gt: new Date(Date.now()) },
  });

  if (!user) {
    return next(
      new CustomError("Forgot password token is invalid or expired", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiryDate = undefined;

  await user.save();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Successfully updated the password",
    data: null,
  });
});

/******************************************************
 * @signOut
 * @route /api/v1/auth/signout
 * @description signout the user by setting the cookie without jwtToken
 * @returns return logged out message
 ******************************************************/
const signOut = asyncHandler(async (req, res, next) => {
  // set the cookie without jwtToken
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: new Date().now, //  current date
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Logged out successfully",
    data: null,
  });
});

/******************************************************
 * @getUser
 * @route /api/v1/auth/user
 * @description get user by id
 * @params userId
 * @returns user object
 ******************************************************/
const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // get user from database using user id
  const user = await userModel.findById(userId);

  // if user is null return error message
  if (!user) {
    return next(new CustomError("User Not found", 400));
  }
  return res.status(200).json({
    statusCode: 200,
    success: true,
    message: "logged in user details",
    data: user,
  });
});

module.exports = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  userExist,
  signOut,
  getUser,
};

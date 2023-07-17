const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
      select: false,
    },
    plan: {
      type: String,
      default: "NONE",
      maxLength: [15, "Plan must be less than 50 characters"],
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        select: false,
      },
    ],
    watchList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        select: false,
      },
    ],
    subscription: {
      id: String,
      status: String,
      startDate: Date,
      expiryDate: Date,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    forgotPasswordExpiryDate: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// pre middleware function
userSchema.pre("save", async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  return next();
});

// schema methods
userSchema.methods = {
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString("hex");

    //step 1 - save to DB
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    // forgot password expiry date
    this.forgotPasswordExpiryDate = new Date(Date.now() + 20 * 60 * 1000); // 20min

    //step 2 - return values to user
    return forgotToken;
  },
  generateJwtToken() {
    const token = JWT.sign(
      { id: this._id, email: this.email, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return token;
  },
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

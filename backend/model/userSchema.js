const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const contentModel = require("./contentSchema");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: true,
      lowercase: true,
      unique: [true, "already registered"],
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
      enum: ["PREMIUM", "STANDARD", "BASIC", "MOBILE", "NONE"],
    },
    watchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    subscription: {
      id: String,
      status: String,
    },
    role: { type: String, default: "USER", enum: ["ADMIN", "USER"] },
    forgotPasswordExpiryDate: { type: Date, select: false },
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

    /// forgot password expiry date
    this.forgotPasswordExpiryDate = new Date(Date.now() + 20 * 60 * 1000); // 20min

    //step 2 - return values to user
    return forgotToken;
  },
  generateJwtToken() {
    const token = JWT.sign(
      { id: this._id, email: this.email },
      process.env.SECRETE,
      { expiresIn: 24 * 60 * 60 * 1000 } //24
    );
    return token;
  },
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

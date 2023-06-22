const express = require("express");
const {
  createSubscription,
  getRazorpayApiKey,
  verifySubscription
} = require("../controller/paymentController");
const jwtAuth = require("../middleware/jwtAuth.js");
const paymentRouter = express.Router();

paymentRouter.route("/subscribe").post(jwtAuth, createSubscription);
paymentRouter.route("/razorpaykey").get(jwtAuth, getRazorpayApiKey);
paymentRouter.route("/verifysubscription").post(jwtAuth, verifySubscription);

module.exports = paymentRouter;

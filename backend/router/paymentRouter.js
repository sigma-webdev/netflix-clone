const express = require("express");
const {
  buySubscription,
  getRazorpayApiKey,
  verifySubscription
} = require("../controller/paymentController");
const jwtAuth = require("../middleware/jwtAuth.js");
const paymentRouter = express.Router();

paymentRouter.route("/subscribe").post(jwtAuth, buySubscription);
paymentRouter.route("/rasorpaykey").get(jwtAuth, getRazorpayApiKey);
paymentRouter.route("/verifysubscription").post(jwtAuth, verifySubscription);

module.exports = paymentRouter;

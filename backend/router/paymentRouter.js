const express = require("express");
const { buySubscription } = require("../controller/paymentController");

const paymentRouter = express.Router();

paymentRouter.route("/subscribe").get(buySubscription);

module.exports = paymentRouter;

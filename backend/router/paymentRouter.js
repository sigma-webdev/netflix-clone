const express = require("express");
const {
  createSubscription,
  getRazorpayApiKey,
  verifySubscription,
  createPlan,
  deletePlan,
  updatePlan,
  getPlans,
} = require("../controller/paymentController");
const jwtAuth = require("../middleware/jwtAuth.js");
const authAdmin = require("../middleware/authAdmin");

const paymentRouter = express.Router();

paymentRouter.route("/subscribe").post(jwtAuth, createSubscription);

paymentRouter.route("/rasorpaykey").get(jwtAuth, getRazorpayApiKey);

paymentRouter
  .route("/verify-subscription")
  .post(jwtAuth, authAdmin, verifySubscription);

paymentRouter
  .route("/plan")
  .post(jwtAuth, authAdmin, createPlan)
  .get(jwtAuth, authAdmin, getPlans);

paymentRouter
  .route("/plan/:planDocumentId")
  .delete(jwtAuth, authAdmin, deletePlan)
  .patch(jwtAuth, authAdmin, updatePlan);

module.exports = paymentRouter;

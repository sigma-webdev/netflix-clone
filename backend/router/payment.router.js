const express = require("express");
const {
  createSubscription,
  getRazorpayApiKey,
  verifySubscription,
  createPlan,
  deletePlan,
  updatePlan,
  getPlans,
} = require("../controller/payment.controller.js");
const jwtAuth = require("../middleware/jwtAuth.js");
const authorizeRoles = require("../middleware/authorizeRoles.js");

const paymentRouter = express.Router();

paymentRouter.route("/subscribe").post(jwtAuth, createSubscription);

paymentRouter.route("/rasorpaykey").get(jwtAuth, getRazorpayApiKey);

paymentRouter
  .route("/verify-subscription")
  .post(jwtAuth, authorizeRoles("USER , ADMIN"), verifySubscription);

paymentRouter
  .route("/plan")
  .post(jwtAuth, authorizeRoles("ADMIN"), createPlan)
  .get(jwtAuth, authorizeRoles("ADMIN"), getPlans);

paymentRouter
  .route("/plan/:planDocumentId")
  .delete(jwtAuth, authorizeRoles("ADMIN"), deletePlan)
  .patch(jwtAuth, authorizeRoles("ADMIN"), updatePlan);

module.exports = paymentRouter;

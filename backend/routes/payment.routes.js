const express = require("express");
const {
  createSubscription,
  getRazorpayApiKey,
  verifySubscription,
  createPlan,
  deletePlan,
  updatePlan,
  getPlans,
} = require("../controllers/payment.controller.js");
const jwtAuth = require("../middlewares/jwtAuth.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");

const paymentRouter = express.Router();

paymentRouter.route("/subscribe/:planId").post(jwtAuth, createSubscription);

paymentRouter.route("/rasorpaykey").get(jwtAuth, getRazorpayApiKey);

paymentRouter
  .route("/verifySubscription")
  .post(jwtAuth, authorizeRoles("USER", "ADMIN"), verifySubscription);

paymentRouter
  .route("/plan")
  .post(jwtAuth, authorizeRoles("ADMIN"), createPlan)
  .get(jwtAuth, getPlans);

paymentRouter
  .route("/plan/:planDocumentId")
  .delete(jwtAuth, authorizeRoles("ADMIN"), deletePlan)
  .patch(jwtAuth, authorizeRoles("ADMIN"), updatePlan);

module.exports = paymentRouter;

const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: [true, "plan name is required"],
    uppercase: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    maxLength: [250, "Plan description must be less than 250 characters "],
  },
  planId: { type: String, required: [true, "planId is required"] },
  active: {
    type: Boolean,
    default: false,
    required: [true, "plane Id is required"],
  },
  amount: {
    type: Number,
    required: [true, "billing amount is required"],
  },
});

const SubscriptionPlanModel = mongoose.model("SubscriptionPlan", planSchema);
module.exports = SubscriptionPlanModel;

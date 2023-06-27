const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  razorpaySubscriptionId: {
    type: String,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
  },
});

const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = paymentModel;

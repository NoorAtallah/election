const stripe = require("../config/stripe");
const { Advertisement } = require("../models");

// Create a payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { ad_id, total_amount, payment_method_id } = req.body;

    if (!ad_id || !total_amount || !payment_method_id) {
      return res.status(400).json({
        error: "ad_id, total_amount, and payment_method_id are required",
      });
    }

    const advertisement = await Advertisement.findByPk(ad_id);

    if (!advertisement) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_amount), // Use total_amount from request body
      currency: "usd",
      payment_method: payment_method_id, // Use payment_method_id from request body
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Disables redirects
      },
    });

    await advertisement.update({
      stripeChargeId: paymentIntent.id, // Ensure this field exists in your model
    });

    res.status(200).json({ success: true, paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: error.message || "Payment failed" });
  }
};

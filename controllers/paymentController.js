const Razorpay = require("razorpay");
const crypto   = require("crypto");

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/* ============================
   CREATE RAZORPAY ORDER
   POST /api/payment/create-order
============================ */
const createOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(amount * 100), // Razorpay takes paise (₹1 = 100 paise)
      currency: "INR",
      receipt:  "receipt_" + Date.now()
    });

    res.json({
      success:  true,
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID   // safe to send to frontend
    });

  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).json({ error: "Failed to create payment order." });
  }
};

/* ============================
   VERIFY PAYMENT SIGNATURE
   POST /api/payment/verify
============================ */
const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment fields." });
  }

  try {
    // Razorpay signature = HMAC-SHA256 of "order_id|payment_id" using key_secret
    const body      = razorpay_order_id + "|" + razorpay_payment_id;
    const expected  = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed. Invalid signature." });
    }

    res.json({ success: true, paymentId: razorpay_payment_id });

  } catch (err) {
    console.error("Razorpay verify error:", err);
    res.status(500).json({ error: "Server error during verification." });
  }
};

module.exports = { createOrder, verifyPayment };
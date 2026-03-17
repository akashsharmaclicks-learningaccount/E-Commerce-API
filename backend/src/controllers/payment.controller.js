const Razorpay = require("razorpay");
const db = require("../config/db");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const [cartItems] = await db.query(
      `SELECT cart_items.quantity, products.price
         FROM cart_items
         JOIN products ON cart_items.product_id = products.id
         WHERE cart_items.user_id = ?`,
      [userId],
    );
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    const options = {
      amount: total * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generatedSignature === razorpay_signature) {
      res.json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

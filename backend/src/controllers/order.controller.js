const db = require("../config/db");
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get cart items with product details
    const [cartItems] = await db.query(
      `SELECT cart_items.product_id, cart_items.quantity, products.price
   FROM cart_items
   JOIN products ON cart_items.product_id = products.id
   WHERE cart_items.user_id = ?`,
      [userId],
    );
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total price
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    // Create order
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, total],
    );
    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of cartItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price],
      );
    }

    // Clear cart
    await db.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);
    res.json({ message: "Order placed successfully", orderId });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

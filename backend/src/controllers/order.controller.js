const db = require("../config/db");
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const [cartItems] = await db.query(
      `SELECT cart_items.product_id, cart_items.quantity, products.price, products.stock
       FROM cart_items
       JOIN products ON cart_items.product_id = products.id
       WHERE cart_items.user_id = ?`,
      [userId],
    );

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let total = 0;

    // Check stock
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        return res.status(400).json({
          message: `Product ${item.product_id} is out of stock`,
        });
      }

      total += item.price * item.quantity;
    }

    // Create order
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, total],
    );

    const orderId = orderResult.insertId;

    // Insert order items + update stock
    for (const item of cartItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price],
      );

      await db.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.product_id,
      ]);
    }

    // Clear cart
    await db.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    res.json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ?", [
      userId,
    ]);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

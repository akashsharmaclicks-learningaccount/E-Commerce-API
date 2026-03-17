const db = require("../config/db");
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }
    await db.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [userId, productId, quantity],
    );
    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const [cartItems] = await db.query(
      `SELECT cart_items.id,
        products.name,
        products.price,
        cart_items.quantity
        FROM cart_items
        JOIN products ON cart_items.product_id = products.id
        WHERE cart_items.user_id = ?`,
      [userId],
    );
    res.json(cartItems);
  } catch (error) {
    console.error("Error viewing cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

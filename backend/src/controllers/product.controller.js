const db = require("../config/db");
exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await db.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock],
    );
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

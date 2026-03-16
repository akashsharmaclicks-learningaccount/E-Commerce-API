const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
} = require("../controllers/product.controller");

const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

router.get("/", getProducts);

// Admin-only route to create a product
router.post("/", verifyToken, isAdmin, createProduct);

module.exports = router;

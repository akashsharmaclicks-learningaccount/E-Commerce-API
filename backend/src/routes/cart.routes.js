const express = require("express");
const router = express.Router();

const {
  addToCart,
  viewCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, viewCart);
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;

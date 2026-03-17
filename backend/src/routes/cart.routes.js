const express = require("express");
const router = express.Router();

const { addToCart } = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/add", verifyToken, addToCart);

module.exports = router;

const express = require("express");
const router = express.Router();

const { addToCart, viewCart } = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, viewCart);
module.exports = router;

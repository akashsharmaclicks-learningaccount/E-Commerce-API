const express = require("express");
const router = express.Router();

const { checkout, getOrders } = require("../controllers/order.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/checkout", verifyToken, checkout);
router.get("/", verifyToken, getOrders);
module.exports = router;

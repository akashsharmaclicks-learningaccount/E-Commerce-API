const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
module.exports = router;

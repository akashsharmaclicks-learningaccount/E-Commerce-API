const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "E-Commerce API is running 🚀" });
});

module.exports = app;

const app = require("./src/app");
const db = require("./src/config/db");
const PORT = process.env.PORT || 5000;

db.getConnection()
  .then((connection) => {
    console.log("✅ MySQL Connected Successfully");
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

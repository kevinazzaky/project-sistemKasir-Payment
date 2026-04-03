// File: src/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Kita panggil routes-nya di sini
// Pastikan folder & file ini benar-benar ada di dalam src/infrastructure/routes/
try {
  const orderRoutes = require("./infrastructure/routes/orderRoutes");
  app.use("/api/orders", orderRoutes);
  console.log("✅ Jalur OrderRoutes berhasil dimuat!");
} catch (err) {
  console.error("❌ Gagal memuat OrderRoutes. Pesan Error:", err.message);
}

app.listen(port, () => {
  console.log(`🚀 Server POS Backend berjalan di http://localhost:${port}`);
});

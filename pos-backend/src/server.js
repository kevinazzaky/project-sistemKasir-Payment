// File: src/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- JALUR ORDER ---
try {
  const orderRoutes = require("./infrastructure/routes/orderRoutes");
  app.use("/api/orders", orderRoutes);
  console.log("✅ Jalur OrderRoutes berhasil dimuat!");
} catch (err) {
  console.error("❌ Gagal memuat OrderRoutes. Pesan Error:", err.message);
}

// --- JALUR AUTH (LOGIN) BARU ---
try {
  const authRoutes = require("./infrastructure/routes/authRoutes");
  app.use("/api/auth", authRoutes);
  console.log("✅ Jalur AuthRoutes (Login) berhasil dimuat!");
} catch (err) {
  console.error("❌ Gagal memuat AuthRoutes. Pesan Error:", err.message);
}

try {
  const dashboardRoutes = require("./infrastructure/routes/dashboardRoutes");
  app.use("/api/dashboard", dashboardRoutes);
  console.log("✅ Jalur DashboardRoutes berhasil dimuat!");
} catch (err) {
  console.error("❌ Gagal memuat DashboardRoutes. Pesan Error:", err.message);
}

app.listen(port, () => {
  console.log(`🚀 Server POS Backend berjalan di http://localhost:${port}`);
});

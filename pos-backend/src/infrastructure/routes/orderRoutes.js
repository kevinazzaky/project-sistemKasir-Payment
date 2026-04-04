const express = require("express");
const router = express.Router();
// Gunakan require dengan jalur yang sangat spesifik
const orderController = require("../../controllers/OrderController.js");

// Log untuk memastikan controller terisi, bukan undefined
console.log(
  "Status Controller:",
  orderController ? "✅ Terkoneksi" : "❌ Kosong",
);

// Pintu 1: Kasir minta token untuk Pop-up
router.post("/checkout", orderController.checkout.bind(orderController));

// Pintu 2: Midtrans melapor pembayaran lunas (BARU!)
router.post("/webhook", orderController.webhook.bind(orderController));

module.exports = router;

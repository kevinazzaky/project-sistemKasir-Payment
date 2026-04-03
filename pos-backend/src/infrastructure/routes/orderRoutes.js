const express = require("express");
const router = express.Router();
// Gunakan require dengan jalur yang sangat spesifik
const orderController = require("../../controllers/OrderController.js");

// Log untuk memastikan controller terisi, bukan undefined
console.log(
  "Status Controller:",
  orderController ? "✅ Terkoneksi" : "❌ Kosong",
);

router.post("/checkout", orderController.checkout.bind(orderController));

module.exports = router;

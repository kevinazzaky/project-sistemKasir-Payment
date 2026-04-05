// File: src/infrastructure/routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/DashboardController");

// Rute untuk mengambil data metrik
router.get(
  "/metrics",
  dashboardController.getMetrics.bind(dashboardController),
);

module.exports = router;

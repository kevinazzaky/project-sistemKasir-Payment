// File: src/controllers/DashboardController.js
const getDashboardMetricsUseCase = require("../use_cases/GetDashboardMetrics");

class DashboardController {
  async getMetrics(req, res) {
    try {
      console.log("📊 Mengambil data Dashboard Admin...");
      const data = await getDashboardMetricsUseCase.execute();

      return res.status(200).json({
        sukses: true,
        data: data,
      });
    } catch (error) {
      console.error("❌ ERROR DASHBOARD:", error.message);
      return res
        .status(500)
        .json({ sukses: false, pesan: "Gagal mengambil data dashboard" });
    }
  }
}

module.exports = new DashboardController();

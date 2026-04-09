// File: src/use_cases/GetDashboardMetrics.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class GetDashboardMetrics {
  async execute() {
    const pesananLunas = await prisma.order.findMany({
      where: { status: "PAID" },
    });

    // PENGUBAHAN DI SINI: Tambahkan parseInt()
    const totalPendapatan = pesananLunas.reduce(
      (total, order) => total + parseInt(order.totalAmount),
      0,
    );

    const totalPesanan = pesananLunas.length;

    const riwayatTerbaru = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    return {
      totalPendapatan: totalPendapatan,
      totalPesanan: totalPesanan,
      riwayatTerbaru: riwayatTerbaru,
    };
  }
}

module.exports = new GetDashboardMetrics();

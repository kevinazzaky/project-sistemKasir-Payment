// File: src/use_cases/UpdateOrderStatus.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UpdateOrderStatus {
  async execute(orderIdAsli, statusBaru) {
    try {
      // Prisma mencari pesanan berdasarkan ID, lalu mengubah kolom statusnya
      const updatedOrder = await prisma.order.update({
        where: {
          // Pastikan orderId dikonversi menjadi angka (Integer)
          id: parseInt(orderIdAsli),
        },
        data: {
          status: statusBaru, // Mengubah status menjadi 'PAID' atau 'CANCELED'
        },
      });

      return updatedOrder;
    } catch (error) {
      console.error(
        `❌ Gagal update database untuk Order ID ${orderIdAsli}:`,
        error.message,
      );
      throw error;
    }
  }
}

module.exports = new UpdateOrderStatus();

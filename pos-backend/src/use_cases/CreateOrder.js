// File: src/use_cases/CreateOrder.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CreateOrder {
  async execute(orderData) {
    // Logika Bisnis: Menyimpan ke Database MySQL
    return await prisma.order.create({
      data: {
        customerName: orderData.customerName || "Pelanggan VIP",
        totalAmount: orderData.totalAmount,
        paymentMethod: orderData.paymentMethod || "CASH",
        status: "PAID",
        // Logika untuk menyimpan rincian barang (items)
        items: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true, // Agar hasilnya mengembalikan rincian barang juga
      },
    });
  }
}

module.exports = new CreateOrder();

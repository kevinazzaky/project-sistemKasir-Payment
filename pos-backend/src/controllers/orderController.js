// File: src/controllers/OrderController.js
const createOrderUseCase = require("../use_cases/CreateOrder.js");
const snap = require("../config/midtrans.js");

class orderController {
  // --- FUNGSI 1: MINTA TOKEN (Ini yang tadi kita buat) ---
  async checkout(req, res) {
    try {
      console.log("\n========================================");
      console.log("1. 🛒 Menerima pesanan masuk dari kasir...");
      const order = await createOrderUseCase.execute(req.body);
      console.log(
        `2. ✅ Pesanan berhasil disimpan di Database! (ID: ${order.id})`,
      );

      const parameter = {
        transaction_details: {
          order_id: `ORDER-${order.id}-${Date.now()}`,
          gross_amount: req.body.totalAmount,
        },
        customer_details: {
          first_name: req.body.customerName || "Pelanggan VIP",
        },
      };

      console.log("3. 📡 Menghubungi server Midtrans untuk minta Token...");
      const transaction = await snap.createTransaction(parameter);

      console.log(
        "4. 🥳 YEY! Token Midtrans berhasil didapat:",
        transaction.token,
      );
      console.log("========================================\n");

      res
        .status(201)
        .json({ sukses: true, data: order, token: transaction.token });
    } catch (error) {
      console.error("❌ ERROR CHECKOUT:", error);
      res
        .status(500)
        .json({ sukses: false, pesan: "Gagal memproses pembayaran" });
    }
  }

  // --- FUNGSI 2: MENERIMA TELEPON DARI MIDTRANS (BARU!) ---
  async webhook(req, res) {
    try {
      const data = req.body;

      console.log("\n🔔 [WEBHOOK] Panggilan masuk dari server Midtrans!");
      console.log("ID Pesanan:", data.order_id);
      console.log("Status Pembayaran:", data.transaction_status);

      // Karena order_id kita formatnya "ORDER-1-17122849", kita ambil angka "1"-nya saja
      const orderIdAsli = data.order_id.split("-")[1];

      // Cek apakah statusnya lunas ('settlement' atau 'capture')
      if (
        data.transaction_status === "settlement" ||
        data.transaction_status === "capture"
      ) {
        console.log(
          `✅ LUNAS! Mari update pesanan #${orderIdAsli} di database menjadi PAID.`,
        );
        // Nanti kita tambahkan kode Prisma untuk update database Laragon di sini
      } else if (data.transaction_status === "pending") {
        console.log(
          `⏳ Pesanan #${orderIdAsli} masih menunggu pelanggan transfer.`,
        );
      } else {
        console.log(`❌ Pesanan #${orderIdAsli} gagal atau dibatalkan.`);
      }

      // Aturan Emas Webhook: Wajib membalas "200 OK" ke Midtrans!
      // Kalau tidak, Midtrans akan terus-terusan menelepon backend-mu karena mengira teleponnya tidak diangkat.
      res.status(200).json({ message: "OK, Laporan Diterima!" });
    } catch (error) {
      console.error("❌ ERROR WEBHOOK:", error);
      res.status(500).json({ message: "Server gagal memproses webhook" });
    }
  }
}

module.exports = new orderController();

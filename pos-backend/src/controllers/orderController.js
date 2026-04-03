// Pastikan jalurnya benar ke folder use_cases
const createOrderUseCase = require("../use_cases/CreateOrder.js");

class orderController {
  async checkout(req, res) {
    try {
      const result = await createOrderUseCase.execute(req.body);
      res.status(201).json({
        sukses: true,
        pesan: "Transaksi Berhasil Disimpan!",
        data: result,
      });
    } catch (error) {
      console.error("Gagal di UseCase:", error);
      res
        .status(500)
        .json({ sukses: false, pesan: "Gagal simpan ke database" });
    }
  }
}

module.exports = new orderController();

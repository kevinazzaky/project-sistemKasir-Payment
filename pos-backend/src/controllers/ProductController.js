const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductController {
  // 🔵 READ: Mengambil semua menu
  async getAllProducts(req, res) {
    try {
      const products = await prisma.product.findMany({
        orderBy: { name: "asc" }, // Urutkan berdasarkan nama
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal mengambil data produk" });
    }
  }

  // 🟢 CREATE: Menambah menu baru
  async createProduct(req, res) {
    try {
      // Menangkap data dari Frontend (Sudah pakai image_url)
      const { name, price, stock, image_url } = req.body;

      const newProduct = await prisma.product.create({
        data: {
          name: name,
          price: parseInt(price),
          stock: parseInt(stock),
          image_url: image_url || "🍲",
        },
      });

      res
        .status(201)
        .json({ message: "Menu berhasil ditambahkan!", data: newProduct });
    } catch (error) {
      console.error("Error Create Product:", error);
      res.status(500).json({ error: "Gagal menambahkan menu baru" });
    }
  }

  // 🟡 UPDATE: Mengedit menu yang sudah ada
  async updateProduct(req, res) {
    try {
      const productId = parseInt(req.params.id);
      const { name, price, stock, image_url } = req.body;

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name: name,
          price: parseInt(price),
          stock: parseInt(stock),
          image_url: image_url,
        },
      });

      res
        .status(200)
        .json({ message: "Menu berhasil diupdate!", data: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal mengupdate menu" });
    }
  }

  // 🔴 DELETE: Menghapus menu
  async deleteProduct(req, res) {
    try {
      const productId = parseInt(req.params.id);

      await prisma.product.delete({
        where: { id: productId },
      });

      res.status(200).json({ message: "Menu berhasil dihapus permanen!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal menghapus menu" });
    }
  }
}

module.exports = new ProductController();

const express = require("express");
const router = express.Router();
// Sesuaikan titik-titiknya dengan lokasi folder controllermu jika berbeda
const productController = require('../../controllers/ProductController.js');

// Jalur untuk mengambil semua menu (Read)
router.get("/", productController.getAllProducts.bind(productController));

// Jalur untuk MENAMBAH menu baru (Create) -> INI YANG KITA BUTUHKAN!
router.post("/", productController.createProduct.bind(productController));

// Jalur untuk mengedit menu (Update)
router.put("/:id", productController.updateProduct.bind(productController));

// Jalur untuk menghapus menu (Delete)
router.delete("/:id", productController.deleteProduct.bind(productController));

module.exports = router;

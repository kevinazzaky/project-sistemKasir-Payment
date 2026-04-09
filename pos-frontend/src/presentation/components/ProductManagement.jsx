import React, { useState, useEffect } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- [BARU] State untuk mendeteksi apakah Bos sedang "Edit" atau "Tambah" ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "☕",
  });

  // 🔵 READ
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔴 DELETE
  const handleDelete = async (id, name) => {
    const isConfirm = window.confirm(
      `Apakah Bos yakin ingin menghapus menu "${name}" selamanya?`,
    );
    if (!isConfirm) return;

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(`Sukses! Menu ${name} telah dihapus.`);
        fetchProducts();
      } else {
        alert("Server menolak menghapus menu.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  // --- [BARU] Tombol Edit Diklik ---
  const handleEditClick = (product) => {
    setIsEditMode(true); // Ubah mode jadi Edit
    setEditId(product.id); // Simpan ID menu yang mau diedit
    setFormData({
      // Isi form dengan data yang sudah ada
      name: product.name,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "☕",
    });
    setIsModalOpen(true); // Buka Pop-up
  };

  // --- [BARU] Tombol Tambah Diklik ---
  const handleAddNewClick = () => {
    setIsEditMode(false); // Mode Tambah Baru
    setEditId(null);
    setFormData({ name: "", price: "", stock: "", image_url: "☕" }); // Kosongkan form
    setIsModalOpen(true); // Buka Pop-up
  };

  // 🟢 CREATE & 🟡 UPDATE (Digabung dalam satu fungsi)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Jika mode Edit, arahkan ke URL ber-ID dan pakai method PUT
      // Jika mode Tambah, arahkan ke URL biasa dan pakai method POST
      const url = isEditMode
        ? `http://localhost:3000/api/products/${editId}`
        : "http://localhost:3000/api/products";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          isEditMode
            ? "Perubahan menu berhasil disimpan!"
            : "Menu baru berhasil ditambahkan!",
        );
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert("Gagal menyimpan data ke database.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading)
    return (
      <div className="text-[#D4AF37] p-10 text-center">
        Memuat daftar menu...
      </div>
    );

  return (
    <div className="mt-10 bg-[#1A1A1A] rounded-xl p-6 border border-[#333] relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-wider">
          MANAJEMEN MENU
        </h2>
        {/* Tombol Tambah sekarang memanggil handleAddNewClick */}
        <button
          onClick={handleAddNewClick}
          className="bg-[#D4AF37] hover:bg-[#B3932F] text-black font-bold py-2 px-4 rounded transition-colors"
        >
          + TAMBAH MENU
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b border-[#333] text-sm uppercase">
              <th className="p-4 font-medium">Menu</th>
              <th className="p-4 font-medium">Harga</th>
              <th className="p-4 font-medium">Stok</th>
              <th className="p-4 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#222] hover:bg-[#111] transition-colors"
              >
                <td className="p-4 text-white">
                  <span className="mr-2">{product.image_url}</span>{" "}
                  {product.name}
                </td>
                <td className="p-4 text-[#D4AF37] font-bold">
                  Rp {parseInt(product.price).toLocaleString("id-ID")}
                </td>
                <td className="p-4 text-gray-400">{product.stock}</td>
                <td className="p-4 text-center space-x-2">
                  {/* Tombol Edit memanggil handleEditClick dan membawa data product */}
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-blue-400 hover:text-blue-300 font-bold px-3 py-1 rounded border border-blue-900 hover:bg-blue-900/30 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="text-red-500 hover:text-red-400 font-bold px-3 py-1 rounded border border-red-900 hover:bg-red-900/30 transition-colors"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#141414] border border-[#333] rounded-xl p-8 w-full max-w-md shadow-2xl">
            {/* Judul Pop-up dinamis tergantung mode */}
            <h3 className="text-xl font-bold text-[#D4AF37] mb-6 uppercase tracking-wider">
              {isEditMode ? "Edit Data Menu" : "Tambah Menu Baru"}
            </h3>

            {/* Form memanggil fungsi gabungan handleSubmit */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Nama Menu
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded p-2 text-white focus:border-[#D4AF37] outline-none"
                  placeholder="Cth: Kopi Janda"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded p-2 text-white focus:border-[#D4AF37] outline-none"
                    placeholder="Cth: 15000"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Stok Tersedia
                  </label>
                  <input
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded p-2 text-white focus:border-[#D4AF37] outline-none"
                    placeholder="Cth: 50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Emoji Menu
                </label>
                <input
                  required
                  type="text"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded p-2 text-white focus:border-[#D4AF37] outline-none"
                  placeholder="Cth: ☕"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-[#333]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#D4AF37] hover:bg-[#B3932F] text-black font-bold rounded transition-colors"
                >
                  {isEditMode ? "Simpan Perubahan" : "Simpan Menu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

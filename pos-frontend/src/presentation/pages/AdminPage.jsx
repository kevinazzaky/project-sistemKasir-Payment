// File: src/presentation/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  // State untuk menyimpan data dari Backend
  const [metrics, setMetrics] = useState({
    totalPendapatan: 0,
    totalPesanan: 0,
    riwayatTerbaru: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // --- SATPAM KHUSUS ADMIN ---
  useEffect(() => {
    document.title = "Dashboard";
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userString);
    if (user.role !== "ADMIN") {
      alert("Akses Ditolak! Halaman ini khusus Pemilik Toko.");
      navigate("/");
      return;
    }

    setAdminName(user.username);

    // --- AMBIL DATA DASHBOARD DARI BACKEND ---
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/metrics",
        );
        const result = await response.json();

        if (response.ok) {
          setMetrics(result.data);
        }
      } catch (error) {
        console.error("Gagal menarik data dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);
  // ---------------------------

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Navbar Atas */}
      <nav className="bg-[#0f0f0f] border-b border-[#222] px-8 py-5 flex justify-between items-center shadow-2xl">
        <h1 className="text-2xl font-bold text-white tracking-wider uppercase">
          POS <span className="text-[#D4AF37]">Admin</span>
        </h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-300 font-medium tracking-wide">
            Halo, <span className="text-[#D4AF37] uppercase">{adminName}</span>!
            👋
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-900/40 text-red-400 border border-red-900 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-sm font-semibold tracking-widest"
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="p-8 max-w-7xl mx-auto mt-4">
        <h2 className="text-xl font-bold text-[#D4AF37] mb-6 uppercase tracking-widest">
          Ringkasan Penjualan Hari Ini
        </h2>

        {/* Kotak Metrik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#141414] p-6 rounded-2xl border border-[#2a2a2a] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]">
            <h3 className="text-[#888] text-sm font-semibold uppercase tracking-wider mb-2">
              Total Pendapatan
            </h3>
            <p className="text-4xl font-bold text-white">
              {isLoading
                ? "..."
                : `Rp ${metrics.totalPendapatan.toLocaleString("id-ID")}`}
            </p>
          </div>

          <div className="bg-[#141414] p-6 rounded-2xl border border-[#2a2a2a] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]">
            <h3 className="text-[#888] text-sm font-semibold uppercase tracking-wider mb-2">
              Pesanan Lunas
            </h3>
            <p className="text-4xl font-bold text-white">
              {isLoading ? "..." : metrics.totalPesanan}{" "}
              <span className="text-lg font-normal text-[#555]">Transaksi</span>
            </p>
          </div>

          <div className="bg-[#141414] p-6 rounded-2xl border border-[#2a2a2a] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]">
            <h3 className="text-[#888] text-sm font-semibold uppercase tracking-wider mb-2">
              Status Sistem
            </h3>
            <p className="text-2xl font-bold text-green-500 mt-2">🟢 Online</p>
          </div>
        </div>

        {/* Tabel Riwayat Pesanan */}
        <div className="bg-[#0f0f0f] rounded-2xl border border-[#222] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#333] bg-[#141414]">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Riwayat Transaksi Terbaru
            </h3>
          </div>

          <div className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="p-16 text-center text-[#555] italic">
                Memuat data...
              </div>
            ) : metrics.riwayatTerbaru.length === 0 ? (
              <div className="p-16 text-center text-[#555] italic">
                Belum ada transaksi hari ini.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1a1a1a] text-[#888] text-sm uppercase tracking-wider border-b border-[#333]">
                    <th className="p-4 font-semibold">ID Pesanan</th>
                    <th className="p-4 font-semibold">Waktu</th>
                    <th className="p-4 font-semibold">Total Harga</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.riwayatTerbaru.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#222] hover:bg-[#111] transition-colors"
                    >
                      <td className="p-4 text-gray-300 font-mono text-sm font-bold text-[#D4AF37]">
                        #{order.id}
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleString("id-ID")}
                      </td>
                      <td className="p-4 font-bold text-[#D4AF37]">
                        Rp {order.totalAmount.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            order.status === "PAID"
                              ? "bg-green-900/40 text-green-400 border border-green-900"
                              : order.status === "PENDING"
                                ? "bg-yellow-900/40 text-yellow-400 border border-yellow-900"
                                : "bg-red-900/40 text-red-400 border border-red-900"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

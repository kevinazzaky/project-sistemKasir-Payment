// File: src/presentation/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // --- UBAH JUDUL TAB LOGIN ---
  useEffect(() => {
    document.title = "Login";
  }, []);
  // ----------------------------

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        if (result.data.user.role === "ADMIN") {
          navigate("/admin");
        } else if (result.data.user.role === "KASIR") {
          navigate("/");
        }
      } else {
        setErrorMsg(result.pesan);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Gagal terhubung ke server. Pastikan backend menyala!");
    }
  };

  return (
    // Latar belakang utama: Hitam pekat
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Kotak form login: Hitam sedikit terang dengan border */}
      <div className="bg-[#141414] p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-[#2a2a2a] w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-widest uppercase">
          Login <span className="text-[#D4AF37]"></span>
        </h2>

        {/* Tempat Pesan Error Muncul */}
        {errorMsg && (
          <p className="text-red-400 text-center text-sm mb-4 bg-red-900/20 border border-red-900 p-3 rounded-lg">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // Input field gelap dengan focus emas
              className="w-full px-4 py-3 bg-[#0f0f0f] text-white border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all placeholder-gray-600"
              placeholder="Masukkan username..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f0f] text-white border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all placeholder-gray-600"
              placeholder="Masukkan password..."
              required
            />
          </div>

          <button
            type="submit"
            // Tombol gradasi emas persis seperti di halaman POS
            className="w-full mt-4 p-3 bg-gradient-to-r from-[#D4AF37] to-[#B5952F] text-black rounded-xl text-lg font-bold uppercase tracking-widest hover:from-[#E6C654] hover:to-[#D4AF37] transition-all active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

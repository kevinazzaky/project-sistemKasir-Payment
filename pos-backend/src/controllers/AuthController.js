// File: src/controllers/AuthController.js
const loginUserUseCase = require("../use_cases/LoginUser.js");

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ sukses: false, pesan: "Username dan Password wajib diisi!" });
      }

      console.log(`\n🔑 Mencoba login untuk user: ${username}...`);

      // Minta Use Case untuk memproses login
      const result = await loginUserUseCase.execute(username, password);

      console.log(`✅ Login sukses! Role: ${result.user.role}`);

      return res.status(200).json({
        sukses: true,
        pesan: "Login berhasil",
        data: result,
      });
    } catch (error) {
      console.error("❌ ERROR LOGIN:", error.message);
      // Jika error karena username/password salah, kirim status 401 (Unauthorized)
      return res.status(401).json({ sukses: false, pesan: error.message });
    }
  }
}

module.exports = new AuthController();

// File: src/use_cases/LoginUser.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
// Kunci rahasia untuk membuat tiket JWT (idealnya ditaruh di file .env)
const JWT_SECRET = process.env.JWT_SECRET || "kunci_rahasia_super_aman_123";

class LoginUser {
  async execute(username, password_input) {
    // 1. Cari user berdasarkan username di database
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    // 2. Kalau usernamenya tidak ada
    if (!user) {
      throw new Error("Username tidak ditemukan!");
    }

    // 3. Cocokkan password yang diketik dengan password acak di database
    const passwordCocok = await bcrypt.compare(password_input, user.password);

    if (!passwordCocok) {
      throw new Error("Password salah!");
    }

    // 4. Kalau cocok, buatkan tiket masuk (Token JWT)
    // Tiket ini menyimpan ID dan Role, berlaku selama 1 hari (24 jam)
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    // 5. Kembalikan token dan data user (tanpa password)
    return {
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}

module.exports = new LoginUser();

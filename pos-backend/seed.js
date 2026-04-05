// File: seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  console.log("Mulai menanam data akun awal...");

  // 1. Acak password untuk ADMIN (password aslinya: "rahasia")
  const hashedAdminPassword = await bcrypt.hash("rahasia", 10);

  // 2. Acak password untuk KASIR (password aslinya: "kasir123")
  const hashedKasirPassword = await bcrypt.hash("kasir123", 10);

  // 3. Masukkan ke Database Laragon
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedAdminPassword,
      role: "ADMIN",
    },
  });

  const kasir = await prisma.user.upsert({
    where: { username: "kasir" },
    update: {},
    create: {
      username: "kasir",
      password: hashedKasirPassword,
      role: "KASIR",
    },
  });

  console.log("✅ Berhasil! Akun awal sudah terbuat:");
  console.log("👉 Akun Admin | Username: admin | Password: rahasia");
  console.log("👉 Akun Kasir | Username: kasir | Password: kasir123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

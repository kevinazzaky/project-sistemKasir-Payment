// File: src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/AuthController.js");

// Rute untuk menerima data login
router.post("/login", authController.login.bind(authController));

module.exports = router;
